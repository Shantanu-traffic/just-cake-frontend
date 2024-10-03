import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Store/actions/cartActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';
import { Tooltip } from '@mui/material';

const ProductCard = ({ itemNum, cakeSrc, itemPrice, tittle, description, category, id }) => {
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
        return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
    };

    return (
        <div className='menuCard'>
            <main>
                <div className='w-full'>
                    <img src={cakeSrc} alt={itemNum} />
                </div>
                <p className='text-left'>Price: <strong>${itemPrice}</strong></p>
                <div className='prd-texts'>
                    <div className='w-full px-1'>
                        <p className=''>{tittle}</p>
                        <p>{category}</p>
                    </div >
                    <Tooltip sx={{ background: "white", color: "black", height: "30%" }} title={description} arrow>
                        <p>{truncateDescription(description)}</p>
                    </Tooltip>
                </div>
                <div className='w-full'>
                    <button id='addtocartbtn'
                        disabled={disabledCart}
                        onClick={handleAddToCart}
                        className="flex justify-center items-center gap-2"
                    >
                        {disabledCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProductCard;
