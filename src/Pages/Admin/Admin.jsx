import React, { useEffect, useState } from 'react'
import './Admin.scss';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../Sections/Navbar/Navbar.jsx'
import { closeModal, openModal } from '../../Store/actions/modalActions.js';
import AddCake from './AddCake/AddCake.jsx';
import ManageProduct from './ManageProduct/ManageProduct.jsx';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer.jsx';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [offSet, setOffSet] = useState(1);
  const [loadingData, setLoadingData] = useState(false)
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.allProduct);
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

  const fetchProducts = () => {
    setLoadingData(true);
    axios.post('http://localhost:5000/api/v1/product/get-products', { offSet })
      .then((response) => {
        setProducts(response?.data?.result);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [offSet, isModalOpen]);

  const handleNext = () => {
    setOffSet((prev) => prev + 10); // Increment offSet for next page
  };

  const handlePrev = () => {
    if (offSet > 0) {
      setOffSet((prev) => Math.max(1, prev - 10)); // Decrement offSet for previous page
    }
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <>
      <section className='w-full min-h-[100vh] bg-primary flex flex-col justify-start items-start gap-4'>
        <div className='flex w-full flex-col justify-center items-start p-4 gap-4'>
          <Navbar />
          <button onClick={() => dispatch(openModal())}
            className="w-44 px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:#fb8263 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Cake
          </button>
          <ManageProduct products={products} loadingData={loadingData} />
          <div className="w-full flex justify-center items-center gap-5 mt-4">
            <button
              onClick={handlePrev}
              disabled={offSet === 1}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
        <div className='w-full'>
          <Footer />
        </div>
      </section>

      {isModalOpen && <AddCake handleClose={handleClose} />}
    </>
  )
}

export default Admin
