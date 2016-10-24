import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveAllBlogs(blogs) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ALL_BLOGS',
      payload: {blogs}
    })
  },
  receiveOneBlog(blog) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ONE_BLOG',
      payload: {blog}
    })
  },
}

export default ServerActions;
