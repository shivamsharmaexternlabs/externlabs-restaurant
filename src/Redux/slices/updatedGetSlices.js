import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

export const getupdatedDriver = createAsyncThunk("getDriver", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/loading-notice/get-driver?page=${body?.page == undefined ? 1 : body?.page}`, {
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

export const getupdatedTruck = createAsyncThunk("getTruck", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/loading-notice/get-truck?page=${body?.page == undefined ? 1 : body?.page}`, {
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

export const getupdatedProduct = createAsyncThunk("getClient", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/loading-notice/get-product?page=${body?.page == undefined ? 1 : body?.page}`, {
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

export const updatedGetSlice = createSlice({
    name: "updatedGetApi",
    initialState: {
        loading:false,
        error:null,
        getUpdatedDriverData:[],
        getUpdatedTruckData:[],
        getUpdatedProductData:[],
    },

    extraReducers: (builder) => {
        builder
    
          // get Driver
    
          .addCase(getupdatedDriver.pending, (state) => {
            state.loading = true;
          })
    
          .addCase(getupdatedDriver.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("getDriver ", payload?.data);
            state.getUpdatedDriverData = payload?.data;
          })
    
          .addCase(getupdatedDriver.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // get Truck
    
          .addCase(getupdatedTruck.pending, (state) => {
            state.loading = true;
          })
    
          .addCase(getupdatedTruck.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("getDriver ", payload?.data);
            state.getUpdatedTruckData = payload?.data;
          })
    
          .addCase(getupdatedTruck.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

          // get Product
    
          .addCase(getupdatedProduct.pending, (state) => {
            state.loading = true;
          })
    
          .addCase(getupdatedProduct.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("getDriver ", payload?.data);
            state.getUpdatedProductData = payload?.data;
          })
    
          .addCase(getupdatedProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
        },

});

export default updatedGetSlice.reducer;