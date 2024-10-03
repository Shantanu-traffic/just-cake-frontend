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
        <Dialog
            open={isModalOpen}
            onClose={handleClose}
            fullWidth
            maxWidth={false} // Disable the default max width
            sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 'none' } }} // Set to full width
        >
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
                                        {/* <TableCell>Order Status</TableCell> */}
                                        <TableCell>Payment Mode</TableCell>
                                        <TableCell>Payment Receipt</TableCell>
                                        <TableCell>Products</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderHistory.map((order) => (
                                        <TableRow hover key={order.order_id}>
                                            <TableCell>{order.order_id}</TableCell>
                                            <TableCell>${parseFloat(order.total_amount).toFixed(2)}</TableCell>
                                            <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                            {/* <TableCell>{order.order_status}</TableCell> */}
                                            <TableCell>{order.payment_mode}</TableCell>
                                            <TableCell>
                                                {order.payment_receipt_attachement
                                                    ? <a href={order.payment_receipt_attachement} target="_blank" rel="noopener noreferrer">View Receipt</a>
                                                    : "No Receipt"
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {order.products.map((product) => (
                                                    <div key={product.product_id} className="p-2 border-b">
                                                        <div>
                                                            <strong>{product.title}</strong> - {product.description}
                                                        </div>
                                                        <div>Quantity: {product.quantity}</div>
                                                        <div>Price: ${product.price.toFixed(2)}</div>
                                                        <img src={product.image} alt={product.title} className="h-16 w-16 object-cover mt-2" />
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
