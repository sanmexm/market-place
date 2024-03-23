import { createSlice } from "@reduxjs/toolkit";
import { MODE } from "../constants/actionTypes";

const initialState = {
    modeValue: localStorage.getItem("mode") || "light"
}

const modeSlice = createSlice({
    name: MODE,
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.modeValue = state.modeValue === "light" ? "dark" : "light";
            localStorage.setItem("mode", state.modeValue);
        }
    }
})

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;