import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);

console.log("BearerToken===>", BearerToken)

// Get Driver
export const getDriver = createAsyncThunk("getDriver", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/drivers/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`, {
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

//Create Driver
export const createDriver = createAsyncThunk(
  "createDriver",
  async (body, { rejectWithValue }) => {
    console.log("BODY", body)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/drivers/create`,
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

      err?.response?.data?.message?.map((item) => {
        toast.error(item?.name);
        toast.error(item?.cin_number);
        toast.error(item?.contact);
      })
      return rejectWithValue(err);
    }
  }
);

//Edit Driver
export const editDriver = createAsyncThunk("editDriver", async (body, { rejectWithValue }) => {
  try {
    console.log("body====>", body);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/drivers/update/${body?.id}`, body, {
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
      toast.error(item?.cin_number);
      toast.error(item?.contact);
    })
    return rejectWithValue(err);
  }
}
);

//Delete Driver
export const deleteDriver = createAsyncThunk("deleteDriver", async (body, { rejectWithValue }) => {
  try {
    console.log("body", body);
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/drivers/delete`,
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

//===============Viechle Management===========//

// Get Vehichle
export const getVehicle = createAsyncThunk("getVehicle", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/trucks/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    }
    );
    toast.success(response?.data?.message);
    return response;
  } catch (err) {
    // toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);

// Create Vehicle
export const createVehicle = createAsyncThunk(
  "createVehicle",
  async (body, { rejectWithValue }) => {
    console.log("BODY", body)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/trucks/create`,
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
      err?.response?.data?.message?.map((item) => {
        toast.error(item?.registration_name);
        toast.error(item?.description);
      })
      return rejectWithValue(err);
    }
  }
);

// Edit Vehicle
export const editVehicle = createAsyncThunk("editVehicle", async (body, { rejectWithValue }) => {
  try {
    console.log("body====>", body);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/trucks/update/${body?.id}`, body, {
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
      toast.error(item?.registration_no);
    })
    return rejectWithValue(err);
  }
}
);

//Delete Vechicle
export const deleteVehicle = createAsyncThunk("deleteVehicle", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/trucks/delete`, {
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


// ============Client ====================//
export const getClients = createAsyncThunk("getClients", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/clients/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`, {
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

//==========Create Client=========//
export const createClient = createAsyncThunk(
  "createClient",
  async (body, { rejectWithValue }) => {
    console.log("BODY", body)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/clients/create`,
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
      err?.response?.data?.message?.map((item) => {
        toast.error(item?.name);
      })
      return rejectWithValue(err);
    }
  }
);

//==========Edit CLient==========//
export const editClient = createAsyncThunk("editClient", async (body, { rejectWithValue }) => {
  try {
    console.log("body====>", body);
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/clients/update/${body?.id}`, body, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    }
    );
    toast.success(response?.data?.message);
    return response;
  } catch (err) {
    err?.response?.data?.message?.map((item) => {
      toast.error(item?.name);
    })
    return rejectWithValue(err);
  }
}
);

// ======== Delete Client =============//
export const deleteClient = createAsyncThunk("deleteClient", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/clients/delete`, {
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

//EXPORT DRIVER
export const exportDriver = createAsyncThunk(
  "ExportDriver",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-driver`,
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

// EXPORT TRUCK
export const exportTruck = createAsyncThunk(
  "ExportTrucks",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-trucks`,
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
//Export CLient1
export const exportClient = createAsyncThunk(
  "ExportClients",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-clients`,
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

//import Driver
export const importDriver = createAsyncThunk(
  "importDriver",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/drivers/import-driver`, body,
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
          national_id: item.cin_number,
          contact: item.contact,
          description: item.description,
        };
      });

      // Now you can use map to iterate through the dataArray
      dataArray.map((item, index) => {
        item.national_id != undefined && toast.error(`National ID: ${item.national_id}`);
        item.contact != undefined && toast.error(`Contact: ${item.contact}`);
        item.description != undefined && toast.error(`Description: ${item.description}`);
      });

      return rejectWithValue(err);
    }
  }
);

export const importVehicle = createAsyncThunk(
  "importVehicle",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/trucks/import-truck`, body,
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
          registration_no:item.registration_no,
          description: item.description,
        };
      });

      // Now you can use map to iterate through the dataArray
      dataArray.map((item, index) => {
        item.registration_no != undefined && toast.error(`registration_no: ${item.registration_no}`);
        item.description != undefined && toast.error(`Description: ${item.description}`);
      });

      return rejectWithValue(err);
    }
  }
);

