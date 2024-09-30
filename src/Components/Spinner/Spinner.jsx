// Loader.js
import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

export const Spinner = () => {
    return (
        <Backdrop open={true} style={{ zIndex: 9999 }}>
            <CircularProgress sx={{color:"white"}} />
        </Backdrop>
    );
};


