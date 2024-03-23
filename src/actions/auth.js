import * as api from '../api'
import { setAuth } from '../reducers/authSlice'

export const actionModalSignin = (formData, ) => async(dispatch) => {
    try{
        //login user
        const { data } = await api.signInUser(formData)
        // Save auth data to local storage
        localStorage.setItem("authData", JSON.stringify(data));
        dispatch(setAuth(data));
        window.location.reload()
        return data;
    }catch(error){
        // console.log("Login error:", error);
        if (error.response) {
            // console.log("Error status:", error.response.status);
            // console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionSignin = (formData, location) => async(dispatch) => {
    try{
        //login user
        const { data } = await api.signInUser(formData)
        // Save auth data to local storage
        localStorage.setItem("authData", JSON.stringify(data));
        dispatch(setAuth(data));

        // Check if there's a previous location in state or referer
        const previousLocation = location.state?.from || document.referrer;

        // Check if the previous location is not the login location
        const loginLocation = '/login';

        if (previousLocation && previousLocation !== loginLocation) {
            // Redirect to previous location if it exists and is not the login location
            window.location.replace(previousLocation);
            // navigate(previousLocation, { replace: true });
        } else {
            // Redirect to '/patients' if there is no previous location or it is the login location
            // navigate('/patients', { replace: true });
            window.location.replace('/');
        }
    }catch(error){
        // console.log("Login error:", error);
        if (error.response) {
            // console.log("Error status:", error.response.status);
            // console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}