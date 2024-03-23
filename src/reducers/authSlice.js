import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../constants/actionTypes";

const initialState = {
    authData: null,
}

const authSlice = createSlice({
    name: AUTH,
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.authData = action.payload;
        },
        setAuthLogout: (state) => {
            state.authData = null;
        }
    },
})

export const { setAuth, setAuthLogout } = authSlice.actions
export default authSlice.reducer