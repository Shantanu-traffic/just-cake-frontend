import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider } from '@mui/material';
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
        <section className='w-full min-h-screen bg-white flex flex-col justify-center items-center'>
            <Navbar />
            <p className='text-black font-semibold text-3xl text-center'>Order history</p>
            <div className='w-full min-h-[90vh] p-5'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ background: "#F1F1F1" }}>
                            <TableRow>
                                <TableCell><strong>Order ID</strong></TableCell>
                                <TableCell><strong>Total Amount</strong></TableCell>
                                <TableCell><strong>Order Date</strong></TableCell>
                                <TableCell><strong>Order Status</strong></TableCell>
                                <TableCell><strong>Payment Mode</strong></TableCell>
                                <TableCell><strong>Payment Receipt</strong></TableCell>
                                <TableCell><strong>Products</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderHistory.map((order) => (
                                <TableRow hover key={order.order_id}>
                                    <TableCell>{order.order_id}</TableCell>
                                    <TableCell>${order.total_amount}</TableCell>
                                    <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.order_status}</TableCell>
                                    <TableCell>{order.payment_mode}</TableCell>
                                    <TableCell>
                                        {order.payment_receipt_attachement ? (
                                            <a href={order.payment_receipt_attachement} target="_blank" rel="noopener noreferrer">
                                                View Receipt
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {order.products.map((product) => (
                                            <div key={product.product_id} className="m-2">
                                                <strong>{product.title}</strong> - {product.description}
                                                <br />
                                                Qty: {product.quantity} | Price: ${product.price}
                                                <div>Note: {product.note || "no note added "}
                                                </div>
                                                <div><img height={60} width={60} src={product.image} /></div>
                                                <Divider sx={{ my: 1 }} />
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
