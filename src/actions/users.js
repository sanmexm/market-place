import * as api from '../api'
import { startLoading, endLoading, setUsers, setSingleUser, setUpdateUser, setUsersSearch, setDeleteUser } from '../reducers/usersSlice'

//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchUsers = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchUsers(page)
        dispatch({
            type: setUsers.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchUsersBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchUsersBySearch(searchQuery, page)
        dispatch({
            type: setUsersSearch.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionCreateUser = (newUser) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const {data} = await api.createUser(newUser);
        dispatch({
            type: setUsers.type,
            payload: data
        })
        window.location.replace('/login?verification=true'); // Redirect with query parameter
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

export const actionFetchUser = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchUser(id)
        dispatch({
            type: setSingleUser.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionUpdateUserEmail = (id, email) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateUserEmailProfile(id, email)
        dispatch({
            type: setUpdateUser.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionUpdateUser = (id, updatedUser) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateUser(id, updatedUser)
        dispatch({
            type: setUpdateUser.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionResendVerification = (emailAddress) => async() => {
    try{
        const response = await api.resendVerification(emailAddress)
        console.log("resend verification:", response)
        return response
    }catch(error){
        if(error.response){
            console.log("error resend verification:", error.response)
        }
    }
}

export const actionVerifyUserRegEmail = ( id, emailToken ) => async() => {
    try{
        const response = await api.verifyUserRegEmail(id, emailToken)
        return response;
    }catch(error){
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error;
        }
    }
}

export const actionVerifyEmailPassword = (emailAddress) => async() => {
    try{
        const response = await api.verifyEmailPassword(emailAddress)
        return response
    }catch(error){
        console.log("Axios error:", error);
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
        // setError('something went wrong')
    }
}

export const actionUpdatePassword = (id, updatedPassword) => async() => {
    try{
        const response = await api.passwordReset(id, updatedPassword)
        return response;
    }catch(error){
        if (error.response) {
            console.log("Error status:", error.response.status);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionDeleteUser = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteUser(id)
        dispatch({
            type: setDeleteUser.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}