const express = require('express')
const blogController = require('../controller/blogs')
const router = express.Router()

router.post('/create',blogController.createBlog)
router.get('/',blogController.getAllBlogs)
router.get('/:id',blogController.getBlogById)
router.put('/edit/:id',blogController.editBlog)

module.exports = router