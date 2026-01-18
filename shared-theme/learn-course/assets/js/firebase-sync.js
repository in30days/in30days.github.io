// Firebase Sync - Cloud progress synchronization
(function() {
  'use strict';

  const STORAGE_KEY_PREFIX = 'in30days_progress_';
  let app = null;
  let auth = null;
  let db = null;
  let currentUser = null;
  let isInitialized = false;

  // Get course ID from page
  function getCourseId() {
    const meta = document.querySelector('meta[name="course-id"]');
    if (meta) return meta.content;
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts[0] || 'default';
  }

  function getStorageKey() {
    return STORAGE_KEY_PREFIX + getCourseId();
  }

  // Get course base URL from meta tag
  function getCourseBaseUrl() {
    const metaBase = document.querySelector('meta[name="course-base-url"]');
    if (metaBase && metaBase.content) return metaBase.content;
    return '/';
  }

  // Firebase configuration - loaded from external file
  async function loadConfig() {
    if (window.in30daysFirebaseConfig) return window.in30daysFirebaseConfig;

    try {
      const baseUrl = getCourseBaseUrl();
      const configUrl = baseUrl.endsWith('/') ? `${baseUrl}firebase-config.js` : `${baseUrl}/firebase-config.js`;
      const response = await fetch(configUrl);
      if (response.ok) {
        const text = await response.text();
        const match = text.match(/const\s+firebaseConfig\s*=\s*({[\s\S]*?});/);
        if (match) {
          let configStr = match[1]
            .replace(/\/\/.*/g, '')
            .replace(/'/g, '"')
            .replace(/(\w+):/g, '"$1":')
            .replace(/,(\s*})/g, '$1');
          return JSON.parse(configStr);
        }
      }
    } catch (e) {
      console.warn('Firebase config loading failed', e);
    }
    return null;
  }

  function getPrivacySettings() {
    const SETTINGS_KEY = 'in30days_privacy_settings';
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{"essential": true, "sync": true, "analytics": true}');
  }

  async function linkGoogleAccount() {
    if (!isInitialized || !auth || !currentUser) {
      window.showToast?.('warning', 'Not Ready', 'Firebase is still initializing. Please wait a moment.');
      return;
    }
    
    try {
      const { GoogleAuthProvider, linkWithPopup } = window.firebaseModules;
      const provider = new GoogleAuthProvider();
      const result = await linkWithPopup(currentUser, provider);
      currentUser = result.user;
      
      window.showToast?.('success', 'Account Linked', 'Your progress is now synced with your Google account.');
      updateSettingsUI();
      syncToCloud();
    } catch (e) {
      console.error('Linking failed:', e);
      if (e.code === 'auth/credential-already-in-use') {
        window.showToast?.('warning', 'Already Linked', 'This Google account is already linked to another user. Try Signing In instead.');
      } else {
        window.showToast?.('error', 'Linking Failed', e.message || 'An error occurred while linking your account.');
      }
    }
  }

  async function signInWithGoogle() {
    if (!isInitialized || !auth) {
      window.showToast?.('warning', 'Not Ready', 'Firebase is still initializing. Please wait a moment.');
      return;
    }
    
    try {
      const { GoogleAuthProvider, signInWithPopup } = window.firebaseModules;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      currentUser = result.user;
      
      window.showToast?.('success', 'Signed In', 'Welcome back! Syncing your progress...');
      updateSettingsUI();
      await syncFromCloud();
    } catch (e) {
      console.error('Sign in failed:', e);
      window.showToast?.('error', 'Sign In Failed', e.message || 'Unable to sign in with Google.');
    }
  }

  async function init(retries = 0) {
    const privacy = getPrivacySettings();
    if (!privacy.sync) {
      updateSyncStatus('disabled');
      return;
    }

    if (!window.firebaseModules) {
      if (retries < 10) {
        setTimeout(() => init(retries + 1), 500);
        return;
      }
      console.error('Firebase modules failed to load after 5 seconds');
      updateSyncStatus('disabled');
      return;
    }

    const config = await loadConfig();
    if (!config || config.apiKey === 'PLACEHOLDER_API_KEY') {
      updateSyncStatus('disabled');
      return;
    }

    try {
      const { initializeApp, getAuth, signInAnonymously, onAuthStateChanged, getFirestore } = window.firebaseModules;
      
      app = initializeApp(config);
      auth = getAuth(app);
      db = getFirestore(app);
      
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          currentUser = user;
          isInitialized = true;
          
          await syncFromCloud();
          
          const progress = window.progressTracker?.load();
          if (progress && progress.userId !== user.uid) {
            progress.userId = user.uid;
            progress.syncEnabled = true;
            window.progressTracker?.save(progress, true);
          }
          
          updateSyncStatus('synced');
          updateSettingsUI();
        } else {
          try {
            await signInAnonymously(auth);
          } catch (e) {
            console.error('Anonymous sign in failed:', e);
            updateSyncStatus('offline');
          }
        }
      });

      window.addEventListener('online', () => isInitialized && syncToCloud());
      window.addEventListener('offline', () => updateSyncStatus('offline'));
      window.addEventListener('progressUpdated', (e) => isInitialized && navigator.onLine && syncToCloud(e.detail));

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
      const courseId = getCourseId();
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
        
        if (shouldUseCloudData(localData, cloudData)) {
          window.progressTracker?.save(cloudData, true);
          window.progressTracker?.updateUI();
          window.showToast?.('success', 'Progress Synced', 'Your progress has been restored from the cloud.');
        } else {
          syncToCloud(localData);
        }
      } else {
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
    const localModules = local.modules || local.days || {};
    const cloudModules = cloud.modules || cloud.days || {};
    const localCompleted = Object.values(localModules).filter(d => d.status === 'completed').length;
    const cloudCompleted = Object.values(cloudModules).filter(d => d.status === 'completed').length;
    
    if (cloudCompleted > localCompleted) return true;
    if (cloudCompleted === localCompleted) {
      return new Date(cloud.lastUpdated || 0) > new Date(local.lastUpdated || 0);
    }
    return false;
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
    const forceSyncBtn = document.getElementById('force-sync-cloud-btn');
    const linkBtn = document.getElementById('link-google-btn');
    const signInBtn = document.getElementById('sign-in-google-btn');
    
    if (statusEl) {
      if (currentUser?.isAnonymous) {
        statusEl.textContent = 'Anonymous (syncing)';
        if (linkBtn) linkBtn.style.display = 'flex';
        if (signInBtn) signInBtn.style.display = 'flex';
        if (forceSyncBtn) forceSyncBtn.style.display = 'none';
      } else if (currentUser) {
        statusEl.textContent = `Linked (${currentUser.email || 'Google'})`;
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
        window.progressTracker?.save(docSnap.data(), true);
        window.progressTracker?.updateUI();
        window.showToast?.('success', 'Sync Complete', 'Progress refreshed from cloud.');
      } else {
        window.showToast?.('warning', 'No Data Found', 'No cloud progress found for this account.');
      }
    } catch (e) {
      console.error('Force sync failed:', e);
      window.showToast?.('error', 'Sync Failed', 'Unable to reach the cloud.');
    }
  }

  function setup() {
    init();
    document.getElementById('link-google-btn')?.addEventListener('click', linkGoogleAccount);
    document.getElementById('sign-in-google-btn')?.addEventListener('click', signInWithGoogle);
    document.getElementById('force-sync-cloud-btn')?.addEventListener('click', forceSyncFromCloud);
    document.getElementById('manual-sync-btn')?.addEventListener('click', () => {
      if (isInitialized) {
        syncFromCloud();
        syncToCloud();
        window.showToast?.('info', 'Sync Started', 'Synchronizing with cloud...');
      } else {
        window.showToast?.('warning', 'Not Connected', 'Sync is still initializing. Please wait.');
      }
    });
  }

  if (document.readyState !== 'loading') setup();
  else document.addEventListener('DOMContentLoaded', setup);

  window.firebaseSync = {
    sync: syncToCloud,
    syncFrom: syncFromCloud,
    linkGoogle: linkGoogleAccount,
    isInitialized: () => isInitialized,
    getUser: () => currentUser
  };
})();
