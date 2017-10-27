import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuBtn from './MenuBtn';
import { connect } from 'react-redux';
import { userSignup, loginUser, logoutUser, authUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Auth from '../User/RequireAuth';
import UnAuthAppBar from './UnAuthAppBar';
import AuthAppBar from './AuthAppBar';
import './css/ButtonAppBar.css';

const RequireAuth = Auth(AuthAppBar, UnAuthAppBar);

class ButtonAppBar extends React.Component {
  render() {
    return (
      <div className="menu-bar" >
        <AppBar position="fixed" className="app-bar" >
          <Toolbar className="tool-bar" >
            <MenuBtn history={this.props.history} />
            <div className="appbar-div-mid">
              <Typography type="title" color="inherit" >
                The Coders Code
              </Typography>
              <img 
                alt="top bar header"
                className="appbar-right-img"
                src='http://www.sfbaysuperbowl.com/wp-content/themes/superbowl50/images/footer/2x/skyline.png'
              />
            </div>
          <RequireAuth />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ userSignup, loginUser, logoutUser, authUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
