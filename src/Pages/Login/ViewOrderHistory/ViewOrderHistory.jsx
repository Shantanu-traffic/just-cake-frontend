import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, CardActions, Grid } from '@mui/material';
import { getOrderHistory } from '../../../Store/actions/orderHistoryAction';

const orderHistory = [
    {
        order_id: "238c1383-eda4-4721-8af0-c36c7ac51eba",
        total_amount: "150.00",
        order_date: "2024-09-25T06:30:00.000Z",
        order_status: "pending",
        products: [
            {
                product_id: "4df4af64-e015-4537-9207-945e1d1a047a",
                quantity: 2,
                price: 25
            },
            {
                product_id: "05edc841-2c14-4f83-ace2-5a16eb5a4a54",
                quantity: 1,
                price: 100
            }
        ]
    },
    {
        order_id: "238c1383-eda4-4721-8af0-c36c7ac51eba",
        total_amount: "150.00",
        order_date: "2024-09-25T06:30:00.000Z",
        order_status: "pending",
        products: [
            {
                product_id: "4df4af64-e015-4537-9207-945e1d1a047a",
                quantity: 2,
                price: 25
            },
            {
                product_id: "05edc841-2c14-4f83-ace2-5a16eb5a4a54",
                quantity: 1,
                price: 100
            }
        ]
    }
]


const ViewOrderHistory = ({ isModalOpen }) => {
    const dispatch = useDispatch();
    // const user_id = useSelector((state) => state.auth?.id);
    const user_id = '8766781b-6d44-41c1-8368-f89e34589e60'
    // const orderHistory = useSelector((state) => state.orderHistory?.result);

    // Fetch order history when component mounts
    useEffect(() => {
        dispatch(getOrderHistory(user_id));
    }, [dispatch]);

    return (
        <Dialog open={isModalOpen} onClose={() => !isModalOpen}>
            <DialogTitle>Order History</DialogTitle>
            <DialogContent>
                {orderHistory?.length > 0 ? (
                    <Grid container spacing={2}>
                        {orderHistory.map((order) => (
                            <Grid item xs={12} key={order.order_id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Order ID: {order.order_id}</Typography>
                                        <Typography>Total Amount: ${order.total_amount}</Typography>
                                        <Typography>Order Date: {new Date(order.order_date).toLocaleDateString()}</Typography>
                                        <Typography>Status: {order.order_status}</Typography>

                                        <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Products:</Typography>
                                        {order.products.map((product, index) => (
                                            <Typography key={index} variant="body2">
                                                Product ID: {product.product_id} | Quantity: {product.quantity} | Price: ${product.price}
                                            </Typography>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No order history available</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => !isModalOpen}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewOrderHistory;

