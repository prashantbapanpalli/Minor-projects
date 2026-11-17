// Shared loading / error display
export default function Status({ status, error }) {
  if (status === 'loading' || status === 'idle') return <p className="center">Loading products...</p>
  if (status === 'error') return <p className="center error">{error}</p>
  return null
}
