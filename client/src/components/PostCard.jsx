import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">
        <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
        {post.category.name}
      </span>
    </div>
  );
}