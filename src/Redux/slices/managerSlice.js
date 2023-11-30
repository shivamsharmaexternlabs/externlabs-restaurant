import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";



export const ManagerSlice = createAsyncThunk("ManagerSlice",async (body, { rejectWithValue }) => { 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/manager/?page=${body?.pageination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      
      );  

      return response;

    } catch (err) {
       toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

export const ManagerDeleteSlice = createAsyncThunk("ManagerDeleteSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}restaurant_app/manager/${body?.item}/`,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
        },
      }
      
      ); 

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

// Reducer

export const managerReducer = createSlice({
  name: "managerReducer",
  initialState: {
    data: [],  
    managerDeleteReducer:[],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(ManagerSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ManagerSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      }
      )

      .addCase(ManagerSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(ManagerDeleteSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ManagerDeleteSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.managerDeleteReducer = action.payload;
        toast.success(action?.payload?.data?.message);
      }
      )

      .addCase(ManagerDeleteSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  },

});

export default managerReducer.reducer;
