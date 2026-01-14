// Quiz Engine - Handles quiz rendering and scoring
(function() {
  'use strict';

  class QuizEngine {
    constructor(container) {
      this.container = container;
      this.quizPath = container.dataset.quizPath;
      this.dayNum = parseInt(container.dataset.day, 10);
      this.passScore = parseInt(container.dataset.passScore, 10) || 80;
      this.questions = [];
      this.answers = {};
      this.questionResults = {};
      this.isSubmitted = false;
      
      this.init();
    }

    async init() {
      try {
        await this.loadQuiz();
        this.render();
      } catch (error) {
        console.error('Failed to load quiz:', error);
        this.container.innerHTML = `
          <div class="quiz-error">
            <p>Failed to load quiz. Please refresh the page.</p>
          </div>
        `;
      }
    }

    async loadQuiz() {
      const response = await fetch(this.quizPath);
      if (!response.ok) throw new Error('Quiz not found');
      
      const data = await response.json();
      this.questions = data.questions || [];
      this.passScore = data.passScore || this.passScore;
    }

    render() {
      if (this.questions.length === 0) {
        this.container.innerHTML = '<p>No questions available.</p>';
        return;
      }

      let html = `
        <div class="quiz-progress">
          <div class="quiz-progress-info">
            <span class="quiz-progress-text">
              <strong>${this.questions.length}</strong> questions
            </span>
            <span class="quiz-progress-text">
              Pass score: <strong>${this.passScore}%</strong>
            </span>
          </div>
          <div class="quiz-score" id="quiz-running-score"></div>
        </div>
        <div class="quiz-questions">
      `;

      this.questions.forEach((q, index) => {
        html += this.renderQuestion(q, index);
      });

      html += '</div>';
      html += `
        <div class="quiz-results" id="quiz-results" style="display: none;"></div>
      `;

      this.container.innerHTML = html;
      this.bindEvents();
    }

    renderQuestion(question, index) {
      const typeLabel = question.type === 'multiple-select' 
        ? 'Select all that apply' 
        : 'Drag to reorder';

      let html = `
        <div class="quiz-question" data-question-id="${question.id}" data-question-index="${index}">
          <div class="question-header">
            <span class="question-number">${index + 1}</span>
            <div class="question-text">
              ${question.question}
              <div class="question-type">${typeLabel}</div>
            </div>
          </div>
      `;

      if (question.type === 'multiple-select') {
        html += this.renderMultipleSelect(question);
      } else if (question.type === 'drag-order') {
        html += this.renderDragOrder(question);
      }

      html += `
          <div class="question-actions">
            <button class="check-answer-btn" data-question-id="${question.id}">
              Check Answer
            </button>
          </div>
          <div class="question-feedback" id="feedback-${question.id}"></div>
        </div>
      `;

      return html;
    }

    renderMultipleSelect(question) {
      let html = '<div class="question-options">';
      
      question.options.forEach(option => {
        html += `
          <div class="question-option" data-option-id="${option.id}" data-question-id="${question.id}">
            <span class="option-checkbox"></span>
            <span class="option-text">${option.text}</span>
          </div>
        `;
      });
      
      html += '</div>';
      return html;
    }

    renderDragOrder(question) {
      // Shuffle items for display
      const shuffled = [...question.items].sort(() => Math.random() - 0.5);
      
      let html = `
        <div class="drag-drop-container" data-question-id="${question.id}">
          <div class="drag-drop-list">
      `;
      
      shuffled.forEach((item, index) => {
        html += `
          <div class="drag-drop-item" draggable="true" data-item-id="${item.id}">
            <span class="drag-handle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="1.5"></circle>
                <circle cx="15" cy="6" r="1.5"></circle>
                <circle cx="9" cy="12" r="1.5"></circle>
                <circle cx="15" cy="12" r="1.5"></circle>
                <circle cx="9" cy="18" r="1.5"></circle>
                <circle cx="15" cy="18" r="1.5"></circle>
              </svg>
            </span>
            <span class="drag-number">${index + 1}</span>
            <span class="drag-text">${item.text}</span>
          </div>
        `;
      });
      
      html += '</div></div>';
      return html;
    }

    bindEvents() {
      // Multiple select options
      this.container.querySelectorAll('.question-option').forEach(option => {
        option.addEventListener('click', () => this.handleOptionClick(option));
      });

      // Check answer buttons
      this.container.querySelectorAll('.check-answer-btn').forEach(btn => {
        btn.addEventListener('click', () => this.checkAnswer(btn.dataset.questionId));
      });

      // Initialize drag and drop
      this.initDragDrop();
    }

    handleOptionClick(option) {
      const questionId = option.dataset.questionId;
      
      // Check if question already answered
      if (this.questionResults[questionId] !== undefined) return;
      
      option.classList.toggle('is-selected');
      
      // Update answers
      const questionEl = option.closest('.quiz-question');
      const selectedOptions = questionEl.querySelectorAll('.question-option.is-selected');
      this.answers[questionId] = Array.from(selectedOptions).map(o => o.dataset.optionId);
    }

    initDragDrop() {
      const containers = this.container.querySelectorAll('.drag-drop-list');
      
      containers.forEach(container => {
        const questionId = container.closest('.drag-drop-container').dataset.questionId;
        
        // Check if already answered
        if (this.questionResults[questionId] !== undefined) return;

        const items = container.querySelectorAll('.drag-drop-item');
        
        items.forEach(item => {
          item.addEventListener('dragstart', (e) => {
            if (this.questionResults[questionId] !== undefined) {
              e.preventDefault();
              return;
            }
            item.classList.add('is-dragging');
            e.dataTransfer.effectAllowed = 'move';
          });

          item.addEventListener('dragend', () => {
            item.classList.remove('is-dragging');
            this.updateDragNumbers(container);
            this.updateDragAnswer(questionId, container);
          });

          item.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.questionResults[questionId] !== undefined) return;
            
            const dragging = container.querySelector('.is-dragging');
            if (!dragging || dragging === item) return;
            
            const rect = item.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            
            if (e.clientY < midY) {
              container.insertBefore(dragging, item);
            } else {
              container.insertBefore(dragging, item.nextSibling);
            }
          });

          item.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (this.questionResults[questionId] === undefined) {
              item.classList.add('is-over');
            }
          });

          item.addEventListener('dragleave', () => {
            item.classList.remove('is-over');
          });

          item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('is-over');
          });
        });

        // Touch support
        if ('ontouchstart' in window) {
          this.initTouchDrag(container, questionId);
        }
      });
    }

    initTouchDrag(container, questionId) {
      let draggedItem = null;
      let placeholder = null;

      container.querySelectorAll('.drag-drop-item').forEach(item => {
        item.addEventListener('touchstart', (e) => {
          if (this.questionResults[questionId] !== undefined) return;
          
          draggedItem = item;
          item.classList.add('is-dragging');
          
          placeholder = document.createElement('div');
          placeholder.className = 'drag-drop-item is-placeholder';
          placeholder.style.height = `${item.offsetHeight}px`;
        }, { passive: true });

        item.addEventListener('touchmove', (e) => {
          if (!draggedItem || this.questionResults[questionId] !== undefined) return;
          
          const touch = e.touches[0];
          const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
          const targetItem = elementAtPoint?.closest('.drag-drop-item');
          
          if (targetItem && targetItem !== draggedItem && targetItem !== placeholder) {
            const rect = targetItem.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            
            if (touch.clientY < midY) {
              container.insertBefore(draggedItem, targetItem);
            } else {
              container.insertBefore(draggedItem, targetItem.nextSibling);
            }
          }
        }, { passive: true });

        item.addEventListener('touchend', () => {
          if (draggedItem) {
            draggedItem.classList.remove('is-dragging');
            placeholder?.remove();
            this.updateDragNumbers(container);
            this.updateDragAnswer(questionId, container);
            draggedItem = null;
            placeholder = null;
          }
        });
      });
    }

    updateDragNumbers(container) {
      container.querySelectorAll('.drag-drop-item').forEach((item, index) => {
        item.querySelector('.drag-number').textContent = index + 1;
      });
    }

    updateDragAnswer(questionId, container) {
      const items = container.querySelectorAll('.drag-drop-item');
      this.answers[questionId] = Array.from(items).map(item => item.dataset.itemId);
    }

    checkAnswer(questionId) {
      const question = this.questions.find(q => q.id === questionId);
      if (!question) return;

      // Already answered
      if (this.questionResults[questionId] !== undefined) return;

      let isCorrect = false;
      const answer = this.answers[questionId] || [];

      if (question.type === 'multiple-select') {
        const correctIds = question.options.filter(o => o.correct).map(o => o.id);
        isCorrect = correctIds.length === answer.length && 
                    correctIds.every(id => answer.includes(id));
        
        this.showMultipleSelectFeedback(questionId, question, answer);
      } else if (question.type === 'drag-order') {
        // If no answer yet, get current order
        if (answer.length === 0) {
          const container = this.container.querySelector(`.drag-drop-container[data-question-id="${questionId}"]`);
          const items = container.querySelectorAll('.drag-drop-item');
          this.answers[questionId] = Array.from(items).map(item => item.dataset.itemId);
        }
        
        isCorrect = JSON.stringify(this.answers[questionId]) === JSON.stringify(question.correctOrder);
        this.showDragOrderFeedback(questionId, question);
      }

      this.questionResults[questionId] = isCorrect;
      
      // Disable the check button
      const btn = this.container.querySelector(`.check-answer-btn[data-question-id="${questionId}"]`);
      if (btn) {
        btn.disabled = true;
        btn.textContent = isCorrect ? 'Correct!' : 'Incorrect';
      }

      // Show feedback
      this.showFeedback(questionId, question, isCorrect);

      // Check if all questions answered
      if (Object.keys(this.questionResults).length === this.questions.length) {
        this.showResults();
      }

      this.updateRunningScore();
    }

    showMultipleSelectFeedback(questionId, question, selected) {
      const options = this.container.querySelectorAll(`.question-option[data-question-id="${questionId}"]`);
      
      options.forEach(option => {
        const optionId = option.dataset.optionId;
        const optionData = question.options.find(o => o.id === optionId);
        const isSelected = selected.includes(optionId);
        const isCorrect = optionData.correct;
        
        option.classList.add('is-disabled');
        option.classList.remove('is-selected');
        
        if (isSelected && isCorrect) {
          option.classList.add('is-correct');
        } else if (isSelected && !isCorrect) {
          option.classList.add('is-incorrect');
        } else if (!isSelected && isCorrect) {
          option.classList.add('is-correct'); // Show missed correct answers
        }
      });
    }

    showDragOrderFeedback(questionId, question) {
      const container = this.container.querySelector(`.drag-drop-container[data-question-id="${questionId}"]`);
      const items = container.querySelectorAll('.drag-drop-item');
      const currentOrder = Array.from(items).map(item => item.dataset.itemId);
      
      items.forEach((item, index) => {
        item.classList.add('is-disabled');
        const isCorrect = currentOrder[index] === question.correctOrder[index];
        item.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
      });
    }

    showFeedback(questionId, question, isCorrect) {
      const feedbackEl = document.getElementById(`feedback-${questionId}`);
      if (!feedbackEl) return;

      feedbackEl.className = `question-feedback ${isCorrect ? 'question-feedback--correct' : 'question-feedback--incorrect'}`;
      feedbackEl.innerHTML = `
        <div class="feedback-title">
          ${isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
        ${question.explanation ? `<div class="feedback-explanation">${question.explanation}</div>` : ''}
      `;
      feedbackEl.style.display = 'block';
    }

    updateRunningScore() {
      const answered = Object.keys(this.questionResults).length;
      const correct = Object.values(this.questionResults).filter(Boolean).length;
      const scoreEl = document.getElementById('quiz-running-score');
      
      if (scoreEl) {
        const percent = answered > 0 ? Math.round((correct / answered) * 100) : 0;
        const isPassing = percent >= this.passScore;
        scoreEl.className = `quiz-score ${isPassing ? 'quiz-score--passing' : 'quiz-score--failing'}`;
        scoreEl.textContent = `${correct}/${answered} (${percent}%)`;
      }
    }

    showResults() {
      const correct = Object.values(this.questionResults).filter(Boolean).length;
      const total = this.questions.length;
      const percent = Math.round((correct / total) * 100);
      const passed = percent >= this.passScore;

      const resultsEl = document.getElementById('quiz-results');
      if (!resultsEl) return;

      resultsEl.innerHTML = `
        <div class="quiz-results-icon quiz-results-icon--${passed ? 'pass' : 'fail'}">
          ${passed 
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
          }
        </div>
        <h3 class="quiz-results-title quiz-results-title--${passed ? 'pass' : 'fail'}">
          ${passed ? 'Congratulations!' : 'Not Quite'}
        </h3>
        <div class="quiz-results-score">${percent}%</div>
        <p class="quiz-results-message">
          ${passed 
            ? `You passed with ${correct} out of ${total} correct answers!` 
            : `You need ${this.passScore}% to pass. You got ${correct} out of ${total} correct.`
          }
        </p>
        <div class="quiz-results-actions">
          ${!passed ? '<button class="retry-btn" id="retry-quiz-btn">Try Again</button>' : ''}
          ${passed ? `<a href="../day-${String(this.dayNum + 1).padStart(2, '0')}/" class="next-day-btn">Continue to Day ${this.dayNum + 1}</a>` : ''}
        </div>
      `;

      resultsEl.style.display = 'block';

      // Scroll to results
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Handle retry
      document.getElementById('retry-quiz-btn')?.addEventListener('click', () => {
        this.retry();
      });

      // Update progress if passed
      if (passed && window.progressTracker) {
        window.progressTracker.completeDay(this.dayNum, percent);
      }
    }

    retry() {
      this.answers = {};
      this.questionResults = {};
      this.isSubmitted = false;
      this.render();
    }
  }

  // Initialize quizzes on page
  function init() {
    document.querySelectorAll('.quiz-container').forEach(container => {
      new QuizEngine(container);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Expose for external use
  window.QuizEngine = QuizEngine;

})();
