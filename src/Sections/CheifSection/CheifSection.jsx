import React from 'react'
import './CheifSection.scss'
import { cheifImg } from '../../assets'
import { chefData, chefExp } from '../../Constants/Data'

const CheifSection = () => {
    return (
        <section className='chef-section w-full ss:h-[100vh] h-full bg-white rounded-xl'>
            <div className='w-full flex ss:flex-row flex-col justify-center items-center'>
                <div className='ss:w-[40%] w-full p-2'>
                    <img width={"100%"} height={"100%"} src={cheifImg} alt='cheif-pic' />
                </div>
                <div className='ss:w-[60%] w-full py-4 flex flex-col justify-center items-start gap-10'>
                    <h1 className="font-bold ss:text-[1.5rem] text-[2rem] text-center">About Our Chef</h1>
                    <div>
                        {chefData.map((item) => {
                            return <h1 className='text-[1rem] font-courgette' key={item.id}>
                                {item.detail}
                            </h1>
                        })}
                    </div>

                    <div>
                        {chefExp.map((item) => {
                            return <p className='ss:text-[1rem] text-[1.5rem] font-bold font-courgette' key={item.id}>
                                {item.id}. {item.detail}
                            </p>
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheifSection
