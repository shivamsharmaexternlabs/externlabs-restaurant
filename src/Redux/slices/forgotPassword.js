import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// Forgot password

export const Forgotpassword = createAsyncThunk("Forgotpassword",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/forgot_password_mail/`,body);
      console.log("response",response);
      toast.success(response?.data?.message)

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



 

 


// Reducer

export const forgotpassword = createSlice({
  name: "forgotpassword",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Forgotpassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(Forgotpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(Forgotpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default forgotpassword.reducer;
