import * as api from '../api'
import { startLoading, endLoading, setPostReviews, setSinglePostReview, setUpdatePostReview, setDeletePostReview, setSinglePostReviews } from '../reducers/postReviewsSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionCreatePostReview = (postId, userId, value) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.createPostReview(postId, userId, value)
        dispatch({
            type: setSinglePostReviews.type,
            payload: data
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log("create post error:", error);
        if (error.response) {
            console.log("Error message:", error.response.data.message);
            return error.response; // Return the error response object
        } else {
            console.log("Error details:", error.message);
            throw error; // Re-throw the error to be caught in the handleSubmit function
        }
    }
}

export const actionFetchPostReviews = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostReviews(page)
        dispatch({
            type: setPostReviews.type,
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

export const actionFetchSinglePostReviews = (postId, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchSinglePostReviews(postId, page)
        dispatch({
            type: setSinglePostReviews.type,
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

// export const actionFetchPostReviewsBySearch = (searchQuery, page) => async(dispatch) => {
//     try{
//         dispatch({ type: startLoading.type })
//         const { data } = await api.fetchPostReviewsBySearch(searchQuery, page)
//         dispatch({
//             type: setPostReviewsSearch.type,
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

export const actionFetchPostReview = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPostReview(id)
        dispatch({
            type: setSinglePostReview.type,
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

export const actionUpdatePostReview = (id, updatedPostReview) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePostReview(id, updatedPostReview)
        dispatch({
            type: setUpdatePostReview.type,
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

export const actionDeletePostReview = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deletePostReview(id)
        dispatch({
            type: setDeletePostReview.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}