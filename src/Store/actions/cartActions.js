import axios from 'axios';
import { getAllCartItems } from './getAllCartActions';
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = 'ADD_TO_CART_FAIL';

// Action to add an item to the cart
export const addToCart = (product_id, user_id, quantity, total_price) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });

        // Define payload to send to the backend
        const payload = {
            product_id,
            user_id,
            quantity,
            total_price,
        };
        console.log("payload cart", payload)

        // Make the API call
        const data = await axios.post('http://62.72.30.216:5000/api/v1/cart/add-to-cart', payload);
        console.log("cart add", data)
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data.data,
        });
        dispatch(getAllCartItems(user_id));

    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
