export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note">
      <span className="badge pending">{note.category}</span>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <small>{new Date(note.updatedAt).toLocaleString()}</small>
      <div className="row">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button className="danger" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  )
}
