import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal } from '../../../Store/actions/modalActions';
import { saveShippingAddress } from '../../../Store/actions/shippingActions';
import Cookies from 'js-cookie';
import { showAlert } from '../../../Store/actions/alertActionTypes';

export const ShippingDetail = () => {
  // State for form fields
  const [shippingDetails, setShippingDetails] = useState({
    street: '',
    city: '',
    postal_code: '',
    phone: '',
    state: '',
    country: '',
  });

  // Validation error state
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);
  const { loading, error, success } = useSelector((state) => state.shipping || {});

  const handleClose = () => {
    dispatch(closeModal());
  };

  // Handle input changes
  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when input changes
    setValidationErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!shippingDetails.street.trim()) errors.street = 'Street is required';
    if (!shippingDetails.city.trim()) errors.city = 'City is required';
    if (!shippingDetails.postal_code.trim()) errors.postal_code = 'Postal code is required';
    if (!shippingDetails.phone.trim()) errors.phone = 'Phone is required';
    if (!shippingDetails.state.trim()) errors.state = 'State is required';
    if (!shippingDetails.country.trim()) errors.country = 'Country is required';
    return errors;
  };
  const userCookie = Cookies.get('user');
  const userId = JSON.parse(userCookie);
  const user_id = userId.id;

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      // Set validation errors if any
      setValidationErrors(errors);
    } else {
      // Create object from form data and dispatch action if valid
      const shippingDetailsObject = {
        user_id: user_id,
        street: shippingDetails.street,
        city: shippingDetails.city,
        postal_code: shippingDetails.postal_code,
        phone: shippingDetails.phone,
        state: shippingDetails.state,
        country: shippingDetails.country,
      };

      dispatch(saveShippingAddress(shippingDetailsObject));
      dispatch(closeModal())
      dispatch(showAlert("Address added", "success"))
    }
  };

  return (
    <section>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>Shipping Details</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Street"
              name="street"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.street}
              onChange={handleChange}
              error={!!validationErrors.street}
              helperText={validationErrors.street}
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
              error={!!validationErrors.city}
              helperText={validationErrors.city}
            />
            <TextField
              margin="dense"
              label="Postal code"
              name="postal_code"
              type="number"
              fullWidth
              variant="outlined"
              value={shippingDetails.postal_code}
              onChange={handleChange}
              error={!!validationErrors.postal_code}
              helperText={validationErrors.postal_code}
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
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
            />
            <TextField
              margin="dense"
              label="State"
              name="state"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.state}
              onChange={handleChange}
              error={!!validationErrors.state}
              helperText={validationErrors.state}
            />
            <TextField
              margin="dense"
              label="Country"
              name="country"
              type="text"
              fullWidth
              variant="outlined"
              value={shippingDetails.country}
              onChange={handleChange}
              error={!!validationErrors.country}
              helperText={validationErrors.country}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </DialogActions>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {success && <p>Address saved successfully!</p>}
      </Dialog>
    </section>
  );
};
