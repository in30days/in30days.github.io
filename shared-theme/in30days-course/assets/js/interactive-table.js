// Interactive Table - Sortable and searchable tables
(function() {
  'use strict';

  class InteractiveTable {
    constructor(container) {
      this.container = container;
      this.table = container.querySelector('table');
      this.searchInput = container.querySelector('.table-search input');
      this.originalRows = [];
      this.sortColumn = null;
      this.sortDirection = 'asc';
      
      this.init();
    }

    init() {
      if (!this.table) return;
      
      // Store original rows
      const tbody = this.table.querySelector('tbody');
      if (tbody) {
        this.originalRows = Array.from(tbody.querySelectorAll('tr'));
      }
      
      // Make headers sortable
      this.initSorting();
      
      // Initialize search
      this.initSearch();
    }

    initSorting() {
      const headers = this.table.querySelectorAll('th');
      
      headers.forEach((th, index) => {
        // Add sort icon
        const sortIcon = document.createElement('span');
        sortIcon.className = 'sort-icon';
        sortIcon.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
          </svg>
        `;
        th.appendChild(sortIcon);
        
        th.addEventListener('click', () => this.sortByColumn(index, th));
      });
    }

    sortByColumn(columnIndex, th) {
      // Toggle direction if same column
      if (this.sortColumn === columnIndex) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = columnIndex;
        this.sortDirection = 'asc';
      }
      
      // Update header styles
      this.table.querySelectorAll('th').forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
      });
      th.classList.add(`sorted-${this.sortDirection}`);
      
      // Sort rows
      const tbody = this.table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      
      rows.sort((a, b) => {
        const aValue = this.getCellValue(a, columnIndex);
        const bValue = this.getCellValue(b, columnIndex);
        
        // Try numeric comparison first
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return this.sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
      
      // Reorder DOM
      rows.forEach(row => tbody.appendChild(row));
    }

    getCellValue(row, columnIndex) {
      const cell = row.querySelectorAll('td')[columnIndex];
      return cell?.textContent?.trim() || '';
    }

    initSearch() {
      if (!this.searchInput) return;
      
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterRows(query);
      });
    }

    filterRows(query) {
      const tbody = this.table.querySelector('tbody');
      
      if (!query) {
        // Show all rows
        this.originalRows.forEach(row => {
          row.style.display = '';
          tbody.appendChild(row);
        });
        this.updateFooter(this.originalRows.length, this.originalRows.length);
        return;
      }
      
      let visibleCount = 0;
      
      this.originalRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(query);
        row.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
      
      this.updateFooter(visibleCount, this.originalRows.length);
    }

    updateFooter(visible, total) {
      const footer = this.container.querySelector('.interactive-table-footer');
      if (footer) {
        footer.textContent = `Showing ${visible} of ${total} rows`;
      }
    }
  }

  function init() {
    document.querySelectorAll('.interactive-table-container').forEach(container => {
      new InteractiveTable(container);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // Expose for dynamic content
  window.InteractiveTable = InteractiveTable;
  window.initInteractiveTables = init;

})();
