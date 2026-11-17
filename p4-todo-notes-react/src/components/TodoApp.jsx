import { useState } from 'react'
import useLocalStorage from '../useLocalStorage'
import TodoItem from './TodoItem'

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [text, setText] = useState('')
  const [due, setDue] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text: text.trim(), due, completed: false }])
    setText(''); setDue('')
  }
  const toggle = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id))
  const edit = (id, newText) => setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)))

  const visible = todos.filter((t) => filter === 'all' || (filter === 'completed' ? t.completed : !t.completed))

  return (
    <div>
      <form className="row" onSubmit={addTodo}>
        <input className="grow" placeholder="Add a new task" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <button>Add</button>
      </form>
      <div className="row filters">
        {['all', 'completed', 'pending'].map((f) => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <ul className="list">
        {visible.map((t) => <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={remove} onEdit={edit} />)}
      </ul>
      {visible.length === 0 && <p className="empty">No tasks here.</p>}
    </div>
  )
}
