import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Cookies from 'js-cookie';

const Cart = ({ cartItems }) => {
  return (
    <Box container spacing={2} className="flex justify-center items-center">
      {cartItems?.map((item) => (
        <Box item xs={12} sm={6} md={4} key={item.product_id} className="flex flex-col justify-start items-center w-full">
          <Card sx={{ maxWidth: 150, height: 150 }}>
            <CardMedia
              component="img"
              sx={{ width: "60px" }}
              image={item.image || 'https://via.placeholder.com/140'}
              alt={item.title}
            />
            <CardContent>
              <p gutterBottom variant="h5" component="div">
                {item.title}
              </p>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};


const Payment = () => {
  const [user, setUser] = useState(null)
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
  }, [])

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

  console.log(uniqueCartItems)

  // Calculate the total price by summing up price * quantity for each item
  const totalCartPrice = uniqueCartItems?.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);
  return (
    <section className='w-full bg-primary min-h-[100vh] flex flex-col justify-start items-center gap-4 p-6'>
      <div className='w-full flex justify-start'>
        <button className='w-20 p-1 rounded-sm bg-white ' onClick={handleBack}>Back</button>
      </div>
      <div className=''>
        <h1 className='text-white text-lg font-bold '>Your order details</h1>
      </div>
      <Card className='w-100 p-10'>
        <div sx={{ padding: "2rem" }}>
          <Cart cartItems={uniqueCartItems} />
        </div>
        <div>
          <h1 className='text-black font-bold '>Customer details</h1>
          <p>Name: {user?.display_name}</p>
          <p>email: {user?.email}</p>
          {/* <p>Phone: {user?.phone}</p> */}
          {/* <p>Adress: {`${shippingAddress?.street} ${shippingAddress?.city}`}</p>
          <p>{`${shippingAddress?.postal_code}`}</p>
          <p>{`${shippingAddress?.state} ${shippingAddress?.country}`}</p> */}
          <p>Phone: 7001551926</p>
          <p>Adress: 127, Auckland Auckland</p>
          <p>{`${11011}`}</p>
          <p>North State, NZ</p>
          <button className='w-full bg-primary m-1 p-1 rounded-sm'>Procces to Payment</button>
        </div>
      </Card>
    </section>
  )
}

export default Payment
