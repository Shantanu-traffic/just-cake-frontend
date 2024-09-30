import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Store/actions/cartActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';

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

    return (
        <div className='menuCard'>
            <main>
                <img src={cakeSrc} alt={itemNum} />
                <h5>Price: ${itemPrice}</h5>
                <p>{tittle}</p>
                <p>{category}</p>
                <p>{description}</p>
                <button
                    disabled={disabledCart}
                    onClick={handleAddToCart}
                    className="flex justify-center items-center gap-2"
                >
                    {disabledCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </main>
        </div>
    );
};

export default ProductCard;
