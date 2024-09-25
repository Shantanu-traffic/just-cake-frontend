import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../Store/actions/modalActions';

const AddCake = () => {
    // State for form fields
    const [cakeDetails, setCakeDetails] = useState({
        name: '',
        price: '',
        image: '',
        description: ''
    });
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
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

        // Create object from form data
        const newCake = {
            name: cakeDetails.name,
            price: cakeDetails.price,
            image: cakeDetails.image,
            description: cakeDetails.description
        };
        console.log('New Cake Object:', newCake);
        if(newCake){
            alert("form submitted")
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
                        <TextField
                            margin="dense"
                            label="Cake Name"
                            name="name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.name}
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
                            label="Image URL"
                            name="image"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={cakeDetails.image}
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
