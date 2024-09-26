import axios from 'axios';
import {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../constants/productConstants';

// Action to delete a product
export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`http://localhost:5000/api/v1/admin/delete-product/${productId}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
