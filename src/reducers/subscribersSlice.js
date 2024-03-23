import { createSlice } from "@reduxjs/toolkit";
import { SUBSCRIBERS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllSubscribers: [],
    searchSubscriber: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleSubscriber: null,
    updateSubscriber: null,
    deleteSubscriber: null,
}

const subscribersSlice = createSlice({
    name: SUBSCRIBERS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setSubscribers: (state, action) => {
            state.getAllSubscribers = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleSubscriber: (state, action) => {
            state.singleSubscriber          = action.payload;
        },
        setSubscribersSearch: (state, action) => {
            state.searchSubscriber  = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateSubscriber: (state, action) => {
            state.updateSubscriber          = state.getAllSubscribers.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteSubscriber: (state, action) => {
            state.deleteSubscriber       = state.getAllSubscribers.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setSubscribers, setSingleSubscriber, setSubscribersSearch, setUpdateSubscriber, setDeleteSubscriber } = subscribersSlice.actions
export default subscribersSlice.reducer
