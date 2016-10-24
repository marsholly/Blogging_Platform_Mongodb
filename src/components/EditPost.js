import React, { Component } from 'react';
import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';


export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      blogs: BlogStore.getAllBlogs(),
      showModal: false,
      editTitle:'',
      editAuthor:'',
      editContent: ''
    }
    this._onChange = this._onChange.bind(this);
    this.removePost = this.removePost.bind(this);

    this.editNote = this.editNote.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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

  updatePost(blog){
   this.openModal();
   this.setState({
     editTitle:blog.title,
     editAuthor:blog.author,
     editContent: blog.content
   });
 }

 closeModal() {
   this.setState({ showModal: false });
 }

 openModal() {
   this.setState({ showModal: true });
 }

 saveEdit(id) {
   let {editTitle, editAuthor, editContent } = this.state;
   let newPost = {
     title: editTitle,
     author: editAuthor,
     content: editContent
   };
   BlogActions.updateBlog(id, newPost);
   this.closeModal();
 }

 cancelEdit() {
   this.closeModal();
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
              <button className="btn btn-info" onClick={()=>this.updatePost(blog)}>Edit</button>
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
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" placeholder="Title" value={this.state.editTitle} onChange={e => {this.setState({editTitle: e.target.value}) }}/>
            <br/>
            <input type="text" className="form-control" placeholder="Author" value={this.state.editAuthor} onChange={e => {this.setState({editAuthor: e.target.value}) }}/>
            <br/>
            <textarea className ='form-control' rows="3" value={this.state.editContent} onChange={e => {this.setState({editContent: e.target.value}) }}></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={() => this.saveEdit(_id)}>Save</Button>
            <Button onClick={this.cancelEdit}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};
