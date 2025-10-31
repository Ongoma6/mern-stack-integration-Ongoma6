import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center">Loading...</p>
  if (!post) return <p className="text-center">Post not found</p>

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">By {post.author?.name} • {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}