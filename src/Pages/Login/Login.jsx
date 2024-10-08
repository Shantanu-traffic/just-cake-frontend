import React, { useEffect, useState } from 'react'
import './Login.scss'
import { CakeHeroLogo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../Components/index.js';
import { openModal } from '../../Store/actions/modalActions.js';
import ViewOrderHistory from './ViewOrderHistory/ViewOrderHistory.jsx';
import Cookies from 'js-cookie';
import { showAlert } from '../../Store/actions/alertActionTypes.js';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../utils/commanFunctions.js';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_API_URL}/api/v1/user/login`, formData).then((res) => {
      console.log(res)
      if (res.data.success) {
        Cookies.set('user', JSON.stringify(res.data.result));
        dispatch(showAlert(res.data.message, 'success'))
        navigate('/')
      } else if (!res.data.success) {
        dispatch(showAlert(res.data.message, 'error'))
      }
    }).catch((err) => {
      dispatch(showAlert(err.response.data.message, 'error'))
    })
  };

  useEffect(() => {
    const userCookie = Cookies.get('user');

    if (userCookie) {
      // If the cookie exists, parse it
      const userData = JSON.parse(userCookie);
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    localStorage.removeItem('reduxState');
    dispatch(showAlert("Logout successfull", "success"))
    window.location.reload();
  }

  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

  const handleAuthClick = (err, res) => {
    // dispatch(login());
    window.open(
      `${BASE_API_URL}/auth/google/callback`,
      "_self"
    );
    console.log(res);


  };

  return (
    <>
      <section className="min-h-[100vh] p-2 bg-primary flex flex-col justify-center items-center">
        <div className="h-auto w-98 bg-secondary rounded-xl py-5 flex flex-col justify-center items-center gap-4">
          {user ? (
            <>
              <img className="w-[30%] h-[30%] cursor-pointer" onClick={() => navigate('/')} src={CakeHeroLogo} alt="logo" />
              <img
                className="w-[30%] h-[30%] rounded-full"
                src={user.profile_picture}
                alt={user.display_name}
              />
              <h1 className="text-white text-xl font-bold">Welcome, {user.display_name} Happy Cake!</h1>
              <p className="text-white">{user.email}</p>
              <button onClick={() => dispatch(openModal())} className='flex justify-center items-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-28 bg-white font-poppins font-medium text-black outline-none rounded-lg'>
                Order History
              </button>
              <button
                type="button" onClick={handleLogout}
                className="flex items-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-32 bg-white font-poppins font-medium text-black outline-none rounded-lg"
              >Logout</button>
            </>
          ) : (
            <>
              <img className="w-[20%] h-[20%]" src={CakeHeroLogo} alt="logo" />

              <div className="w-full max-w-sm mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl px-8 pt-4 pb-8 mb-2">
                  <h1 className="text-gray-700 text-xl font-semibold mb-4 text-center">Login</h1>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email" name='email' value={formData.email} onChange={handleChange}
                      placeholder="Enter your email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password" name='password'
                      id="password" value={formData.password}
                      placeholder="Enter your password" onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>

                  <p className='text-sm mt-2'>Create An Account <Link to={'/signup'} style={{ color: 'blue' }}>Sign Up</Link></p>

                </form>
                {/* <p className='text-white text-center'>Or</p> */}
                <button
                  type="button"
                  onClick={handleAuthClick}
                  className="flex items-center justify-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-4 bg-white font-poppins font-medium text-black outline-none rounded-lg w-full mt-4"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.9 0 7 1.5 9.6 4l7.1-7.1C36.4 2.5 30.6 0 24 0 14.5 0 6.6 5.9 3.1 14.4l8.4 6.5C13.7 14 18.4 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M46.1 24.6c0-1.4-.1-2.7-.3-4H24v8.1h12.4c-.6 3-2.4 5.6-5 7.3l7.7 6c4.4-4.1 7-10.2 7-17.4z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M12.6 28.7c-1-3-.1-6.3 2.4-8.4l-8.4-6.5c-3.2 6.4-3.2 14.1 0 20.5l8.4-6.5c-1.1-1.2-2-2.8-2.4-4.6z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M24 48c6.5 0 12-2.1 16-5.7l-7.7-6c-2.2 1.5-5 2.5-8.3 2.5-5.5 0-10.2-3.5-11.9-8.4l-8.4 6.5C6.6 42 14.5 48 24 48z"
                    ></path>
                  </svg>
                  Log In With Google
                </button>
              </div>
            </>
          )}
        </div>
      </section >
      {isModalOpen && <ViewOrderHistory isModalOpen={isModalOpen} user={user} />}
    </>
  );
};


export default Login
