import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

// Get Driver

export const getZone = createAsyncThunk(
  "getZone",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/zones/get?page=${body?.param == undefined ? 1 : body?.param
        }&search=${body?.search == undefined ? "" : body?.search}`,
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

export const createZone = createAsyncThunk(
  "createZone",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/zones/create`,
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
        toast.error(item?.capacity);
      });
      return rejectWithValue(err);
    }
  }
);

export const updateZone = createAsyncThunk(
  "updateZone",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/zones/update/${body?.id}`, body,
        {
          // data:body,
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
        toast.error(item?.capacity);
      });
      return rejectWithValue(err);
    }
  }
);

export const deleteZone = createAsyncThunk(
  "deleteZone",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/zones/delete`,
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
      err?.response?.data?.message?.map((item) => {
        toast.error(item?.capacity);
      });
      return rejectWithValue(err);
    }
  }
);

export const importZone = createAsyncThunk(
  "importZone",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/zones/import-zone`, body,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      const dataArray = err?.response?.data?.message.map((item, key) => {
        return {
          capacity: item.capacity,
          latitude: item.latitude,
          longitude: item.longitude,
          range: item.range,
          product: item.product,
        };
      });

      dataArray.map((item, index) => {
        item.capacity != undefined && toast.error(`capacity: ${item.capacity}`);
        item.longitude != undefined && toast.error(`longitude: ${item.longitude}`);
        item.latitude != undefined && toast.error(`latitude: ${item.latitude}`);
        item.range != undefined && toast.error(`range: ${item.range}`);
        item.product != undefined && toast.error(`product: ${item.product}`);
      });
      return rejectWithValue(err);
    }
  }
);


export const UpdateParking = createAsyncThunk(
  "UpdateParking",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/parking/get/${body?.id}`,
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



export const Parking = createSlice({
  name: "Parking",
  initialState: {
    allZones: [],
    createdZones: [],
    updatedZones: [],
    deletedZones: [],
    importZoneData: [],
    UpdateParkingData:[],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // get Driver

      .addCase(getZone.pending, (state) => {
        state.loading = true;
      })

      .addCase(getZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getZone ", payload?.data);
        state.allZones = payload?.data;
      })

      .addCase(getZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //CREATE ZONES
      .addCase(createZone.pending, (state) => {
        state.loading = true;
      })

      .addCase(createZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createZone ", payload?.data);
        state.createdZones = payload;
      })

      .addCase(createZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Update Zones
      .addCase(updateZone.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updateZone ", payload?.data);
        state.updatedZones = payload;
      })

      .addCase(updateZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Deleted Zones
      .addCase(deleteZone.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deleteZone ", payload?.data);
        state.deletedZones = payload;
      })

      .addCase(deleteZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Import Zone
      .addCase(importZone.pending, (state) => {
        state.loading = true;
      })

      .addCase(importZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("importZone ", payload?.data);
        state.importZoneData = payload;
      })

      .addCase(importZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(UpdateParking.pending, (state) => {
        state.loading = true;
      })

      .addCase(UpdateParking.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("UpdateParking ", payload?.data);
        state.UpdateParkingData = payload;
      })

      .addCase(UpdateParking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default Parking.reducer;
