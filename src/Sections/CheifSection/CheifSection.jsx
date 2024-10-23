import React from 'react'
import './CheifSection.scss'
import { chefImg, cheifImg } from '../../assets'
import { chefData, chefExp } from '../../Constants/Data'
import { Styles } from '../../Styles'

const CheifSection = () => {
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center gap-2 h-28 bg-gray-100 text-black text-center'>
                <h1 className='p-0 font-semibold ss:text-3xl text-2xl font-satisfy text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'>
                    A taste of happiness in every slice.
                </h1>

                <p className='p-0 ss:text-xl text-lg font-satisfy text-gray-700'>
                    Focuses on the <span className='text-pink-500 font-bold'>pleasure</span> and <span className='text-yellow-500 font-bold'>happiness</span> our cakes bring to customers.
                </p>
            </div>
            <section className={`chef-section w-full h-full rounded-xl ${Styles.paddingX}`}>
                <div className='w-full flex flex-col ss:flex-row justify-center items-start p-4 gap-2'>
                    <div className='ss:w-[40%] w-full'>
                        <img width={"70%"} src={chefImg} alt='chef-pic' className="rounded-xl" />
                    </div>
                    <div className='ss:w-[60%] w-full flex flex-col justify-center items-start gap-4 p-4 bg-white bg-opacity-10 backdrop-blur-md border border-white/30 rounded-lg'>
                        <h1 className="font-bold ss:text-[1.5rem] text-[2rem] text-center text-white">About Our Chef</h1>
                        <div className='flex flex-col gap-2'>
                            {chefData.map((item) => (
                                <h2 className='text-[1rem] font-courgette text-white' key={item.id}>
                                    {item.detail}
                                </h2>
                            ))}
                        </div>

                        <div className='flex flex-col gap-1'>
                            {chefExp.map((item) => (
                                <p className='text-[1rem] font-bold font-courgette text-white' key={item.id}>
                                    {item.id}. {item.detail}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default CheifSection
