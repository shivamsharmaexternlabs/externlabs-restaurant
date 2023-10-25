import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false)
    
// SignUp

export const SignUp = createAsyncThunk("SignUp",async (body, { rejectWithValue }) => {
  console.log("nbxjdx")
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/signup/`,body);
      toast.success("Successful");
    //   reactLocalStorage.set("Token",response?.data?.token?.original?.access_token);
    
      console.log("Permissions",response)

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
); 
 


// Reducer

export const signUp = createSlice({
  name: "signUp",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })

      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })

      .addCase(SignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) 

      
  },

});

export default signUp.reducer;
