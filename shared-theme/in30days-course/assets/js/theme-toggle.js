// Theme Toggle - Dark/Light Mode
(function() {
  'use strict';

  const STORAGE_KEY = 'in30days_theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Update toggle button icons
    const sunIcon = document.querySelector('#theme-toggle .icon-sun');
    const moonIcon = document.querySelector('#theme-toggle .icon-moon');
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
      moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
    }

    // Update Giscus theme if present
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
      giscusFrame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app'
      );
    }

    // Update Mermaid theme
    if (window.mermaid) {
      mermaid.initialize({
        theme: theme === 'dark' ? 'dark' : 'default'
      });
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function init() {
    // Set initial theme
    setTheme(getPreferredTheme());

    // Toggle button click handler
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    // Theme select in settings modal
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.value = localStorage.getItem(STORAGE_KEY) || 'system';
      
      themeSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === 'system') {
          localStorage.removeItem(STORAGE_KEY);
          setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        } else {
          setTheme(value);
        }
      });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Expose for external use
  window.themeToggle = {
    set: setTheme,
    toggle: toggleTheme,
    get: () => document.documentElement.getAttribute('data-theme')
  };

})();
