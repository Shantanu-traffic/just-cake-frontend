import React from 'react'
import './Admin.scss';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Sections/Navbar/Navbar.jsx'
import { openModal } from '../../Store/actions/modalActions.js';
import AddCake from './AddCake/AddCake.jsx';

const Admin = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

  return (
    <>
      <section className='w-full min-h-[100vh] bg-primary flex flex-col justify-start items-start gap-4 p-5'>
        <Navbar />
        <button onClick={() => dispatch(openModal())}
          className="w-44 px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Add Cake
        </button>
      </section>

      {/* modal to add cake */}
      {isModalOpen && <AddCake />}
    </>
  )
}

export default Admin
