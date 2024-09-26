import {
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
} from '../actions/updateProductAction';

// Initial state for update product
const initialState = {
    loading: false,
    success: false,
    error: null,
};

// Reducer to handle update product action
export const updateProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,  // Success message
            };
        case UPDATE_PRODUCT_FAILURE:
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
