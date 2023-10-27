import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

// create gps

export const createGPSDevice = createAsyncThunk(
  "createGPSDevice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/device/create`,
        body,
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
      err?.response?.data?.message?.map((item)=>{
        toast.error(item.tag_id);
        toast.error(item.tag_number);
        toast.error(item.battery_status);
        toast.error(item.latitude);
        toast.error(item.longitude);
      })
      return rejectWithValue(err);
    }
  }
);

//get gps

export const getGPSDevice = createAsyncThunk(
  "getGPSDevice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/device/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search
        }`,
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

//update gps

export const updateGPSDevice = createAsyncThunk(
  "updateGPSDevice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/device/update/${body?.id}`,
        body,
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
      err?.response?.data?.message?.map((item) => {
        toast.error(item?.tag_id);
        toast.error(item?.tag_number);
      });
      return rejectWithValue(err);
    }
  }
);

// delete gps

export const deleteGPSDevices = createAsyncThunk(
  "deleteGPSDevices",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/device/delete`,
        {
          data: body,
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

//Gps Assignment

export const getGpsAssignment = createAsyncThunk(
  "getGpsAssigment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/device/assigndata?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`,
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
      return rejectWithValue(err);
    }
  }
);

//Assign Gps
export const assignGpsDevice = createAsyncThunk(
  "assignGpsDevice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/device/assign/${body?.tagId == undefined ? 0 : body?.tagId
        }`,
        body,
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
      return rejectWithValue(err);
    }
  }
);



export const removeAssignedGPS = createAsyncThunk(
  'removeAssignedGPS',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://13.233.139.117/api/device/assignlist',
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
      return rejectWithValue(err);
    }
  }
);


export const GPSManagement = createSlice({
  name: "GPSManagement",
  initialState: {
    createdGPSDevices: [],
    allGPSDevices: [],
    updatedGPSDevices: [],
    deletedGPSDevices: [],
    gpsAssignedData: [],
    assignedDeviceData: [],
    removedAssignGPS:[],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      .addCase(createGPSDevice.pending, (state) => {
        state.loading = true;
      })

      .addCase(createGPSDevice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createdGPSDevices ", payload?.data);
        state.createdGPSDevices = payload?.data;
      })

      .addCase(createGPSDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getGPSDevice.pending, (state) => {
        state.loading = true;
      })

      .addCase(getGPSDevice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("allGPSDevices ", payload?.data);
        state.allGPSDevices = payload?.data;
      })

      .addCase(getGPSDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateGPSDevice.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateGPSDevice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updatedGPSDevices ", payload?.data);
        state.updatedGPSDevices = payload?.data;
      })

      .addCase(updateGPSDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteGPSDevices.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteGPSDevices.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deletedGPSDevices ", payload?.data);
        state.deletedGPSDevices = payload?.data;
      })

      .addCase(deleteGPSDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Get GPs Assign Device
      .addCase(getGpsAssignment.pending, (state) => {
        state.loading = true;
      })

      .addCase(getGpsAssignment.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deletedGPSDevices ", payload?.data);
        state.gpsAssignedData = payload?.data;
      })

      .addCase(getGpsAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //assignedDeviceData
      .addCase(assignGpsDevice.pending, (state) => {
        state.loading = true;
      })

      .addCase(assignGpsDevice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("assignedDeviceData ", payload?.data);
        state.assignedDeviceData = payload?.data;
      })

      .addCase(assignGpsDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeAssignedGPS.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeAssignedGPS.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("removedAssignGPS ", payload?.data);
        state.removedAssignGPS = payload?.data;
      })

      .addCase(removeAssignedGPS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default GPSManagement.reducer;
