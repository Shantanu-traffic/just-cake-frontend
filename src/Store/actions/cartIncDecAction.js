import axios from 'axios';
import Cookies from 'js-cookie';

import { getAllCartItems } from './getAllCartActions';
export const UPDATE_CART_QUANTITY_REQUEST = 'UPDATE_CART_QUANTITY_REQUEST';
export const UPDATE_CART_QUANTITY_SUCCESS = 'UPDATE_CART_QUANTITY_SUCCESS';
export const UPDATE_CART_QUANTITY_FAILURE = 'UPDATE_CART_QUANTITY_FAILURE';

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

// Action to update the cart item quantity
export const updateCartQuantity = (cartData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_QUANTITY_REQUEST });

        // API call to update the cart item quantity
        const { data } = await axios.patch(`http://justcakes.co.nz:5000/api/v1/cart/qty`, cartData);

        // Dispatch success if API call succeeds
        dispatch({
            type: UPDATE_CART_QUANTITY_SUCCESS,
            payload: data.message,
        });
        if (data && user_id) {
            dispatch(getAllCartItems(user_id))
        }
    } catch (error) {
        // Dispatch failure if the API call fails
        dispatch({
            type: UPDATE_CART_QUANTITY_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
