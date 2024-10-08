import React, { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/commanFunctions';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Store/actions/alertActionTypes';
import { Spinner } from '../../Components';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
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
        setLoading(true)
        // const response = await axios.post(`${BASE_API_URL}/api/v1/user/register`, formData).then(())
        try {
            const response = await axios.post(`${BASE_API_URL}/api/v1/user/register`, formData);
            console.log("Response: ", response.data);
            if (response.data.success) {
                setLoading(false)
                dispatch(showAlert(response.data.message, 'success'))
                navigate('/login')
            }
        } catch (error) {
            console.log("error", error)
            dispatch(showAlert(error.response.data.message, 'error'));
            setLoading(false)
        }
    };

    return (
        <>
            {loading ? <Spinner /> :
                <section className='w-full bg-primary flex flex-col justify-center items-center h-screen'>
                    <div className='h-auto w-full max-w-lg bg-secondary rounded-xl py-10 px-8 sm:px-10 lg:px-16 flex flex-col justify-center items-center gap-6'>
                        <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg max-w-md px-6 sm:px-8 lg:px-10 pt-6 pb-8">
                            <h1 className="text-black text-2xl font-semibold mb-6 text-center">Sign Up</h1>

                            <div className="mb-5">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-black font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </section>
            }
        </>
    );
}

export default SignUp;
