import axios from 'axios';
export const DELETE_FROM_CART_REQUEST = 'DELETE_FROM_CART_REQUEST';
export const DELETE_FROM_CART_SUCCESS = 'DELETE_FROM_CART_SUCCESS';
export const DELETE_FROM_CART_FAIL = 'DELETE_FROM_CART_FAIL';

// Action to delete an item from the cart
export const deleteFromCart = (cart_id) => async (dispatch) => {
    console.log("cart id",cart_id)
    try {
        dispatch({ type: DELETE_FROM_CART_REQUEST });

        const { data } = await axios.delete(`http://localhost:5000/api/v1/cart/delete-cart-item/${cart_id}`);

        dispatch({
            type: DELETE_FROM_CART_SUCCESS,
            payload: product_id,
            data: data
        });

    } catch (error) {
        dispatch({
            type: DELETE_FROM_CART_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
