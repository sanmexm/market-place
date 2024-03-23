import * as api from '../api'
import { startLoading, endLoading, setOrderTracking, setSingleOrderTracking, setOrderTrackingSearch, setUpdateOrderTracking, setDeleteOrderTracking } from '../reducers/orderTrackingSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchOrderTrackings = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrderTrackings(page)
        dispatch({
            type: setOrderTracking.type,
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

export const actionFetchOrderTrackingsBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrderTrackingsBySearch(searchQuery, page)
        dispatch({
            type: setOrderTrackingSearch.type,
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

export const actionFetchOrderTracking = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrderTracking(id)
        dispatch({
            type: setSingleOrderTracking.type,
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

export const actionUpdateOrderTracking = (id, updatedOrderTracking) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateOrderTracking(id, updatedOrderTracking)
        dispatch({
            type: setUpdateOrderTracking.type,
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

export const actionDeleteOrderTracking = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteOrderTracking(id)
        dispatch({
            type: setDeleteOrderTracking.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}