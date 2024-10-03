import axios from 'axios';
import { BASE_API_URL } from '../../utils/commanFunctions';
export const GET_ALL_CART_ITEMS_REQUEST = 'GET_ALL_CART_ITEMS_REQUEST';
export const GET_ALL_CART_ITEMS_SUCCESS = 'GET_ALL_CART_ITEMS_SUCCESS';
export const GET_ALL_CART_ITEMS_FAIL = 'GET_ALL_CART_ITEMS_FAIL';

// Action to fetch all items from the cart
export const getAllCartItems = (user_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });

        // Make the GET API call with user_id as a query parameter
        const { data } = await axios.get(`${BASE_API_URL}/api/v1/cart/all-cart-item`, {
            params: { user_id }
        });

        dispatch({
            type: GET_ALL_CART_ITEMS_SUCCESS,
            payload: data.result,
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_CART_ITEMS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
