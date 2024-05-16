import { startLoading, endLoading, setAddToCart, setIncrementCartItem, setDecrementCartItem, setRemoveCartItem, setClearCartItems, setCalculateTotalAmount } from '../reducers/cartSlice'

export const actionAddToCart = (item, quantity) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setAddToCart(item, quantity));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionCalculateTotalAmount = () => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setCalculateTotalAmount());
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionIncrementCartItem = (item) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setIncrementCartItem(item));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionDecrementCartItem = (item) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setDecrementCartItem(item));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionRemoveItemFromCart = (item) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setRemoveCartItem(item));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionClearCartItems = () => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setClearCartItems());
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}