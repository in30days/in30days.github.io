// Focus Reading Mode
(function() {
  'use strict';

  const STORAGE_KEY = 'in30days_focus_settings';
  
  let isActive = false;
  let isSepia = false;
  let isLineHighlight = false;
  let fontSize = 'normal'; // small, normal, large, xlarge

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sepia: isSepia,
      lineHighlight: isLineHighlight,
      fontSize: fontSize
    }));
  }

  function toggleFocusMode() {
    isActive = !isActive;
    
    const appContainer = document.querySelector('.app-container');
    const controls = document.getElementById('focus-mode-controls');
    const focusBtn = document.getElementById('focus-mode-btn');
    const lineHighlight = document.getElementById('focus-line-highlight');
    
    if (appContainer) {
      appContainer.setAttribute('data-focus-mode', isActive);
      appContainer.setAttribute('data-sepia', isSepia);
      appContainer.setAttribute('data-font-size', fontSize);
    }
    
    if (controls) {
      controls.style.display = isActive ? 'block' : 'none';
    }
    
    if (focusBtn) {
      focusBtn.classList.toggle('is-active', isActive);
    }
    
    if (lineHighlight && isLineHighlight) {
      lineHighlight.style.display = isActive ? 'block' : 'none';
    }

    if (isActive) {
      initLineHighlight();
      updateControlStates();
    } else {
      if (lineHighlight) lineHighlight.style.display = 'none';
    }
  }

  function toggleSepia() {
    isSepia = !isSepia;
    const appContainer = document.querySelector('.app-container');
    const sepiaBtn = document.getElementById('focus-sepia-toggle');
    
    if (appContainer) {
      appContainer.setAttribute('data-sepia', isSepia);
    }
    
    if (sepiaBtn) {
      sepiaBtn.classList.toggle('is-active', isSepia);
    }
    
    saveSettings();
  }

  function toggleLineHighlight() {
    isLineHighlight = !isLineHighlight;
    const lineHighlight = document.getElementById('focus-line-highlight');
    const highlightBtn = document.getElementById('focus-highlight-toggle');
    
    if (lineHighlight) {
      lineHighlight.style.display = (isActive && isLineHighlight) ? 'block' : 'none';
    }
    
    if (highlightBtn) {
      highlightBtn.classList.toggle('is-active', isLineHighlight);
    }
    
    if (isLineHighlight && isActive) {
      initLineHighlight();
    }
    
    saveSettings();
  }

  function changeFontSize(direction) {
    const sizes = ['small', 'normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    
    if (direction === 'increase' && currentIndex < sizes.length - 1) {
      fontSize = sizes[currentIndex + 1];
    } else if (direction === 'decrease' && currentIndex > 0) {
      fontSize = sizes[currentIndex - 1];
    }
    
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.setAttribute('data-font-size', fontSize);
    }
    
    saveSettings();
  }

  function initLineHighlight() {
    const lineHighlight = document.getElementById('focus-line-highlight');
    if (!lineHighlight || !isLineHighlight) return;

    function updatePosition(e) {
      if (!isActive || !isLineHighlight) return;
      
      const y = e.clientY || (e.touches && e.touches[0].clientY);
      if (y !== undefined) {
        lineHighlight.style.top = `${y - 24}px`;
      }
    }

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('touchmove', updatePosition);
  }

  function updateControlStates() {
    const sepiaBtn = document.getElementById('focus-sepia-toggle');
    const highlightBtn = document.getElementById('focus-highlight-toggle');
    
    if (sepiaBtn) sepiaBtn.classList.toggle('is-active', isSepia);
    if (highlightBtn) highlightBtn.classList.toggle('is-active', isLineHighlight);
  }

  function exitFocusMode() {
    if (isActive) {
      toggleFocusMode();
    }
  }

  function init() {
    // Load saved settings
    const saved = getSettings();
    isSepia = saved.sepia || false;
    isLineHighlight = saved.lineHighlight || false;
    fontSize = saved.fontSize || 'normal';

    // Focus mode button in header
    const focusModeBtn = document.getElementById('focus-mode-btn');
    if (focusModeBtn) {
      focusModeBtn.addEventListener('click', toggleFocusMode);
    }

    // Exit button
    const exitBtn = document.getElementById('focus-exit-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', exitFocusMode);
    }

    // Sepia toggle
    const sepiaBtn = document.getElementById('focus-sepia-toggle');
    if (sepiaBtn) {
      sepiaBtn.addEventListener('click', toggleSepia);
    }

    // Line highlight toggle
    const highlightBtn = document.getElementById('focus-highlight-toggle');
    if (highlightBtn) {
      highlightBtn.addEventListener('click', toggleLineHighlight);
    }

    // Font size controls
    const fontIncrease = document.getElementById('focus-font-increase');
    const fontDecrease = document.getElementById('focus-font-decrease');
    
    if (fontIncrease) {
      fontIncrease.addEventListener('click', () => changeFontSize('increase'));
    }
    
    if (fontDecrease) {
      fontDecrease.addEventListener('click', () => changeFontSize('decrease'));
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // F key to toggle focus mode (when not typing)
      if (e.key === 'f' || e.key === 'F') {
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === 'INPUT' || 
                         activeElement.tagName === 'TEXTAREA' ||
                         activeElement.isContentEditable;
        
        if (!isTyping) {
          e.preventDefault();
          toggleFocusMode();
        }
      }
      
      // Escape to exit focus mode
      if (e.key === 'Escape' && isActive) {
        exitFocusMode();
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
  window.focusMode = {
    toggle: toggleFocusMode,
    exit: exitFocusMode,
    isActive: () => isActive
  };

})();
