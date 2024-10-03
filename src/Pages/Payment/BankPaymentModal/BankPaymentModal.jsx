import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import { closeModal } from '../../../Store/actions/modalActions';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_API_URL } from '../../../utils/commanFunctions';
import { showAlert } from '../../../Store/actions/alertActionTypes';
import { Spinner } from '../../../Components';
import { useNavigate } from 'react-router-dom';

const BankPaymentModal = ({ isModalOpen, finalTotalPriceWithTax }) => {
    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const { order } = useSelector((state) => state?.orderPlaces)

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        } else {
            setUser(null);
        }
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]); // Assuming setFile updates your file state
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a file.');
            return;
        }

        // Create FormData and append file and other details
        const formData = new FormData();
        formData.append('order_id', order?.order_id);
        formData.append('user_id', user?.id);
        formData.append('payment_mode', "Bank Payment");
        formData.append('image', file);
        formData.append('total_amount', finalTotalPriceWithTax);
        setLoading(true);
        // API Call with FormData
        axios.post(`${BASE_API_URL}/api/v1/payment/confirm-payment`, formData)
            .then(response => {
                console.log("response", response)
                if (response.data.success) {
                    setLoading(false);
                    navigate('/orderPlaced', {
                        state: {
                            orderDetails: response.data.result,
                            payload: {
                                order_id: order?.order_id,
                                user_id: user?.id,
                                payment_mode: "Bank Payment",
                                total_amount: finalTotalPriceWithTax
                            }
                        }
                    });
                }
            })
            .catch((error) => {
                dispatch(showAlert("Something went wrong, please try again", 'error'));
                setLoading(false);
                console.error('Error:', error);
            });
    };
    console.log("file", file)

    return (
        <>
            {loading ? <Spinner /> : <Dialog className=""
                open={isModalOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">Bank Payment Details</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bank Name: <strong>ASB Bank</strong>
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Account Holder: <strong>Rakesh Chandra</strong>
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Account Number: <strong>12-3216-0105382-51</strong>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="receiptUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Upload Bank Receipt
                            </label>
                            <div className="relative mt-2 w-full flex items-center justify-center">
                                <input
                                    type="file"
                                    id="receiptUpload"
                                    name="receiptUpload"
                                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileChange}
                                />
                                <div className="flex items-center justify-center w-full h-12 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-primary transition duration-150">
                                    <span className="text-sm text-gray-500">Choose file</span>
                                </div>
                                {file && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        Selected file: {file.name}
                                    </div>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Accepted formats: JPG, PNG, PDF (Max size: 10MB)</p>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 gap-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-gray-700 hover:text-gray-900 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary px-5 py-2 text-white rounded-md hover:bg-opacity-80 transition duration-150"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Dialog>}
        </>
    );
};

export default BankPaymentModal;
