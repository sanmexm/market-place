import { createSlice } from "@reduxjs/toolkit";
import { CART } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getCartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    getCartTotal: 0,
    addSingleItem: null,
    increaseSingleItem: null,
    decreaseSingleItem: null,
    removeSingleItem: null,
}

const cartSlice = createSlice({
    name: CART,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setAddToCart: (state, action) => {
            const existingCartProductIndex = state.getCartItems.findIndex((item) => item?.product?._id === action.payload?.product?._id)
            if(existingCartProductIndex >= 0){
                state.getCartItems[existingCartProductIndex].quantity += 1;
            }else{
                let assembledItem;
                if(action.payload.quantity > 1){
                    assembledItem = { ...action.payload, quantity: action.payload.quantity }
                    state.getCartItems.push(assembledItem)
                }else{
                    assembledItem = { ...action.payload, quantity: 1 }
                    state.getCartItems.push(assembledItem)
                }
                //set to local storage
                localStorage.setItem('cartItems', JSON.stringify(state.getCartItems))
            }
        },
        setIncrementCartItem: (state, action) => {
            const existingCartProductIndex = state.getCartItems.findIndex((item) => item?.product?._id === action.payload?.product?._id)
            
            if(existingCartProductIndex >= 0){
                state.getCartItems[existingCartProductIndex].quantity += 1
                localStorage.setItem('cartItems', JSON.stringify(state.getCartItems))
            }
        },
        setDecrementCartItem: (state, action) => {
            const existingCartProductIndex = state.getCartItems.findIndex((item) => item?.product?._id === action.payload?.product?._id)
            
            if(existingCartProductIndex >= 0){
                state.getCartItems[existingCartProductIndex].quantity -= 1
                localStorage.setItem('cartItems', JSON.stringify(state.getCartItems))
            }
        },
        setCalculateTotalAmount: (state, action) => {
            let subTotal = state.getCartItems?.reduce((acc, item) => acc + (item?.product?.product?.price * item.quantity), 0)
            state.getCartTotal = Number(subTotal)
        },
        setRemoveCartItem: (state, action) => {
            const updatedCartItem = state.getCartItems?.filter((item) => item?.product?._id !== action.payload?.product?._id)
            state.getCartItems = updatedCartItem
            localStorage.setItem('cartItems', JSON.stringify(state.getCartItems))
        },
        setClearCartItems: (state) => {
            state.getCartItems = []
            localStorage.setItem('cartItems', JSON.stringify(state.getCartItems))
        }
    }
});

export const { startLoading, endLoading, setAddToCart, setIncrementCartItem, setDecrementCartItem, setCalculateTotalAmount, setRemoveCartItem, setClearCartItems } = cartSlice.actions
export default cartSlice.reducer

