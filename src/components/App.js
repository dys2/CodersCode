import React from 'react';
import ButtonAppBar from  './AppBar/ButtonAppBar';
import Posts from './Posts/Posts';
import { Route } from 'react-router-dom';
import Auth from './User/RequireAuth';
import NewPost from './Posts/NewPost'
import SignInPage from './User/SignInPage'
import IndPost from './Posts/IndPost';
import PostsByTags from './Posts/PostsByTags';
import Profile from './User/Profile';
import Account from './User/Account';
import User from './User/User';
import Browse from './Browse/Browse';
import './css/App.css';


export default () => (
  <div className="app">
    <Route path="/" component={ButtonAppBar} />
    <Route exact path="/" component={Posts} />
    <Route exact path='/posts/tags/:tag' component={PostsByTags} />
    <Route path='/browse' component={Browse} />
    <Route path='/newpost' component={Auth(NewPost, SignInPage)} />
    <Route exact path='/posts' component={Posts} />
    <Route exact path='/posts/:id' component={IndPost} />
    <Route path='/profile' component={Auth(Profile, SignInPage)} />
    <Route path='/account' component={Auth(Account, SignInPage)} />
    <Route path='/user/:id' component={Auth(User, SignInPage)} />
  </div>
)