// Firebase Sync - Cloud progress synchronization
(function() {
  'use strict';

  let app = null;
  let auth = null;
  let db = null;
  let currentUser = null;
  let isInitialized = false;

  // Get course base URL from meta tag
  function getCourseBaseUrl() {
    const metaBase = document.querySelector('meta[name="course-base-url"]');
    if (metaBase && metaBase.content) return metaBase.content;
    return '/';
  }

  // Firebase configuration - loaded from external file
  async function loadConfig() {
    // Return from window if already loaded
    if (window.in30daysFirebaseConfig) {
      return window.in30daysFirebaseConfig;
    }

    try {
      // Try fetching it if not in window (fallback) using correct path
      const baseUrl = getCourseBaseUrl();
      const configUrl = baseUrl.endsWith('/') ? `${baseUrl}firebase-config.js` : `${baseUrl}/firebase-config.js`;
      const response = await fetch(configUrl);
      if (response.ok) {
        const text = await response.text();
        // Extract the object from firebaseConfig = { ... }
        const match = text.match(/const\s+firebaseConfig\s*=\s*({[\s\S]*?});/);
        if (match) {
          // Clean up the string to make it JSON-parseable
          let configStr = match[1]
            .replace(/\/\/.*/g, '') // remove comments
            .replace(/'/g, '"')    // replace single quotes with double quotes
            .replace(/(\w+):/g, '"$1":') // quote keys
            .replace(/,(\s*})/g, '$1');  // remove trailing commas
          return JSON.parse(configStr);
        }
      }
    } catch (e) {
      console.warn('Firebase config loading failed', e);
    }
    return null;
  }

  // Get privacy settings from localStorage
  function getPrivacySettings() {
    const SETTINGS_KEY = 'in30days_privacy_settings';
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{"essential": true, "sync": true, "analytics": true}');
  }

  async function init() {
    // Check privacy settings first
    const privacy = getPrivacySettings();
    if (!privacy.sync) {
      console.log('Cloud sync disabled by user privacy settings');
      updateSyncStatus('disabled');
      return;
    }

    // Check if Firebase modules are available
    if (!window.firebaseModules) {
      console.log('Firebase modules not loaded');
      updateSyncStatus('disabled');
      return;
    }

    const config = await loadConfig();
    if (!config || config.apiKey === 'PLACEHOLDER_API_KEY') {
      console.log('Firebase not configured');
      updateSyncStatus('disabled');
      return;
    }

    try {
      const { initializeApp, getAuth, signInAnonymously, onAuthStateChanged, getFirestore } = window.firebaseModules;
      
      // Initialize Firebase
      app = initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app);
      
      // Listen for auth state changes
      onAuthStateChanged(auth, async (user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user');
        if (user) {
          currentUser = user;
          isInitialized = true;
          
          // Initial sync
          await syncFromCloud();
          
          // Update local progress with user ID after sync from cloud
          const progress = window.progressTracker?.load();
          if (progress && progress.userId !== user.uid) {
            progress.userId = user.uid;
            progress.syncEnabled = true;
            window.progressTracker?.save(progress, true); // skipSync=true
          }
          
          updateSyncStatus('synced');
          updateSettingsUI();
        } else {
          // ... existing anonymous auth logic ...
        }
      });

      // Listen for online/offline
      window.addEventListener('online', () => {
        if (isInitialized) {
          syncToCloud();
        }
      });

      window.addEventListener('offline', () => {
        updateSyncStatus('offline');
      });

      // Listen for progress changes
      window.addEventListener('progressUpdated', (e) => {
        if (isInitialized && navigator.onLine) {
          syncToCloud(e.detail);
        }
      });

    } catch (e) {
      console.error('Firebase init failed:', e);
      updateSyncStatus('offline');
    }
  }

  async function syncToCloud(progress = null) {
    if (!isInitialized || !currentUser || !db) return;
    
    updateSyncStatus('syncing');
    
    try {
      const data = progress || window.progressTracker?.load();
      if (!data) return;

      const { doc, setDoc } = window.firebaseModules;
      
      const courseId = data.courseId || 'default';
      const docRef = doc(db, 'users', currentUser.uid, 'courses', courseId);
      
      await setDoc(docRef, {
        ...data,
        lastSyncedAt: new Date().toISOString()
      }, { merge: true });

      updateSyncStatus('synced');
    } catch (e) {
      console.error('Sync to cloud failed:', e);
      updateSyncStatus('offline');
    }
  }

  async function syncFromCloud() {
    if (!isInitialized || !currentUser || !db) {
      console.warn('Sync from cloud aborted: Not initialized');
      return;
    }
    
    updateSyncStatus('syncing');
    
    try {
      const { doc, getDoc } = window.firebaseModules;
      
      const courseId = getCourseId();
      console.log(`Fetching cloud data for course: ${courseId}, user: ${currentUser.uid}`);
      const docRef = doc(db, 'users', currentUser.uid, 'courses', courseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        const localData = window.progressTracker?.load();
        
        console.log('Cloud data found:', cloudData);
        
        // Merge strategy: use whichever has more progress or is more recent
        if (shouldUseCloudData(localData, cloudData)) {
          console.log('Applying cloud data to local storage');
          window.progressTracker?.save(cloudData, true); // skipSync=true to avoid loop
          window.progressTracker?.updateUI();
          window.showToast?.('success', 'Progress Synced', 'Your progress has been restored from the cloud.', 5000);
        } else {
          console.log('Local data is more advanced than cloud data. Keeping local.');
          // If local is more advanced, we should probably sync IT to the cloud
          syncToCloud(localData);
          window.showToast?.('info', 'Cloud Synced', 'Your current progress is up to date with the cloud.', 3000);
        }
      } else {
        console.log('No cloud data found for this user/course.');
        // If no cloud data, sync current local to cloud
        syncToCloud();
      }
      
      updateSyncStatus('synced');
    } catch (e) {
      console.error('Sync from cloud failed:', e);
      updateSyncStatus('offline');
    }
  }

  function shouldUseCloudData(local, cloud) {
    if (!local || !cloud) return !!cloud;
    
    // Count completed modules/days
    const localModules = local.modules || local.days || {};
    const cloudModules = cloud.modules || cloud.days || {};
    
    const localCompleted = Object.values(localModules).filter(d => d.status === 'completed').length;
    const cloudCompleted = Object.values(cloudModules).filter(d => d.status === 'completed').length;
    
    // Use cloud if it has more progress
    if (cloudCompleted > localCompleted) return true;
    
    // If same progress, use more recent
    if (cloudCompleted === localCompleted) {
      const localDate = new Date(local.lastUpdated || 0);
      const cloudDate = new Date(cloud.lastUpdated || 0);
      return cloudDate > localDate;
    }
    
    return false;
  }

  function getCourseId() {
    const meta = document.querySelector('meta[name="course-id"]');
    if (meta) return meta.content;
    
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts[0] || 'default';
  }

  function updateSyncStatus(status) {
    const syncStatus = document.getElementById('sync-status');
    if (!syncStatus) return;

    const icons = syncStatus.querySelectorAll('.sync-icon');
    icons.forEach(icon => icon.style.display = 'none');

    switch (status) {
      case 'synced':
        syncStatus.querySelector('.sync-icon--synced').style.display = 'block';
        syncStatus.title = 'Synced to cloud';
        break;
      case 'syncing':
        syncStatus.querySelector('.sync-icon--syncing').style.display = 'block';
        syncStatus.title = 'Syncing...';
        break;
      case 'offline':
      case 'disabled':
        syncStatus.querySelector('.sync-icon--offline').style.display = 'block';
        syncStatus.title = status === 'disabled' ? 'Sync disabled' : 'Offline - changes saved locally';
        break;
    }
  }

  function updateSettingsUI() {
    const statusEl = document.getElementById('settings-sync-status');
    const linkOption = document.getElementById('link-account-option');
    const forceSyncBtn = document.getElementById('force-sync-cloud-btn');
    const linkBtn = document.getElementById('link-google-btn');
    const signInBtn = document.getElementById('sign-in-google-btn');
    
    if (statusEl) {
      if (currentUser?.isAnonymous) {
        statusEl.textContent = 'Anonymous (syncing)';
        if (linkOption) linkOption.style.display = 'block';
        if (linkBtn) linkBtn.style.display = 'flex';
        if (signInBtn) signInBtn.style.display = 'flex';
        if (forceSyncBtn) forceSyncBtn.style.display = 'none';
      } else if (currentUser) {
        statusEl.textContent = `Linked (${currentUser.email || 'Google'})`;
        if (linkOption) linkOption.style.display = 'block'; // Keep block to show forceSyncBtn
        if (linkBtn) linkBtn.style.display = 'none';
        if (signInBtn) signInBtn.style.display = 'none';
        if (forceSyncBtn) forceSyncBtn.style.display = 'flex';
      } else {
        statusEl.textContent = 'Not syncing';
      }
    }
  }

  async function forceSyncFromCloud() {
    if (!isInitialized || !currentUser || !db) return;
    
    window.showToast?.('info', 'Refreshing', 'Pulling your progress from the cloud...');
    
    try {
      const { doc, getDoc } = window.firebaseModules;
      const courseId = getCourseId();
      const docRef = doc(db, 'users', currentUser.uid, 'courses', courseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        window.progressTracker?.save(cloudData, true); // skipSync=true
        window.progressTracker?.updateUI();
        window.showToast?.('success', 'Sync Complete', 'Progress refreshed from cloud.');
      } else {
        window.showToast?.('warning', 'No Data Found', 'No cloud progress found for this account.');
      }
    } catch (e) {
      console.error('Force sync failed:', e);
      window.showToast?.('error', 'Sync Failed', 'Unable to reach the cloud. Check your connection.');
    }
  }

  // Initialize when DOM is ready
  function setup() {
    init();
    
    // Bind link account button
    document.getElementById('link-google-btn')?.addEventListener('click', linkGoogleAccount);
    
    // Bind sign in button
    document.getElementById('sign-in-google-btn')?.addEventListener('click', signInWithGoogle);

    // Bind force sync button
    document.getElementById('force-sync-cloud-btn')?.addEventListener('click', forceSyncFromCloud);
    
    // Bind manual sync button
    document.getElementById('manual-sync-btn')?.addEventListener('click', () => {
      if (isInitialized) {
        syncFromCloud();
        syncToCloud();
        window.showToast?.('info', 'Sync Started', 'Synchronizing with cloud...');
      } else {
        window.showToast?.('warning', 'Not Connected', 'Sync is not initialized. Check your configuration.');
      }
    });
  }

  if (document.readyState !== 'loading') {
    setup();
  } else {
    document.addEventListener('DOMContentLoaded', setup);
  }

  // Expose API
  window.firebaseSync = {
    sync: syncToCloud,
    syncFrom: syncFromCloud,
    linkGoogle: linkGoogleAccount,
    isInitialized: () => isInitialized,
    getUser: () => currentUser
  };

})();
