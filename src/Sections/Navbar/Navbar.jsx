import React, { useState } from 'react'
import { MobNavLinks, navLinks } from '../../Constants/Data'
import { close, menu, logo, cakeLogo } from '../../assets'
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [toggle, settoggle] = useState(false);
    let user = null;
    const userCookie = Cookies.get('user');
    if (userCookie) {
        try {
            const parsedUserCookie = JSON.parse(userCookie);
            user = parsedUserCookie; // assuming `id` is a field in the parsed object
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }
    const navigate = useNavigate();
    // Updated navLinks based on whether the user is logged in or an admin
    const dynamicNavLinks = [
        ...navLinks.filter(item => user || item.id !== 'login'), // Show login link only if user is null
        ...(user?.is_admin ? [{ id: 'admin', title: 'Admin' }] : []), // Add admin link if user is admin
    ];

    return (
        <>
            <nav className='navbar w-full flex justify-between items-center ss:py-0'>
                <div style={{ width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={cakeLogo} alt='cakelogo' />
                </div>
                <h1 className=' py-0 ml-2 font-satisfy text-white font-semibold ss:text-[1.6rem] text-[1.1rem] ss:leading-[100px]'>
                    Just Cakes
                </h1>

                {/* Main navigation links */}
                <ul className='py-0 font-semibold ms:flex hidden list-none justify-end items-center flex-1 gap-10 ss:text-[1.3rem] text-[1.1rem] ss:leading-[100px]'>
                    {dynamicNavLinks.map((item, index) => (
                        <li key={item.id} className={`font-satisfy font-normal cursor-pointer text-white ${index === dynamicNavLinks.length - 1 ? "mr-0" : "mr-10"}`}>
                            <a href={item.id === 'contactus' ? `#${item.id}` : `${item.id}`}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                    {user == null && <a className="font-satisfy font-normal cursor-pointer text-white mr-10" href={"/login"}>
                        Login
                    </a>}
                    {/* Show Avatar if user exists */}
                    {user && (
                        <li >
                            <Avatar
                                alt={user.display_name}
                                src={user.profile_picture}
                                onClick={() => navigate('/login')} // Use navigate on click
                                style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                            />
                        </li>
                    )}
                </ul>

                {/* Mobile menu toggle */}
                <div className='ms:hidden flex flex-1 justify-end items-center cursor-pointer'>
                    <img src={toggle ? close : menu} alt='menu' className='text-white' onClick={() => settoggle((prev) => !prev)} />
                </div>

                {/* Mobile navigation links */}
                <div className={`ms:hidden block sidebar ${toggle ? "flex" : "hidden"} p-6 bg-white rounded-xl absolute top-20 right-0 min-w-[8rem] mx-4 my-2`}>
                    <ul className='flex flex-1 flex-col list-none justify-start items-center'>
                        {dynamicNavLinks.map((item, index) => (
                            <li key={item.id} className={`font-poppins font-normal cursor-pointer text-black text-[1rem] ${index === dynamicNavLinks.length - 1 ? "mr-0" : "mb-4"}`}>
                                <a href={item.id === 'contactus' ? `#${item.id}` : `${item.id}`}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                        {/* Show Avatar in mobile view */}
                        {user && (
                            <li>
                                <Avatar
                                    alt={user.display_name}
                                    src={user.profile_picture}
                                    onClick={() => navigate('/login')} // Use navigate on click
                                    style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default Navbar
