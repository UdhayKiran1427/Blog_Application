import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blog/all');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBlogs();
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list">
      <h1>All Blogs</h1>
      <Link to="/create-blog" className="btn btn-primary" style={{position:"fixed", top:"150px", right:"50px"}}>Create New Blog</Link>
      
      <div className="blogs-container">
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="blog-card" style={{width:'400px',border:"1px solid #ccc", padding:"5px", margin:"5px"}}>
              <h2>{blog.title}</h2>
              <p>{blog.content.substring(0, 100)}...</p>
              <p>Author: {blog.author?.name || 'Unknown'}</p>
              <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
              
              <div className="blog-actions">
                <Link to={`/blog/${blog._id}`} className="btn btn-info">View</Link>
                <Link to={`/edit-blog/${blog._id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
