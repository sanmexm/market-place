import { createSlice } from "@reduxjs/toolkit";
import { ORDERS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllOrders: [],
    searchOrder: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleOrder: null,
    updateOrder: null,
    deleteOrder: null,
}

const ordersSlice = createSlice({
    name: ORDERS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setOrders: (state, action) => {
            state.getAllOrders        = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleOrder: (state, action) => {
            state.singleOrder          = action.payload;
        },
        setOrdersSearch: (state, action) => {
            state.searchOrder  = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateOrder: (state, action) => {
            state.updateOrder          = state.getAllOrders.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteOrder: (state, action) => {
            state.deleteOrder       = state.getAllOrders.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setOrders, setSingleOrder, setOrdersSearch, setUpdateOrder, setDeleteOrder } = ordersSlice.actions
export default ordersSlice.reducer
