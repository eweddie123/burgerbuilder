import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop.js';

const modal = (props) => (
  <>
    <Backdrop show={props.show} click={props.modalClosed}/>
    <div
      className = {classes.Modal}
      style = {{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
      }}>
      {props.children}
    </div>
  </>
);

export default modal;
