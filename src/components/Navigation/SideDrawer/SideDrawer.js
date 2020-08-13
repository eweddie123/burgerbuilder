import React from 'react';
import Logo from '../../Logo/Logo.js';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js';

const sideDrawer = (props) => {
  let slide = [classes.SideDrawer, classes.Close];
  if (props.open) {
    slide = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <Backdrop show={props.open} click = {props.close}/>
      <div className = {slide.join(' ')}>
        <div className = {classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
