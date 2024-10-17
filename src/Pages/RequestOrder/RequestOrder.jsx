import React from 'react'
import Contact from '../Contact/Contact'
import { Navbar } from '../../Sections'
import Footer from '../../Components/Footer/Footer'

const RequestOrder = () => {
    return (
        <section className='flex flex-col justify-center items-center gap-4'>
            <Navbar />
            <Contact />
            <Footer />
        </section>
    )
}

export default RequestOrder
