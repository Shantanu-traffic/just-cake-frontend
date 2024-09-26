import {
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAIL
} from '../actions/orderHistoryAction';

const initialState = {
    loading: false,
    orders: [],
    error: null,
};

// Order reducer to handle fetching order history
export const orderHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload, 
            };

        case GET_ORDER_HISTORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
