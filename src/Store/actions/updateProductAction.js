import axios from 'axios';
import { getProducts } from './getAllProductsAction';
import { BASE_API_URL } from '../../utils/commanFunctions';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const updateProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const { data } = await axios.patch(`${BASE_API_URL}/api/v1/product/update-product`, productData);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.message,
        });
        if(data){
            dispatch(getProducts(1))
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
