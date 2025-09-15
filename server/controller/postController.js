const Blog = require("../model/post");
const jwt = require("jsonwebtoken");

const createBlog = async (req, res) =>
{   const {title, content} = req.body;
    try {
        const post = new Blog({
            title,
            content,
            author: req.user._id
        });
        await post.save();
        res.status(201).json({ message: "Blog created successfully", data: post });
    } catch (error) {
        res.status(500).json({message: "Blog not created"});
    }
}
const getAllBlog = async (req,res) => {
    try {
        const posts = await Blog.find().populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const getBlog = async (req,res) => {
    try {
        const post = await Blog.findById(req.params.id).populate('author', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateBlog = async (req,res) =>{
    const {title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({message: "Please fill in all fields"});
    }
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteBlog = async (req,res) =>{
try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error',msg: error.message });
  }
}

module.exports = {createBlog, getAllBlog, getBlog, updateBlog, deleteBlog};
