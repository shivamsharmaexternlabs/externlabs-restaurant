import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false)

// Payment Initiate Slice
export const PaymentPostSlice = createAsyncThunk("PaymentPostSlice", async (body, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}payment/initiate/`, body,
            {
                headers: {
                    Authorization: `Bearer ${BearerToken}`,
                },
            }
        );
        console.log("PaymentPostSlice", response);

        return response;

    } catch (err) {
        // console.log("shfjjerr", err)
        toast.error(err?.response?.data?.error[0]);
        return rejectWithValue(err);
    }
}
);

// Unsubscribe Payment Slice
export const UnsubscribePaymentSlice = createAsyncThunk("UnsubscribePaymentSlice", async (body, { rejectWithValue }) => {
console.log("payloajhgfd", body?.BearerToken)
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}payment/unsubscribe/?subscription_id=${body?.subscription_id}`,
        
            {
                headers: {
                    Authorization: `Bearer ${body?.BearerToken}`,
                },
            }
        );

        return response;

    } catch (err) {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err);
    }
}
);

// Payment History Slice
export const PaymentHistorySlice = createAsyncThunk("PaymentHistorySlice", async (body, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}payment/history/`,
            {
                headers: {
                    Authorization: `Bearer ${BearerToken}`,
                },
            }
        );
        console.log("PaymentPostSlice", response);

        return response;

    } catch (err) {
        // console.log("shfjjerr", err)
        toast.error(err?.response?.data?.error[0]);
        return rejectWithValue(err);
    }
}
);


// Payment Reducer
export const PaymentReducer = createSlice({
    name: "PaymentReducer",
    initialState: {
        PaymentPostReducerData: [],
        PaymentHistoryReducerData: [],
        UnsubscribePaymentReducerData: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

            // Payment Post Slice
            .addCase(PaymentPostSlice.pending, (state) => {
                state.loading = true;
            })

            .addCase(PaymentPostSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.PaymentPostReducerData = action.payload;
            })

            .addCase(PaymentPostSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Unsubscribe Payment Reducer
            .addCase(UnsubscribePaymentSlice.pending, (state) => {
                state.loading = true;
            })

            .addCase(UnsubscribePaymentSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.UnsubscribePaymentReducerData = action.payload;
            })

            .addCase(UnsubscribePaymentSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Payment History Slice
            .addCase(PaymentHistorySlice.pending, (state) => {
                state.loading = true;
            })

            .addCase(PaymentHistorySlice.fulfilled, (state, action) => {
                state.loading = false;
                state.PaymentHistoryReducerData = action.payload;
            })

            .addCase(PaymentHistorySlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },

});

export default PaymentReducer.reducer;
