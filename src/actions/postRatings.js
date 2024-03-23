import * as api from '../api'
import { startLoading, endLoading, setPostRatings, setSinglePostRating, setPostRatingsSearch, setUpdatePostRating, setDeletePostRating } from '../reducers/postRatingsSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchPostRatings = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostRatings(page)
        dispatch({
            type: setPostRatings.type,
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

// export const actionFetchPostRatingsBySearch = (searchQuery, page) => async(dispatch) => {
//     try{
//         dispatch({ type: startLoading.type })
//         const { data } = await api.fetchPostRatingsBySearch(searchQuery, page)
//         dispatch({
//             type: setPostRatingsSearch.type,
//             payload: data
//         })
//         dispatch({ type: endLoading.type })
//         return data
//     }catch(error){
//         console.log("Axios error:", error);
//         if (error.response) {
//             console.log("Error status:", error.response.status);
//             return error.response; // Return the error response object
//         } else {
//             console.log("Error details:", error.message);
//             throw error; // Re-throw the error to be caught in the handleSubmit function
//         }
//     }
// }

export const actionFetchPostRating = (postId) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostRating(postId)
        dispatch({
            type: setSinglePostRating.type,
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

export const actionUpdatePostRating = (id, userId, updatedPostRating) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePostRating(id, userId, updatedPostRating)
        dispatch({
            type: setUpdatePostRating.type,
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

export const actionDeletePostRating = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deletePostRating(id)
        dispatch({
            type: setDeletePostRating.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}