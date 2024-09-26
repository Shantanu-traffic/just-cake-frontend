import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modalActions';

const initialState = {
    isOpen: false
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, isOpen: true };
        case CLOSE_MODAL:
            return { ...state, isOpen: false };
        default:
            return state;
    }
};