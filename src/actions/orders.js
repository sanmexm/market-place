import * as api from '../api'
import { startLoading, endLoading, setOrders, setSingleOrder, setOrdersSearch, setUpdateOrder, setDeleteOrder } from '../reducers/ordersSlice'
//action creators
// redux thunk allows additional arrow function to a function

export const actionFetchOrders = (page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrders(page)
        dispatch({
            type: setOrders.type,
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

export const actionCreateOrder = (shippingInfo, cartItems, cartTotal) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.createOrder(shippingInfo, cartItems, cartTotal)
        dispatch({
            type: setOrders.type,
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

export const actionUpdatePaymentOrder = (id, result) => async(dispatch) => {
    try{  
        dispatch({ type: startLoading.type })
        const { data } = await api.updatePaymentOrder(id, result)
        dispatch({
            type: setOrders.type,
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

export const actionFetchOrdersBySearch = (searchQuery, page) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrdersBySearch(searchQuery, page)
        dispatch({
            type: setOrdersSearch.type,
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

export const actionFetchOrder = (id) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.fetchOrder(id)
        dispatch({
            type: setSingleOrder.type,
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

export const actionUpdateOrder = (id, updatedOrder) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const { data } = await api.updateOrder(id, updatedOrder)
        dispatch({
            type: setUpdateOrder.type,
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

export const actionDeleteOrder = (id) => async (dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        const data = await api.deleteOrder(id)
        dispatch({
            type: setDeleteOrder.type,
            payload: id
        })
        dispatch({ type: endLoading.type })
        return data
    }catch(error){
        console.log(error)
    }
}