import { createContext, useContext, useState } from 'react';
import API from '../api/api';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (query = '') => {
    setLoading(true);
    const res = await API.get(`/posts${query}`);
    setPosts(res.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data);
  };

  const createPost = async (data) => {
    const res = await API.post('/posts', data);
    setPosts(prev => [res.data, ...prev]);
    return res.data;
  };

  const updatePost = async (id, data) => {
    const res = await API.put(`/posts/${id}`, data);
    setPosts(prev => prev.map(p => p._id === id ? res.data : p));
    return res.data;
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <BlogContext.Provider value={{
      posts, categories, loading,
      fetchPosts, fetchCategories,
      createPost, updatePost, deletePost
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);