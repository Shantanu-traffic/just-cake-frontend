import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { cakeLogo, logo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../Store/actions/modalActions';
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import { ShippingDetail } from './ShippingDetail/ShippingDetail';
import { Button } from '@mui/material';
import { deleteFromCart } from '../../Store/actions/deleteCartActions';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';

const cartData = [{
    id: "05edc841-2c14-4f83-ace2-5a16eb5a4a54",
    user_id: "031f8241-46ee-421e-a999-86c723f3789d",
    product_id: "05edc841-2c14-4f83-ace2-5a16eb5a4a54",
    quantity: 2,
    total_price: "1500.00",
    created_at: "2024-09-24T11:19:42.404Z",
    updated_at: "2024-09-24T11:19:42.404Z",
    title: "first time update product",
    description: "Testing Products",
    price: "1200.00",
    image: "https://handletheheat.com/wp-content/uploads/2015/03/Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.jpg",
    created_by: "031f8241-46ee-421e-a999-86c723f3789d",
    stock: 6,
    category: "New Launch"
}]


const CartItem = ({ value, title, img, increment, decrement, product_id }) => {
    const dispatch = useDispatch();

    const handleDeleteFromCart = (product_id) => {
        const productId = product_id;
        dispatch(deleteFromCart(productId));
    };

    return (
        <div className="flex ss:flex-row flex-col justify-between items-center border-b p-4 gap-4 bg-white rounded-xl">
            <div className="flex items-center space-x-4">
                <img src={img} alt={title} className="w-16 h-16 object-cover rounded-lg" />
                <h4 className="text-lg font-semibold">{title}</h4>
            </div>
            <div className="flex items-center space-x-3">
                <button onClick={decrement} className="bg-black text-white px-2 py-1 rounded-lg">-</button>
                <input type="number" readOnly value={value} className="w-12 text-center border border-gray-300 rounded-lg" />
                <button onClick={increment} className="bg-black text-white px-2 py-1 rounded-lg">+</button>
            </div>
            <Button variant='outlined' onClick={() => handleDeleteFromCart(product_id)}>Remove</Button>
        </div>
    );
}

const Cart = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
    // const user = useSelector((state) => state.auth);
    const user = { id: '031f8241-46ee-421e-a999-86c723f3789d' };

    useEffect(() => {
        dispatch(getAllCartItems(user.id)); // Dispatch the action to fetch all cart items
    }, [dispatch, user]);

    // Calculate the total price by summing up price * quantity for each item
    const totalCartPrice = cartData.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.quantity);
    }, 0);

    const { cartItems, loading, error } = useSelector((state) => state.cart);
    const increment = (item) => { /* Handle increment */ };
    const decrement = (item) => { /* Handle decrement */ };

    return (
        <>
            <section className="min-h-[100vh] bg-primary py-2 flex flex-col justify-center items-center gap-4">
                <div className='w-full flex justify-between items-center ss:px-10 px-5'>
                    <Navbar />
                </div>
                <main className="bg-secondary ss:w-[800px] w-full p-4 rounded-xl space-y-6">
                    {cartData.map((item) => {
                        return (
                            <CartItem key={item.id} value={item.price} title={item.title} img={item.image} increment={increment} decrement={decrement} product_id={item.product_id} />
                        )
                    })}
                    <article className="space-y-3 mt-5 border-t pt-4">
                        <button onClick={() => dispatch(openModal())} className='px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                            Add shipping Address
                        </button>
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
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Total</h4>
                            <p>₹{totalCartPrice}</p>
                        </div>

                        <Link to="/login" className="block text-center bg-primary text-white py-2 px-4 rounded-lg mt-4">
                            Checkout
                        </Link>
                    </article>
                </main>
                <div className='w-full'>
                    <Footer />
                </div>
            </section>
            {/* modal to add address modal */}
            {isModalOpen && <ShippingDetail />}
        </>
    );
};

export default Cart;
