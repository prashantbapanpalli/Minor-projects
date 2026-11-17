import { useState } from 'react'
import TodoApp from './components/TodoApp'
import NotesApp from './components/NotesApp'

export default function App() {
  const [tab, setTab] = useState('todo')
  return (
    <div className="container">
      <h1>My Productivity Apps</h1>
      <div className="tabs">
        <button className={tab === 'todo' ? 'active' : ''} onClick={() => setTab('todo')}>To-Do App</button>
        <button className={tab === 'notes' ? 'active' : ''} onClick={() => setTab('notes')}>Notes App</button>
      </div>
      {tab === 'todo' ? <TodoApp /> : <NotesApp />}
      <footer>Minor Project 04 - B Prashant</footer>
    </div>
  )
}
