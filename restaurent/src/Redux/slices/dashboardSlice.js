import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

export const loadingnoticeInfo = createAsyncThunk(
    "loadingnoticeInfo",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/loadingnotice-number`,body,
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

  export const loadingAssignTag = createAsyncThunk(
    "assignedTag",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/loadingnotice-number`,body,
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

  export const loadingLoadedTruck = createAsyncThunk(
    "loadingLoadedTruck",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/loadingnotice-number`,body,
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

  export const loadingAcceptedNotice = createAsyncThunk(
    "loadingAcceptedNotice",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/accepted-notice`,body,
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

  export const loadingRefuseNotice = createAsyncThunk(
    "loadingRefuseNotice",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/dashboard/refused-notice`,body,
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



  export const dashboardSlice = createSlice({
    name: "dashboardSlice",
    initialState: {
      dashboardData: [],
      assignedTag :[],
      loadedTruck: [],
      acceptedNotice: [],
      refusedNotice: [],
      loading: false,
      error: null,
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(loadingnoticeInfo.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(loadingnoticeInfo.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("loadingnoticeInfo ", payload?.data);
          state.dashboardData = payload?.data;
        })
  
        .addCase(loadingnoticeInfo.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(loadingAssignTag.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(loadingAssignTag.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("loadingAssignTag ", payload?.data);
          state.assignedTag = payload?.data;
        })
  
        .addCase(loadingAssignTag.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(loadingLoadedTruck.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(loadingLoadedTruck.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("loadingLoadedTruck ", payload?.data);
          state.loadedTruck = payload?.data;
        })
  
        .addCase(loadingLoadedTruck.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(loadingAcceptedNotice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(loadingAcceptedNotice.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("loadingAcceptedNotice ", payload?.data);
          state.acceptedNotice = payload?.data;
        })
  
        .addCase(loadingAcceptedNotice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(loadingRefuseNotice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(loadingRefuseNotice.fulfilled, (state, { payload }) => {
          state.loading = false;
          console.log("loadingRefuseNotice ", payload?.data);
          state.refusedNotice = payload?.data;
        })
  
        .addCase(loadingRefuseNotice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default dashboardSlice.reducer;