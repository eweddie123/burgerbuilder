import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './Ingredients/Ingredients.js';

const burger = (props) => {
  // const transformedIngredients = Object.keys(props.ingredients).map(
  //   igKey => {
  //     return Array(props.ingredients[igKey]).map((_, index) => {
  //       return <BurgerIngredient key = {igKey + index} type = {igKey} />
  //     });
  //   });

  const ingredientsArray = Object.entries(props.ingredients);
  let transformedIngredients = [];
  // destructuring
  ingredientsArray.forEach(([key, value]) =>{
    for(let i = 0; i < value; i++) {
      transformedIngredients.push(<BurgerIngredient type = {key} key = {key + i} />);
    }
  });

  return (
    <div className = {classes.Burger}>
      <BurgerIngredient type = "bread-top"/>
      {transformedIngredients.length === 0 ? <p>Please add more ingredients</p> : transformedIngredients}
      <BurgerIngredient type = "bread-bottom"/>
    </div>

  );
};

export default burger;
