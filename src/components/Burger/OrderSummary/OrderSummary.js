import React from 'react';
import Button from '../../UI/Button/Button.js';

const orderSummary = (props) => {
  const list = Object.entries(props.ingredients).map(([key,value])=>{
    return (
      <li key={key+value}>
        <span style={{textTransform: 'capitalize'}}>{key}</span>: {value}
      </li>);
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {list}
      </ul>
      <p>Your Total is <b>${props.price.toFixed(2)}</b></p>
      <p>Proceed to Checkout?</p>
      <Button type = {'Danger'} clicked = {props.purchaseCanceled}>Cancel</Button>
      <Button type = {'Success'} clicked = {props.purchaseContinued}>Continue</Button>
    </>
  );
};

export default orderSummary;
