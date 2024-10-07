import React, { useEffect, useState } from 'react';
// import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Store/actions/cartActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';
import { Tooltip } from '@mui/material';

const ProductCard = ({ itemNum, cakeSrc, itemPrice, title, description, category, id }) => {
    console.log(title, "title")
    const [disabledCart, setDisabledCart] = useState(false);
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartItems);

    let user_Id = null;
    const userCookie = Cookies.get('user');
    if (userCookie) {
        try {
            const parsedUserCookie = JSON.parse(userCookie);
            user_Id = parsedUserCookie.id;
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    // Function to check if a product is already in the cart
    const isProductInCart = (productId) => {
        if (Array.isArray(cartItems)) {
            return cartItems.some(cartItem => cartItem?.product_id === productId);
        }
        return false;
    };

    useEffect(() => {
        setDisabledCart(isProductInCart(id));
    }, [cartItems, id]); // Recalculate when cartItems or product id changes

    const handleAddToCart = () => {
        if (user_Id) {
            const productId = id;
            const userId = user_Id;
            const quantity = 1;
            const total_price = itemPrice * quantity;
            dispatch(addToCart(productId, userId, quantity, total_price));
            dispatch(showAlert("Item added into cart successfully", "success"));
        } else {
            dispatch(showAlert("You must be logged in", "warning"));
        }
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 9 ? words.slice(0, 9).join(' ') + '...' : description;
    };

    return (
        <>
            <section className=' h-[34rem] w-[22rem] bg-white flex flex-col justify-start items-center gap-2 p-2 rounded-xl shadow-xl'>
                <div className='h-[20rem] w-full flex justify-center items-center'>
                    <img width={"60%"} src={cakeSrc} alt={itemNum} />
                </div>
                <div className='h-[3rem] w-[90%]'>
                    <p className='text-gray-600'>
                        Cake: <span className='font-semibold text-black'>{title}</span>
                    </p>
                </div>
                <div className='h-[4rem] w-[90%]'>
                    <Tooltip sx={{ background: "white", color: "black", height: "30%" }} title={description} arrow>
                        <p className='text-gray-600'>
                            Description: <span className='font-medium text-black'>{truncateDescription(description)}</span>
                        </p>
                    </Tooltip>
                </div>
                <div className='h-[1.5rem] w-[90%]'>
                    <p className='font-thin'>
                        Category: <strong>{category}</strong>
                    </p>
                </div>
                <div className='h-[1.5rem] w-[90%]'>
                    <p className='text-left text-gray-600'>
                        Price: <strong className='text-black'>${itemPrice}</strong>
                    </p>
                </div>
                <div className='h-[3rem] w-[90%] flex justify-center items-center bg-primary rounded-lg text-white'>
                    <button id='addtocartbtn'
                        disabled={disabledCart}
                        onClick={handleAddToCart}
                        className="flex justify-center items-center gap-2"
                    >
                        {disabledCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </section>
        </>
    );
};

export default ProductCard;


{/* <div className='menuCard'>
    <main>
        <div className='w-full' style={{ width: "100px", height: "100px" }}>
            <img src={cakeSrc} alt={itemNum} />
        </div>
        <div className='prd-texts w-full space-y-2'>
            <p className='text-gray-600'>
                Cake: <span className='font-semibold text-black'>{title}</span>
            </p>
            <Tooltip sx={{ background: "white", color: "black", height: "30%" }} title={description} arrow>
                <p className='text-gray-600'>
                    Description: <span className='font-medium text-black'>{truncateDescription(description)}</span>
                </p>
            </Tooltip>
            <p className='font-thin'>
                Category: <strong>{category}</strong>
            </p>
            <p className='text-left text-gray-600'>
                Price: <strong className='text-black'>${itemPrice}</strong>
            </p>
        </div>

    </main >
    <div className='w-full p-4'>
        <button id='addtocartbtn'
            disabled={disabledCart}
            onClick={handleAddToCart}
            className="flex justify-center items-center gap-2"
        >
            {disabledCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
    </div>
</div > */}
