import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo.js';
import NavItems from '../NavItems/NavItems.js';
import Toggle from './Toggle/Toggle.js';

const toolbar = (props) => (
  <header className = {classes.Toolbar}>
    <Toggle click = {props.click}>MAIN MENU</Toggle>
    <div className = {classes.Logo}>
      <Logo />
    </div>
    <nav className = {classes.DesktopOnly}>
      <NavItems/>
    </nav>
  </header>
);

export default toolbar;
