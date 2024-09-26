import axios from 'axios';
export const GET_ORDER_HISTORY_REQUEST = 'GET_ORDER_HISTORY_REQUEST';
export const GET_ORDER_HISTORY_SUCCESS = 'GET_ORDER_HISTORY_SUCCESS';
export const GET_ORDER_HISTORY_FAIL = 'GET_ORDER_HISTORY_FAIL';

// Action to fetch order history
export const getOrderHistory = (user_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_HISTORY_REQUEST });

        const { data } = await axios.get(`http://localhost:5000/api/v1/order/order-history/${user_id}`);

        dispatch({
            type: GET_ORDER_HISTORY_SUCCESS,
            payload: data.result,
        });

    } catch (error) {
        dispatch({
            type: GET_ORDER_HISTORY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
