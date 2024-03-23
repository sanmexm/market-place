import { startLoading, endLoading, setAddToCart, setIncrementCartItem, setDecrementCartItem, setRemoveCartItem, setClearCartItems, setCalculateTotalAmount } from '../reducers/cartSlice'

export const actionAddToCart = (product, quantity) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setAddToCart({ product, quantity }));
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

export const actionIncrementCartItem = () => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setIncrementCartItem());
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionDecrementCartItem = () => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setDecrementCartItem());
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionRemoveItemFromCart = (product) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setRemoveCartItem(product));
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