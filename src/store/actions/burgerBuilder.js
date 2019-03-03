import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    console.log(name);
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios
            .get('https://react-my-burger-dcbcb.firebaseio.com/orders/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}