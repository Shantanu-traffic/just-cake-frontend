import React from 'react'
import Contact from '../../Pages/Contact/Contact'
import { Info } from '../../Sections'

const Footer = () => {
    return (
        <>
            <div className='w-full flex ss:flex-row flex-col justify-center items-center'>
                <div className='ss:w-1/2 w-full'>
                    <Contact />
                </div>
                <div className='ss:w-1/2 w-full'>
                    <Info />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Footer
