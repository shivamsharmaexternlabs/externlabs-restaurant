import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false)

//Lead Update Slice
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


// Payment Reducer
export const PaymentReducer = createSlice({
    name: "PaymentReducer",
    initialState: {
        PaymentPostReducerData: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

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

    },

});

export default PaymentReducer.reducer;
