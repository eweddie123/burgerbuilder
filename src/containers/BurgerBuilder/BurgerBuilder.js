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
    loading: false
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
    const address = {
      street: 'Wake Forrest Run',
      zipcode: '93178',
      country: 'United States'
    };
    let addressId = null;
    axios.post('/address/add', address)
      .then(response => {
        console.log(response);
        let query = '/address/get?street=' + address.street + '&zipcode='
        + address.zipcode + '&country=' + address.country;
        axios.get(query.replace(' ', '%20'))
        .then(response => {
          console.log(response);
          addressId = response.data.addressId;
          const customer = {
            name: 'Eddie',
            address: addressId,
            email: 'eweddie123@gmail.com'
          }
          let customerId = null;
          axios.post('/customer/add', customer)
            .then(response => {
              console.log(response);
              let query = '/customer/get?name=' + customer.name + '&address='
              + customer.address + '&email=' + customer.email;
              axios.get(query.replace(' ', '%20').replace('@', '%40'))
              .then(response => {
                console.log(response);
                customerId = response.data.customerId;
                let ingredientsId = null;
                axios.post('/ingredients/add', this.state.ingredients)
                .then(response => {
                  console.log(response);
                  let query = '/ingredients/get?salad=' + this.state.ingredients.salad
                  + '&cheese=' + this.state.ingredients.cheese + '&bacon=' + this.state.ingredients.bacon
                  + '&meat=' + this.state.ingredients.meat;
                  axios.get(query.replace(' ', '%20'))
                  .then(response => {
                    console.log(response);
                    ingredientsId = response.data.ingredientsId;
                    const order = {
                      ingredients: ingredientsId,
                      price: this.state.price,
                      customer: customerId,
                      deliveryMethod: 'fastest'
                    }
                    axios.post('/orders/add', order)
                    .then(response => {
                      console.log(response);
                      this.setState({loading: false, purchasing: false});
                    })
                    .catch(error => {
                         this.setState({loading : false, purchasing: false});
                    });
                  });
                });
              });
            });
          });
        });



    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(error => {
    //     this.setState({loading : false, purchasing: false});
    //   });
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
        purchaseCanceled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}
        price = {this.state.price}/>;
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
