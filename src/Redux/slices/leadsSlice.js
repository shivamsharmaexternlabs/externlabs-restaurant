import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// let BearerToken = reactLocalStorage.get("Token", false)
    
// SignIn

export const LeadsSlice = createAsyncThunk("LeadsSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/signin/`,body); 
      console.log("Tokendfgsrdfryhe",response?.data ); 

      return response;

    } catch (err) {

      console.log("shfjjerr", err)
      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);


   
 

 


// Reducer

export const leadsReducer = createSlice({
  name: "leadsReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(LeadsSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(LeadsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(LeadsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })

       

       
  },

});

export default leadsReducer.reducer;
