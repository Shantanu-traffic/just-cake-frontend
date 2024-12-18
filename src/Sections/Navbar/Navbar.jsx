import React, { useEffect, useState } from 'react'
import { MobNavLinks, navLinks } from '../../Constants/Data'
import { close, menu, cakeLogoWhite, cakeLogo, heroLogo } from '../../assets'
import './Navbar.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { showAlert } from '../../Store/actions/alertActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems } from '../../Store/actions/getAllCartActions';
import { Styles } from '../../Styles';

const Navbar = () => {
    const [toggle, settoggle] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state?.cartItems.cartItems)
    const cartCount = cartItems?.length;
    let user = null;
    let isAdmin = false;

    const userCookie = Cookies.get('user');
    if (userCookie) {
        try {
            const parsedUserCookie = JSON.parse(userCookie);
            user = parsedUserCookie;
            isAdmin = parsedUserCookie?.is_admin
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    useEffect(() => {
        dispatch(getAllCartItems(user?.id))
    }, [])

    const handleLogout = () => {
        Cookies.remove('user');
        localStorage.removeItem('reduxState');
        dispatch(showAlert("Logout successfull", "success"))
        // window.location.reload();
        navigate('/');
    }

    return (
        <>
            <nav className={` ${Styles.paddingX} navbar w-full flex justify-between items-center ss:py-0 bg-white`}>
                <div className='flex justify-center items-center'>
                    <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img onClick={() => navigate('/')} className=' cursor-pointer ' src={heroLogo} alt='cakelogo' />
                        {/* <img onClick={() => navigate('/')} className=' cursor-pointer ' src={cakeLogo} alt='cakelogo' />/ */}
                    </div>
                    {/* <h1 className=' py-0 ml-2 font-satisfy text-black font-semibold ss:text-[1.6rem] text-[1.1rem] ss:leading-[100px]'>
                        Cakes Crafts
                    </h1> */}
                </div>

                {/* Main navigation links */}
                <ul className='py-0 font-bold ms:flex hidden list-none justify-end items-center flex-1 gap-10 ss:text-[1.3rem] text-[1.1rem] ss:leading-[100px]'>
                    <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={"/"}>Home</a>
                    {!isAdmin && cartItems.length > 0 && (
                        <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={"/order"}>
                            Cart ({cartCount})
                        </a>
                    )}
                    {!isAdmin && <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={location.pathname === '/' ? "/#contactus" : "/requestOrder"}>Contact Us</a>}
                    {isAdmin && <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={"/orders"}>Order</a>}
                    {isAdmin && <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={"/admin"}>Product</a>}
                    {user == null && <a className="font-satisfy font-bold cursor-pointer text-black mr-10" href={"/login"}>
                        Login
                    </a>}
                    {user && (
                        <li >
                            <Avatar
                                alt={user.display_name}
                                src={user.profile_picture}
                                onClick={() => navigate('/login')}
                                style={{ cursor: 'pointer', border: "1px solid grey" }}
                            />
                        </li>
                    )}
                    {user && <li onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <LogoutIcon style={{ color: 'black' }} />
                        <span className="font-satisfy font-bold cursor-pointer text-black ml-2"></span>
                    </li>}
                </ul>

                {/* Mobile menu toggle */}
                <div className='ms:hidden flex flex-1 justify-end items-center cursor-pointer'>
                    <img src={toggle ? close : menu} alt='menu' className='text-black bg-black' onClick={() => settoggle((prev) => !prev)} />
                </div>

                {/* Mobile navigation links */}
                <div className={`ms:hidden block sidebar ${toggle ? "flex" : "hidden"} p-3 bg-white rounded-xl absolute top-20 right-0 min-w-[6rem] mx-4 my-2`}>
                    <ul className='flex flex-1 flex-col list-none justify-center items-start'>
                        <a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={"/"}>Home</a>
                        {!isAdmin && cartItems.length > 0 && (<a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={"/order"}>Cart ({cartCount})</a>)}
                        {!isAdmin && <a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={location.pathname === '/' ? "/#contactus" : "/requestOrder"}>Contact Us</a>}
                        {isAdmin && <a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={"/orders"}>Order</a>}
                        {isAdmin && <a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={"/admin"}>Product</a>}
                        {user == null && <a className="font-satisfy font-normal cursor-pointer text-black mr-10" href={"/login"}>
                            Login
                        </a>}
                        {user && (
                            <li >
                                <Avatar
                                    alt={user.display_name}
                                    src={user.profile_picture}
                                    onClick={() => navigate('/login')}
                                    style={{ cursor: 'pointer' }}
                                />
                            </li>
                        )}
                        {user && <li onClick={handleLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <LogoutIcon style={{ color: 'black' }} />
                            <span className="font-satisfy font-normal cursor-pointer text-black ml-2"></span>
                        </li>}
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default Navbar
