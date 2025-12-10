const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// === Панель керування ===
const controls = document.createElement('div')
controls.style.marginTop = '20px'

controls.innerHTML = `
  <button onclick="changeFilter('all')">Усі</button>
  <button onclick="changeFilter('active')">Активні</button>
  <button onclick="changeFilter('completed')">Виконані</button>
  <button onclick="toggleTheme()">🌙 Тема</button>
  <input id="searchInput" placeholder="Пошук..." style="margin-left:10px;">
  <div id="stats" style="margin-top:10px;"></div>
`

list.parentElement.appendChild(controls)
document.getElementById('searchInput').addEventListener('input', render)

// === Дані ===
let todos = JSON.parse(localStorage.getItem('todos')) || []
let filter = 'all'
let darkTheme = localStorage.getItem('theme') === 'dark'

// === ТЕМА (ПРАВИЛЬНА) ===
function toggleTheme() {
  darkTheme = !darkTheme
  localStorage.setItem('theme', darkTheme ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  if (darkTheme) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}


  if (darkTheme) {
    app.style.background = '#121212'
    app.style.color = '#ffffff'

    buttons.forEach(btn => {
      btn.style.background = '#333'
      btn.style.color = '#fff'
      btn.style.border = '1px solid #555'
    })

    inputs.forEach(inp => {
      inp.style.background = '#222'
      inp.style.color = '#fff'
      inp.style.border = '1px solid #555'
    })

  } else {
    app.style.background = '#ffffff'
    app.style.color = '#000000'

    buttons.forEach(btn => {
      btn.style.background = ''
      btn.style.color = ''
      btn.style.border = ''
    })

    inputs.forEach(inp => {
      inp.style.background = ''
      inp.style.color = ''
      inp.style.border = ''
    })
  }

applyTheme()

// === LocalStorage ===
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// === Додавання ===
function newTodo() {
  const text = prompt('Введіть нове TODO:')
  if (!text || text.trim() === '') return

  todos.push({ text, checked: false })
  saveTodos()
  render()
}

// === Видалення ===
function deleteTodo(index) {
  if (!confirm('Видалити це TODO?')) return
  todos.splice(index, 1)
  saveTodos()
  render()
}

// === Редагування ===
function editTodo(index) {
  const newText = prompt('Редагувати:', todos[index].text)
  if (!newText || newText.trim() === '') return
  todos[index].text = newText
  saveTodos()
  render()
}

// === Фільтр ===
function changeFilter(f) {
  filter = f
  render()
}

// === Drag & Drop ===
let draggedIndex = null

function enableDrag(li, index) {
  li.draggable = true

  li.addEventListener('dragstart', () => draggedIndex = index)
  li.addEventListener('dragover', e => e.preventDefault())

  li.addEventListener('drop', () => {
    const temp = todos[draggedIndex]
    todos[draggedIndex] = todos[index]
    todos[index] = temp
    saveTodos()
    render()
  })
}

// === Рендер ===
function render() {
  list.innerHTML = ''
  const searchValue = document.getElementById('searchInput').value.toLowerCase()
  let uncheckedCount = 0

  let filteredTodos = todos
    .filter(todo => filter === 'active' ? !todo.checked : filter === 'completed' ? todo.checked : true)
    .filter(todo => todo.text.toLowerCase().includes(searchValue))

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li')
    li.className = classNames.TODO_ITEM
    enableDrag(li, index)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.checked

    checkbox.onchange = () => {
      todo.checked = checkbox.checked
      saveTodos()
      render()
    }

    const span = document.createElement('span')
    span.textContent = todo.text

    if (todo.checked) {
      span.style.textDecoration = 'line-through'
      span.style.opacity = '0.5'
    }

    span.ondblclick = () => editTodo(todos.indexOf(todo))

    const btn = document.createElement('button')
    btn.textContent = 'Delete'
    btn.onclick = () => deleteTodo(todos.indexOf(todo))

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(btn)
    list.appendChild(li)

    if (!todo.checked) uncheckedCount++
  })

  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = uncheckedCount

  document.getElementById('stats').innerHTML =
    `✅ Виконано: ${todos.filter(t => t.checked).length} / ${todos.length}`
}

// === Старт ===
render()
