import React from 'react'
import './ProductCard.scss'

const ProductCard = ({ itemNum, cakeSrc, itemPrice, tittle, desc }) => {
    return (
        <div className='menuCard'>
            <main>
                <img src={cakeSrc} alt={itemNum} />
                <h5>Price{itemPrice}</h5>
                <p>{tittle}</p>
                <p>{desc}</p>
                <button onClick={() => handler(itemNum)} className="flex items-center gap-2">
                    Add to Cart
                </button>
            </main>
        </div>
    )
}

export default ProductCard
