import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../Store/actions/modalActions';
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { ShippingDetail } from './ShippingDetail/ShippingDetail';
import { IconButton, Tooltip } from '@mui/material';
import { deleteFromCart } from '../../Store/actions/deleteCartActions';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';
import { updateCartQuantity } from '../../Store/actions/CartIncDecAction';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { showAlert } from '../../Store/actions/alertActionTypes';
import { Spinner } from '../../Components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddNote from './AddNote/AddNote';


const CartItem = ({ value, title, img, quantity, cart_id, user_id, isModalOpen, addNote, setAddNote }) => {
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
        // window.location.reload();
    };

    const handleDeleteFromCart = (cart_id) => {
        const cartId = cart_id;
        dispatch(deleteFromCart(cartId))
        dispatch(showAlert("product delete from cart", "success"))
        window.location.reload();
    };

    const handleOpenNoteModel = () => {
        dispatch(openModal())
        setAddNote(true)
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 p-4 gap-5 bg-white rounded-lg shadow-md">
                <div className="flex items-center gap-4 w-full sm:w-3/5">
                    <img src={img} alt={title} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                    <h4 className="text-lg font-semibold text-gray-600">{title}</h4>
                </div>

                <div className="flex gap-2 items-center justify-center w-full sm:w-1/4">
                    <IconButton onClick={() => handleQuantityChange(false)} disabled={loading || quantity <= 1} aria-label="delete" color="error">
                        <RemoveIcon />
                    </IconButton>
                    <input
                        type="number"
                        readOnly
                        value={value}
                        className="w-11 text-center border border-gray-300 rounded-md focus:ring focus:ring-primary-light"
                    />
                    <IconButton disabled={loading}
                        onClick={() => handleQuantityChange(true)} color="success" aria-label="add to shopping cart">
                        <AddIcon />
                    </IconButton>
                </div>

                <div className="w-full sm:w-1/6 flex items-center justify-center">
                    <button className="bg-primary text-white px-3 py-1 rounded-md shadow-md">
                        {quantity}
                    </button>
                </div>

                <div className="w-full sm:w-1/12 flex justify-center">
                    <IconButton
                        onClick={() => handleDeleteFromCart(cart_id)}
                        className="text-primary-light hover:text-primary-dark"
                    >
                        <DeleteIcon sx={{ color: "#fb8263" }} />
                    </IconButton>
                </div>
                <Tooltip title="Add note">
                    <IconButton onClick={handleOpenNoteModel}>
                        <NoteAddIcon sx={{ color: "black" }} />
                    </IconButton>
                </Tooltip>
            </div>
            {openModal && addNote && <AddNote isModalOpen={isModalOpen} setAddNote={setAddNote} />}
        </>
    );
}

const Cart = () => {
    const [user, setUser] = useState(null)
    const [addNote, setAddNote] = useState(false)
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

    // Round totalCartPrice to two decimal places
    const roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));

    // gst amount
    const gstAmount = (roundedTotalCartPrice * 0.18)
    // Add 18% tax/fee to the total price
    const totalPriceWithTax = roundedTotalCartPrice + gstAmount;

    // Round totalPriceWithTax to two decimal places
    const finalTotalPriceWithTax = parseFloat(totalPriceWithTax.toFixed(2));

    const handleCheckoutClick = () => {
        if (address?.result && cartItems.length > 0) {
            navigate('/payment')
        } else {
            dispatch(showAlert("please fill shipping address and add product", 'error'))
        }
    };

    return (
        <>
            {loading && <Spinner />}
            <section className="min-h-[100vh] bg-primary py-2 flex flex-col justify-start items-center gap-4">
                <div className='w-full flex justify-between items-center ss:px-10 px-5'>
                    <Navbar />
                </div>

                <main className="bg-secondary ss:w-[800px] w-full p-6 rounded-xl space-y-6 shadow-lg">
                    {uniqueCartItems.map((item) => {
                        return (
                            <CartItem
                                key={item.id}
                                title={item.title}
                                value={item.price}
                                img={item.image}
                                quantity={item.quantity}
                                cart_id={item.cart_id}
                                user_id={user?.id}
                                isModalOpen={isModalOpen}
                                addNote={addNote} setAddNote={setAddNote}
                            />
                        )
                    })}

                    <article className="space-y-3 mt-5 border-t pt-4">
                        <button
                            onClick={() => dispatch(openModal())}
                            className='px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300'>
                            Add Shipping Address
                        </button>

                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">Sub Total</h4>
                            <p className="text-lg font-bold">${roundedTotalCartPrice}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">18% GST included</span>
                            <span className="text-sm text-gray-600">${gstAmount}</span>
                        </div>

                        <div className='border-t'></div>

                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">Total</h4>
                            <p className="text-lg font-bold">${finalTotalPriceWithTax}</p>
                        </div>
                        <button
                            onClick={handleCheckoutClick}
                            className="w-full block text-center bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:bg-opacity-90 transition duration-300">
                            Checkout
                        </button>
                    </article>
                </main>
            </section>

            <div className='w-full'>
                <Footer />
            </div>

            {/* modal to add address modal */}
            {isModalOpen && !addNote && <ShippingDetail />}

        </>
    );
};

export default Cart;
