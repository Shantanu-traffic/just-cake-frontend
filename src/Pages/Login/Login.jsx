import React from 'react'
import './Login.scss'
import { CakeHeroLogo } from '../../assets'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/actions/authActions';
import { Spinner } from '../../Components/index.js';
import { openModal } from '../../Store/actions/modalActions.js';
import ViewOrderHistory from './ViewOrderHistory/ViewOrderHistory.jsx';


const Login = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
  console.log("isModalOpen", isModalOpen)
  const { loading, user, error } = useSelector((state) => state.auth);

  // const user = {
  //   id: '8766781b-6d44-41c1-8368-f89e34589e60',
  //   google_id: '104489160412937725357',
  //   email: 'faisal@traffic.net.nz',
  //   display_name: 'Md Faisal',
  //   profile_picture: 'https://lh3.googleusercontent.com/a/ACg8ocKkZKMn9Wv-zXwELId8rynNJgb0PSLLRrJXPPhZrSbbAUQUW_U=s96-c',
  //   is_admin: false
  // }
  const handleAuthClick = () => {
    dispatch(login());
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="min-h-[100vh] p-4 bg-primary flex flex-col justify-center items-center">
          <div className="h-auto w-96 bg-secondary rounded-xl py-5 flex flex-col justify-center items-center gap-4">
            {user ? (
              <>
                <img className="w-[30%] h-[30%]" src={CakeHeroLogo} alt="logo" />
                <img
                  className="w-[30%] h-[30%] rounded-full"
                  src={user.profile_picture}
                  alt={user.display_name}
                />
                <h1 className="text-white text-xl font-bold">Welcome, {user.display_name} Happy Cake!</h1>
                <p className="text-white">{user.email}</p>
                <button onClick={() => dispatch(openModal())} className='flex items-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-32 bg-white font-poppins font-medium text-black outline-none rounded-lg'>
                  View Order History
                </button>
                <button
                  type="button"
                  className="flex items-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-32 bg-white font-poppins font-medium text-black outline-none rounded-lg"
                >Logout</button>
              </>
            ) : (
              <>
                <img className="w-[30%] h-[30%]" src={CakeHeroLogo} alt="logo" />
                <h1 className="text-white text-xl font-bold">
                  Login with Google to continue
                </h1>
                <button
                  type="button"
                  onClick={handleAuthClick}
                  className="flex items-center transition delay-150 duration-300 ease-in-out mx-2 py-2 px-32 bg-white font-poppins font-medium text-black outline-none rounded-lg"
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
                  Google
                </button>
              </>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </section >
      )}
      {isModalOpen && <ViewOrderHistory isModalOpen={isModalOpen} />}
    </>
  );
};


export default Login
