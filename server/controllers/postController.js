import Post from '../models/Post.js';
import { validatePost } from '../utils/validate.js';

// GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/posts/:id
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/posts
export const createPost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const post = new Post({
      ...req.body,
      author: req.user._id // from auth middleware
    });
    await post.save();
    await post.populate('category', 'name');
    await post.populate('author', 'name');
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('category', 'name')
      .populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};