import * as api from '../api'
import { startLoading, endLoading, setPostLikes, setSinglePostLike, setPostLikesSearch, setUpdatePostLike, setDeletePostLike } from '../reducers/postLikesSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchPostLikes = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostLikes(page)
        dispatch({
            type: setPostLikes.type,
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

export const actionFetchPostLikesBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostLikesBySearch(searchQuery, page)
        dispatch({
            type: setPostLikesSearch.type,
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

export const actionFetchPostLike = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostLike(id)
        dispatch({
            type: setSinglePostLike.type,
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

export const actionUpdatePostLike = (id, updatedPostLike) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePostLike(id, updatedPostLike)
        dispatch({
            type: setUpdatePostLike.type,
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

export const actionDeletePostLike = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deletePostLike(id)
        dispatch({
            type: setDeletePostLike.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}