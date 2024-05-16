import * as api from '../api'
import { endLoading, setContactMessage, startLoading } from '../reducers/contactUsSlice';

export const actionCreateContactUsMessage = (formData) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const {data} = await api.createContactUsMessage(formData);
        dispatch({
            type: setContactMessage.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        // setError('Unable to create user at this time, please try again')
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