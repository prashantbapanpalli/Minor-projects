const { readPosts, writePosts } = require('../data/store')

exports.createPost = (req, res) => {
  const { title, content, author, category } = req.body
  const posts = readPosts()
  const post = {
    id: posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
    title: title.trim(), content: content.trim(), author: author.trim(), category: category.trim(),
    createdAt: new Date().toISOString(),
  }
  posts.push(post)
  writePosts(posts)
  res.status(201).json(post)
}

exports.getPosts = (req, res) => res.status(200).json(readPosts())

exports.getPost = (req, res) => {
  const post = readPosts().find((p) => p.id === Number(req.params.id))
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.status(200).json(post)
}

exports.updatePost = (req, res) => {
  const posts = readPosts()
  const i = posts.findIndex((p) => p.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'Post not found' })
  for (const f of ['title', 'content', 'author', 'category']) if (req.body[f] !== undefined) posts[i][f] = req.body[f].trim()
  posts[i].updatedAt = new Date().toISOString()
  writePosts(posts)
  res.status(200).json(posts[i])
}

exports.deletePost = (req, res) => {
  const posts = readPosts()
  const i = posts.findIndex((p) => p.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'Post not found' })
  const [removed] = posts.splice(i, 1)
  writePosts(posts)
  res.status(200).json({ message: 'Post deleted', post: removed })
}
