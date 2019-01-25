import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/ui/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

export default class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchesable: false,
    purchasing: false
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
    alert("You continued!")
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Wrapper>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice}></OrderSummary>
          </Modal>
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
    )
  }
}
