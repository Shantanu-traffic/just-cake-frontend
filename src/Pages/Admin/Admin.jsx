import React, { useEffect, useState } from 'react'
import './Admin.scss';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Sections/Navbar/Navbar.jsx'
import { closeModal, openModal } from '../../Store/actions/modalActions.js';
import AddCake from './AddCake/AddCake.jsx';
import ManageProduct from './ManageProduct/ManageProduct.jsx';
import { getProducts } from '../../Store/actions/getAllProductsAction.js';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [offSet, setOffSet] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allProduct);
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/product/get-products', { offSet });
      setProducts(response?.data?.result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call API when component mounts
  }, [offSet, isModalOpen]);

  console.log("resp data", products)
  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <section className='w-full min-h-[100vh] bg-primary flex flex-col justify-start items-start gap-4 p-5'>
        <Navbar />
        <button onClick={() => dispatch(openModal())}
          className="w-44 px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Add Cake
        </button>
        <ManageProduct products={products} />
      </section>

      {/* modal to add cake */}
      {isModalOpen && <AddCake handleClose={handleClose} />}
    </>
  )
}

export default Admin
