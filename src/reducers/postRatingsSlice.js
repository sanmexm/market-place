import { createSlice } from "@reduxjs/toolkit";
import { POST_RATINGS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllPostRatings: [],
    getUsersPostRatings: [],
    searchPostRating: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    actualRate: null,
    singlePostRating: null,
    updatePostRating: null,
    deletePostRating: null,
}

const postRatingsSlice = createSlice({
    name: POST_RATINGS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setPostRatings: (state, action) => {
            state.getAllPostRatings   = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUsersPostRatings: (state, action) => {
            state.getUsersPostRatings = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSinglePostRating: (state, action) => {
            state.actualRate          = action.payload.data;
            state.totalRate           = action.payload.totalRate;
            state.ratingSum           = action.payload.ratingSum;
        },
        setPostRatingsSearch: (state, action) => {
            state.searchPostRating    = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdatePostRating: (state, action) => {
            state.updatePostRating          = state.getAllPostRatings.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeletePostRating: (state, action) => {
            state.deletePostRating       = state.getAllPostRatings.filter((result) => result._id !== action.payload);
        },
    }
});
// case RATE_POST: 
//     return {
//         ...state,
//         postRate: state.posts.map((post) => {
//             //change the post that just receive the review
//             if(post._id === action.payload._id) return action.payload
//             //return all other posts
//             return post
//         }),
//         actualRate: action.payload.data,
//         rateTotal: action.payload.totalRate,
//         sumTotal: action.payload.ratingSum,
// }

export const { startLoading, endLoading, setPostRatings, setUsersPostRatings, setSinglePostRating, setPostRatingsSearch, setUpdatePostRating, setDeletePostRating } = postRatingsSlice.actions
export default postRatingsSlice.reducer