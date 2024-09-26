import React, { useRef } from 'react'
import { Styles } from './Styles'
import './App.css'
import { Navbar, HeroBanner, CheifSection, Footer, Info, Product } from './Sections'
import Contact from './Pages/Contact/Contact'


const Home = () => {
    const cheifSectionRef = useRef(null);
    const scrollToCakesRef = useRef(null)
    // Function to handle scroll to CheifSection
    const scrollToCheifSection = () => {
        if (cheifSectionRef.current) {
            cheifSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToCakes = () => {
        if (scrollToCakesRef.current) {
            scrollToCakesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className=' bg-primary  w-full overflow-hidden flex flex-col gap-[3rem] '>
                <div className='hero_area w-full overflow-hidden flex flex-col gap-[3rem] '>
                    <div className={`${Styles.paddingX}  ${Styles.flexCenter} `} >
                        <div className={`${Styles.boxWidth}`} >
                            <Navbar />
                        </div>
                    </div>
                    <div className={`${Styles.paddingX}  ${Styles.flexCenter} `} >
                        <div className={`${Styles.boxWidth}`} >
                            <HeroBanner scrollToCheifSection={scrollToCheifSection} scrollToCakes={scrollToCakes} />
                        </div>
                    </div >
                </div>
                <div className={`${Styles.paddingX}  ${Styles.flexCenter} `} ref={cheifSectionRef}>
                    <div className={`${Styles.boxWidth}`} >
                        <CheifSection />
                    </div>
                </div >
                <div className={` ${Styles.flexCenter} `} ref={scrollToCakesRef}>
                    <div className={`${Styles.boxWidth}`} >
                        <Product />
                    </div>
                </div >

                <div className={`${Styles.paddingX} ${Styles.flexCenter} `}>
                    <div className={`${Styles.boxWidth}`} >
                        <Contact />
                    </div>
                </div >

                <div className={`${Styles.flexCenter} `} >
                    <div className={`${Styles.boxWidth}`} >
                        <Info />
                        <Footer />
                    </div>
                </div >
            </div >
        </>
    )
}

export default Home