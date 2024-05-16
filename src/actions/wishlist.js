import { startLoading, endLoading, setAddToWishList, setRemoveWishList, setClearWishList  } from '../reducers/wishlistSlice'

export const actionAddWishList = (item) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setAddToWishList(item));
        dispatch({ type: endLoading.type })
        // return data
    }catch(error){
        console.log(error)
    }
}

export const actionRemoveWishList = (item) => async(dispatch) => {
    try{
        dispatch({ type: startLoading.type })
        dispatch(setRemoveWishList(item));
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