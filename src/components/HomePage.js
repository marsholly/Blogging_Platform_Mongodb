import React, { Component } from 'react';
import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';
import moment from 'moment';


export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      blogs: BlogStore.getAllBlogs()
    }
    this._onChange = this._onChange.bind(this);
  }

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

  render() {
    let {blogs} = this.state;
    console.log('blogs:', blogs)
    return (
      <div className="container">
        HomePage
      </div>
    )
  }
};
