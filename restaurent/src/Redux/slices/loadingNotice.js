import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

// Get Driver

export const getLodingEntity = createAsyncThunk(
  "getLodingEntity",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/loading-entity/get?page=*`,
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

// get product

export const getProduct = createAsyncThunk(
  "getProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/get?page=${body?.page == undefined ? 1 : body?.page
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

// create loading noitce

export const createLoadingNotice = createAsyncThunk(
  "createLoadingNotice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/loading-notice/create`,
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
      err?.response?.data?.message.map((item) => {
        toast.error(item?.loading_date);
        toast.error(item?.client_id);
        toast.error(item?.loading_entity_id);
        toast.error(item?.driver_id);
        toast.error(item?.truck_id);
        toast.error(item?.product_id);
        toast.error(item?.tonnage);
        toast.error(item?.destination);
      });
      return rejectWithValue(err);
    }
  }
);

// get Loading Notice

export const getLoadingNotice = createAsyncThunk(
  "getLoadingNotice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL
        }/api/loading-notice/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search
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
      return rejectWithValue(err);
    }
  }
);

// Create Product

export const createProduct = createAsyncThunk(
  "createProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/create`,
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
      err?.response?.data?.message.map((item) => {
        toast.error(item.name);
        toast.error(item.color);
      });
      return rejectWithValue(err);
    }
  }
);

// Edit Product

export const editProduct = createAsyncThunk(
  "editProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/products/update/${body?.id}`,
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
      err?.response?.data?.message.map((item) => {
        toast.error(item.name);
        toast.error(item.color);
      });
      return rejectWithValue(err);
    }
  }
);

// deleteProduct

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/products/delete`,
        {
          data: body,
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          }
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

// edit notice

export const editLoadingNotice = createAsyncThunk(
  "editLoadingNotice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/loading-notice/update/${body?.id}`,
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

// delete Notice

export const deleteLoadingNotice = createAsyncThunk(
  "deleteLoadingNotice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/loading-notice/delete/${body?.id}`,
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

//
export const exportProduct = createAsyncThunk(
  "ExportProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-products`,
        {
          responseType: "arraybuffer",
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

//Import Product
export const importProduct = createAsyncThunk(
  "importProduct",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/import-product`, body,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      console.log("sssssssss", err?.response?.data?.message)
      const dataArray = err?.response?.data?.message.map((item, key) => {
        return {
          name: item.name,
          color: item.color,
        };
      });

      // Now you can use map to iterate through the dataArray
      dataArray.map((item, index) => {
        item.name != undefined && toast.error(`Name: ${item.name}`);
        item.color != undefined && toast.error(`Color: ${item.color}`);
      });

      return rejectWithValue(err);
    }
  }
);

// Import LoadingNotice
export const importLoadingNotice = createAsyncThunk(
  "importLoadingNotice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/loading-notice/import-loading-notice`, body,
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
          loading_date: item.loading_date,
          customer_type: item.customer_type,
          destination: item.destination,
          tonnage: item.tonnage,
          client_name: item.client_name,
          driver_cin: item.driver_cin,
          driver_contact: item.driver_contact,
          loading_entity: item.loading_entity,
          truck_registration_no: item.truck_registration_no,
          product_name: item.product_name,
        };
      });

      dataArray.map((item, index) => {
        item.loading_date != undefined && toast.error(`Loading Date: ${item.loading_date}`);
        item.customer_type != undefined && toast.error(`Customer Type: ${item.customer_type}`);
        item.destination != undefined && toast.error(`Destination: ${item.destination}`);
        item.tonnage != undefined && toast.error(`Tonnage: ${item.tonnage}`);
        item.client_name != undefined && toast.error(`Client Name: ${item.client_name}`);
        item.driver_cin != undefined && toast.error(`Driver Cin: ${item.driver_cin}`);
        item.driver_contact != undefined && toast.error(`Driver Contact: ${item.driver_contact}`);
        item.loading_entity != undefined && toast.error(`Loading Entity: ${item.loading_entity}`);
        item.truck_registration_no != undefined && toast.error(`Truck Reg. No.: ${item.truck_registration_no}`);
        item.product_name != undefined && toast.error(`Product Name: ${item.product_name}`);
      });
      return rejectWithValue(err);
    }
  }
);

// Reducer 

export const LoadingNotice = createSlice({
  name: "LoadingNotice",
  initialState: {
    allLodingEntity: [],
    allProduct: [],
    createdLodingNotice: [],
    allNotices: [],
    createdProducts: [],
    allEditedNoitce: [],
    deletedNotice: [],
    allEditedProducts: [],
    allDeletedProduct: [],
    exportProductData: [],
    importProductData: [],
    importLoadingData: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // get Driver

      .addCase(getLodingEntity.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLodingEntity.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getLodingEntity ", payload?.data);
        state.allLodingEntity = payload?.data;
      })

      .addCase(getLodingEntity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getProduct ", payload?.data);
        state.allProduct = payload?.data;
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createLoadingNotice.pending, (state) => {
        state.loading = true;
      })

      .addCase(createLoadingNotice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createLoadingNotice ", payload?.data);
        state.createdLodingNotice = payload?.data;
      })

      .addCase(createLoadingNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getLoadingNotice.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLoadingNotice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getLoadingNotice ", payload?.data);
        state.allNotices = payload?.data;
      })

      .addCase(getLoadingNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createProduct ", payload?.data);
        state.createdProducts = payload?.data;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(editProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("editProduct ", payload?.data);
        state.allEditedProducts = payload?.data;
      })

      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deleteProduct ", payload?.data);
        state.allDeletedProduct = payload?.data;
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editLoadingNotice.pending, (state) => {
        state.loading = true;
      })

      .addCase(editLoadingNotice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("editLoadingNotice ", payload?.data);
        state.allEditedNoitce = payload?.data;
      })

      .addCase(editLoadingNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteLoadingNotice.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteLoadingNotice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deleteLoadingNotice ", payload?.data);
        state.deletedNotice = payload?.data;
      })

      .addCase(deleteLoadingNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Export Products
      .addCase(exportProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(exportProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("exportProduct ", payload?.data);
        state.exportProductData = payload?.data;
      })

      .addCase(exportProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Import Products
      .addCase(importProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(importProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("importProduct ", payload?.data);
        state.importProductData = payload?.data;
      })

      .addCase(importProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Import Loading Notice
      .addCase(importLoadingNotice.pending, (state) => {
        state.loading = true;
      })

      .addCase(importLoadingNotice.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("importLoadingNotice ", payload?.data);
        state.importLoadingData = payload?.data;
      })

      .addCase(importLoadingNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default LoadingNotice.reducer;
