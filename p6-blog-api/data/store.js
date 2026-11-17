// Tiny JSON-file storage (no database needed)
const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, 'posts.json')

exports.readPosts = () => JSON.parse(fs.readFileSync(file, 'utf8') || '[]')
exports.writePosts = (posts) => fs.writeFileSync(file, JSON.stringify(posts, null, 2))
