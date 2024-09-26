import React from 'react'
import './ProductCard.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Store/actions/cartActions';

const ProductCard = ({ itemNum, cakeSrc, itemPrice, tittle, description, category, id }) => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.auth.user);
    const user = {id:"1234"}
    const handleAddToCart = (id) => {
        const productId = id;
        const userId = user.id;
        const quantity = 1;
        const totalPrice = itemPrice * quantity;

        dispatch(addToCart(productId, userId, quantity, totalPrice));
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
