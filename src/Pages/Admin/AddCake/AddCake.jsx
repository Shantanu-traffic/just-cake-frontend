import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../Store/actions/modalActions';
import { addProduct } from '../../../Store/actions/productActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';

const AddCake = ({handleClose}) => {
    const [user, setUser] = useState(null)
    const [cakeDetails, setCakeDetails] = useState({
        title: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        category: '',
        created_by: user?.id
    });
    const [error, setError] = useState('');
    let user_Id = null;
    const userCookie = Cookies.get('user');
    // Safely parse userCookie if it exists
    if (userCookie) {
        try {
            const parsedUserCookie = JSON.parse(userCookie);
            user_Id = parsedUserCookie.id; // assuming `id` is a field in the parsed object
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
        }
    }

    useEffect(() => {
        const userData = JSON.parse(Cookies.get('user'));
        setUser(userData)
    }, [])

    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
    const { loading, success, message } = useSelector(state => state.product);
    // Handle input changes
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0]; // Get the first file selected
            setCakeDetails({
                ...cakeDetails,
                image: file
            });
            console.log(file); // Log the file object to confirm it's being captured
        } else {
            setCakeDetails({
                ...cakeDetails,
                [e.target.name]: e.target.value
            });
        }
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

        // Create FormData object
        const formData = new FormData();
        formData.append('title', cakeDetails.title);
        formData.append('description', cakeDetails.description);
        formData.append('image', cakeDetails.image);  // Append the image file object, not a string
        formData.append('price', cakeDetails.price);
        formData.append('stock', cakeDetails.stock);
        formData.append('category', cakeDetails.category);
        formData.append('created_by', user?.id);

        console.log('FormData:', formData);

        if (user_Id) {
            dispatch(addProduct(formData));
            setCakeDetails({
                title: '',
                description: '',
                image: '',
                price: 0,
                stock: 0,
                category: '',
            })
            dispatch(closeModal())
            dispatch(showAlert("Product addedd successfuly", "success"))
        } else {
            alert("You must be logged in");
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
                            name="image"
                            fullWidth
                            accept="image/*"
                            type="file"
                            style={{ marginTop: '16px', marginBottom: '16px' }}
                            variant="outlined"
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
