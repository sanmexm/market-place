import { createSlice } from "@reduxjs/toolkit";
import { POST_LIKES } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllPostLikes: [],
    searchPostLike: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singlePostLike: null,
    updatePostLike: null,
    deletePostLike: null,
}

const postLikesSlice = createSlice({
    name: POST_LIKES,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setPostLikes: (state, action) => {
            state.getAllPostLikes = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSinglePostLike: (state, action) => {
            state.singlePostLike          = action.payload;
        },
        setPostLikesSearch: (state, action) => {
            state.searchPostLike  = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdatePostLike: (state, action) => {
            state.updatePostLike          = state.getAllPostLikes.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeletePostLike: (state, action) => {
            state.deletePostLike       = state.getAllPostLikes.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setPostLikes, setSinglePostLike, setPostLikesSearch, setUpdatePostLike, setDeletePostLike } = postLikesSlice.actions
export default postLikesSlice.reducer