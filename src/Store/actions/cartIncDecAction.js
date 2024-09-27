import axios from 'axios';
export const UPDATE_CART_QUANTITY_REQUEST = 'UPDATE_CART_QUANTITY_REQUEST';
export const UPDATE_CART_QUANTITY_SUCCESS = 'UPDATE_CART_QUANTITY_SUCCESS';
export const UPDATE_CART_QUANTITY_FAILURE = 'UPDATE_CART_QUANTITY_FAILURE';

// Action to update the cart item quantity
export const updateCartQuantity = (cartData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_QUANTITY_REQUEST });

        // API call to update the cart item quantity
        const { data } = await axios.patch(`http://localhost:5000/api/v1/cart/qty`, cartData);

        // Dispatch success if API call succeeds
        dispatch({
            type: UPDATE_CART_QUANTITY_SUCCESS,
            payload: data.message,
        });
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
