export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

// Show alert action
export const showAlert = (message, severity) => ({
    type: SHOW_ALERT,
    payload: { message, severity }
});

// Hide alert action
export const hideAlert = () => ({
    type: HIDE_ALERT
});
