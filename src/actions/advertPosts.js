import * as api from '../api'
import { startLoading, endLoading, setAdvertPosts, setSingleAdvertPost, setUpdateAdvertPost, setAdvertPostsSearch, setDeleteAdvertPost } from '../reducers/advertPostsSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchAdvertPosts = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertPosts(page)
        dispatch({
            type: setAdvertPosts.type,
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

export const actionFetchAdvertPostsBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertPostsBySearch(searchQuery, page)
        dispatch({
            type: setAdvertPostsSearch.type,
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

export const actionFetchAdvertPost = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertPost(id)
        dispatch({
            type: setSingleAdvertPost.type,
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

// export const actionUpdateAdvertPost = (id, updatedAdvertPost) => async(dispatch) => {
//     try{
//         dispatch({ type: startLoading.type })
//         const { data } = await api.updateAdvertPost(id, updatedAdvertPost)
//         dispatch({
//             type: setUpdateAdvertPost.type,
//             payload: data
//         })
//         dispatch({ type: endLoading.type })
//         return data
//     }catch(error){
//         console.log(error)
//         if (error.response) {
//             console.log("Error status:", error.response.status);
//             return error.response; // Return the error response object
//         } else {
//             console.log("Error details:", error.message);
//             throw error; // Re-throw the error to be caught in the handleSubmit function
//         }
//     }
// }

export const actionDeleteAdvertPost = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteAdvertPost(id)
        dispatch({
            type: setDeleteAdvertPost.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}