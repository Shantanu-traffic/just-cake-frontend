import React from 'react'
import Contact from '../../Pages/Contact/Contact'
import { Info } from '../../Sections'

const Footer = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className='w-1/2'>
                    <Contact />
                </div>
                <div className='w-1/2'>
                    <Info />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Footer
