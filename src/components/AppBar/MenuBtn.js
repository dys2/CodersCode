import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { searchPosts, getPosts } from '../../actions/posts';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText }  from 'material-ui/List';
import Input from 'material-ui/Input';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Home from 'material-ui-icons/Home';
import Create from 'material-ui-icons/Create';
import Search from 'material-ui-icons/Search';
import FolderOpen from 'material-ui-icons/FolderOpen';
import { Link } from 'react-router-dom';

import './css/MenuBtn.css';




class MenuBtn extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.search = this.search.bind(this);
  }
  openMenu() {
    this.setState({ open: true });
  }
  closeMenu() {
    this.setState({ open: false });
  }
  search() {
    if (this.props.history.location.pathname !== '/posts') this.props.history.push('/posts');
    const search = this.input.value.toLowerCase().split(' ');
    const posts = this.props.posts.posts.filter((post) => {
      if (post.author.username.toLowerCase().includes(...search)) return post;
      if (post.title.toLowerCase().includes(...search)) return post;
      if (post.content.toLowerCase().includes(...search)) return post;
      if (post.tags.includes(...search)) return post;
      if (post.comments.filter(c => c.text.toLowerCase().includes(...search)).length > 0) return post;
      if (post.comments.filter(c => c.author.username.toLowerCase().includes(...search)).length > 0) return post;
    });
    this.props.searchPosts(posts);
  }
  async submitSearch(e) {
    e.preventDefault();
    await this.props.getPosts();
    this.search();
    this.closeMenu();
  }
  async handleSearch(e) {
    await this.props.getPosts();
    this.search();
  }
  render() {
    return (
      <div>
        <IconButton  onClick={this.openMenu} className="app-bar-icon" aria-label="Menu">
          <MenuIcon />
        </IconButton>
          <Drawer anchor="left" open={this.state.open} onRequestClose={this.closeMenu}>
            <IconButton className="close-drawer-btn" onClick={this.closeMenu}>
              <ChevronLeftIcon />
            </IconButton>
            <List className="drawer-list" >
              <ListItem className="drawer-list-item">
                <div className="search-item">
                <Search/>
                <Input
                  id="search"
                  placeholder="Search field"
                  name="search"
                  type="search"
                  disableUnderline
                  className="search-bar"
                  inputRef={(v) => this.input = v}
                  onChange={this.handleSearch}
                  onKeyPress={(e) => e.key === 'Enter' ? this.submitSearch(e) : null}
                />
                </div>
              </ListItem>
              <Link to='/posts'>
              <ListItem button className="drawer-list-item">
                <ListItemText primary="Home"/>
                <IconButton >
                  <Home />
                </IconButton>
              </ListItem>
              </Link>
              <Link to='/browse'>
                <ListItem button className="drawer-list-item">
                  <ListItemText primary="Browse"/>
                  <IconButton >
                    <FolderOpen />
                  </IconButton>
                </ListItem>
              </Link>
              <Link to='/newpost'>
              <ListItem button className="drawer-list-item">
                <ListItemText primary="New Post"/>
                <IconButton >
                  <Create />
                </IconButton>
              </ListItem>
              </Link>
            </List>
          </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
};

export default connect(mapStateToProps, { searchPosts, getPosts })(MenuBtn);
