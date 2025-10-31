// client/src/pages/CreatePost.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function CreatePost() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')

    try {
      await axios.post('/api/posts', {
        ...form,
        tags: form.tags.split(',').map(t => t.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      alert('Failed to create post')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        rows="8"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      <input
        placeholder="Excerpt (optional)"
        value={form.excerpt}
        onChange={e => setForm({ ...form, excerpt: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
      />
      <input
        placeholder="Category ID (e.g., 507f1f77bcf86cd799439011)"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      <input
        placeholder="Tags (comma-separated)"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Create Post
      </button>
    </form>
  )
}