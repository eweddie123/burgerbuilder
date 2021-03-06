import React from 'react';
import classes from './Ingredients.module.css';
import PropTypes from 'prop-types';

const ingredient = (props) => {
  let ing = null;

  switch (props.type) {
    case ('bread-bottom'):
      ing = <div className = {classes.BreadBottom}></div>;
      break;
    case ('bread-top'):
      ing = (
        <div className = {classes.BreadTop}>
          <div className = {classes.Seeds1}></div>
          <div className = {classes.Seeds2}></div>
        </div>
      );
      break;
    case ('meat'):
      ing = <div className = {classes.Meat}></div>;
      break;
    case ('cheese'):
      ing = <div className = {classes.Cheese}></div>;
      break;
    case ('salad'):
      ing = <div className = {classes.Salad}></div>;
      break;
    case ('bacon'):
      ing = <div className = {classes.Bacon}></div>;
      break;
    default : ing = null;
  }
  return ing;
};

ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default ingredient;
