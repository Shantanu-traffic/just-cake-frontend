import React from 'react'
import { HeroLogo } from '../../assets'
import ProductCard from './ProductCard/ProductCard'

const Product = () => {
    return (
        <section className='w-full h-auto flex flex-wrap justify-center items-center gap-4'>
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of \."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, b"}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
                <ProductCard
                    itemNum={1}
                    cakeSrc={HeroLogo}
                    itemPrice={200}
                    tittle={"Aloo tiki burger"}
                    desc={"There are many variations of passages of Lorem Ipsum available, butdon't look even slightly believable."}
                    delay={0.1}
                />
        </section>
    )
}

export default Product
