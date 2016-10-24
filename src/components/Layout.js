import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Layout extends Component {
  render() {
    return (
      <div className="row">
        <ol className="breadcrumb">
          <li className="nav"><Link to="/manage">Home</Link></li>
          <li><Link to="/new">Add Post</Link></li>
          <li><Link to="/manage">Manage Posts</Link></li>
        </ol>
        {this.props.children}
      </div>
    )
  }
};
