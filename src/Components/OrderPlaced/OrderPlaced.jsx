import React, { useEffect, useState } from 'react'
import { Navbar } from '../../Sections'
import Footer from '../Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';

const OrderPlaced = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { orderDetails, payload } = location.state || {};
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (orderDetails) {
            setLoading(false);
        } else {
            navigate('/');
        }
    }, [orderDetails, navigate]);

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <>
            {loading ? <Spinner /> :
                <section className='w-full min-h-screen bg-primary flex flex-col justify-center items-center'>
                    <Navbar />
                    <div className='min-h-[80vh] w-2/4 bg-white rounded-xl m-2 p-5 flex flex-col justify-start items-center gap-6 shadow-lg'>

                        {/* Success Icon */}
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle" width="120" height="120">
                                <circle cx="12" cy="12" r="10" fill="none"></circle>
                                <path d="M9 12l2 2 4-4"></path>
                            </svg>
                        </div>

                        <div className='text-center'>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
                            <p className="text-lg text-gray-600">Thank you for your purchase.</p>
                            <p className="text-lg text-gray-600">{`Your order ${orderDetails?.order_id} has been placed successfully.`}</p>
                        </div>

                        {/* Order Details */}
                        <div className="w-full text-center mt-4">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h2>
                            <p className="text-gray-600">Payment Method: <span className="font-semibold text-black">{payload?.payment_mode}</span></p>
                            <p className="text-gray-600">Payment id: <span className="font-semibold text-black">{orderDetails?.payment_id}</span></p>
                            <p className="text-gray-600">Total Amount: <span className="font-semibold text-black">{orderDetails.total_amount}</span></p>
                        </div>

                        {/* Back to Home Button */}
                        <button onClick={handleNavigate} className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-opacity-90 transition duration-300">
                            Continue Shopping
                        </button>
                    </div>
                    <Footer />
                </section>
            }
        </>
    );
};

export default OrderPlaced;
