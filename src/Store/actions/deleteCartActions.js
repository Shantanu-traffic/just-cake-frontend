import axios from 'axios';
import Cookies from 'js-cookie';

import { getAllCartItems } from './getAllCartActions';
export const DELETE_FROM_CART_REQUEST = 'DELETE_FROM_CART_REQUEST';
export const DELETE_FROM_CART_SUCCESS = 'DELETE_FROM_CART_SUCCESS';
export const DELETE_FROM_CART_FAIL = 'DELETE_FROM_CART_FAIL';

const userCookie = Cookies.get('user');
let user_id = null;

if (userCookie) {
    try {
        const parsedUserCookie = JSON.parse(userCookie);
        user_id = parsedUserCookie.id; // Extract the user_id from parsed cookie
    } catch (error) {
        console.error("Failed to parse user cookie:", error);
    }
}

// Action to delete an item from the cart
export const deleteFromCart = (cart_id) => async (dispatch) => {
    console.log("cart id", cart_id)
    try {
        dispatch({ type: DELETE_FROM_CART_REQUEST });

        const { data } = await axios.delete(`http://62.72.30.216:5000/api/v1/cart/delete-cart-item/${cart_id}`);

        dispatch({
            type: DELETE_FROM_CART_SUCCESS,
            payload: cart_id,
            data: data
        });
        if (data && cart_id) {
            dispatch(getAllCartItems(user_id));
        }

    } catch (error) {
        dispatch({
            type: DELETE_FROM_CART_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
