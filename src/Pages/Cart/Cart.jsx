import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { cakeLogo, logo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../Store/actions/modalActions';
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import { ShippingDetail } from './ShippingDetail/ShippingDetail';
import { Button } from '@mui/material';
import { deleteFromCart } from '../../Store/actions/deleteCartActions';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';
import { updateCartQuantity } from '../../Store/actions/CartIncDecAction';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { showAlert } from '../../Store/actions/alertActionTypes';

const CartItem = ({ value, title, img, quantity, cart_id, user_id }) => {
    const [cartQuantity, setCartQuantity] = useState(quantity);
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.updateCartQuantity);

    // Handle increment/decrement quantity
    const handleQuantityChange = (isIncreaseQty) => {
        const updatedCartData = {
            cart_id: cart_id,
            quantity: isIncreaseQty ? cartQuantity + 1 : cartQuantity - 1,
            total_price: (isIncreaseQty ? (cartQuantity + 1) : (cartQuantity - 1)) * value,
            isIncreaseQty: isIncreaseQty,
        };

        // Dispatch the action
        dispatch(updateCartQuantity(updatedCartData));
        setCartQuantity(updatedCartData.quantity);
        // dispatch(getAllCartItems(user_id));
        window.location.reload();
    };

    const handleDeleteFromCart = (cart_id) => {
        const cartId = cart_id;
        dispatch(deleteFromCart(cartId))
        dispatch(showAlert("product delete from cart", "success"))
        window.location.reload();
    };


    return (
        <div className="flex ss:flex-row flex-col justify-between items-center border-b p-4 gap-4 bg-white rounded-xl">
            <div className="flex items-center space-x-4">
                <img src={img} alt={title} className="w-16 h-16 object-cover rounded-lg" />
                <h4 className="text-lg font-semibold">{title}</h4>
            </div>
            <div className="flex items-center space-x-3">
                <button disabled={loading || quantity <= 1} onClick={() => handleQuantityChange(false)} className="bg-black text-white px-2 py-1 rounded-lg">-</button>
                <input type="number" readOnly value={value} className="w-16 text-center border border-gray-300 rounded-lg" />
                <button disabled={loading} onClick={() => handleQuantityChange(true)} className="bg-black text-white px-2 py-1 rounded-lg">+</button>
                <button variant="contained">{quantity}</button>
            </div>
            <Button variant='outlined' onClick={() => handleDeleteFromCart(cart_id)}>Remove</Button>
        </div>
    );
}

const Cart = () => {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
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

    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

    useEffect(() => {
        if (user?.id) {
            dispatch(getAllCartItems(user?.id));
        }
    }, [dispatch, user]);

    const { cartItems, loading, error } = useSelector((state) => state.cartItems);
    const { address } = useSelector((state) => state.shippingAddress);

    // Remove duplicate cart items based on product_id or any other unique property
    const uniqueCartItems = cartItems.reduce((acc, current) => {
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

    const handleCheckoutClick = () => {
        if (address?.result && cartItems.length > 0) {
            navigate('/payment')
        } else {
            dispatch(showAlert("please fill shipping address and add product", 'error'))
        }
    };

    return (
        <>
            <section className="min-h-[100vh] bg-primary py-2 flex flex-col justify-start items-center gap-4">
                <div className='w-full flex justify-between items-center ss:px-10 px-5'>
                    <Navbar />
                </div>
                <main className="bg-secondary ss:w-[800px] w-full p-4 rounded-xl space-y-6">
                    {uniqueCartItems.map((item) => {
                        return (
                            <CartItem key={item.id} title={item.title} value={item.price} img={item.image} quantity={item.quantity} cart_id={item.cart_id} user_id={user?.id} />
                        )
                    })}
                    <article className="space-y-3 mt-5 border-t pt-4">
                        <button onClick={() => dispatch(openModal())} className='px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                            Add shipping Address
                        </button>
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Total</h4>
                            <p>₹{totalCartPrice}</p>
                        </div>

                        <button onClick={handleCheckoutClick} className=" w-full block text-center bg-primary text-white py-2 px-4 rounded-lg mt-4">
                            Checkout
                        </button>
                    </article>
                </main>
            </section>
            <div className='w-full'>
                <Footer />
            </div>
            {/* modal to add address modal */}
            {isModalOpen && <ShippingDetail />}
        </>
    );
};

export default Cart;


{/* <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Sub Total</h4>
                            <p>₹2000</p>
                        </div> */}
{/* <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Tax</h4>
                            <p>₹{2000 * 0.18}</p>
                        </div> */}
{/* <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Shipping Charges</h4>
                            <p>₹200</p>
                        </div> */}
