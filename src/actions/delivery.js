import * as api from '../api'
import { startLoading, endLoading, setDelivery, setSingleDelivery, setUpdateDelivery, setDeliverySearch, setDeleteDelivery } from '../reducers/deliverySlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchDeliveryS = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchDeliveryS(page)
        dispatch({
            type: setDelivery.type,
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

export const actionFetchDeliveryBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchDeliveryBySearch(searchQuery, page)
        dispatch({
            type: setDeliverySearch.type,
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

export const actionFetchDelivery = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchDelivery(id)
        dispatch({
            type: setSingleDelivery.type,
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

export const actionUpdateDelivery = (id, updatedDelivery) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateDelivery(id, updatedDelivery)
        dispatch({
            type: setUpdateDelivery.type,
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

export const actionDeleteDelivery = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteDelivery(id)
        dispatch({
            type: setDeleteDelivery.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}