import * as api from '../api'
import { startLoading, endLoading, setSubscribers, setSingleSubscriber, setSubscribersSearch, setUpdateSubscriber, setDeleteSubscriber } from '../reducers/subscribersSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchSubscribers = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchSubscribers(page)
        dispatch({
            type: setSubscribers.type,
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

export const actionFetchSubscribersBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchSubscribersBySearch(searchQuery, page)
        dispatch({
            type: setSubscribersSearch.type,
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

export const actionFetchSubscriber = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchSubscriber(id)
        dispatch({
            type: setSingleSubscriber.type,
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

export const actionUpdateSubscriber = (id, updatedSubscriber) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateSubscriber(id, updatedSubscriber)
        dispatch({
            type: setUpdateSubscriber.type,
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

export const actionDeleteSubscriber = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteSubscriber(id)
        dispatch({
            type: setDeleteSubscriber.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}