import React from 'react'
import './Contact.scss'

const Contact = () => {
  return (
    <section className={`h-[70vh] bg-white p-4 flex justify-center items-center rounded-xl`}>
      <form className='h-[400px] w-[500px] bg-secondary rounded-xl flex flex-col justify-center items-center px-5   gap-5'>
        <h1 className='text-center ss:text-[1.5rem] text-[1.1rem]'>Contact Us</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Enter your mail"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:#fb8263 focus:border-transparent"
        />
        <textarea
          rows="4"
          placeholder="Your message"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:#fb8263 focus:border-transparent"
        ></textarea>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </section>
  )
}

export default Contact
