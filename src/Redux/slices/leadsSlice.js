import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


    
//Lead get Slice
export const LeadsSlice = createAsyncThunk("LeadsSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}sales/leads/?page=${body?.pagination === undefined? 1 : body?.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      ); 

      return response;

    } catch (err) {

      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);


//Lead Update Slice
export const UpdateLeadsSlice = createAsyncThunk("UpdateLeadsSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}sales/leads/${body?.leadId}/`, body, 
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      ); 

      return response;

    } catch (err) {

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
    UpdateLeadReducerData : [],
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

      .addCase(UpdateLeadsSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(UpdateLeadsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.UpdateLeadReducerData = action.payload;
      })

      .addCase(UpdateLeadsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       
  },

});

export default leadsReducer.reducer;
