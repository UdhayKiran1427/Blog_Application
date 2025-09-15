const express = require('express');
const {createBlog, getAllBlog, getBlog,updateBlog,deleteBlog}  = require("../controller/postController");
const router = express.Router();
const protect  = require("../middlewire/auth");
router.post("/create", protect, createBlog);
router.get("/all",getAllBlog);
router.get("/:id",getBlog);
router.put("/:id", protect ,updateBlog);
router.delete("/:id", protect ,deleteBlog);

module.exports = router;
