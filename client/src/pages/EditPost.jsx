// EditPost.jsx
import { useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Layout from '../components/Layout';
import { useApi } from '../hooks/useApi';

export default function EditPost() {
  const { id } = useParams();
  const { data: post, loading } = useApi(`/posts/${id}`);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Layout>
      <PostForm post={post} isEdit={true} />
    </Layout>
  );
}