import React, { useEffect, useState } from 'react'
import './HeroBanner.scss'
import { heroLogo } from '../../assets';

const HeroBanner = ({ scrollToCheifSection, scrollToCakes }) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        // Check if the screen width is below a certain threshold ()
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 620);
        };

        // Initial check
        handleResize();

        // Add a resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>

            < section className='flex flex-col justify-start mt-2 items-start ss:gap-5 gap-10' >
                <div className=' rounded-ful'>
                    <img src={heroLogo} className='h-28 w-28 rounded-full'  alt='logo' />
                </div>
                <h1 className=' p-0 text-white font-semibold ss:text-[3rem] text-[3.5rem] font-satisfy text-4xl'>Cake Crafts</h1>
                <p className=' p-0 text-white font-semibold ss:text-[1.5rem] text-[1.8rem] text-xl font-satisfy'>Cake Crafted with Love & Baked with Passion</p>
                <p className=' p-0 text-white font-semibold ss:text-[1.5rem] text-[1.8rem] text-xl font-satisfy'>We specialize in high quality protein & egglesss cakes</p>
                <div className='flex justify-center items-center gap-4'>
                    <button className='button-34' onClick={scrollToCakes}>
                        View Cakes
                    </button>
                    <button className='button-34' onClick={scrollToCheifSection}>
                        About our Chef
                    </button>
                </div>
            </section >
        </>

    )
}

export default HeroBanner

{/* <div className=' ss:h-[12%] h-[40%] ss:w-[12%] w-[40%]  animate-bounce flex flex-col justify-center align-center cursor-pointer' onClick={scrollToCheifSection}>
                <img src={HeroLogo} alt='cakeLogo'></img>
            </div> */}
