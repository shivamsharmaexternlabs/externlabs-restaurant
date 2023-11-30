import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// Forgot password

export const ForgotPasswordSlice = createAsyncThunk("ForgotPasswordSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/forgot_password_mail/`,body);
      toast.success(response?.data?.message)

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



 

 


// Reducer

export const forgotPasswordReducer = createSlice({
  name: "forgotPasswordReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(ForgotPasswordSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ForgotPasswordSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(ForgotPasswordSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default forgotPasswordReducer.reducer;
