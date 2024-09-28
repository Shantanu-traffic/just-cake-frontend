import { SHOW_ALERT, HIDE_ALERT } from '../actions/alertActionTypes';

const initialState = {
    message: '',
    severity: '', // Can be 'success', 'error', 'warning', 'info'
    isVisible: false
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.payload.message,
                severity: action.payload.severity,
                isVisible: true
            };
        case HIDE_ALERT:
            return {
                ...state,
                message: '',
                severity: '',
                isVisible: false
            };
        default:
            return state;
    }
};

export default alertReducer;
