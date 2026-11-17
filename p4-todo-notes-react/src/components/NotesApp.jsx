import { useState } from 'react'
import useLocalStorage from '../useLocalStorage'
import NoteCard from './NoteCard'

const empty = { title: '', body: '', category: 'General' }

export default function NotesApp() {
  const [notes, setNotes] = useLocalStorage('notes', [])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const now = new Date().toISOString()
    if (editingId) setNotes(notes.map((n) => (n.id === editingId ? { ...n, ...form, updatedAt: now } : n)))
    else setNotes([{ id: Date.now(), ...form, updatedAt: now }, ...notes])
    setForm(empty); setEditingId(null)
  }
  const startEdit = (note) => { setEditingId(note.id); setForm({ title: note.title, body: note.body, category: note.category }) }
  const remove = (id) => setNotes(notes.filter((n) => n.id !== id))

  const q = search.toLowerCase()
  const visible = notes.filter((n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q))

  return (
    <div>
      <form className="col" onSubmit={submit}>
        <input name="title" placeholder="Title" value={form.title} onChange={change} />
        <textarea name="body" rows="3" placeholder="Write your note..." value={form.body} onChange={change} />
        <div className="row">
          <select name="category" value={form.category} onChange={change}>
            <option>General</option><option>Study</option><option>Work</option><option>Personal</option>
          </select>
          <button>{editingId ? 'Update note' : 'Add note'}</button>
        </div>
      </form>
      <input className="search" placeholder="Search notes" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="notes">
        {visible.map((n) => <NoteCard key={n.id} note={n} onEdit={startEdit} onDelete={remove} />)}
      </div>
      {visible.length === 0 && <p className="empty">No notes found.</p>}
    </div>
  )
}
