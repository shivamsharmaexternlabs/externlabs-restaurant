import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// Reset password

export const Resetpassword = createAsyncThunk("Resetpassword",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/forgot_password/`,body);
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

export const resetpassword = createSlice({
  name: "resetpassword",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Resetpassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(Resetpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(Resetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default resetpassword.reducer;
