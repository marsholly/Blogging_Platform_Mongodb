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
    this.markUp = this.markUp.bind(this);
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

  // createMarkup(blog) {
  //   let {_id, author, title, content, createAt} = blog;
  //   let time = moment(createAt).format('lll');
  //   let str = `### ${title}
  //                   > ##### Author:__${author}__
  //                   > ###### Create At: ${time}
  //                   > ${content}
  //                   > `
  //   let markedStr = marked(str);
  //   // console.log('markedStr:', markedStr)
  //   let markedHtml = {__html: marked(markedStr)};
  //   console.log('markedHtml:', markedHtml)
  //   return <div dangerouslySetInnerHTML={{markedHtml}} />
  //   // return {__html: marked(markedStr)};
  // }

  markUp(content){
   return {'__html': content};
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
              <div dangerouslySetInnerHTML={this.markUp(content)} />
            </div>
          </div>
        )
      })
    } else {
      blocks = <div></div>
    }

    return (
      <div className="container">
        {blocks}
      </div>
    )
  }
};
