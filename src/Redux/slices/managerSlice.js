import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

export const ManagerSlice = createAsyncThunk("ManagerSlice",async (body, { rejectWithValue }) => { 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/manager/?page=${body?.pageination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      
      );
      console.log("ManagerSlice response -> ",response);
      // toast.success("Successful");

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

export const ManagerDeleteSlice = createAsyncThunk("ManagerDeleteSlice",async (body, { rejectWithValue }) => {
  console.log("sdffas",body)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}restaurant_app/manager/?user_id=${body}`,
      {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      }
      
      );
      console.log("ManagerDeleteSlice response -> ",response);
      // toast.success("Successful");

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
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
        state.data = action.payload;
      }
      )

      .addCase(ManagerDeleteSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  },

});

export default managerReducer.reducer;
