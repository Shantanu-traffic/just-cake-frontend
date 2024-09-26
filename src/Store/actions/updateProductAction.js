import axios from 'axios';
import {
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
} from '../constants/productConstants';

export const updateProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const { data } = await axios.patch(`http://localhost:5000/api/v1/admin/update-product`, productData);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
