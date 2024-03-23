import { createSlice } from "@reduxjs/toolkit";
import { PROFILES } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllProfiles: [],
    searchProfile: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleProfile: null,
    singleUserProfile: null,
    updateProfile: null,
    deleteProfile: null,
}

const profilesSlice = createSlice({
    name: PROFILES,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setProfiles: (state, action) => {
            state.getAllProfiles      = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleProfile: (state, action) => {
            state.singleProfile       = action.payload;
        },
        setSingleUserProfile: (state, action) => {
            state.singleUserProfile       = action.payload;
        },
        setProfilesSearch: (state, action) => {
            state.searchProfile       = action.payload.data;
            state.currentPage         = action.payload.currentPage
            state.numberOfPages       = action.payload.numberOfPages
            state.totalNumber         = action.payload.totalNumber
        },
        setUpdateProfile: (state, action) => {
            state.updateProfile          = state.getAllProfiles.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteProfile: (state, action) => {
            state.deleteProfile       = state.getAllProfiles.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setProfiles, setSingleProfile, setSingleUserProfile, setUpdateProfile, setProfilesSearch, setDeleteProfile } = profilesSlice.actions
export default profilesSlice.reducer
