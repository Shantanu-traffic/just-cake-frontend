import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../Store/actions/deleteProductAction';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { openModal } from '../../../Store/actions/modalActions';
import AddCake from '../AddCake/AddCake';
import { updateProduct } from '../../../Store/actions/updateProductAction';


const ManageProduct = ({ products }) => {
    const dispatch = useDispatch();
    // const { loading, success, error } = useSelector((state) => state.deleteProduct);
    // const { products, productsLoading, productsError } = useSelector((state) => state.allProduct);
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
        window.location.reload()
    };

    const handleSubmit = (item) => {
        dispatch(openModal())
        dispatch(updateProduct(productData)); 
        window.location.reload();
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="product table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sl</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell><div><img height={50} width={50} src={product.image} /></div></TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <div className='flex justify-center items-center gap-2'>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleSubmit(product)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            {isModalOpen && <AddCake />}
        </>
    )
}

export default ManageProduct
