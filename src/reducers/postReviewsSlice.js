import { createSlice } from "@reduxjs/toolkit";
import { POST_REVIEWS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllPostReviews: [],
    searchPostReview: [],
    getAllSinglePostReview: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singlePostReview: null,
    updatePostReview: null,
    deletePostReview: null,
}

const postReviewsSlice = createSlice({
    name: POST_REVIEWS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setPostReviews: (state, action) => {
            state.getAllPostReviews   = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSinglePostReviews: (state, action) => {
            state.getAllSinglePostReview   = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSinglePostReview: (state, action) => {
            state.singlePostReview    = action.payload;
        },
        setPostReviewsSearch: (state, action) => {
            state.searchPostReview    = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdatePostReview: (state, action) => {
            state.updatePostReview          = state.getAllPostReviews.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeletePostReview: (state, action) => {
            state.deletePostReview       = state.getAllPostReviews.filter((result) => result._id !== action.payload);
        },
    }
});
// case REVIEW_POST:
//     return {
//         ...state, 
//         postReviews: state.posts.map((post) => {
//             //change the post that just receive the review
//             if(post._id === action.payload._id) return action.payload
//             //return all other posts
//             return post
//         }),
//     }

export const { startLoading, endLoading, setPostReviews, setSinglePostReviews, setSinglePostReview, setPostReviewsSearch, setUpdatePostReview, setDeletePostReview } = postReviewsSlice.actions
export default postReviewsSlice.reducer