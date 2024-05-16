import { createSlice } from "@reduxjs/toolkit";
import { STORES } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllStores: [],
    getStoresByUser: [],
    searchStore: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    getStoreItemsById: null,
    singleUserStore: null,
    singleStore: null,
    updateStore: null,
    deleteStore: null,
}

const storesSlice = createSlice({
    name: STORES,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setStores: (state, action) => {
            state.getAllStores = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setStoreItemsById: (state, action) => {
            state.getStoreItemsById      = action.payload;
        },
        // setStoreItemsByStoreId: (state, action) => {
        //     state.getPostsByStoreId   = action.payload.data
        //     state.currentPage         = action.payload.currentPage
        //     state.numberOfPages       = action.payload.numberOfPages
        //     state.totalNumber         = action.payload.totalNumber
        // },
        setStoresByUser: (state, action) => {
            state.getStoresByUser     = action.payload.data
            state.currentPage         = action.payload.currentPage
            state.numberOfPages       = action.payload.numberOfPages
            state.totalNumber         = action.payload.totalNumber
        },
        setSingleUserStore: (state, action) => {
            state.singleUserStore      = action.payload;
        },
        setSingleStore: (state, action) => {
            state.singleStore          = action.payload;
        },
        setStoresSearch: (state, action) => {
            state.searchStore         = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateStore: (state, action) => {
            state.updateStore          = state.getAllStores.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteStore: (state, action) => {
            state.deleteStore       = state.getAllStores.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setStores, setStoreItemsById, setStoresByUser, setSingleUserStore, setSingleStore, setStoresSearch, setUpdateStore, setDeleteStore } = storesSlice.actions
export default storesSlice.reducer
