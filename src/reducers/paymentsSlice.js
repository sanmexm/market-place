import { createSlice } from "@reduxjs/toolkit";
import { PAYMENTS } from "../constants/actionTypes";

const initialState = {
    isLoading: true,
    getAllPayments: [],
    searchPayment: [],
    currentPage: 1,
    numberOfPages: 0,
    totalNumber: 0,
    confirmedPaymentReceipt: null,
    paymentSuccess: null,
    paymentMessage: null,
    paymentUserPayReceipt: null,
    paymentUrl: null,
    singlePayment: null,
    updatePayment: null,
    deletePayment: null,
}

const paymentsSlice = createSlice({
    name: PAYMENTS,
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading     = true;
        },
        endLoading: (state) => {
            state.isLoading     = false;
        },
        setPayments: (state, action) => {
            state.paymentUrl    = action.payload.session;
        },
        setFirstPaymentSession: (state, action) => {
            state.confirmedPaymentReceipt  = action.payload.data;
        },
        setSuccessPaymentSession: (state, action) => {
            state.paymentSuccess         = action.payload.success;
            state.paymentMessage         = action.payload.message;
            state.paymentUserPayReceipt  = action.payload.userPayReceipt;
        },
        setSinglePayment: (state, action) => {
            state.singlePayment       = action.payload;
        },
        setPaymentsSearch: (state, action) => {
            state.searchPayment       = action.payload.data;
            state.currentPage         = action.payload.currentPage;
            state.numberOfPages       = action.payload.numberOfPages;
            state.totalNumber         = action.payload.totalNumber;
        },
        setUpdatePayment: (state, action) => {
            state.updatePayment          = state.getAllPayments.map((result) =>
                result._id === action.payload._id ? action.payload : result
            );
        },
        setDeletePayment: (state, action) => {
            state.deletePayment       = state.getAllPayments.filter((result) => result._id !== action.payload);
        },
    }
});

export const { startLoading, endLoading, setPayments, setFirstPaymentSession, setSuccessPaymentSession, setSinglePayment, setPaymentsSearch, setUpdatePayment, setDeletePayment } = paymentsSlice.actions
export default paymentsSlice.reducer