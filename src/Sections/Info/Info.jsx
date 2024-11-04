import React from 'react'
import { mail, location, whatsappLogo } from "../../assets"

const Info = () => {

  const openWhatsapp = () => {
    window.open('https://wa.me/+64211535957?text=Welcome %20 to %20 JustCakes!', '_blank')
  }
  return (
    <section className='w-full bg-gray-100 h-[40vh] flex ss:flex-row flex-col justify-evenly items-center'>
        <div className=" flex justify-center items-center cursor-pointer " onClick={openWhatsapp}>
          <div className="w-[60px] mr-2">
            <img src={whatsappLogo} alt="call" />
          </div>
          <div className="text-gray-700">
            <p className="m-0 font-semibold">
              +64 21 153 5957
            </p>
          </div>
        </div>
        <a href="mailto:Justcakes777@gmail.com">
        <div className=" flex items-center text-center cursor-pointer">
          <div className="w-[60px] mr-2">
            <img src={mail} alt="mail" />
          </div>
          <div className="text-gray-700">
            <p className="m-0 font-semibold">
              Justcakes777@gmail.com
            </p>
          </div>
        </div>
        </a>

        <div className=" flex items-center text-center">
          <div className="w-[60px] mr-2">
            <img src={location} alt="location" />
          </div>
          <div className="text-gray-700">
            {/* <p className="m-0 text-lg font-semibold">3 Hanover</p>
            <p className="m-0 text-lg font-semibold">Pahurere</p>
            <p className="m-0 text-lg font-semibold">Papakura</p> */}
            <p className="m-0 text-lg font-semibold">Auckland</p>
          </div>
        </div>
    </section>
  )
}

export default Info
