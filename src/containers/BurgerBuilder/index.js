import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/ui/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandling';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchesable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios
      .get('https://react-my-burger-dcbcb.firebaseio.com/orders/ingredients.json')
      .then(res => {
        this.setState({
          ingredients: res.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        })
      })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    
    updatedIngredients[type] = updatedCounted;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    
    updatedIngredients[type] = updatedCounted;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient]; 
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchesable: sum > 0
    });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert("You continued!")
  
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Wrapper>
          <Burger 
            ingredients={this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler} 
            disabled={disabledInfo} 
            price={this.state.totalPrice}
            purchesable={this.state.purchesable}
            ordered={this.purchaseHandler} />
        </Wrapper>
      );

      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}></OrderSummary>
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Wrapper>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          { burger }
      </Wrapper>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);