export const importClient = createAsyncThunk(
  "importClient",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/clients/import-client`, body,
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
          name:item.name,
          national_id: item.cin_number,
          contact: item.contact,
          description: item.description,
        };
      });

      // Now you can use map to iterate through the dataArray
      dataArray.map((item, index) => {
        item.name != undefined && toast.error(`Name: ${item.name}`);
        item.national_id != undefined && toast.error(`National ID: ${item.national_id}`);
        item.contact != undefined && toast.error(`Contact: ${item.contact}`);
        item.description != undefined && toast.error(`Description: ${item.description}`);
      });

      return rejectWithValue(err);
    }
  }
);


// Reducer

export const Plans = createSlice({
  name: "Plans",
  initialState: {
    allDrivers: [],
    createdDriver: [],
    updatedDriver: [],
    deletedDriver: [],
    allVehicles: [],
    createdVehicle: [],
    updatedVehicle: [],
    deletedVehicle: [],
    allClients: [],
    createdClient: [],
    updatedClient: [],
    deletedClient: [],
    exportDriversData: [],
    exportTrucksData: [],
    exportClientsData: [],
    importDriverData: [],
    importVehicleData:[],
    importClientData:[],
    loading: false,
    vehicleLoading: false,
    clientLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // get Driver

      .addCase(getDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getDriver ", payload?.data);
        state.allDrivers = payload?.data;
      })

      .addCase(getDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create Driver

      .addCase(createDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(createDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createDriver===> ", payload?.data);
        state.createdDriver = payload;
      })

      .addCase(createDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // edit Driver

      .addCase(editDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(editDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updateDriver===> ", payload?.data);
        state.updatedDriver = payload;
      })

      .addCase(editDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Driver

      .addCase(deleteDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deletedDriver===> ", payload?.data);
        state.deletedDriver = payload;
      })

      .addCase(deleteDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // =========get Vehicle Details========//
      .addCase(getVehicle.pending, (state) => {
        state.vehicleLoading = true;
      })

      .addCase(getVehicle.fulfilled, (state, { payload }) => {
        state.vehicleLoading = false;
        console.log("getVehicle ", payload?.data);
        state.allVehicles = payload?.data;
      })

      .addCase(getVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.error.message;
      })

      // ==========Create Vehicle
      .addCase(createVehicle.pending, (state) => {
        state.vehicleLoading = true;
      })

      .addCase(createVehicle.fulfilled, (state, { payload }) => {
        state.vehicleLoading = false;
        console.log("createVehicle ", payload?.data);
        state.createdVehicle = payload;
      })

      .addCase(createVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.error.message;
      })

      // Edit Vehicle
      .addCase(editVehicle.pending, (state) => {
        state.vehicleLoading = true;
      })

      .addCase(editVehicle.fulfilled, (state, { payload }) => {
        state.vehicleLoading = false;
        console.log("editVehicle ", payload?.data);
        state.updatedVehicle = payload;
      })

      .addCase(editVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.error.message;
      })

      //========deleteVehicle===========//
      .addCase(deleteVehicle.pending, (state) => {
        state.vehicleLoading = true;
      })

      .addCase(deleteVehicle.fulfilled, (state, { payload }) => {
        state.vehicleLoading = false;
        console.log("deleteVehicle ", payload?.data);
        state.deletedVehicle = payload;
      })

      .addCase(deleteVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.error.message;
      })

      //===========get Clients=========//
      .addCase(getClients.pending, (state) => {
        state.clientLoading = true;
      })

      .addCase(getClients.fulfilled, (state, { payload }) => {
        state.clientLoading = false;
        console.log("getClients ", payload?.data);
        state.allClients = payload?.data;
      })

      .addCase(getClients.rejected, (state, action) => {
        state.clientLoading = false;
        state.error = action.error.message;
      })

      //==========Create Client========//
      .addCase(createClient.pending, (state) => {
        state.clientLoading = true;
      })

      .addCase(createClient.fulfilled, (state, { payload }) => {
        state.clientLoading = false;
        console.log("createClient ", payload?.data);
        state.createdClient = payload;
      })

      .addCase(createClient.rejected, (state, action) => {
        state.clientLoading = false;
        state.error = action.error.message;
      })

      //=========Update Client========//
      .addCase(editClient.pending, (state) => {
        state.clientLoading = true;
      })

      .addCase(editClient.fulfilled, (state, { payload }) => {
        state.clientLoading = false;
        console.log("editClient ", payload?.data);
        state.updatedClient = payload;
      })

      .addCase(editClient.rejected, (state, action) => {
        state.clientLoading = false;
        state.error = action.error.message;
      })

      //========Deleted Client=========//
      .addCase(deleteClient.pending, (state) => {
        state.clientLoading = true;
      })

      .addCase(deleteClient.fulfilled, (state, { payload }) => {
        state.clientLoading = false;
        console.log("deleteClient ", payload?.data);
        state.deletedClient = payload;
      })

      .addCase(deleteClient.rejected, (state, action) => {
        state.clientLoading = false;
        state.error = action.error.message;
      })

      //export Driver
      .addCase(exportDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(exportDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("exportDriver ==>", payload)
        state.exportDriversData = payload;
      })

      .addCase(exportDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //export Trcuks
      .addCase(exportTruck.pending, (state) => {
        state.loading = true;
      })

      .addCase(exportTruck.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("exportTruck ==>", payload)
        state.exportTrucksData = payload;
      })

      .addCase(exportTruck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //export Clients
      .addCase(exportClient.pending, (state) => {
        state.loading = true;
      })

      .addCase(exportClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("exportClient ==>", payload)
        state.exportClientsData = payload;
      })

      .addCase(exportClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Import Driver
      .addCase(importDriver.pending, (state) => {
        state.loading = true;
      })

      .addCase(importDriver.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("importDriver ==>", payload)
        state.importDriverData = payload;
      })

      .addCase(importDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      //Import Vehicle
      .addCase(importVehicle.pending, (state) => {
        state.vehicleLoading = true;
      })

      .addCase(importVehicle.fulfilled, (state, { payload }) => {
        state.vehicleLoading = false;
        console.log("importVehicle ==>", payload)
        state.importVehicleData = payload;
      })

      .addCase(importVehicle.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.error.message;
      })

      //Import Client
      .addCase(importClient.pending, (state) => {
        state.clientLoading = true;
      })

      .addCase(importClient.fulfilled, (state, { payload }) => {
        state.clientLoading = false;
        console.log("importClient ==>", payload)
        state.importClientData = payload;
      })

      .addCase(importClient.rejected, (state, action) => {
        state.clientLoading = false;
        state.error = action.error.message;
      })
  },
});

export default Plans.reducer;
