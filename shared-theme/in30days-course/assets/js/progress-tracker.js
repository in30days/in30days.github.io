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
  function createDefaultProgress(totalDays = 30) {
    const days = {};
    for (let i = 1; i <= totalDays; i++) {
      days[i] = {
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
      days: days,
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
        return JSON.parse(stored);
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

  // Update day status
  function updateDayStatus(dayNum, status, quizScore = null) {
    const progress = loadProgress();
    if (progress.days[dayNum]) {
      progress.days[dayNum].status = status;
      if (quizScore !== null) {
        progress.days[dayNum].quizScore = quizScore;
        progress.days[dayNum].quizAttempts++;
      }
      if (status === 'completed') {
        progress.days[dayNum].completedAt = new Date().toISOString();
        const nextDay = parseInt(dayNum) + 1;
        if (progress.days[nextDay] && progress.days[nextDay].status === 'locked') {
          progress.days[nextDay].status = 'available';
        }
      }
      saveProgress(progress);
    }
  }

  // Mark day as in progress
  function startDay(dayNum) {
    const progress = loadProgress();
    if (progress.days[dayNum] && progress.days[dayNum].status === 'available') {
      progress.days[dayNum].status = 'in-progress';
      saveProgress(progress);
    }
  }

  // Complete day (after passing quiz)
  function completeDay(dayNum, quizScore) {
    updateDayStatus(dayNum, 'completed', quizScore);
    if (window.showToast) {
      window.showToast('success', 'Day Completed!', `You've completed Day ${dayNum} with a score of ${quizScore}%`);
    }
  }

  // Calculate overall progress
  function calculateProgress() {
    const progress = loadProgress();
    const days = Object.values(progress.days);
    const completed = days.filter(d => d.status === 'completed').length;
    const total = days.length;
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100)
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

    // Update Weekly Nav items
    document.querySelectorAll('.nav-day-item').forEach(item => {
      const dayNum = parseInt(item.dataset.day, 10);
      const status = progress.days[dayNum]?.status || 'locked';
      item.setAttribute('data-status', status);
      
      if (status === 'locked') {
        item.addEventListener('click', function(e) {
          if (this.getAttribute('data-status') === 'locked') {
            e.preventDefault();
            window.showToast?.('warning', 'Day Locked', 'Complete the previous day to unlock this one.');
          }
        }, { once: true });
      }
    });

    // Update Week Progress Badges
    document.querySelectorAll('.week-group').forEach(group => {
      const weekId = group.dataset.week;
      const daysInWeek = group.querySelectorAll('.nav-day-item');
      const completedInWeek = Array.from(daysInWeek).filter(d => d.getAttribute('data-status') === 'completed').length;
      const totalInWeek = daysInWeek.length;
      const badge = document.getElementById(`week-${weekId}-progress`);
      if (badge) badge.textContent = `${completedInWeek}/${totalInWeek}`;
    });

    // Update Course Overview page
    const daysCompleted = document.getElementById('days-completed');
    const completionPercent = document.getElementById('completion-percent');
    const courseProgressBar = document.getElementById('course-progress-bar');
    const resumeBtn = document.getElementById('resume-learning-btn');

    if (daysCompleted) daysCompleted.textContent = stats.completed;
    if (completionPercent) completionPercent.textContent = `${stats.percent}%`;
    if (courseProgressBar) courseProgressBar.style.width = `${stats.percent}%`;

    if (resumeBtn) {
      const allDays = Object.keys(progress.days).map(Number).sort((a, b) => a - b);
      let nextDayNum = 1;
      
      // Find first incomplete day that is available
      for (const d of allDays) {
        if (progress.days[d].status !== 'completed') {
          nextDayNum = d;
          break;
        }
      }
      
      const isStarted = stats.completed > 0;
      resumeBtn.querySelector('span').textContent = isStarted ? `Resume Day ${nextDayNum}` : `Start Day ${nextDayNum}`;
      
      const dayNumFormatted = nextDayNum.toString().padStart(2, '0');
      const baseUrl = getCourseBaseUrl();
      const normalizedBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      resumeBtn.href = `${normalizedBase}day-${dayNumFormatted}/`;
    }
  }

  // Export/Import/Reset logic remains same...
  function exportProgress() {
    const progress = loadProgress();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `in30days-${progress.courseId}-progress-${new Date().toISOString().split('T')[0]}.json`;
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
    const pathMatch = window.location.pathname.match(/day-(\d+)/);
    if (pathMatch) {
      const dayNum = parseInt(pathMatch[1], 10);
      if (getDayStatus(dayNum) === 'available') startDay(dayNum);
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

  function getDayStatus(dayNum) {
    return loadProgress().days[dayNum]?.status || 'locked';
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  window.progressTracker = {
    load: loadProgress,
    save: saveProgress,
    updateDay: updateDayStatus,
    startDay,
    completeDay,
    calculate: calculateProgress,
    export: exportProgress,
    import: importProgress,
    reset: resetProgress,
    updateUI
  };
})();
