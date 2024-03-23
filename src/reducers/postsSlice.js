import { createSlice } from "@reduxjs/toolkit";
import { POSTS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllPosts: [],
    getAllFilteredPosts: [],
    getAllFilteredRelatedPosts: [],
    getAllFilteredMoreSupplierPosts: [],
    getPostsByOwner: [],
    searchPost: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singlePost: null,
    updatePost: null,
    deletePost: null,
}

const postsSlice = createSlice({
    name: POSTS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setPosts: (state, action) => {
            state.getAllPosts         = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setFilteredPosts: (state, action) => {
            state.getAllFilteredPosts = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setFilteredRelatedPosts: (state, action) => {
            state.getAllFilteredRelatedPosts = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setFilteredMoreSupplierPosts: (state, action) => {
            state.getAllFilteredMoreSupplierPosts = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setPostsByOwner: (state, action) => {
            state.getPostsByOwner     = action.payload.data
            state.currentPage         = action.payload.currentPage
            state.numberOfPages       = action.payload.numberOfPages
            state.totalNumber         = action.payload.totalNumber
        },
        setSinglePost: (state, action) => {
            state.singlePost          = action.payload;
        },
        setPostsSearch: (state, action) => {
            state.searchPost          = action.payload.data;
            state.currentPage         = action.payload.currentPage
            state.numberOfPages       = action.payload.numberOfPages
            state.totalNumber         = action.payload.totalNumber
        },
        setUpdatePost: (state, action) => {
            state.updatePost          = state.getAllPosts.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
        },
        setDeletePost: (state, action) => {
            state.deletePost          = state.getAllPosts.filter((user) => user._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setPosts, setFilteredPosts, setFilteredRelatedPosts, setFilteredMoreSupplierPosts, setPostsByOwner, setSinglePost, setPostsSearch, setUpdatePost, setDeletePost } = postsSlice.actions
export default postsSlice.reducer