const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const mataInput = document.getElementById('mata-kuliah');
const dueInput = document.getElementById('due-date');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const doneCount = document.getElementById('done-count');
const todoCount = document.getElementById('todo-count');

const filterText = document.getElementById('filter-text');
const paginationEl = document.getElementById('pagination');
const pageSizeSelect = document.getElementById('page-size');
const tabs = document.querySelectorAll('.tab');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentPage = 1;
let currentFilter = 'all'; // 'all' | 'pending' | 'done'

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(name, mata, due) {
  const task = { id: Date.now(), name: name || '', mata: mata || '', due: due || '', completed: false };
  tasks.push(task);
  save();
  currentPage = 1;
  render();
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  save();
  render();
}

function applyFilters(items) {
  const text = (filterText?.value || '').trim().toLowerCase();

  return items.filter(t => {
    // status filter (tabs)
    if (currentFilter === 'pending' && t.completed) return false;
    if (currentFilter === 'done' && !t.completed) return false;

    // text filter
    if (text) {
      const hay = ((t.name || '') + ' ' + (t.mata || '')).toLowerCase();
      if (!hay.includes(text)) return false;
    }

    return true;
  });
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function render() {
  const pageSize = parseInt(pageSizeSelect?.value, 10) || 10;
  const filtered = applyFilters(tasks);

  // counts: total shown, done/todo overall
  taskCount.textContent = filtered.length;
  const done = tasks.filter(t => t.completed).length;
  const todo = tasks.length - done;
  if (doneCount) doneCount.textContent = done;
  if (todoCount) todoCount.textContent = todo;

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  taskList.innerHTML = '';
  if (pageItems.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Tidak ada tugas.';
    taskList.appendChild(li);
  } else {
    for (const t of pageItems) {
      const li = document.createElement('li');
      li.className = 'task-item' + (t.completed ? ' completed' : '');
      const dueText = t.due ? ` (Deadline: ${escapeHtml(t.due)})` : '';

      li.innerHTML = `
        <label class="task-row" style="display:flex;align-items:center;gap:10px;">
          <input type="checkbox" class="toggle-complete" data-id="${t.id}" ${t.completed ? 'checked' : ''}/>
          <span class="task-info"><strong>${escapeHtml(t.name)}</strong> — ${escapeHtml(t.mata)}${dueText}</span>
        </label>
        <div class="task-actions">
          <button class="delete-btn" data-id="${t.id}">Hapus</button>
        </div>
      `;

      taskList.appendChild(li);
    }
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  paginationEl.innerHTML = '';
  const prev = document.createElement('button');
  prev.textContent = 'Prev';
  prev.disabled = currentPage === 1;
  prev.addEventListener('click', () => { currentPage--; render(); });
  paginationEl.appendChild(prev);

  const maxButtons = 7;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener('click', () => { currentPage = i; render(); });
    paginationEl.appendChild(btn);
  }

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = currentPage === totalPages;
  next.addEventListener('click', () => { currentPage++; render(); });
  paginationEl.appendChild(next);
}

// events
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = taskInput.value.trim();
  const mata = mataInput.value.trim();
  const due = dueInput.value || '';
  if (!name && !mata) return;
  addTask(name, mata, due);
  form.reset();
});

taskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = Number(e.target.dataset.id);
    if (confirm('Hapus tugas ini?')) removeTask(id);
    return;
  }
  if (e.target.classList.contains('toggle-complete')) {
    const id = Number(e.target.dataset.id);
    toggleTask(id);
    return;
  }
});

// tab clicks -> status filter
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter || 'all';
    currentPage = 1;
    render();
  });
});

filterText?.addEventListener('input', () => { currentPage = 1; render(); });
pageSizeSelect?.addEventListener('change', () => { currentPage = 1; render(); });

// initial render
render();