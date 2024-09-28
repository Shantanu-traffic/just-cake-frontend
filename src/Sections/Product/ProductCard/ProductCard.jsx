import React from 'react'
import './ProductCard.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Store/actions/cartActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';

const ProductCard = ({ itemNum, cakeSrc, itemPrice, tittle, description, category, id }) => {
    const dispatch = useDispatch();
    const { cartItems, loading, error } = useSelector((state) => state.cart)
    let user_Id = null;
    const userCookie = Cookies.get('user');
    // Safely parse userCookie if it exists
    if (userCookie) {
        try {
            const parsedUserCookie = JSON.parse(userCookie);
            user_Id = parsedUserCookie.id; // assuming `id` is a field in the parsed object
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    const handleAddToCart = (id) => {
        if (user_Id) {
            const productId = id;
            const userId = user_Id;
            const quantity = 1;
            const total_price = itemPrice * quantity;
            dispatch(addToCart(productId, userId, quantity, total_price));
            dispatch(showAlert("Item added into cart successfully", "success"))
        } else {
            dispatch(showAlert("You must be login", "success"))
        }
    };

    return (
        <div className='menuCard'>
            <main>
                <img src={cakeSrc} alt={itemNum} />
                <h5>Price{itemPrice}</h5>
                <p>{tittle}</p>
                <p>{category}</p>
                <p>{description}</p>
                <button onClick={() => handleAddToCart(id)} className="flex  justify-center items-center gap-2">
                    Add to Cart
                </button>
            </main>
        </div>
    )
}

export default ProductCard
