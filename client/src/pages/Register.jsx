// client/src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      
      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
      
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded Hover:bg-green-700">
        Register
      </button>
      
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </form>
  )
}