import React from 'react'
import { mail, call, location } from "../../assets"

const Info = () => {
  return (
    <section className='w-full bg-white ss:h-[30vh] h-[40vh] flex ss:flex-row flex-col justify-evenly items-center'>
      <a href="">
        <div className="w-[250px] flex items-center text-center mt-8 flex-1">
          <div className="w-[60px] mr-2">
            <img src={call} alt="call" />
          </div>
          <div className="text-gray-700">
            <p className="m-0">
              +02 1234567890
            </p>
          </div>
        </div>
      </a>

      <a href="">
        <div className="w-[250px] flex items-center text-center mt-8 flex-1">
          <div className="w-[60px] mr-2">
            <img src={mail} alt="mail" />
          </div>
          <div className="text-gray-700">
            <p className="m-0">
              demo@gmail.com
            </p>
          </div>
        </div>
      </a>

      <a href="">
        <div className="w-[250px] flex items-center text-center mt-8 flex-1">
          <div className="w-[60px] mr-2">
            <img src={location} alt="location" />
          </div>
          <div className="text-gray-700">
            <p className="m-0">
              Location
            </p>
          </div>
        </div>
      </a>
    </section>
  )
}

export default Info
