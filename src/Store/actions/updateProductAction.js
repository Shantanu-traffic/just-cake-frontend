import axios from 'axios';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const updateProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const { data } = await axios.patch(`http://localhost:5000/api/v1/product/update-product`, productData);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
