import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false)

// Get Role

export const getRole = createAsyncThunk("getRole", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    });
    toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);

// Create role

export const createRole = createAsyncThunk("createRole", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/roles/create`, body, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    });
    toast.success(response?.data?.message);
    return response;

  } catch (err) {
    err?.response?.data?.message?.map((item) => {
      toast.error(item?.role_name);
    })
    return rejectWithValue(err);
  }
}
);

// udate role

export const updateRole = createAsyncThunk("updateRole", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/roles/update/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    });
    toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.error(err?.response?.data?.message);
    // .map((item)=>{
    // toast.error(item?.role_name);
    // })
    return rejectWithValue(err);
  }
}
);

// delete Role

export const deleteRole = createAsyncThunk("deleteRole", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/roles/delete/${body.id}`, {
      headers: {
        Authorization: `Bearer ${BearerToken}`,
      },
    });
    toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);
//
//Export Role
export const exportRole = createAsyncThunk(
  "ExportRoles",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-roles`,
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
// Reducer

export const Role = createSlice({
  name: "Role",
  initialState: {
    allRoles: [],
    createdRoles: [],
    updatedRoles: [],
    deletedRoles: [],
    exportRolesData: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // get Role

      .addCase(getRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getRole ", payload?.data)
        state.allRoles = payload?.data;
      })

      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create role

      .addCase(createRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(createRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createRole ", payload)
        state.createdRoles = payload;
      })

      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update Role 

      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updateRole ", payload)
        state.updatedRoles = payload;
      })

      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Role

      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("deleteRole ", payload)
        state.deletedRoles = payload;
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Export  Role

      .addCase(exportRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(exportRole.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("exportRole ==>", payload)
        state.exportRolesData = payload;
      })

      .addCase(exportRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },

});

export default Role.reducer;
