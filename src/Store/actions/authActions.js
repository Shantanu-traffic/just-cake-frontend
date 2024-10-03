// src/Store/actions/authActions.js
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action to initiate login
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

// Action when login is successful
export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
});

// Action when login fails
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// Thunk action for login
export const login = () => {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const response = await axios.get('http://justcakes.co.nz:5000/auth/google',{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    withCredentials: true,
                }
            });
            console.log("response data",response)
            dispatch(loginSuccess(response.data));
        } catch (error) {
            console.log(error,"error found")
            dispatch(loginFailure(error.response ? error.response.data : 'Login failed'));
        }
    };
};
