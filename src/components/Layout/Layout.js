import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js'

class Layout extends Component {
  state = {
    showSideDrawer : false
  };

  sideDrawerClosedHandler = () =>{
    this.setState({
      showSideDrawer : false
    });
  }

  sideDrawerOpenHandler = () =>{
    this.setState({
      showSideDrawer : true
    });
  }

  render() {
    return (
      <>
        <Toolbar click = {this.sideDrawerOpenHandler}/>
        <SideDrawer open = {this.state.showSideDrawer} close = {this.sideDrawerClosedHandler}/>
        <main className = {classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
