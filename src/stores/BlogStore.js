import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _blogs = [];
let _blog = [];

class BlogStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_ALL_BLOGS':
          _blogs = action.payload.blogs;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_BLOG':
          _blog = action.payload.blog;
          this.emit('CHANGE');
          break;

      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllBlogs() {
    return _blogs;
  }

  getOneBlog() {
    return _blog;
  }


}

export default new BlogStore();
