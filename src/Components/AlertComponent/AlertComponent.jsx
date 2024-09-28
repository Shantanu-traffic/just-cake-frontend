import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideAlert } from '../../Store/actions/alertActionTypes';

const AlertComponent = () => {
    const dispatch = useDispatch();
    const { isVisible, message, severity } = useSelector((state) => state.alert);

    const handleClose = () => {
        dispatch(hideAlert());
    };

    return (
        <Snackbar
            open={isVisible}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertComponent;
