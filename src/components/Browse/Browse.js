import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { topPosts } from '../../actions/posts';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import OpenInNew from 'material-ui-icons/OpenInNew';
import Subheader from 'material-ui/List/ListSubheader';
import './css/Browse.css'




class Browse extends Component {
  componentDidMount() {
    this.props.topPosts();
  }
  render() {
    return (
      <div className="browse-container">
        <List>
          <ListSubheader>{`Most Active Users`}</ListSubheader>
          {this.props.posts.users.map((user => {
            return (
              <Link to={`/user/${user.user[0]._id}`} >
              <ListItem key={user.user[0]._id} button>
                <ListItemText primary={user.user[0].username} />
              </ListItem>
              </Link>
            )
          }))}
        </List>
        <GridList cellHeight={140} className="browse-grid">
          <GridListTile key="subheader" rows={.4} cols={2}>
            <Subheader>Top Posts</Subheader>
          </GridListTile>
          {this.props.posts.top.map((post) => {
            return (
              <GridListTile key={post._id}>
                <img alt={post.title} src={post.picture} />
                <GridListTileBar
                  title={post.title}
                  subtitle={<span>by: {post.author[0].username}</span>}
                  actionIcon={
                    <Link to={`posts/${post._id}`}>
                    <IconButton>
                      <OpenInNew color="rgba(255, 255, 255, 0.54)" />
                    </IconButton>
                    </Link>
                  }
                />
              </GridListTile>
            
            )
          })}
        </GridList>
        <List>
          <ListSubheader>{`Most Used Tags`}</ListSubheader>
          {this.props.posts.tags.map((tag => {
            return (
              <Link to={`posts/tags/${tag._id.label}`}>
                <ListItem className="tag-item-list" key={tag._id.label} button>
                  <ListItemText primary={tag._id.label} />
                </ListItem>
              </Link>
            )
          }))}
        </List>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps, { topPosts })(Browse);