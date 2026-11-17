exports.notFound = (req, res) => res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` })

exports.errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body' })
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
}
