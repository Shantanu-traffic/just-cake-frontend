import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../Store/actions/modalActions';
import { addProduct } from '../../../Store/actions/productActions';

const AddCake = () => {
    const user = useSelector((state) => state.auth);
    const [cakeDetails, setCakeDetails] = useState({
        title: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        category: '',
        created_by: user.id
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
    const { loading, success, message } = useSelector(state => state.product);
    const handleClose = () => {
        dispatch(closeModal())
    }
    // Handle input changes
    const handleChange = (e) => {
        setCakeDetails({
            ...cakeDetails,
            [e.target.name]: e.target.value
        });
    };
    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        if (!cakeDetails.title || !cakeDetails.description || !cakeDetails.image || !cakeDetails.price || !cakeDetails.category) {
            setError('All fields are mandatory');
            return;
        } else {
            setError(''); // Clear error message if validation passes
        }
        // Create object from form data
        const newCake = {
            title: cakeDetails.title,
            description: cakeDetails.description,
            image: cakeDetails.image,
            price: cakeDetails.price,
            stock: 0,
            category: cakeDetails.category,
            created_by: user.id
        };
        console.log('New Cake Object:', newCake);
        if (newCake && user.id) {
            dispatch(addProduct(newCake));
        }
    }


    return (
        <section>
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
            >
                <DialogTitle>Add Cake</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <TextField
                            margin="dense"
                            label="Title"
                            name="title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.title}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            name="description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={cakeDetails.description}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Upload Image"
                            name="image"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.image}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.price}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Category"
                            name="category"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.category}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Cake</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </section>
    )
}

export default AddCake
