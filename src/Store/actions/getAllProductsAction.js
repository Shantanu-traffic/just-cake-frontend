// src/actions/productActions.js
import axios from 'axios';
import { BASE_API_URL } from '../../utils/commanFunctions';
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const getProducts = (offSet) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST });

        const { data } = await axios.post(
            `${BASE_API_URL}/api/v1/product/get-products`, { offSet }
        );

        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data.result,
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
