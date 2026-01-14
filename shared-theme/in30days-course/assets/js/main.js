// Main JavaScript Entry Point
(function() {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar || !sidebarToggle) return;

    function toggleSidebar() {
      const isOpen = sidebar.classList.toggle('is-open');
      sidebarOverlay?.classList.toggle('is-visible', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeSidebar() {
      sidebar.classList.remove('is-open');
      sidebarOverlay?.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeSidebar();
    });
  }

  function initSettingsModal() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const modalBackdrop = document.getElementById('settings-modal-backdrop');
    const modalClose = document.getElementById('settings-modal-close');

    if (!settingsBtn || !settingsModal) return;

    function openModal() {
      settingsModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      settingsModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    settingsBtn.addEventListener('click', openModal);
    modalBackdrop?.addEventListener('click', closeModal);
    modalClose?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && settingsModal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  function initWeeklyNav() {
    const weeklyNav = document.getElementById('weekly-nav');
    if (!weeklyNav) return;

    const headers = weeklyNav.querySelectorAll('.week-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', !isExpanded);
      });
    });

    // Auto-expand current day's week
    const activeItem = weeklyNav.querySelector('.nav-day-item.active');
    if (activeItem) {
      const parentHeader = activeItem.closest('.week-group')?.querySelector('.week-header');
      if (parentHeader) parentHeader.setAttribute('aria-expanded', 'true');
    } else {
      headers[0]?.setAttribute('aria-expanded', 'true');
    }
  }

  function initMobileProgressNav() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => sidebarToggle?.click());
    }
  }

  function initObjectives() {
    document.querySelectorAll('.objective-checkbox').forEach((checkbox, index) => {
      const dayMatch = window.location.pathname.match(/day-(\d+)/);
      if (dayMatch) {
        const storageKey = `in30days_objectives_day${dayMatch[1]}`;
        const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
        if (saved[index]) checkbox.setAttribute('data-checked', 'true');
      }

      checkbox.addEventListener('click', () => {
        const isChecked = checkbox.getAttribute('data-checked') === 'true';
        checkbox.setAttribute('data-checked', !isChecked);
        const dayMatch = window.location.pathname.match(/day-(\d+)/);
        if (dayMatch) {
          const storageKey = `in30days_objectives_day${dayMatch[1]}`;
          const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
          saved[index] = !isChecked;
          localStorage.setItem(storageKey, JSON.stringify(saved));
        }
      });
    });
  }

  window.showToast = function(type, title, message, duration = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || ''}</span>
      <div class="toast-content"><div class="toast-title">${title}</div>${message ? `<div class="toast-message">${message}</div>` : ''}</div>
      <button class="toast-close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`;
    container.appendChild(toast);
    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    if (duration > 0) setTimeout(() => { toast.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); }, duration);
  };

  function initReadingProgress() {
    const ring = document.querySelector('.progress-ring-fill');
    const text = document.querySelector('.progress-ring-text');
    if (!ring || !text) return;
    window.updateHeaderProgress = function(percent) {
      const circ = 2 * Math.PI * 15.9155;
      ring.style.strokeDasharray = `${(percent / 100) * circ}, ${circ}`;
      text.textContent = `${Math.round(percent)}%`;
    };
  }

  ready(function() {
    initSidebar();
    initSettingsModal();
    initWeeklyNav();
    initMobileProgressNav();
    initObjectives();
    initReadingProgress();
    console.log('in30days initialized');
  });
})();
