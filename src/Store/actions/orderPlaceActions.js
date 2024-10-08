import axios from 'axios';
import { BASE_API_URL } from '../../utils/commanFunctions';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

export const placeOrder = (orderData) => (dispatch) => {
    dispatch({ type: PLACE_ORDER_REQUEST });

    // Return the axios promise to chain .then() and .catch() in the component
    return axios.post(`${BASE_API_URL}/api/v1/order/placed-order`, orderData)
        .then((response) => {
            dispatch({
                type: PLACE_ORDER_SUCCESS,
                payload: response.data,
                orderData: orderData
            });
            return response.data;
        })
        .catch((error) => {
            dispatch({
                type: PLACE_ORDER_FAILURE,
                payload: error.message
            });
            throw error;
        });
};