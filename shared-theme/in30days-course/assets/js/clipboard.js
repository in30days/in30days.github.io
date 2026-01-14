// Clipboard - Copy to clipboard functionality for code blocks
(function() {
  'use strict';

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function createCopyButton() {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy</span>
    `;
    return button;
  }

  function handleCopy(button, codeBlock) {
    // Get the code text
    const code = codeBlock.querySelector('code');
    const text = code ? code.textContent : codeBlock.textContent;
    
    copyToClipboard(text.trim())
      .then(() => {
        // Show success state
        button.classList.add('copied');
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        window.showToast?.('error', 'Copy Failed', 'Unable to copy to clipboard');
      });
  }

  function init() {
    // Add copy button to all code blocks in prose
    document.querySelectorAll('.prose pre').forEach(pre => {
      // Skip if already has a copy button
      if (pre.querySelector('.copy-btn')) return;
      
      // Wrap in relative container if needed
      if (getComputedStyle(pre).position === 'static') {
        pre.style.position = 'relative';
      }
      
      const button = createCopyButton();
      button.addEventListener('click', () => handleCopy(button, pre));
      pre.appendChild(button);
    });

    // Handle code-file shortcode copy buttons
    document.querySelectorAll('.code-file-copy').forEach(button => {
      button.addEventListener('click', () => {
        const codeFile = button.closest('.code-file');
        const pre = codeFile?.querySelector('pre');
        if (pre) {
          handleCopy(button, pre);
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Re-initialize on dynamic content (for SPAs or dynamically loaded content)
  window.initClipboard = init;

  // Expose copy function
  window.copyToClipboard = copyToClipboard;

})();
