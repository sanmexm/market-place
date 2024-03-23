import { createSlice } from "@reduxjs/toolkit";
import { DELIVERY } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllDelivery: [],
    searchDelivery: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleDelivery: null,
    updateDelivery: null,
    deleteDelivery: null,
}

const deliverySlice = createSlice({
    name: DELIVERY,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setDelivery: (state, action) => {
            state.getAllDelivery      = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleDelivery: (state, action) => {
            state.singleDelivery          = action.payload;
        },
        setDeliverySearch: (state, action) => {
            state.searchDelivery      = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateDelivery: (state, action) => {
            state.updateDelivery          = state.getAllDelivery.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteDelivery: (state, action) => {
            state.deleteDelivery       = state.getAllDelivery.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setDelivery, setSingleDelivery, setUpdateDelivery, setDeliverySearch, setDeleteDelivery } = deliverySlice.actions
export default deliverySlice.reducer
