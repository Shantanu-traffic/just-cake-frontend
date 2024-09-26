import {
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    GET_ALL_CART_ITEMS_FAIL,
} from '../actions/getAllCartActions';
import { ADD_TO_CART_SUCCESS } from '../actions/cartActions';
import { DELETE_FROM_CART_SUCCESS } from '../actions/deleteCartActions';

const initialState = {
    loading: false,
    cartItems: [],
    error: null,
};

// Cart reducer
export const getAllCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CART_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_ALL_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
            };

        case GET_ALL_CART_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],  // Add new item to cartItems
            };

        case DELETE_FROM_CART_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product_id !== action.payload),  // Remove item from cartItems
            };

        default:
            return state;
    }
};
