import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const save = () => {
    if (text.trim()) { onEdit(todo.id, text.trim()); setEditing(false) }
  }

  return (
    <li className={`item ${todo.completed ? 'done' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      {editing ? (
        <input className="grow" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && save()} />
      ) : (
        <span className="grow">
          {todo.text}
          {todo.due && <small> (due {todo.due})</small>}
        </span>
      )}
      <span className={`badge ${todo.completed ? 'ok' : 'pending'}`}>{todo.completed ? 'Completed' : 'Pending'}</span>
      {editing ? <button onClick={save}>Save</button> : <button onClick={() => setEditing(true)}>Edit</button>}
      <button className="danger" onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}
