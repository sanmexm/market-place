import { startLoading, endLoading, setAddToWishList, setRemoveWishList, setClearWishList  } from '../reducers/wishlistSlice'

export const actionAddWishList = (product) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setAddToWishList(product));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionRemoveWishList = (product) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setRemoveWishList(product));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionClearWishList = () => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setClearWishList());
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}