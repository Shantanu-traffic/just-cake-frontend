import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard/ProductCard'
import { getProducts } from '../../Store/actions/getAllProductsAction';
import { Spinner } from '../../Components';

const Product = () => {
    const [offSet, setOffSet] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts(offSet));
    }, [dispatch, offSet]);

    const { loading, products, error } = useSelector((state) => state?.allProduct);

    const handleNext = () => {
        setOffSet((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (offSet > 0) {
            setOffSet((prev) => Math.max(1, prev - 1));
        }
    }

    return (
        <>
            <section className='w-full bg-gray-100 h-auto flex flex-wrap justify-center items-center gap-4'>
                {loading && <Spinner />}
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
            <div className="bg-gray-100 flex justify-center items-center gap-5 mt-4">
                <button
                    onClick={handlePrev}
                    disabled={offSet === 1}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext} disabled={(!products || products.length < 10)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Product
