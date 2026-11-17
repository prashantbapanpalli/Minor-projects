const router = require('express').Router()
const c = require('../controllers/postController')
const validate = require('../middleware/validatePost')

router.post('/', validate(false), c.createPost)
router.get('/', c.getPosts)
router.get('/:id', c.getPost)
router.put('/:id', validate(true), c.updatePost)
router.delete('/:id', c.deletePost)

module.exports = router
