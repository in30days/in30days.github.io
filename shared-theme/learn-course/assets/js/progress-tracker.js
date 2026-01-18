// Progress Tracking System
(function() {
  'use strict';

  const STORAGE_KEY_PREFIX = 'in30days_progress_';
  
  // Get course ID from page
  function getCourseId() {
    const metaCourse = document.querySelector('meta[name="course-id"]');
    if (metaCourse && metaCourse.content) return metaCourse.content;
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    return pathParts[0] || 'default';
  }

  // Get course base URL from meta tag
  function getCourseBaseUrl() {
    const metaBase = document.querySelector('meta[name="course-base-url"]');
    if (metaBase && metaBase.content) return metaBase.content;
    return '/';
  }

  function getStorageKey() {
    return STORAGE_KEY_PREFIX + getCourseId();
  }

  // Default progress structure
  function createDefaultProgress(totalModules = 30) {
    const modules = {};
    for (let i = 1; i <= totalModules; i++) {
      modules[i] = {
        status: i === 1 ? 'available' : 'locked',
        quizScore: null,
        quizAttempts: 0,
        completedAt: null,
        timeSpent: 0
      };
    }
    
    return {
      version: 1,
      courseId: getCourseId(),
      lastUpdated: new Date().toISOString(),
      userId: null,
      syncEnabled: false,
      modules: modules,
      settings: {
        darkMode: false,
        focusMode: false,
        focusModeSepia: false,
        fontSize: 'normal'
      }
    };
  }

  // Load progress from localStorage
  function loadProgress() {
    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        let progress = JSON.parse(stored);
        // Migration: rename 'days' to 'modules'
        if (progress.days && !progress.modules) {
          progress.modules = progress.days;
          delete progress.days;
        }
        return progress;
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    return createDefaultProgress();
  }

  // Save progress to localStorage
  function saveProgress(progress, skipSync = false) {
    progress.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(progress));
      if (!skipSync && window.firebaseSync && progress.syncEnabled) {
        window.firebaseSync.sync(progress);
      }
      window.dispatchEvent(new CustomEvent('progressUpdated', { detail: { progress, skipSync } }));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }

  // Update module status
  function updateModuleStatus(moduleNum, status, quizScore = null) {
    const progress = loadProgress();
    if (progress.modules[moduleNum]) {
      progress.modules[moduleNum].status = status;
      if (quizScore !== null) {
        progress.modules[moduleNum].quizScore = quizScore;
        progress.modules[moduleNum].quizAttempts++;
      }
      if (status === 'completed') {
        progress.modules[moduleNum].completedAt = new Date().toISOString();
        const nextModule = parseInt(moduleNum) + 1;
        if (progress.modules[nextModule] && progress.modules[nextModule].status === 'locked') {
          progress.modules[nextModule].status = 'available';
        }
      }
      saveProgress(progress);
    }
  }

  // Mark module as in progress
  function startModule(moduleNum) {
    const progress = loadProgress();
    if (progress.modules[moduleNum] && progress.modules[moduleNum].status === 'available') {
      progress.modules[moduleNum].status = 'in-progress';
      saveProgress(progress);
    }
  }

  // Complete module (after passing quiz)
  function completeModule(moduleNum, quizScore) {
    updateModuleStatus(moduleNum, 'completed', quizScore);
    if (window.showToast) {
      window.showToast('success', 'Module Completed!', `You've completed Module ${moduleNum} with a score of ${quizScore}%`);
    }
  }

  // Calculate overall progress
  function calculateProgress() {
    const progress = loadProgress();
    const modules = Object.values(progress.modules || {});
    const completed = modules.filter(m => m.status === 'completed').length;
    const total = modules.length;
    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  // Update UI elements with progress data
  function updateUI() {
    const progress = loadProgress();
    const stats = calculateProgress();

    // Update header progress ring
    if (window.updateHeaderProgress) {
      window.updateHeaderProgress(stats.percent);
    }

    // Update sidebar progress
    const sidebarValue = document.getElementById('sidebar-progress-value');
    const sidebarFill = document.getElementById('sidebar-progress-fill');
    if (sidebarValue) sidebarValue.textContent = `${stats.percent}%`;
    if (sidebarFill) sidebarFill.style.width = `${stats.percent}%`;

    // Update mobile progress bar
    const mobilePercent = document.getElementById('mobile-progress-percent');
    const mobileFill = document.getElementById('mobile-progress-fill');
    if (mobilePercent) mobilePercent.textContent = `${stats.percent}% Complete`;
    if (mobileFill) mobileFill.style.width = `${stats.percent}%`;

    // Update Weekly Nav items and Bottom Navigation
    document.querySelectorAll('.nav-module-item, .module-nav-btn--next').forEach(item => {
      const moduleNum = parseInt(item.dataset.module, 10);
      if (isNaN(moduleNum)) return;

      const status = progress.modules[moduleNum]?.status || 'locked';
      item.setAttribute('data-status', status);
      
      if (status === 'locked') {
        if (item.classList.contains('module-nav-btn--next')) {
          item.classList.add('module-nav-btn--disabled');
        }
        
        // Remove existing listener if any (to avoid duplicates)
        if (item._lockedHandler) {
          item.removeEventListener('click', item._lockedHandler);
        }
        
        item._lockedHandler = function(e) {
          if (this.getAttribute('data-status') === 'locked') {
            e.preventDefault();
            window.showToast?.('warning', 'Module Locked', 'Complete the current module (including the quiz) to unlock the next one.');
          }
        };
        
        item.addEventListener('click', item._lockedHandler);
      } else {
        if (item.classList.contains('module-nav-btn--next')) {
          item.classList.remove('module-nav-btn--disabled');
        }
        if (item._lockedHandler) {
          item.removeEventListener('click', item._lockedHandler);
          delete item._lockedHandler;
        }
      }
    });

    // Update Week Progress Badges
    document.querySelectorAll('.week-group').forEach(group => {
      const weekId = group.dataset.week;
      const modulesInWeek = group.querySelectorAll('.nav-module-item');
      const completedInWeek = Array.from(modulesInWeek).filter(m => m.getAttribute('data-status') === 'completed').length;
      const totalInWeek = modulesInWeek.length;
      const badge = document.getElementById(`week-${weekId}-progress`);
      if (badge) badge.textContent = `${completedInWeek}/${totalInWeek}`;
    });

    // Update Course Overview page
    const modulesCompleted = document.getElementById('modules-completed');
    const completionPercent = document.getElementById('completion-percent');
    const courseProgressBar = document.getElementById('course-progress-bar');
    const resumeBtn = document.getElementById('resume-learning-btn');

    if (modulesCompleted) modulesCompleted.textContent = stats.completed;
    if (completionPercent) completionPercent.textContent = `${stats.percent}%`;
    if (courseProgressBar) courseProgressBar.style.width = `${stats.percent}%`;

    if (resumeBtn) {
      const allModules = Object.keys(progress.modules).map(Number).sort((a, b) => a - b);
      let nextModuleNum = 1;
      
      // Find first incomplete module that is available
      for (const m of allModules) {
        if (progress.modules[m].status !== 'completed') {
          nextModuleNum = m;
          break;
        }
      }
      
      const isStarted = stats.completed > 0;
      resumeBtn.querySelector('span').textContent = isStarted ? `Resume Module ${nextModuleNum}` : `Start Module ${nextModuleNum}`;
      
      const moduleNumFormatted = nextModuleNum.toString().padStart(2, '0');
      const baseUrl = getCourseBaseUrl();
      const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      resumeBtn.href = `${normalizedBase}module-${moduleNumFormatted}/`;
    }
  }

  // Export/Import/Reset logic remains same...
  function exportProgress() {
    const progress = loadProgress();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learn-${progress.courseId}-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast?.('success', 'Progress Exported', 'Your progress has been downloaded.');
  }

  function importProgress(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          saveProgress(imported);
          updateUI();
          window.showToast?.('success', 'Progress Imported', 'Your progress has been restored.');
          resolve(imported);
        } catch (err) {
          window.showToast?.('error', 'Import Failed', 'Check file format.');
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  }

  function resetProgress() {
    if (confirm('Reset all progress?')) {
      const fresh = createDefaultProgress();
      saveProgress(fresh);
      updateUI();
    }
  }

  function init() {
    const pathMatch = window.location.pathname.match(/module-(\d+)/);
    if (pathMatch) {
      const moduleNum = parseInt(pathMatch[1], 10);
      if (getModuleStatus(moduleNum) === 'available') startModule(moduleNum);
    }
    updateUI();
    window.addEventListener('progressUpdated', () => updateUI());
    document.getElementById('export-progress-btn')?.addEventListener('click', exportProgress);
    const importInput = document.getElementById('import-file-input');
    document.getElementById('import-progress-btn')?.addEventListener('click', () => importInput?.click());

    // Modal actions
    document.getElementById('modal-export-btn')?.addEventListener('click', exportProgress);
    document.getElementById('modal-import-btn')?.addEventListener('click', () => importInput?.click());
    document.getElementById('reset-progress-btn')?.addEventListener('click', resetProgress);
    
    importInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) importProgress(file).then(() => { e.target.value = ''; });
    });
  }

  function getModuleStatus(moduleNum) {
    return loadProgress().modules[moduleNum]?.status || 'locked';
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  window.progressTracker = {
    load: loadProgress,
    save: saveProgress,
    updateModule: updateModuleStatus,
    startModule,
    completeModule,
    calculate: calculateProgress,
    export: exportProgress,
    import: importProgress,
    reset: resetProgress,
    updateUI
  };
})();
