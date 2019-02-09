import React from 'react';

import classes from './index.css';

const order = (props) => {

    let ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            ingredient: ingredientName,
            quantity: props.ingredients[ingredientName]
        })
    }

    ingredients = ingredients.map((ingredient, index) => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={index}>{ingredient.ingredient} ({ingredient.quantity}) </span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;