import React from 'react'
import { mail, call, location } from "../../assets"

const Info = () => {
  return (
    <section className='w-full bg-white ss:h-[80vh] h-[40vh] flex flex-col justify-evenly items-center'>
      <a href="">
        <div className=" flex justify-center items-center ">
          <div className="w-[60px] mr-2">
            <img src={call} alt="call" />
          </div>
          <div className="text-gray-700">
            <p className="m-0 font-semibold">
              +02 1234567890
            </p>
          </div>
        </div>
      </a>

      <a href="">
        <div className=" flex items-center text-center">
          <div className="w-[60px] mr-2">
            <img src={mail} alt="mail" />
          </div>
          <div className="text-gray-700">
            <p className="m-0 font-semibold">
              Cakesjst@gmail.com
            </p>
          </div>
        </div>
      </a>

      <a href="">
        <div className=" flex items-center text-center">
          <div className="w-[60px] mr-2">
            <img src={location} alt="location" />
          </div>
          <div className="text-gray-700">
            <p className="m-0 text-lg font-semibold">3 Hanover</p>
            <p className="m-0 text-lg font-semibold">Pahurere</p>
            <p className="m-0 text-lg font-semibold">Papakura</p>
            <p className="m-0 text-lg font-semibold">Auckland 2110</p>
          </div>
        </div>
      </a>
    </section>
  )
}

export default Info
