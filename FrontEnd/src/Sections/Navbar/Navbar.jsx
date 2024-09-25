import React, { useState } from 'react'
import { MobNavLinks, navLinks } from '../../Constants/Data'
import { close, menu, logo, cakeLogo } from '../../assets'
import './Navbar.scss'

const Navbar = () => {
    const [toggle, settoggle] = useState(false)
    return (
        <>
            <nav className='navbar w-full flex justify-between items-center ss:py-0'>
                <div style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={cakeLogo} alt='cakelogo' />
                </div>
                <h1 className=' py-0 ml-2 font-satisfy text-white font-semibold ss:text-[1.6rem] text-[1.1rem] ss:leading-[100px]'>
                    Just Cakes
                </h1>
                <ul className=' py-0 font-semibold ms:flex hidden list-none justify-end items-center flex-1 gap-10 ss:text-[1.3rem] text-[1.1rem] ss:leading-[100px]'>
                    {
                        navLinks.map((item, index) => {
                            return (
                                <li key={item.id} className={` font-satisfy font-normal cursor-pointer text-white ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} `}>
                                    <a className='' href={`${item.id}`}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='ms:hidden flex flex-1 justify-end items-center cursor-pointer '>
                    <img src={toggle ? close : menu} alt='menu' className='text-white' onClick={() => settoggle((prev) => (!prev))} />
                </div>
                {/* Navbar list in mobile toggle view */}
                <div className={`ms:hidden block sidebar ${toggle ? "flex" : "hidden"} p-6 bg-white rounded-xl absolute top-20 right-0 min-w-[8rem] mx-4 my-2 `} >
                    <ul className=' flex flex-1 flex-col list-none justify-start items-center '>
                        {
                            MobNavLinks.map((item, index) => {
                                return (
                                    <li key={item.id} className={` font-poppins font-normal cursor-pointer text-black text-[1rem] ${index === navLinks.length - 1 ? "mr-0" : "mb-4"} `}>
                                        <a className='' href={`${item.id}`}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div >
            </nav >
        </>
    )
}

export default Navbar
