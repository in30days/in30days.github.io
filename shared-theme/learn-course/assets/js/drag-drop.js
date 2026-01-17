// Drag and Drop Utilities
// Provides enhanced drag-drop functionality for quiz ordering questions

(function() {
  'use strict';

  // Touch polyfill for drag and drop
  class TouchDragDrop {
    constructor(container, options = {}) {
      this.container = container;
      this.options = {
        itemSelector: '.drag-drop-item',
        handleSelector: '.drag-handle',
        draggingClass: 'is-dragging',
        overClass: 'is-over',
        disabledClass: 'is-disabled',
        onOrderChange: null,
        ...options
      };

      this.draggedItem = null;
      this.placeholder = null;
      this.startY = 0;
      this.startIndex = 0;

      this.init();
    }

    init() {
      const items = this.container.querySelectorAll(this.options.itemSelector);
      
      items.forEach((item, index) => {
        // Mouse events (for non-touch devices)
        item.addEventListener('mousedown', (e) => this.handleDragStart(e, item, index));
        
        // Touch events
        item.addEventListener('touchstart', (e) => this.handleTouchStart(e, item, index), { passive: false });
        item.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        item.addEventListener('touchend', (e) => this.handleTouchEnd(e));
      });

      // Global mouse events
      document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    handleDragStart(e, item, index) {
      if (item.classList.contains(this.options.disabledClass)) return;
      
      // Only start drag from handle if specified
      if (this.options.handleSelector) {
        const handle = item.querySelector(this.options.handleSelector);
        if (handle && !handle.contains(e.target)) return;
      }

      e.preventDefault();
      this.startDrag(item, index, e.clientY);
    }

    handleTouchStart(e, item, index) {
      if (item.classList.contains(this.options.disabledClass)) return;
      
      // Only start drag from handle if specified
      if (this.options.handleSelector) {
        const handle = item.querySelector(this.options.handleSelector);
        if (handle && !handle.contains(e.target)) return;
      }

      const touch = e.touches[0];
      this.startDrag(item, index, touch.clientY);
    }

    startDrag(item, index, y) {
      this.draggedItem = item;
      this.startY = y;
      this.startIndex = index;

      item.classList.add(this.options.draggingClass);

      // Create placeholder
      this.placeholder = document.createElement('div');
      this.placeholder.className = `${this.options.itemSelector.slice(1)} is-placeholder`;
      this.placeholder.style.height = `${item.offsetHeight}px`;
      this.placeholder.style.opacity = '0.3';
      this.placeholder.style.border = '2px dashed var(--border-color)';
      this.placeholder.style.background = 'transparent';
    }

    handleMouseMove(e) {
      if (!this.draggedItem) return;
      this.moveDrag(e.clientY);
    }

    handleTouchMove(e) {
      if (!this.draggedItem) return;
      e.preventDefault();
      const touch = e.touches[0];
      this.moveDrag(touch.clientY);
    }

    moveDrag(y) {
      const items = Array.from(this.container.querySelectorAll(this.options.itemSelector));
      const draggedIndex = items.indexOf(this.draggedItem);
      
      // Find target position
      for (let i = 0; i < items.length; i++) {
        if (items[i] === this.draggedItem) continue;
        
        const rect = items[i].getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        
        if (y < midY && i < draggedIndex) {
          this.container.insertBefore(this.draggedItem, items[i]);
          break;
        } else if (y > midY && i > draggedIndex) {
          this.container.insertBefore(this.draggedItem, items[i].nextSibling);
          break;
        }
      }

      // Update visual numbers
      this.updateNumbers();
    }

    handleMouseUp(e) {
      this.endDrag();
    }

    handleTouchEnd(e) {
      this.endDrag();
    }

    endDrag() {
      if (!this.draggedItem) return;

      this.draggedItem.classList.remove(this.options.draggingClass);
      this.placeholder?.remove();

      const items = Array.from(this.container.querySelectorAll(this.options.itemSelector));
      const newIndex = items.indexOf(this.draggedItem);

      if (newIndex !== this.startIndex && this.options.onOrderChange) {
        const order = items.map(item => item.dataset.itemId);
        this.options.onOrderChange(order);
      }

      this.draggedItem = null;
      this.placeholder = null;
    }

    updateNumbers() {
      const items = this.container.querySelectorAll(this.options.itemSelector);
      items.forEach((item, index) => {
        const numberEl = item.querySelector('.drag-number');
        if (numberEl) {
          numberEl.textContent = index + 1;
        }
      });
    }

    getOrder() {
      const items = this.container.querySelectorAll(this.options.itemSelector);
      return Array.from(items).map(item => item.dataset.itemId);
    }

    disable() {
      const items = this.container.querySelectorAll(this.options.itemSelector);
      items.forEach(item => {
        item.classList.add(this.options.disabledClass);
        item.setAttribute('draggable', 'false');
      });
    }

    enable() {
      const items = this.container.querySelectorAll(this.options.itemSelector);
      items.forEach(item => {
        item.classList.remove(this.options.disabledClass);
        item.setAttribute('draggable', 'true');
      });
    }
  }

  // Utility function to shuffle array
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Check if arrays are equal
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  // Expose utilities
  window.TouchDragDrop = TouchDragDrop;
  window.dragDropUtils = {
    shuffleArray,
    arraysEqual
  };

})();
