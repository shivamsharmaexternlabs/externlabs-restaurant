import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


    
// SignUp

export const SignUpSlice = createAsyncThunk("SignUpSlice",async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/signup/`,body,
    {
      headers: {
        Authorization: `Bearer ${body?.token}`,
      },
    }); 
    
    toast.success(response?.data?.message);  

    return response;

    } catch (err) {
      toast.error(err?.response?.data?.error);
      return rejectWithValue(err);
    }
  }
); 
 


// Reducer

export const signUpReducer = createSlice({
  name: "signUpReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(SignUpSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(SignUpSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data =action.payload;
      })

      .addCase(SignUpSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) 

      
  },

});

export default signUpReducer.reducer;
