import {
    SAVE_SHIPPING_ADDRESS_REQUEST,
    SAVE_SHIPPING_ADDRESS_SUCCESS,
    SAVE_SHIPPING_ADDRESS_FAIL,
} from '../actions/shippingActions';

const initialState = {
    loading: false,
    success: false,
    error: null,
    address: null,
}

export const shippingAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SHIPPING_ADDRESS_REQUEST:
            return { loading: true };
        case SAVE_SHIPPING_ADDRESS_SUCCESS:
            return { loading: false, success: true, address: action.payload };
        case SAVE_SHIPPING_ADDRESS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
