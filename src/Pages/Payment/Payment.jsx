import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Box, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';

// const Cart = ({ cartItems }) => {
//   return (
//     <>

//     </>
//   );
// };


// const Payment = () => {
// const [user, setUser] = useState(null);
// const [shippingDetails, setShippingDetails] = useState(null);
// const { cartItems } = useSelector((state) => state?.cartItems);
// const { shippingAddress } = useSelector((state) => state?.shippingAddress?.shippingData);
// const navigate = useNavigate();

// useEffect(() => {
//   const userCookie = Cookies.get('user');  // Get the cookie value

//   if (userCookie) {
//     // If the cookie exists, parse it
//     const userData = JSON.parse(userCookie);
//     setUser(userData);
//   } else {
//     // If the cookie doesn't exist, set user to null
//     setUser(null);
//   }

//   // Retrieve shipping details from localStorage
//   const storedShippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));
//   setShippingDetails(storedShippingDetails);
// }, []);

// const handleBack = () => {
//   navigate(-1); // Navigates to the previous page
// };

// // Remove duplicate cart items based on product_id or any other unique property
// const uniqueCartItems = cartItems?.reduce((acc, current) => {
//   const x = acc.find(item => item.product_id === current.product_id);
//   if (!x) {
//     return acc.concat([current]);
//   } else {
//     return acc;
//   }
// }, []);

// // Calculate the total price by summing up price * quantity for each item
// const totalCartPrice = uniqueCartItems.reduce((total, item) => {
//   return total + (parseFloat(item.price) * item.quantity);
// }, 0);

// // Round totalCartPrice to two decimal places
// const roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));

// // Add 18% tax/fee to the total price
// const totalPriceWithTax = roundedTotalCartPrice + (roundedTotalCartPrice * 0.18);

// // Round totalPriceWithTax to two decimal places
// const finalTotalPriceWithTax = parseFloat(totalPriceWithTax.toFixed(2));

//   return (
//     <section className='w-full bg-primary min-h-[100vh] flex flex-col justify-start items-center gap-4 p-6'>
//       {/* <div className='w-full flex justify-start'>
//         <button className='w-20 p-1 rounded-sm bg-white' onClick={handleBack}>Back</button>
//       </div> */}
//       <div className='w-full flex ss:flex-row flex-col justify-center items-start bg-white rounded-lg min-h-[90vh]'>
//         <div className='addedCarts w-1/2 p-4'>
//           <IconButton onClick={handleBack} color="primary">
//             <ArrowBackIcon sx={{ fontSize: "1.2rem" }} className='text-neutral-500' /><span className=' text-[1rem] text-neutral-500 font-satisfy '>Just Cakes</span>
//           </IconButton>
//           <div className=''>

//           </div>
//         </div>
//         <Divider orientation="vertical" flexItem />
//         <div className='cartsToPay w-1/2 p-2'>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Payment



// //   < Card className = 'w-100 p-10' >
// // <div sx={{ padding: "2rem" }}>
// //   <Cart cartItems={uniqueCartItems} />
// // </div>
// // <div>
// //   <h1 className='text-black font-bold'>Customer details</h1>
// //   <p>Name: {user?.display_name}</p>
// //   <p>Email: {user?.email}</p>
// //   <p>Phone: {shippingAddress?.phone || shippingDetails?.phone}</p>
// //   <p>Address: {`${shippingAddress?.street || shippingDetails?.street} ${shippingAddress?.city || shippingDetails?.city}`}</p>
// //   <p>{`${shippingAddress?.postal_code || shippingDetails?.postal_code}`}</p>
// //   <p>{`${shippingAddress?.state || shippingDetails?.state} ${shippingAddress?.country || shippingDetails?.country}`}</p>
// //   <p><strong>Total Price:</strong> ${finalTotalPriceWithTax}</p>
// //   <button className='w-full bg-primary m-1 p-1 rounded-sm'>Proceed to Payment</button>
// // </div>
// // </Card >


// //   < Box container spacing = { 2} className = "flex justify-center items-center" >
// //     { cartItems?.map((item) => (
// //       <Box item xs={12} sm={6} md={4} key={item.product_id} className="flex flex-col justify-start items-center w-full">
// //         <Card sx={{ maxWidth: 150, height: 150 }}>
// //           <CardMedia
// //             component="img"
// //             sx={{ width: "60px" }}
// //             image={item.image || 'https://via.placeholder.com/140'}
// //             alt={item.title}
// //           />
// //           <CardContent>
// //             <p gutterBottom variant="h5" component="div">
// //               {item.title}
// //             </p>
// //             <Typography variant="body2" color="text.secondary">
// //               Quantity: {item.quantity}
// //             </Typography>
// //           </CardContent>
// //         </Card>
// //       </Box>
// //     ))}
// // </Box >

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
  const { cartItems } = useSelector((state) => state?.cartItems);
  const { shippingAddress } = useSelector((state) => state?.shippingAddress?.shippingData);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get('user');  // Get the cookie value

    if (userCookie) {
      // If the cookie exists, parse it
      const userData = JSON.parse(userCookie);
      setUser(userData);
    } else {
      // If the cookie doesn't exist, set user to null
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

  // Add 18% tax/fee to the total price
  const totalPriceWithTax = roundedTotalCartPrice + (roundedTotalCartPrice * 0.18);

  // Round totalPriceWithTax to two decimal places
  const finalTotalPriceWithTax = parseFloat(totalPriceWithTax.toFixed(2));

  return (
    <div className="bg-primary min-h-screen flex justify-center items-center p-4">
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
            <h2 className="text-lg font-normal font-satisfy">Just Cakes</h2>
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
            <div className='py-2'><Divider /></div>
            <div className="flex justify-between mt-2">
              <p>GST</p>
              <p>18%</p>
            </div>
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

            <button className="w-full bg-primary text-white p-3 rounded-md shadow-sm hover:bg-primary-dark">
              Cash on Delivery
            </button>
            <p className="text-center my-1 text-gray-500">or proceed with</p>
            <button className="w-full bg-primary text-white p-3 rounded-md shadow-sm hover:bg-primary-dark">
              Bank Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
