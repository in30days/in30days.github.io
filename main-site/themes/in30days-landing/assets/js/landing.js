// Landing Page JavaScript
(function() {
  'use strict';

  // Theme toggle
  const STORAGE_KEY = 'in30days_theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Update all theme toggle icons (desktop and mobile)
    document.querySelectorAll('.icon-sun').forEach(icon => {
      icon.style.display = theme === 'dark' ? 'none' : 'block';
    });
    document.querySelectorAll('.icon-moon').forEach(icon => {
      icon.style.display = theme === 'dark' ? 'block' : 'none';
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Bind toggle buttons (desktop and mobile)
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('mobile-theme-toggle')?.addEventListener('click', toggleTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.landing-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Mobile Menu Toggle
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('is-nav-open');
      const isOpen = document.body.classList.contains('is-nav-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when overlay is clicked
    overlay?.addEventListener('click', () => {
      document.body.classList.remove('is-nav-open');
      document.body.style.overflow = '';
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('is-nav-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Filtering logic
  function initFilters() {
    const cards = document.querySelectorAll('.course-card');
    const difficultyFilters = document.querySelectorAll('#filter-difficulty .filter-btn');
    const typeFilters = document.querySelectorAll('#filter-type .filter-btn');
    
    let currentDifficulty = 'beginner'; // Default filter
    let currentType = 'all';

    function applyFilters() {
      cards.forEach(card => {
        const difficulty = card.dataset.difficulty;
        const type = card.dataset.type;
        
        const difficultyMatch = currentDifficulty === 'all' || difficulty === currentDifficulty;
        const typeMatch = currentType === 'all' || type === currentType;
        
        if (difficultyMatch && typeMatch) {
          card.style.display = 'flex';
          // Re-trigger observer for visible cards
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    }

    difficultyFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        difficultyFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.value;
        applyFilters();
      });
    });

    typeFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        typeFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.dataset.value;
        applyFilters();
      });
    });

    // Run initial filter (Beginner default)
    applyFilters();
  }

  // Privacy Settings logic
  function initPrivacySettings() {
    const saveBtn = document.getElementById('save-privacy-settings');
    const statusMsg = document.getElementById('privacy-save-status');
    const checkboxes = document.querySelectorAll('.consent-checkbox');
    const SETTINGS_KEY = 'in30days_privacy_settings';

    if (!saveBtn) return;

    // Load current settings
    const currentSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{"essential": true, "sync": true, "analytics": true}');
    
    checkboxes.forEach(cb => {
      const type = cb.dataset.consent;
      cb.checked = currentSettings[type] !== false; // Default to true if not set
    });

    saveBtn.addEventListener('click', () => {
      const newSettings = { essential: true };
      checkboxes.forEach(cb => {
        newSettings[cb.dataset.consent] = cb.checked;
      });
      
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      
      // Notify other parts of the app
      window.dispatchEvent(new CustomEvent('privacySettingsChanged', { detail: newSettings }));

      // Show success message
      statusMsg.style.display = 'inline';
      setTimeout(() => { statusMsg.style.display = 'none'; }, 3000);
    });
  }

  // Cookie Banner
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const CONSENT_KEY = 'in30days_cookie_consent';
    const SETTINGS_KEY = 'in30days_privacy_settings';

    if (!banner) return;

    if (localStorage.getItem(CONSENT_KEY)) {
      banner.style.display = 'none';
      return;
    }

    acceptBtn?.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      // If they accept all, ensure all settings are true
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({"essential": true, "sync": true, "analytics": true}));
      banner.style.display = 'none';
    });

    declineBtn?.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'declined');
      // If they decline, set optional to false
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({"essential": true, "sync": false, "analytics": false}));
      banner.style.display = 'none';
      window.dispatchEvent(new CustomEvent('privacySettingsChanged', { detail: { essential: true, sync: false, analytics: false } }));
    });
  }

  // Initialize
  initMobileMenu();
  initFilters();
  initPrivacySettings();
  initCookieBanner();

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe course cards and feature cards
  document.querySelectorAll('.course-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

})();
