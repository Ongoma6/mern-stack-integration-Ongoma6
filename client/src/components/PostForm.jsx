// client/src/components/PostForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import ImageUpload from './ImageUpload';
import API from '../api/api';

export default function PostForm({ post, isEdit }) {
  const { categories, createPost, updatePost } = useBlog();
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category?._id || '',
    tags: post?.tags?.join(', ') || '',
    featuredImage: post?.featuredImage || '',
    isPublished: post?.isPublished || false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories if not loaded
  }, []);

  const validate = () => {
    const err = {};
    if (!form.title) err.title = 'Title is required';
    if (!form.content) err.content = 'Content is required';
    if (!form.category) err.category = 'Category is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (isEdit) {
        await updatePost(post._id, data);
      } else {
        await createPost(data);
      }
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Form fields with error handling */}
      <div className="mb-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      {/* Add inside form */}
<ImageUpload onUpload={(url) => setForm({ ...form, featuredImage: url })} />

      {/* Repeat for content, excerpt, category, tags, image, publish */}
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        {isEdit ? 'Update' : 'Create'} Post
      </button>
    </form>
  );
}