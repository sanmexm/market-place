import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllUsers: [],
    searchUser: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    singleUser: null,
    updateUser: null,
    deleteUser: null,
}

const usersSlice = createSlice({
    name: USERS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setUsers: (state, action) => {
            state.getAllUsers         = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setSingleUser: (state, action) => {
            state.singleUser          = action.payload;
        },
        setUsersSearch: (state, action) => {
            state.searchUser          = action.payload.data;
            state.currentPage         = action.payload.currentPage
            state.numberOfPages       = action.payload.numberOfPages
            state.totalNumber         = action.payload.totalNumber
        },
        setUpdateUser: (state, action) => {
            state.updateUser          = state.getAllUsers.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeleteUser: (state, action) => {
            state.deleteUser       = state.getAllUsers.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setUsers, setSingleUser, setUpdateUser, setUsersSearch, setDeleteUser } = usersSlice.actions
export default usersSlice.reducer
