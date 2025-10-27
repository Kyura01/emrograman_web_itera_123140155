// Task Management Class
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  async save() {
    return new Promise((resolve) => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      resolve();
    });
  }

  async addTask(name, mata, due) {
    const task = {
      id: Date.now(),
      name: name || '',
      mata: mata || '',
      due: due || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    await this.save();
    return task;
  }

  async removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.save();
  }

  async toggleTask(id) {
    const task = this.tasks.find(x => x.id === id);
    if (!task) return null;
    task.completed = !task.completed;
    await this.save();
    return task;
  }

  getTasks() {
    return [...this.tasks];
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed
    };
  }
}

// UI Elements
const elements = {
  form: document.getElementById('task-form'),
  taskInput: document.getElementById('task-input'),
  mataInput: document.getElementById('mata-kuliah'),
  dueInput: document.getElementById('due-date'),
  taskList: document.getElementById('task-list'),
  taskCount: document.getElementById('task-count'),
  doneCount: document.getElementById('done-count'),
  todoCount: document.getElementById('todo-count'),
  filterText: document.getElementById('filter-text'),
  paginationEl: document.getElementById('pagination'),
  pageSizeSelect: document.getElementById('page-size'),
  tabs: document.querySelectorAll('.tab')
};

// Initialize TaskManager and state
const taskManager = new TaskManager();
let currentPage = 1;
let currentFilter = 'all'; // 'all' | 'pending' | 'done'

// UI Helper Class
class UI {
  static escapeHtml = s => String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);

  static applyFilters = (items, filterText, currentFilter) => {
    const text = (filterText?.value || '').trim().toLowerCase();

    return items.filter(t => {
      if (currentFilter === 'pending' && t.completed) return false;
      if (currentFilter === 'done' && !t.completed) return false;

      if (text) {
        const searchText = `${t.name} ${t.mata}`.toLowerCase();
        return searchText.includes(text);
      }
      return true;
    });
  }

  static async render() {
    const pageSize = parseInt(elements.pageSizeSelect?.value, 10) || 10;
    const tasks = taskManager.getTasks();
    const filtered = this.applyFilters(tasks, elements.filterText, currentFilter);
    const stats = taskManager.getStats();

    // Update statistics
    elements.taskCount.textContent = stats.total;
    elements.doneCount.textContent = stats.completed;
    elements.todoCount.textContent = stats.pending;

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    // Render task list
    elements.taskList.innerHTML = pageItems.length === 0 
      ? '<li>Tidak ada tugas.</li>'
      : pageItems.map(task => this.renderTaskItem(task)).join('');

    this.renderPagination(totalPages);
  }

  static renderTaskItem(task) {
    const { id, name, mata, due, completed } = task;
    const dueText = due ? ` (Deadline: ${this.escapeHtml(due)})` : '';
    
    return `
      <li class="task-item${completed ? ' completed' : ''}">
        <label class="task-row" style="display:flex;align-items:center;gap:10px;">
          <input type="checkbox" class="toggle-complete" data-id="${id}" ${completed ? 'checked' : ''}/>
          <span class="task-info">
            <strong>${this.escapeHtml(name)}</strong> — ${this.escapeHtml(mata)}${dueText}
          </span>
        </label>
        <div class="task-actions">
          <button class="delete-btn" data-id="${id}">Hapus</button>
        </div>
      </li>
    `;
  }

  static renderPagination(totalPages) {
    const maxButtons = 7;
    const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(totalPages, start + maxButtons - 1);

    const buttons = [
      `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">Prev</button>`
    ];

    for (let i = start; i <= end; i++) {
      buttons.push(`
        <button ${i === currentPage ? 'disabled' : ''} data-page="${i}">
          ${i}
        </button>
      `);
    }

    buttons.push(`
      <button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
        Next
      </button>
    `);

    elements.paginationEl.innerHTML = buttons.join('');
  }
}

// Event Handlers
const setupEventListeners = () => {
  // Form submission
  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = elements.taskInput.value.trim();
    const mata = elements.mataInput.value.trim();
    const due = elements.dueInput.value || '';
    
    if (!name && !mata) return;
    
    try {
      await taskManager.addTask(name, mata, due);
      elements.form.reset();
      currentPage = 1;
      await UI.render();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  });

  // Task list interactions
  elements.taskList.addEventListener('click', async (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    try {
      if (e.target.classList.contains('delete-btn')) {
        if (confirm('Hapus tugas ini?')) {
          await taskManager.removeTask(id);
          await UI.render();
        }
      } else if (e.target.classList.contains('toggle-complete')) {
        await taskManager.toggleTask(id);
        await UI.render();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  });

  // Filter tabs
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      elements.tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter || 'all';
      currentPage = 1;
      await UI.render();
    });
  });

  // Search and pagination
  elements.filterText?.addEventListener('input', async () => {
    currentPage = 1;
    await UI.render();
  });

  elements.pageSizeSelect?.addEventListener('change', async () => {
    currentPage = 1;
    await UI.render();
  });

  elements.paginationEl.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
      currentPage = parseInt(e.target.dataset.page, 10);
      await UI.render();
    }
  });
};

// Theme management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.initTheme();
    this.setupThemeToggle();
  }

  initTheme() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  setupThemeToggle() {
    this.themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add rotation animation to the icon
      const icon = this.themeToggle.querySelector('svg');
      icon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 500);
    });
  }
}

// Initialize the application
const init = async () => {
  new ThemeManager();
  setupEventListeners();
  await UI.render();
};

// Start the application
init();