import {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../actions/deleteProductAction';

// Initial state for delete product
const initialState = {
    loading: false,
    success: false,
    error: null,
};

// Reducer to handle delete product action
export const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
