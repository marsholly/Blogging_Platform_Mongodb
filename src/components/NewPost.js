import React, { Component } from 'react';
import BlogActions from '../actions/BlogActions';
import {browserHistory} from 'react-router';

export default class NewPost extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let title = this.refs.title.value;
    let author = this.refs.author.value;
    let content = this.refs.content.value;
    let newBlog = {
      title,
      author,
      content
    }
    BlogActions.createNewBlog(newBlog);
    browserHistory.push({pathname: '/'})
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Add New Post</h2>
        <div className="row text-center">
          <form onSubmit={this._onSubmit}>
            <input type="text" className="form-control" placeholder="Title" ref="title"/>
            <br/>
            <input type="text" className="form-control" placeholder="Author" ref="author"/>
            <br/>
            <textarea className="form-control" rows="3" placeholder="Content" ref="content"></textarea>
            <br/>
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
        </div>
      </div>
    )
  }
};
