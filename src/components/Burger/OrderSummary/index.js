import React from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Button from '../../ui/Button';

const orderSummary = (props) => {
    console.log(props);
    
    const ingredientSummary = Object.keys(props.ingredients).map((ingredient, index) => {
        return (
            <li 
                key={ingredient}>
                <span style={{textTransform: "capitalize"}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>);
    });
    
    return (
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}>CONTINUE</Button>
        </Wrapper> 
    );
};

export default orderSummary;