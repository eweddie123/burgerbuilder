import React from 'react';
import Button from '../../UI/Button/Button.js';
import classes from './OrderSummary.module.css';

const orderSummary = (props) => {
  const list = Object.entries(props.ingredients).map(([key,value])=>{
    return (
      <li key={key+value}>
        <span style={{textTransform: 'capitalize'}}>{key}</span>: {value}
      </li>);
  });

  let shipping = (
    <>
      <button className = {classes.Selected} onClick = {() => props.shipping("delivery")}>Delivery</button>
      <button className = {classes.Unselected} onClick = {() => props.shipping("pick-up")}>Pick-Up</button>
    </>
  )
  if (props.shippingState !== "delivery") {
    shipping = (
      <>
        <button className = {classes.Unselected} onClick = {() => props.shipping("delivery")}>Delivery</button>
        <button className = {classes.Selected} onClick = {() => props.shipping("pick-up")}>Pick-Up</button>
      </>
    )
  }
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {list}
      </ul>
      <p>Delivery Fee: ${props.deliveryFee.toFixed(2)}</p>
      <p>Your Total is <b>${(props.deliveryFee + props.price).toFixed(2)}</b></p>
      {shipping}
      <p>Proceed to Checkout?</p>
      <Button type = {'Danger'} clicked = {props.purchaseCanceled}>Cancel</Button>
      <Button type = {'Success'} clicked = {props.purchaseContinued}>Continue</Button>
    </>
  );
};

export default orderSummary;
