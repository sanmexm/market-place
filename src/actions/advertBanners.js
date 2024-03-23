import * as api from '../api'
import { startLoading, endLoading, setAdvertBanners, setSingleAdvertBanner, setUpdateAdvertBanner, setAdvertBannersSearch, setDeleteAdvertBanner } from '../reducers/advertBannersSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchAdvertBanners = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertBanners(page)
        dispatch({
            type: setAdvertBanners.type,
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

export const actionFetchAdvertBannersBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertBannersBySearch(searchQuery, page)
        dispatch({
            type: setAdvertBannersSearch.type,
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

export const actionFetchAdvertBanner = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchAdvertBanner(id)
        dispatch({
            type: setSingleAdvertBanner.type,
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

// export const actionUpdateAdvertBanner = (id, updatedAdvertBanner) => async(dispatch) => {
//     try{
//         dispatch({ type: startLoading.type })
//         const { data } = await api.updateAdvertBanner(id, updatedAdvertBanner)
//         dispatch({
//             type: setUpdateAdvertBanner.type,
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

export const actionDeleteAdvertBanner = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteAdvertBanner(id)
        dispatch({
            type: setDeleteAdvertBanner.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}