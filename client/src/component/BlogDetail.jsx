import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blog/${id}`);
      console.log(response)
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch blog');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
      <Link to="/blogs" className="btn btn-secondary">← Back to Blogs</Link>
      
      <div className="blog-content">
        <h1>{blog.title}</h1>
        <p className="blog-meta">
          <strong>Author:</strong> {blog.author?.name || 'Unknown'} | 
          <strong>Created:</strong> {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        
        <div className="blog-body">
          <p>{blog.content}</p>
        </div>
        
        <div className="blog-actions">
          <Link to={`/edit-blog/${blog._id}`} className="btn btn-warning">
            Edit Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
