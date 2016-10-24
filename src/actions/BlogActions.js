import API from '../API';

const BlogActions = {
  getAllBlogs() {
    API.getAllBlogs();
  },
  createNewBlog(newBlog) {
    API.createNewBlog(newBlog);
  },
  getOneBlog(id) {
    API.getOneBlog(id);
  },
  removeBlog(id) {
    API.removeBlog(id);
  },
  updateBlog(id, newInfo) {
    API.updateBlog(id, newInfo);
  }
}

export default BlogActions;
