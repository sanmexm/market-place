import * as api from '../api'
import { startLoading, endLoading, setPayments, setSinglePayment, setPaymentsSearch, setUpdatePayment, setDeletePayment } from '../reducers/paymentsSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchPayments = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPayments(page)
        dispatch({
            type: setPayments.type,
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

export const actionFetchPaymentsBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPaymentsBySearch(searchQuery, page)
        dispatch({
            type: setPaymentsSearch.type,
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

export const actionFetchPayment = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchPayment(id)
        dispatch({
            type: setSinglePayment.type,
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

export const actionUpdatePayment = (id, updatedPayment) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePayment(id, updatedPayment)
        dispatch({
            type: setUpdatePayment.type,
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

export const actionDeletePayment = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deletePayment(id)
        dispatch({
            type: setDeletePayment.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}