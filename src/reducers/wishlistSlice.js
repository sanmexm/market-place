import { createSlice } from "@reduxjs/toolkit";
import { WISHLIST } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getWishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : [],
}

const wishlistSlice = createSlice({
    name: WISHLIST,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setAddToWishList: (state, action) => {
            let buildWishlistItem = { ...action.payload }
            state.getWishlistItems?.push(buildWishlistItem)
            localStorage.setItem('wishlistItems', JSON.stringify(state.getWishlistItems))
        },
        setRemoveWishList: (state, action) => {
            const updatedWishListItem = state.getWishlistItems?.filter((item) => item?._id !== action.payload?._id)
            state.getWishlistItems = updatedWishListItem
            localStorage.setItem('wishlistItems', JSON.stringify(state.getWishlistItems))
        },
        setClearWishList: (state) => {
            state.getWishlistItems = []
            localStorage.setItem('wishlistItems', JSON.stringify(state.getWishlistItems))
        }
    }
});

export const { startLoading, endLoading, setAddToWishList, setRemoveWishList, setClearWishList } = wishlistSlice.actions
export default wishlistSlice.reducer