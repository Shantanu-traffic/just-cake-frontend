import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { showAlert } from '../../Store/actions/alertActionTypes';
import { BASE_API_URL } from '../../utils/commanFunctions';
import { openModal } from '../../Store/actions/modalActions';
import BankPaymentModal from './BankPaymentModal/BankPaymentModal';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';
import { Spinner } from '../../Components';

const Cart = ({ cartItems }) => {
  return (
    <>
      {cartItems?.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={item?.image || "https://via.placeholder.com/50"}
              alt="Pure set"
              className="w-12 h-12 rounded mr-4"
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
          </div>
          <p>${item?.price}</p>
        </div>
      ))}
    </>
  );
};


export default function Payment() {
  const [user, setUser] = useState(null);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [orderPlacedLoading, setOrderPlacedLoading] = useState(false)
  const { cartItems } = useSelector((state) => state?.cartItems);
  const { shippingAddress } = useSelector((state) => state?.shippingAddress?.shippingData);
  const { order } = useSelector((state) => state?.orderPlaces)
  const isModalOpen = useSelector((state) => state?.isModalOpen?.isOpen)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const TAX_RATE = 0.20;

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUser(userData);
    } else {
      setUser(null);
    }

    // Retrieve shipping details from localStorage
    const storedShippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));
    setShippingDetails(storedShippingDetails);
  }, []);

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  // Remove duplicate cart items based on product_id or any other unique property
  const uniqueCartItems = cartItems?.reduce((acc, current) => {
    const x = acc.find(item => item.product_id === current.product_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Calculate the total price by summing up price * quantity for each item
  const totalCartPrice = uniqueCartItems.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);

  // Round totalCartPrice to two decimal places
  const roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));

  // gst amount
  // const gstAmount = parseFloat((roundedTotalCartPrice * TAX_RATE).toFixed(2));
    const gstAmount = 0;
  // Add 20% tax/fee to the total price
  const totalPriceWithTax = roundedTotalCartPrice + gstAmount;

  // Round totalPriceWithTax to two decimal places
  const finalTotalPriceWithTax = parseFloat(totalPriceWithTax.toFixed(2));

  const handleCheckoutCOD = () => {
    setOrderPlacedLoading(true)
    const OrderPlacedData = {
      order_id: order?.order_id,
      user_id: user?.id,
      payment_mode: "COD",
      image: null,
      total_amount: finalTotalPriceWithTax,
    };
    if (OrderPlacedData) {
      BASE_API_URL
      axios.post(`${BASE_API_URL}/api/v1/payment/confirm-payment`, OrderPlacedData)
        .then((response) => {
          if (response.data.success) {
            setOrderPlacedLoading(false)
            dispatch(getAllCartItems(user.id))
            navigate('/orderPlaced', {
              state: {
                orderDetails: response.data.result,
                payload: OrderPlacedData
              }
            })
          }
        })
        .catch((error) => {
          dispatch(showAlert("Something went wrong, please try again", 'error'))
          setOrderPlacedLoading(false)
        });
    } else {
      dispatch(showAlert("something went wrong! please try again"))
      setOrderPlacedLoading(false)
    }
  };

  const handleBankPaymentClick = () => {
    dispatch(openModal())
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen flex justify-center items-center p-4">
        <div className="container min-h-[90vh] max-w-6xl bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">
          {/* Left Side: Order Summary */}
          <div className="lg:w-1/2 w-full border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <button onClick={handleBack} className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-normal font-satisfy">Cake Crafts</h2>
            </div>
            <h1 className="text-2xl font-bold mb-4">Amount to pay ${finalTotalPriceWithTax}</h1>

            {/* Order Items */}
            <div className="space-y-4">
              <Cart cartItems={uniqueCartItems} />
            </div>
            <div className='py-2'><Divider /></div>
            {/* Subtotal and Shipping */}
            <div className="mt-6">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${roundedTotalCartPrice}</p>
              </div>
              {/* <div className='py-2'><Divider /></div>
              <div className="flex justify-between mt-2">
                <p>GST(20%)</p>
                <p>${gstAmount}</p>
              </div> */}
              <div className='py-2'><Divider /></div>
              <div className="flex justify-between mt-2 font-bold">
                <p>Total due</p>
                <p>${finalTotalPriceWithTax}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form */}
          <div className="lg:w-1/2 w-full p-6">
            <p className="font-semibold">Shipping Information</p>
            <div className='py-1'><Divider /></div>
            {/* Shipping Information */}
            <div className="p-4 rounded-md">
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Name</p>
                <p className="text-gray-800">{user?.display_name}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 font-medium">Email</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 font-medium">Phone</p>
                <p className="text-gray-800">{shippingAddress?.phone || shippingDetails?.phone}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 font-medium">Address</p>
                <p className="text-gray-800">
                  {`${shippingAddress?.street || shippingDetails?.street}, ${shippingAddress?.city || shippingDetails?.city}, ${shippingAddress?.postal_code || shippingDetails?.postal_code} ${shippingAddress?.state || shippingDetails?.state}, ${shippingAddress?.country || shippingDetails?.country} `}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800">
                  <strong>Total Price:</strong> ${finalTotalPriceWithTax}
                </p>
              </div>

              <button onClick={handleCheckoutCOD} className="w-full bg-black text-white p-3 rounded-md shadow-sm hover:bg-primary-dark">
                Cash on Delivery
              </button>
              <p className="text-center my-1 text-gray-500">or proceed with</p>
              <button onClick={handleBankPaymentClick} className="w-full bg-black text-white p-3 rounded-md shadow-sm hover:bg-primary-dark">
                Bank Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {orderPlacedLoading && <Spinner />}
      {isModalOpen && <BankPaymentModal isModalOpen={isModalOpen} finalTotalPriceWithTax={finalTotalPriceWithTax} />}
    </>
  );
}
