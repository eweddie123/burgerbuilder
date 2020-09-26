import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios from '../../axios-order.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';

const INGREDIENT_PRICES = {
  salad: .50,
  cheese: .50,
  bacon: 1,
  meat: 2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    shipping: "delivery",
    deliveryFee: 2,
    deliveryMethod: "fast"
  }

  componentDidMount () {
    axios.get('https://burgerbuilder-cde60.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      });
  }

  addIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    newIngredients[type]++;
    const p = INGREDIENT_PRICES[type] + this.state.price;

    this.setState({
      ingredients : newIngredients,
      price : p
    });
    this.updatePurhcaseState(newIngredients);
  }

  removeIngredientHandler = (type) => {
    const newIngredients = {...this.state.ingredients};
    let p = this.state.price;
    if (newIngredients[type] > 0) {
      newIngredients[type]--;
      p = p - INGREDIENT_PRICES[type];
    }
    this.setState({
      ingredients : newIngredients,
      price: p
    });
    this.updatePurhcaseState(newIngredients);
  }

  updatePurhcaseState = (ingredients) =>{
    const ing = {
      ...ingredients
    };
    let sum = 0;
    Object.values(ing).forEach(val => sum += val);
    const purchase = sum > 0;
    this.setState({
      purchasable: purchase
    });
  }

  purchaseHandler = ()=> {
    this.setState({
      purchasing: true
    });
  }

  modalClosedHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseCancelHandler = () =>{
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () =>{
    // alert('You continue');
    this.setState({
      loading: true
    });
    // next step is to make customer below customizable/interactive
    const customer = {
      email: "tester@gmail.com",
      name: "test",
      country: "United States of America",
      street: "Johns Creek",
      zipcode: "13012"
    };
    const order = {
      price: this.state.price,
      customer: null,
      deliveryMethod: this.state.deliveryMethod,
      salad: this.state.ingredients.salad,
      bacon: this.state.ingredients.bacon,
      cheese: this.state.ingredients.cheese,
      meat:this.state.ingredients.meat
    }
    axios.post('/customer/add', customer)
      .then(response => {
        console.log(response);
        order.customer = response.data;
        console.log(order);
        axios.post('/orders/add', order)
          .then(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false});
          }).catch(error => {
            this.setState({loading: false, purchasing: false});
          });
      }).catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  shippingHandler = (ship) => {
      let dF = ship==="delivery" ? 2 : 0;

      this.setState({
        shipping: ship,
        deliveryFee: dF
      });

  }

  render () {
    const disabled = {...this.state.ingredients};
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    let loader = null;
    let burger = <Spinner/>;

    if (this.state.ingredients) {
      burger =
      <>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls
          add = {this.addIngredientHandler}
          remove = {this.removeIngredientHandler}
          price = {this.state.price}
          disabled = {disabled}
          purchasable = {this.state.purchasable}
          purchase = {this.purchaseHandler}
        />
      </>;
      loader = <OrderSummary
        ingredients = {this.state.ingredients}
        shipping = {this.shippingHandler}
        purchaseCanceled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}
        price = {this.state.price}
        deliveryFee = {this.state.deliveryFee}
        shippingState = {this.state.shipping}/>;
    }
    if (this.state.loading) {
      loader = <Spinner />;
    }

    return(
      <>
        <Modal show = {this.state.purchasing} modalClosed = {this.modalClosedHandler}>
          {loader}
        </Modal>
        {burger}
      </>
    );
  }
}

export default BurgerBuilder;
