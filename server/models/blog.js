const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  createAt: { type: Date, default: Date.now, required: true },
  content: { type: String, require: true },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
