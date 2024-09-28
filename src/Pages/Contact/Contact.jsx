import React, { useState } from 'react'
import './Contact.scss'
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Store/actions/alertActionTypes';

const Contact = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add validation and process the form data
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required");
      return;
    }
    dispatch(showAlert("Form submited successfuly, Thank you!"))
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }
  return (
    <section className={`h-[80vh] bg-white p-4 flex justify-center items-center rounded-xl`} id='contactus'>
      <form onSubmit={handleSubmit} className='h-[400px] w-[500px] bg-secondary rounded-xl flex flex-col justify-center items-center px-5 gap-5'>
        <h1 className='text-center ss:text-[1.5rem] text-[1.1rem]'>Contact Us</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#fb8263 focus:border-transparent"
        />

        <textarea
          name="message"
          rows="4"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#fb8263 focus:border-transparent"
        ></textarea>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Contact
