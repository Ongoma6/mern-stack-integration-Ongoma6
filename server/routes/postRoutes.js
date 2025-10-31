import express from 'express'
import { getPosts, createPost } from '../controllers/postController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Public route
router.get('/', getPosts)

// Protected route
router.post('/', protect, createPost)

export default router