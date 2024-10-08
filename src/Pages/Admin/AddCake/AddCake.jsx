import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../Store/actions/modalActions";
import { addProduct } from "../../../Store/actions/productActions";
import Cookies from "js-cookie";
import { showAlert } from "../../../Store/actions/alertActionTypes";
import { updateProduct } from "../../../Store/actions/updateProductAction";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AddCake = ({ handleClose, editProduct }) => {
  console.log("editProduct", editProduct)
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [cakeDetails, setCakeDetails] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [error, setError] = useState("");
  const isModalOpen = useSelector((state) => state.isModalOpen.isOpen);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }

    if (editProduct) {
      setCakeDetails(editProduct);
    }
  }, [editProduct]);

  const wordCount = (text) => text.trim().split(/\s+/).length;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCakeDetails({
        ...cakeDetails,
        image: files[0],
      });
    } else {
      setCakeDetails({
        ...cakeDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const descriptionWordCount = wordCount(cakeDetails.description);
    const categoryWordCount = wordCount(cakeDetails.category);

    if (
      !cakeDetails.title ||
      !cakeDetails.description ||
      !cakeDetails.price ||
      !cakeDetails.category
    ) {
      setError("All fields are mandatory");
      return;
    } else if (descriptionWordCount > 100) {
      setError("Description should not exceed 100 words");
      return;
    } else if (categoryWordCount > 50) {
      setError("Category should not exceed 50 words");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("title", cakeDetails.title);
    formData.append("description", cakeDetails.description);
    if (cakeDetails.image) {
      formData.append("image", cakeDetails.image);
    }
    formData.append("price", cakeDetails.price);
    formData.append("stock", cakeDetails.stock);
    formData.append("category", cakeDetails.category);
    formData.append("created_by", user?.id || editProduct?.created_by);
    formData.append("product_id", editProduct?.id);

    if (user?.id) {
      if (editProduct) {
        formData.append("id", editProduct.id); // Include the product ID for updating
        dispatch(updateProduct(formData));
      } else {
        dispatch(addProduct(formData));
      }
      dispatch(closeModal());
      dispatch(showAlert("Product added/updated successfully", "success"));
    } else {
      alert("You must be logged in");
    }
  };

  return (
    <section>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{editProduct ? "Edit Cake" : "Add Cake"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
              variant="outlined"
              onChange={handleChange}
            />

            {cakeDetails.image && (
              <div>
                <img
                  src={cakeDetails.image}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
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
              label="Stock"
              name="stock"
              type="number"
              fullWidth
              variant="outlined"
              value={cakeDetails.stock}
              onChange={handleChange}
            />
            {/* Category Dropdown */}
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={cakeDetails.category}
                onChange={handleChange}
              >
                <MenuItem value="All time Favourite">All time Favourite</MenuItem>
                <MenuItem value="Corporate cakes">Corporate cakes</MenuItem>
                <MenuItem value="Exotic birthday cakes">Exotic birthday cakes</MenuItem>
                <MenuItem value="Fancy birthday cakes">Fancy birthday cakes</MenuItem>
                <MenuItem value="Festive cakes">Festive cakes</MenuItem>
                <MenuItem value="Number cakes">Number cakes</MenuItem>
                <MenuItem value="Wedding and anniversary Cakes">Wedding and anniversary Cakes</MenuItem>
                <MenuItem value="Pastries">Pastries</MenuItem>
                <MenuItem value="Cup cakes">Cup cakes</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editProduct ? "Update" : "Add"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </section>
  );
};

export default AddCake;
