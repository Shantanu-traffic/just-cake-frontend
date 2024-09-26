// reducers/productReducer.js

import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL } from '../actions/productActions'

const initialState = {
    loading: false,
    success: false,
    message: '',
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload.message,
            };
        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
