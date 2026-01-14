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

  async function init() {
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
        if (user) {
          currentUser = user;
          isInitialized = true;
          
          // Update progress with user ID
          const progress = window.progressTracker?.load();
          if (progress) {
            progress.userId = user.uid;
            progress.syncEnabled = true;
            window.progressTracker?.save(progress);
          }
          
          // Initial sync
          await syncFromCloud();
          updateSyncStatus('synced');
          updateSettingsUI();
        } else {
          // Sign in anonymously
          try {
            await signInAnonymously(auth);
          } catch (e) {
            console.error('Anonymous auth failed:', e);
            updateSyncStatus('offline');
          }
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
    if (!isInitialized || !currentUser || !db) return;
    
    updateSyncStatus('syncing');
    
    try {
      const { doc, getDoc } = window.firebaseModules;
      
      const courseId = getCourseId();
      const docRef = doc(db, 'users', currentUser.uid, 'courses', courseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        const localData = window.progressTracker?.load();
        
        // Merge strategy: use whichever has more progress or is more recent
        if (shouldUseCloudData(localData, cloudData)) {
          window.progressTracker?.save(cloudData);
          window.progressTracker?.updateUI();
          window.showToast?.('info', 'Progress Synced', 'Your progress has been restored from the cloud.');
        }
      }
      
      updateSyncStatus('synced');
    } catch (e) {
      console.error('Sync from cloud failed:', e);
      updateSyncStatus('offline');
    }
  }

  function shouldUseCloudData(local, cloud) {
    if (!local || !cloud) return !!cloud;
    
    // Count completed days
    const localCompleted = Object.values(local.days || {}).filter(d => d.status === 'completed').length;
    const cloudCompleted = Object.values(cloud.days || {}).filter(d => d.status === 'completed').length;
    
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
    
    if (statusEl) {
      if (currentUser?.isAnonymous) {
        statusEl.textContent = 'Anonymous (syncing)';
        if (linkOption) linkOption.style.display = 'block';
      } else if (currentUser) {
        statusEl.textContent = `Linked (${currentUser.email || 'Google'})`;
        if (linkOption) linkOption.style.display = 'none';
      } else {
        statusEl.textContent = 'Not syncing';
      }
    }
  }

  async function linkGoogleAccount() {
    if (!auth || !currentUser) {
      window.showToast?.('warning', 'Not Ready', 'Please wait for the sync system to initialize.');
      return;
    }
    
    try {
      const { GoogleAuthProvider, linkWithPopup } = window.firebaseModules;
      const provider = new GoogleAuthProvider();
      await linkWithPopup(currentUser, provider);
      
      window.showToast?.('success', 'Account Linked', 'Your progress is now permanently saved to your Google account.');
      updateSettingsUI();
    } catch (e) {
      if (e.code === 'auth/credential-already-in-use') {
        window.showToast?.('warning', 'Account Already Linked', 'This Google account is already linked to another profile.');
      } else if (e.code === 'auth/popup-closed-by-user') {
        // Do nothing
      } else {
        console.error('Link account failed:', e);
        window.showToast?.('error', 'Link Failed', 'Unable to link Google account. Please try again.');
      }
    }
  }

  // Initialize when DOM is ready
  function setup() {
    init();
    
    // Bind link account button
    document.getElementById('link-google-btn')?.addEventListener('click', linkGoogleAccount);
    
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
