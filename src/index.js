import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';


render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path='new' component={NewPost} />
      <Route path='manage' component={EditPost} />
    </Route>
  </Router>,
  document.getElementById('root')
);
