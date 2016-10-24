import React, { Component } from 'react';
import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';
import moment from 'moment';

export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      blogs: BlogStore.getAllBlogs()
    }
    this._onChange = this._onChange.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  // componentDidMount() {
  //   BlogActions.getAllBlogs();
  // }

  componentWillMount() {
    BlogActions.getAllBlogs();
    BlogStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    BlogStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ blogs: BlogStore.getAllBlogs() });
  }

  removePost(id) {
    BlogActions.removeBlog(id);
  }

  render() {
    let {blogs} = this.state;
    let blocks;
    if(blogs){
      blocks = blogs.map(blog => {
        let {_id, author, title, content, createAt} = blog;
        let time = moment(createAt).format('lll');
        return (
          <div className="panel panel-default" key={_id}>
            <div className="panel-heading">
              <h3 className="panel-title">{title}</h3>
            </div>
            <div className="panel-body">
              <h4>Author: {author} @ {time}</h4>
              <p>{content}</p>
            </div>
            <div className="text-center">
              <button className="btn btn-info" onClick={()=>this.updatePost(_id)}>Edit</button>
              <button className="btn btn-danger" onClick={()=>this.removePost(_id)}>Delete</button>
            </div>
          </div>
        )
      })
    }
    else {
      blocks = <div></div>
    }

    return (
      <div className="container">
        {blocks}
        
      </div>
    )
  }
};
