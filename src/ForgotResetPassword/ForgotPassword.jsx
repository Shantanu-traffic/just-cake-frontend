import { useState } from "react";
import { CakeHeroLogo } from "../assets";
import { Link } from "react-router-dom";



const ForgotPassword = ()=>{

    const [formData,setFormData] = useState({
        email:""
    })

    const handleSubmit = ()=>{}
    return (
        <>
          <section className="min-h-[100vh] p-2 bg-primary flex flex-col justify-center items-center">
            <div className="h-auto w-98 bg-secondary rounded-xl py-5 flex flex-col justify-center items-center gap-4">
              
                <>
                  <img className="w-[20%] h-[20%]" src={CakeHeroLogo} alt="logo" />
    
                  <div className="w-full max-w-sm mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl px-8 pt-4 pb-8 mb-2">
                      <h1 className="text-gray-700 text-xl font-semibold mb-4 text-center">Login</h1>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email" name='email' value={formData.email} onChange={(e)=>setFormData(e.target.value)}
                          placeholder="Enter your email"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        SEND OTP
                      </button>
    
                             <Link className='text-sm mt-2' to={'/signup'} style={{ color: 'blue' }}>BACK</Link>
                     
    
                    </form>
                  </div>
                </>
              
            </div>
          </section >
        </>
      );
}


export default ForgotPassword