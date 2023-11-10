import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// let BearerToken = reactLocalStorage.get("Token", false)
    
// SignIn

export const LeadsSlice = createAsyncThunk("LeadsSlice",async (body, { rejectWithValue }) => {
  console.log("jhfbjhbrjfbjrhf", body)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}sales/leads/?page=${body?.pagination === undefined? 1 : body?.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      ); 
      console.log("leadsleads",response?.data ); 

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
    LeadReducerData: [],
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
        state.LeadReducerData = action.payload;
      })

      .addCase(LeadsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })
       
  },

});

export default leadsReducer.reducer;
