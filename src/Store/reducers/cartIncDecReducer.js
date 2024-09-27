import { UPDATE_CART_QUANTITY_FAILURE, UPDATE_CART_QUANTITY_REQUEST, UPDATE_CART_QUANTITY_SUCCESS } from "../actions/CartIncDecAction";


const initialState = {
    loading: false,
    success: false,
    error: null,
};

// Reducer to handle update cart quantity action
export const updateCartQuantityReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART_QUANTITY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CART_QUANTITY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
            };
        case UPDATE_CART_QUANTITY_FAILURE:
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
