// server/api/posts.js
import express from 'express'
import Post from '../models/Post.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/posts/:id - Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name')

    if (!post) return res.status(404).json({ message: 'Post not found' })

    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/posts - Create post (protected)
router.post('/', protect, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.user._id
    })
    await post.save()
    await post.populate('author', 'name').populate('category', 'name')
    res.status(201).json(post)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
})

// PUT /api/posts/:id - Update post (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('author', 'name')
      .populate('category', 'name')

    if (!post) return res.status(404).json({ message: 'Post not found' })

    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/posts/:id - Delete post (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post not found' })

    res.json({ message: 'Post deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router