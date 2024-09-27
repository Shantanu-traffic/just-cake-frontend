import React, { useEffect, useState } from 'react'
import { HeroLogo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard/ProductCard'
import { getProducts } from '../../Store/actions/getAllProductsAction';
// import { getProducts } from '../../Store/actions/getAllProductsAction';
// import { products } from '../../Constants/Data';

const Product = ({ user }) => {
    const [offSet, setOffSet] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts(offSet));
    }, [dispatch]);

    const { loading, products, error } = useSelector((state) => state?.product);
    const handleNext = () => {
        setOffSet((prev) => prev + 1); // Increment offSet for next page
    };

    const handlePrev = () => {
        if (offSet > 1) {
            setOffSet((prev) => prev - 1); // Decrement offSet for previous page
        }
    }
    console.log(offSet);
    return (
        <>
            <section className='w-full h-auto flex flex-wrap justify-center items-center gap-4'>
                {loading && <p>Loading products...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {products?.map((product, index) => (
                    <ProductCard
                        key={product.title}
                        id={product.id}
                        category={product.category}
                        itemNum={index + 1}
                        cakeSrc={product.image}
                        itemPrice={product.price}
                        title={product.title}
                        description={product.description}
                    />
                ))}
            </section>
            <div className=" flex justify-center items-center gap-5 mt-4">
                <button
                    onClick={handlePrev}
                    disabled={offSet === 1}
                    className="bg-white text-black px-4 py-2 rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className="bg-white text-black px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Product
