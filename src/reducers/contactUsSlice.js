import { createSlice } from "@reduxjs/toolkit";
import { CONTACT_US_MESSAGES } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getContactMessages: null,
}

const contactMessageSlice = createSlice({
    name: CONTACT_US_MESSAGES,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setContactMessage: (state, action) => {
            state.getContactMessages  = action.payload.success;
        },
    }
})

export const { startLoading, endLoading, setContactMessage } = contactMessageSlice.actions
export default contactMessageSlice.reducer