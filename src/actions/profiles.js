import * as api from '../api'
import { startLoading, endLoading, setProfiles, setSingleProfile, setUpdateProfile, setProfilesSearch, setDeleteProfile, setSingleUserProfile } from '../reducers/profilesSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchProfiles = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchProfiles(page)
        dispatch({
            type: setProfiles.type,
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

export const actionCreateProfile = (newData) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const {data} = await api.createProfile(newData);
        dispatch({
            type: setProfiles.type,
            payload: data
        })
        window.location.replace('/users/user-profile'); // Redirect with query parameter
        return data
    }catch(error){
        if (error.response) {
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchProfilesBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchProfilesBySearch(searchQuery, page)
        dispatch({
            type: setProfilesSearch.type,
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

export const actionFetchProfile = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchProfile(id)
        dispatch({
            type: setSingleProfile.type,
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

export const actionFetchUserProfile = (userId) => async(dispatch) => {
    
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchUserProfile(userId)
        dispatch({
            type: setSingleUserProfile.type,
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

export const actionUpdateProfile = (id, updatedProfile) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateProfile(id, updatedProfile)
        dispatch({
            type: setUpdateProfile.type,
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

export const actionDeleteProfile = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteProfile(id)
        dispatch({
            type: setDeleteProfile.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}