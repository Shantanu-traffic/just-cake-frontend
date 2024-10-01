import React from 'react'
import './CheifSection.scss'
import { cheifImg } from '../../assets'
import { chefData, chefExp } from '../../Constants/Data'

const CheifSection = () => {
    return (
        <section className='chef-section w-full h-full bg-white rounded-xl'>
            <div className='w-full flex flex-col ss:flex-row justify-center items-center p-4'>
                <div className='ss:w-[40%] w-full'>
                    <img width={"100%"} height={"100%"} src={cheifImg} alt='chef-pic' className="rounded-lg" />
                </div>
                <div className='ss:w-[60%] w-full flex flex-col justify-center items-start gap-4 p-4'>
                    <h1 className="font-bold ss:text-[1.5rem] text-[2rem] text-center text-gray-800">About Our Chef</h1>
                    <div className='flex flex-col gap-2'>
                        {chefData.map((item) => (
                            <h2 className='text-[1rem] font-courgette text-gray-700' key={item.id}>
                                {item.detail}
                            </h2>
                        ))}
                    </div>

                    <div className='flex flex-col gap-1'>
                        {chefExp.map((item) => (
                            <p className='text-[1rem] font-bold font-courgette text-gray-800' key={item.id}>
                                {item.id}. {item.detail}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default CheifSection
