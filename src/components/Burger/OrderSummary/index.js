import React, { Component } from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Button from '../../ui/Button';

// this could be a functional component
class OrderSummary extends Component {
    
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient, index) => {
            return (
                <li 
                    key={ingredient}>
                    <span style={{textTransform: "capitalize"}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
                </li>);
        });

        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button
                    btnType="Danger"
                    clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Wrapper> 
        );
    }
};

export default OrderSummary;