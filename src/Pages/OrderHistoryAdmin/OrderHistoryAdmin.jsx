import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Navbar } from '../../Sections';
import Footer from '../../Components/Footer/Footer';
import { BASE_API_URL } from '../../utils/commanFunctions';

const OrderHistoryAdmin = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/api/v1/order/admin-order-history`);
                setOrderHistory(response.data.result);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch order history.');
                setLoading(false);
            }
        };
        fetchOrderHistory();
    }, []);

    if (loading) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error" align="center">{error}</Typography>;
    }

    console.log("orderHistory", orderHistory)

    return (
        <section className='w-full min-h-screen bg-primary flex flex-col justify-center items-center'>
            <Navbar />
            <div className='w-full min-h-[90vh] p-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    Order History
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Order ID</strong></TableCell>
                                <TableCell><strong>Total Amount</strong></TableCell>
                                <TableCell><strong>Order Date</strong></TableCell>
                                <TableCell><strong>Payment Mode</strong></TableCell>
                                <TableCell><strong>Products</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderHistory.map((order) => (
                                <TableRow key={order.order_id}>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>${order.total_amount}</TableCell>
                                    <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.payment_mode}</TableCell>
                                    <TableCell>
                                        {order.products.map((product) => (
                                            <div key={product.product_id}>
                                                Product ID: {product.product_id} | Qty: {product.quantity} | Price: ${product.price}
                                            </div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Footer />
        </section>
    );
};

export default OrderHistoryAdmin;
