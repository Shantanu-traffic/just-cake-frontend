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
import { useState } from 'react';
import Cookies from 'js-cookie';
import { showAlert } from '../../Store/actions/alertActionTypes';
import { Spinner } from '../../Components';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddNote from './AddNote/AddNote';
import { placeOrder } from '../../Store/actions/orderPlaceActions';
import { updateCartQuantity } from '../../Store/actions/cartIncDecAction';
import { BASE_API_URL, generateOrderDate } from '../../utils/commanFunctions';
import axios from 'axios';
import { yellow } from '@mui/material/colors';


const CartItem = ({ value, title, img, quantity, cart_id, user_id, isModalOpen, addNote, setAddNote, product_id, note}) => {
    const [cartQuantity, setCartQuantity] = useState(quantity);
    const [noteCartId, setCartId] = useState(null);
    const [notes, setNotes] = useState('')
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

    const handleOpenNoteModel = (cart_id) => {
        console.log("id get", cart_id)
        setCartId(cart_id)
        dispatch(openModal())
        setAddNote(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            cart_id,
            note: notes
        }
        try {
            const result = await axios.patch(`${BASE_API_URL}/api/v1/cart/update-cart`, payload)

            if(result.data.success){
                dispatch(showAlert("Notes added succesffully", "success"))
                dispatch(getAllCartItems(user_id))
            }
            console.log("result data", result.data)
        } catch (error) {
            console.log("error found in frontend", error)
        }

    }

    useEffect(() => {
     setNotes(note)
    }, [])

    return (
        <div className='flex flex-col w-full bg-white p-2 rounded-xl'>
            <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 p-4 gap-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center gap-4 w-full sm:w-3/5">
                    <img src={img} alt={title} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                    <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
                </div>

                <div className="flex gap-2 items-center justify-center w-full sm:w-1/4">
                    <IconButton onClick={() => handleQuantityChange(false)} disabled={loading || quantity <= 1} aria-label="delete" color="error">
                        <RemoveIcon />
                    </IconButton>
                    <input
                        type="number"
                        readOnly
                        value={quantity}
                        className="w-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light"
                    />
                    <IconButton disabled={loading} onClick={() => handleQuantityChange(true)} color="success" aria-label="add to shopping cart">
                        <AddIcon />
                    </IconButton>
                </div>

                <div className="w-full sm:w-1/6 flex items-center justify-center">
                    <button className="bg-[#fb8263] text-white px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90 transition-all">
                        ${value}
                    </button>
                </div>

                <div className="w-full sm:w-1/12 flex justify-center">
                    <IconButton onClick={() => handleDeleteFromCart(cart_id)} className="hover:text-primary-dark">
                        <DeleteIcon sx={{ color: "#fb8263" }} />
                    </IconButton>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
                <input
                    type="text" value={notes}
                    className="w-full border-2 border-[#fb8263] rounded-md p-2 focus:outline-none focus:border-[#fdc5b1] transition-all"
                    placeholder="Add your note here..."
                    onChange={(e) => setNotes(e.target.value)}
                />
                <button
                    type="submit" disabled={!notes && true} style={{background: !notes ? 'grey' : "#fb8263" }}
                    className="text-white px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90 transition-all"
                >
                    Add
                </button>
            </form>
            {openModal && addNote && <AddNote isModalOpen={isModalOpen} setAddNote={setAddNote} noteCartId={noteCartId} />}
        </div>
    );
}

export const Cart = () => {
    const [user, setUser] = useState(null)
    const [addNote, setAddNote] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const TAX_RATE = 0.18;

    useEffect(() => {
        const userCookie = Cookies.get('user');

        if (userCookie) {
            try {
                const userData = JSON.parse(userCookie);
                setUser(userData);
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);


    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

    useEffect(() => {
        if (user?.id) {
            dispatch(getAllCartItems(user?.id));
        }
    }, [dispatch, user]);

    let { cartItems, loading, error } = useSelector((state) => state.cartItems);


    const { address } = useSelector((state) => state.shippingAddress);

    // Remove duplicate cart items based on product_id or any other unique property
    const uniqueCartItems = cartItems.filter((item, index, self) =>
        index === self.findIndex(t => t.product_id === item.product_id)
    );

    // const uniqueCartItems = cartItems.reduce((acc, current) => {
    //     const x = acc.find(item => item.product_id === current.product_id);
    //     if (!x) {
    //         return acc.concat([current]);
    //     } else {
    //         return acc;
    //     }
    // }, []);

    // Calculate the total price by summing up price * quantity for each item
    const totalCartPrice = uniqueCartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
    }, 0);

    // Round totalCartPrice to two decimal places
    const roundedTotalCartPrice = parseFloat(totalCartPrice.toFixed(2));

    // gst amount
    const gstAmount = parseFloat((roundedTotalCartPrice * TAX_RATE).toFixed(2));
    // Add 18% tax/fee to the total price
    const totalPriceWithTax = roundedTotalCartPrice + gstAmount;

    // Round totalPriceWithTax to two decimal places
    const finalTotalPriceWithTax = parseFloat(totalPriceWithTax.toFixed(2));

    const handleCheckoutClick = () => {
        if (address?.result && cartItems.length > 0) {
            const orderData = {
                user_id: user?.id,
                order_date: generateOrderDate(),
                total_amount: finalTotalPriceWithTax,
                order_status: "pending",
                shipping_address_id: address?.result,
                billing_address_id: address?.result,
                products: cartItems
            };
            dispatch(placeOrder(orderData))
                .then((res) => {
                    navigate('/payment');
                })
                .catch((err) => {
                    console.error('Order Failed:', err);
                    dispatch(showAlert("Order failed. Please try again later.", 'error'));
                });
        } else {
            dispatch(showAlert("items in cart and shipping address is must", "error"))
        }
    }


    return (
        <>
            {/* {loading && <Spinner />} */}
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
                                product_id={item.product_id}
                                user_id={user?.id}
                                note={item.note}
                                isModalOpen={isModalOpen}
                                addNote={addNote} setAddNote={setAddNote}
                            />
                        )
                    })}

                    <article className="space-y-3 mt-5 border-t pt-4">
                        <button
                            onClick={() => dispatch(openModal())}
                            className='px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300'>
                            Add Shipping Address*
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
