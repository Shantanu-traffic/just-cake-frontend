import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material';
import { getOrderHistory } from '../../../Store/actions/orderHistoryAction';
import { closeModal } from '../../../Store/actions/modalActions';

const ViewOrderHistory = ({ isModalOpen, user }) => {
    const dispatch = useDispatch();
    const orderHistory = useSelector((state) => state.orderHistory?.orders?.result);
    const loading = useSelector((state) => state.orderHistory?.loading);
    const error = useSelector((state) => state.orderHistory?.error);

    console.log("orderHistory", orderHistory)

    // Fetch order history when component mounts
    useEffect(() => {
        if (user?.id) {
            dispatch(getOrderHistory(user.id));
        }
    }, [dispatch, user]);

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Dialog open={isModalOpen} onClose={handleClose} fullWidth>
            <DialogTitle>Order History</DialogTitle>
            <DialogContent className='min-w-[80vw]'>
                <div className='min-h-[90vh] p-5'>
                    {loading && (
                        <div className='flex justify-center items-center'>
                            <CircularProgress />
                        </div>
                    )}
                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    {orderHistory && orderHistory.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                        <TableCell>Order Date</TableCell>
                                        <TableCell>Order Status</TableCell>
                                        <TableCell>Products</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderHistory.map((order) => (
                                        <TableRow key={order.order_id}>
                                            <TableCell>{order.order_id}</TableCell>
                                            <TableCell>${parseFloat(order.total_amount).toFixed(2)}</TableCell>
                                            <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                            <TableCell>{order.order_status}</TableCell>
                                            <TableCell>
                                                {order.products.map((product) => (
                                                    <div key={product.product_id}>
                                                        ID: {product.product_id}, Quantity: {product.quantity}, Price: ${product.price}
                                                    </div>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        !loading && <Typography align="center">No orders found.</Typography>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewOrderHistory;
