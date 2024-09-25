import React from 'react';
import { Link } from "react-router-dom";
import { cakeLogo, logo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../Store/actions/modalActions';
import Navbar from '../../Sections/Navbar/Navbar'
import Footer from '../../Sections/Footer/Footer'
import { ShippingDetail } from './ShippingDetail/ShippingDetail';

const CartItem = ({ value, title, img, increment, decrement }) => (
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
    </div>
);

const Cart = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
    console.log(isModalOpen)
    const increment = (item) => { /* Handle increment */ };
    const decrement = (item) => { /* Handle decrement */ };

    return (
        <>
            <section className="min-h-[100vh] bg-primary py-2 flex flex-col justify-center items-center gap-4">
                <div className='w-full flex justify-between items-center ss:px-10 px-5'>
                    <Navbar />
                </div>
                <main className="bg-secondary ss:w-[800px] w-full p-4 rounded-xl space-y-6">
                    <CartItem title={"Cheese Burger"} img={cakeLogo} value={0}
                        increment={() => increment(1)}
                        decrement={() => decrement(1)}
                    />
                    <CartItem title={"Veg Burger"} img={logo} value={0}
                        increment={() => increment(2)}
                        decrement={() => decrement(2)}
                    />
                    <CartItem title={"Chicken Burger"} img={cakeLogo} value={0}
                        increment={() => increment(3)}
                        decrement={() => decrement(3)}
                    />
                    <CartItem title={"Cheese Burger"} img={cakeLogo} value={0}
                        increment={() => increment(1)}
                        decrement={() => decrement(1)}
                    />
                    <CartItem title={"Veg Burger"} img={logo} value={0}
                        increment={() => increment(2)}
                        decrement={() => decrement(2)}
                    />
                    <CartItem title={"Chicken Burger"} img={cakeLogo} value={0}
                        increment={() => increment(3)}
                        decrement={() => decrement(3)}
                    />

                    <article className="space-y-3 mt-5 border-t pt-4">
                        <button onClick={() => dispatch(openModal())} className='px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                            Add shipping Address
                        </button>
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Sub Total</h4>
                            <p>₹2000</p>
                        </div>
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Tax</h4>
                            <p>₹{2000 * 0.18}</p>
                        </div>
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Shipping Charges</h4>
                            <p>₹200</p>
                        </div>
                        <div className="flex justify-between">
                            <h4 className="text-lg font-semibold">Total</h4>
                            <p>₹{2000 + 2000 * 0.18 + 200}</p>
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
