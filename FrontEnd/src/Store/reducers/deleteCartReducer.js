import {
    DELETE_FROM_CART_REQUEST,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL
} from '../actions/cartActions';

const initialState = {
    loading: false,
    cartItems: [],
    error: null,
    data: null
};

// Cart reducer
export const deleteCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case DELETE_FROM_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
                data: action.data
            };

        case DELETE_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),  // remove item from cartItems
            };

        case ADD_TO_CART_FAIL:
        case DELETE_FROM_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
