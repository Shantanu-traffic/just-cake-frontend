// actions/productActions.js

import axios from 'axios';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL';

export const addProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/form-data',
            },
        };

        const response = await axios.post('http://localhost:5000/api/v1/product/add-product', productData, config);

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response ? error.response.data.message : error.message,
        });
    }
};
