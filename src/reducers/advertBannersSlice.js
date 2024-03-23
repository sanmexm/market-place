import { createSlice } from "@reduxjs/toolkit";
import { ADVERT_BANNERS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllAdvertBanners: [],
    searchAdvertBanner: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleAdvertBanner: null,
    updateAdvertBanner: null,
    deleteAdvertBanner: null,
}

const advertBannersSlice = createSlice({
    name: ADVERT_BANNERS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setAdvertBanners: (state, action) => {
            state.getAllAdvertBanners = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleAdvertBanner: (state, action) => {
            state.singleAdvertBanner          = action.payload;
        },
        setAdvertBannersSearch: (state, action) => {
            state.searchAdvertBanner  = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdateAdvertBanner: (state, action) => {
            state.updateAdvertBanner          = state.getAllAdvertBanners.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteAdvertBanner: (state, action) => {
            state.deleteAdvertBanner       = state.getAllAdvertBanners.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setAdvertBanners, setSingleAdvertBanner, setUpdateAdvertBanner, setAdvertBannersSearch, setDeleteAdvertBanner } = advertBannersSlice.actions
export default advertBannersSlice.reducer
