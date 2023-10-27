import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);


export const getGPSDevice = createAsyncThunk(
    "getGPSDevice",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://13.233.139.117/api/loading-notice/getgeofencedetails",
          {
            headers: {
              Authorization: `Bearer ${BearerToken}`,
            },
          }
        );
        toast.success(response?.data?.message);
        return response;
      } catch (err) {
        toast.error(err?.response?.data?.message);
        console.log("err?.response?.data?=>", err?.response?.data);
        return rejectWithValue(err);
      }
    }
  );


  export const MapManagement = createSlice({
    name: "MapManagement",
    initialState: {
      allGPSDevices: [],
      loading: false,
      error: null,
    },
  
    extraReducers: (builder) => {
      builder
  
        .addCase(getGPSDevice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(getGPSDevice.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("allGPSDevices ", payload?.data);
          state.allGPSDevices = payload?.data?.data;
        })
  
        .addCase(getGPSDevice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default MapManagement.reducer;