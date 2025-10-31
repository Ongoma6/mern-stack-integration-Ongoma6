import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        const postsArray = Array.isArray(data) ? data : data.posts || []
        setPosts(postsArray)
      } catch (err) {
        console.error(err)
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p className="text-center py-8 text-gray-600">Loading posts...</p>
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">
            No posts yet. Be the first to write one!
          </p>
          <Link
            to="/create"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded w-full h-48 mb-4" />
              )}

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : 'No content')}
              </p>

              <div className="flex justify-between text-xs text-gray-500">
                <span>By {post.author?.name || 'Anonymous'}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}