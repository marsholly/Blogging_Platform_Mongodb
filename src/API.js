import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  getAllBlogs() {
    axios.get('/api/blogs/')
      .then(res =>  res.data)
      .then(ServerActions.receiveAllBlogs)
      .catch(console.error)
  },
  createNewBlog(newBlog) {
    axios.post('/api/blogs/', newBlog)
      .then(res =>  res.data)
      .then(this.getAllBlogs())
      .catch(console.error)
  },
  getOneBlog(id) {
    axios.get(`/api/blogs/${id}`)
      .then(res =>  res.data)
      .then(ServerActions.receiveOneBlog)
      .catch(console.error)
  },
  removeBlog(id) {
    axios.delete(`/api/blogs/${id}`)
      .then(res =>  res.data)
      .then(this.getAllBlogs())
      .catch(console.error)
  },
  updateBlog(id, newInfo) {
    axios.put(`/api/blogs/${id}`, newInfo)
      .then(res =>  res.data)
      .then(this.getAllBlogs())
      .catch(console.error)
  },
}

export default API;
