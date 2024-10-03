import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import { deleteProduct } from '../../Store/actions/deleteProductAction';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Store/actions/alertActionTypes';

const ConfirmPopUp = ({ isOpen, handleClose, productId }) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteProduct(productId))
            .then((res) => {
                console.log(res, "res")
                handleClose();
                dispatch(showAlert("Product deleted successfully", "success"));
                window.location.reload()
            })
            .catch((error) => {
                dispatch(showAlert("Something went wrong, please try again", "error"));
                console.error("Error deleting product:", error); 
            });
    }
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
                Are you sure you want to delete?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPopUp;
