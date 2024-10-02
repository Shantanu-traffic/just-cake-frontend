import axios from 'axios';

// Action types
export const SAVE_SHIPPING_ADDRESS_REQUEST = 'SAVE_SHIPPING_ADDRESS_REQUEST';
export const SAVE_SHIPPING_ADDRESS_SUCCESS = 'SAVE_SHIPPING_ADDRESS_SUCCESS';
export const SAVE_SHIPPING_ADDRESS_FAIL = 'SAVE_SHIPPING_ADDRESS_FAIL';

// Action to save shipping address
export const saveShippingAddress = (shippingData) => async (dispatch) => {
    try {
        dispatch({ type: SAVE_SHIPPING_ADDRESS_REQUEST });

        const { data } = await axios.post(
            'http://62.72.30.216:5000/api/v1/order/address',
            shippingData,
        );

        dispatch({
            type: SAVE_SHIPPING_ADDRESS_SUCCESS,
            payload: data,
            shippingData: shippingData,
        });
        localStorage.setItem('shippingDetails', JSON.stringify(shippingData));

    } catch (error) {
        dispatch({
            type: SAVE_SHIPPING_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
