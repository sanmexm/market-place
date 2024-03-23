import { createSlice } from "@reduxjs/toolkit";
import { ORDER_TRACKING } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllOrderTracking: [],
    searchOrderTracking: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleOrderTracking: null,
    updateOrderTracking: null,
    deleteOrderTracking: null,
}

const orderTrackingSlice = createSlice({
    name: ORDER_TRACKING,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setOrderTracking: (state, action) => {
            state.getAllOrderTracking = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleOrderTracking: (state, action) => {
            state.singleOrderTracking = action.payload;
        },
        setOrderTrackingSearch: (state, action) => {
            state.searchOrderTracking = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateOrderTracking: (state, action) => {
            state.updateOrderTracking = state.getAllOrderTracking.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteOrderTracking: (state, action) => {
            state.deleteOrderTracking = state.getAllOrderTracking.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setOrderTracking, setSingleOrderTracking, setOrderTrackingSearch, setUpdateOrderTracking, setDeleteOrderTracking } = orderTrackingSlice.actions
export default orderTrackingSlice.reducer
