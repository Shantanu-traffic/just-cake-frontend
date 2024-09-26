import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../Store/actions/deleteProductAction';

const ManageProduct = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.deleteProduct);

    const handleDelete = () => {
        dispatch(deleteProduct(productId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(productData));  // Dispatch the action
    };

    return (
        <div>

        </div>
    )
}

export default ManageProduct
