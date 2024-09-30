import axios from 'axios';
import Cookies from 'js-cookie';
import { getProducts } from './getAllProductsAction';

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST"
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS"
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE"

const userCookie = Cookies.get('user');
let user_id = null;

if (userCookie) {
    try {
        const parsedUserCookie = JSON.parse(userCookie);
        user_id = parsedUserCookie.id;
    } catch (error) {
        console.error("Failed to parse user cookie:", error);
    }
}

// Action to delete a product
export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`http://localhost:5000/api/v1/product/delete-product/${productId}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.message,
        });

        if (data && user_id) {
            dispatch(getProducts('1'))
        }

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
