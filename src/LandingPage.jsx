import React, { useEffect, useRef, useState } from 'react'
import { Styles } from './Styles'
import './App.css'
import { Navbar, HeroBanner, CheifSection, Info, Product } from './Sections'
import Cookies from 'js-cookie';
import Footer from './Components/Footer/Footer.jsx';
import Contact from './Pages/Contact/Contact.jsx';

const LandingPage = () => {
    const [user, setUser] = useState(null)
    const cheifSectionRef = useRef(null);
    const scrollToCakesRef = useRef(null)
    useEffect(() => {
        const userCookie = Cookies.get('user');  // Get the cookie value

        if (userCookie) {
            // If the cookie exists, parse it
            const userData = JSON.parse(userCookie);
            setUser(userData);
        } else {
            // If the cookie doesn't exist, set user to null
            setUser(null);
        }
    }, [])
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
            <div className='bg-gray-100 w-full overflow-hidden flex flex-col gap-[3rem]'>
                <div className='hero_area w-full overflow-hidden flex flex-col gap-[3rem] '>
                    <div className={`${Styles.flexCenter} fixed top-0 left-0 w-full z-50 `} >
                        <div className={`${Styles.boxWidth}`} >
                            <Navbar />
                        </div>
                    </div>
                    <div className={`${Styles.paddingX} ${Styles.flexCenter} min-h-screen hero-banner-img`} >
                        <div className={`${Styles.boxWidth}`} >
                            <HeroBanner scrollToCheifSection={scrollToCheifSection} scrollToCakes={scrollToCakes} />
                        </div>
                    </div >
                </div>
                <div className={`${Styles.flexCenter} chef-banner-img `} ref={cheifSectionRef}>
                    <div className={`${Styles.boxWidth}`} >
                        <CheifSection />
                    </div>
                </div >
                <div className={` ${Styles.flexCenter} `} ref={scrollToCakesRef}>
                    <div className={`${Styles.boxWidth}`} >
                        <Product user={user} />
                    </div>
                </div >

                <div className={`${Styles.flexCenter} contact-banner-img`} >
                    <div className={`${Styles.boxWidth}`} >
                        <Contact />
                    </div>
                </div >

                <div className={`${Styles.flexCenter} `} >
                    <div className={`${Styles.boxWidth}`} >
                        <Footer />
                    </div>
                </div >
            </div >
        </>
    )
}

export default LandingPage