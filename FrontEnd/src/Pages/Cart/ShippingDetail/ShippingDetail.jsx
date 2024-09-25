import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../Store/actions/modalActions';

export const ShippingDetail = () => {
  // State for form fields
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    house: '',
    landmark: '',
    city: '',
    pin: '',
    phone: '',
    state: '',
    country: '',
  });
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
  const handleClose = () => {
    dispatch(closeModal())
  }
  // Handle input changes
  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create object from form data
    const shippingDetailsObject = {
      name: shippingDetails.name,
      house: shippingDetails.house,
      landmark: shippingDetails.landmark,
      city: shippingDetails.city,
      pin: shippingDetails.pin,
      phone: shippingDetails.phone,
      state: shippingDetails.state,
      country: shippingDetails.country,
    };
    console.log('New Cake Object:', shippingDetailsObject);
    if (shippingDetailsObject) {
      alert("form submitted")
    }
  }


  return (
    <section>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
      >
        <DialogTitle>Shipping Details</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="House no/name"
              name="house"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.house}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Landmark"
              name="landmark"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.landmark}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="City"
              name="city"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.city}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Pin code"
              name="pin"
              type="number"
              fullWidth
              variant="outlined"
              value={shippingDetails.pin}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              type="number"
              fullWidth
              variant="outlined"
              value={shippingDetails.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="State"
              name="state"
              type="text"
              fullWidth
              variant="outlined"
              rows={4}
              value={shippingDetails.state}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Country"
              name="country"
              type="text"
              fullWidth
              variant="outlined"
              rows={4}
              value={shippingDetails.country}
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

