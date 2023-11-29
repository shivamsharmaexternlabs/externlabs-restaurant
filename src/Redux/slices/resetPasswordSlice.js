import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// Reset password
// let BearerToken = reactLocalStorage.get("Token", false);



export const ResetPasswordSlice = createAsyncThunk("ResetPasswordSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/reset_password/`,body,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
        },
      }
      
      );
      console.log("response",response);
      toast.success("Successful");

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



// Reducer

export const resetPasswordReducer = createSlice({
  name: "resetPasswordReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(ResetPasswordSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ResetPasswordSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      }
      )

      .addCase(ResetPasswordSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default resetPasswordReducer.reducer;
