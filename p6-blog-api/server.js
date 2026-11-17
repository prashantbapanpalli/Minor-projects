const express = require('express')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()
app.use(express.json())                                   // parse JSON bodies
app.use((req, res, next) => { console.log(req.method, req.url); next() }) // simple logger middleware
app.use('/posts', require('./routes/postRoutes'))
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Blog API running on http://localhost:${PORT}`))
