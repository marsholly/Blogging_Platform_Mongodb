import React, { Component } from 'react';
import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';
import moment from 'moment';
import marked from 'marked';


export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      blogs: BlogStore.getAllBlogs()
    }
    this._onChange = this._onChange.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
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

  createMarkup(blog) {
    let {_id, author, title, content, createAt} = blog;
    let time = moment(createAt).format('lll');
    let str = `### ${title}
                    > ##### Author:__${author}__
                    > ###### Create At: ${time}
                    > ${content}
                    > `
    let markedStr = marked(str);
    // console.log('markedStr:', markedStr)
    let markedHtml = {__html: marked(markedStr)};
    console.log('markedHtml:', markedHtml)
    return <div dangerouslySetInnerHTML={{markedHtml}} />
    // return {__html: marked(markedStr)};
  }

  render() {
    let {blogs} = this.state;
    if(blogs){
      blogs.forEach(blog => {
        // let rows = this.createMarkup(blog);
        // console.log('rows:', rows);
      })
    }
    // console.log('blogs:', blogs)
    return (
      <div className="container">
        HomePage
      </div>
    )
  }
};
