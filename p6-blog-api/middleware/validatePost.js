// Validates the body of POST (all fields required) and PUT (any field, but not empty)
module.exports = (isUpdate) => (req, res, next) => {
  const fields = ['title', 'content', 'author', 'category']
  const body = req.body || {}
  const given = fields.filter((f) => body[f] !== undefined)

  if (isUpdate && given.length === 0) return res.status(400).json({ error: 'Send at least one field to update' })
  const missing = isUpdate ? [] : fields.filter((f) => !body[f])
  const empty = given.filter((f) => typeof body[f] !== 'string' || !body[f].trim())

  if (missing.length || empty.length) {
    return res.status(400).json({ error: 'Validation failed', missing, invalid: empty })
  }
  next()
}
