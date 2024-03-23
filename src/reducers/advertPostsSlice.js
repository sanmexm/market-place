import { createSlice } from "@reduxjs/toolkit";
import { ADVERT_POSTS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllAdvertPosts: [],
    searchAdvertPost: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleAdvertPost: null,
    updateAdvertPost: null,
    deleteAdvertPost: null,
}

const advertPostsSlice = createSlice({
    name: ADVERT_POSTS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setAdvertPosts: (state, action) => {
            state.getAllAdvertPosts = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleAdvertPost: (state, action) => {
            state.singleAdvertPost          = action.payload;
        },
        setAdvertPostsSearch: (state, action) => {
            state.searchAdvertPost  = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateAdvertPost: (state, action) => {
            state.updateAdvertPost          = state.getAllAdvertPosts.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteAdvertPost: (state, action) => {
            state.deleteAdvertPost       = state.getAllAdvertPosts.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setAdvertPosts, setSingleAdvertPost, setUpdateAdvertPost, setAdvertPostsSearch, setDeleteAdvertPost } = advertPostsSlice.actions
export default advertPostsSlice.reducer
