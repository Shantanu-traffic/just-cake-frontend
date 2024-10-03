import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { authReducer } from "./authReducer";
import { shippingAddressReducer } from "./shippingReducer";
import productReducer from "./productReducer";
import { cartReducer } from "./cartReducer";
import { getAllProductReducer } from "./getAllProductsReducer";
import { getAllCartReducer } from "./getAllCartReducer";
import { orderHistoryReducer } from "./orderHistoryReducer";
import { updateCartQuantityReducer } from "./cartIncDecReducer";
import alertReducer from "./alertReducer";
import { deleteProductReducer } from "./deleteProductReducer";
import { orderReducer } from "./orderPlaceReducer";

export const rootReducer = combineReducers({
    isModalOpen: modalReducer,
    auth: authReducer,
    shippingAddress: shippingAddressReducer,
    product: productReducer,
    allProduct: getAllProductReducer,
    cart: cartReducer,
    cartItems: getAllCartReducer,
    orderHistory: orderHistoryReducer,
    updateCartQuantity: updateCartQuantityReducer,
    alert: alertReducer,
    deleteProduct: deleteProductReducer,
    orderPlaces: orderReducer
})