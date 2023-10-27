import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useLocation } from "react-router-dom";

let BearerToken = reactLocalStorage.get("Token", false);

export const createUser = createAsyncThunk(
  "createUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/create`,
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
        toast.error(item?.name) ;
        toast.error(item?.email);
        toast.error(item?.employee_id);
        toast.error(item?.national_id);
        toast.error(item?.message);
      });
      return rejectWithValue(err);
    }
  }
);

// get user

export const getUser = createAsyncThunk(
  "getUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/get?page=${body?.page == undefined ? 1 : body?.page}&search=${body?.search == undefined ? "" : body?.search}`,
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

// update user

export const updateUser = createAsyncThunk(
  "updateUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/update/${body?.id}`,
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
      toast.error(err?.response?.data?.message?.email[0]);
      toast.error(err?.response?.data?.message?.employee_id[0]);
      toast.error(err?.response?.data?.message?.national_id[0]);
      return rejectWithValue(err);
    }
  }
);

// delete user

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/users/delete`,
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

//Export User
export const exportUser = createAsyncThunk(
  "ExportUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/export-users`,
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

// import User

export const importUser = createAsyncThunk(
  "importUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/import-users`, body,
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
      const dataArray = err?.response?.data?.message.map((item, key) => {
        return {
          name:item.name,
          email: item.email,
          employee_id: item.employee_id,
          national_id: item.national_id,
          role: item.role,
        };
      });

      dataArray.map((item, index) => {
        item.name != undefined && toast.error(`Name: ${item.name}`);
        item.email != undefined && toast.error(`Email: ${item.email}`);
        item.employee_id != undefined && toast.error(`Employee ID: ${item.employee_id}`);
        item.national_id != undefined && toast.error(`National ID: ${item.national_id}`);
        item.role != undefined && toast.error(`Role: ${item.role}`);
      });

      return rejectWithValue(err);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    allUsers: [],
    createdUsers: [],
    updatedUser: [],
    deletedUser: [],
    exportUserData: [],
    ImportedUsers: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // get user

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("getUser", payload?.data);
        state.allUsers = payload?.data;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create user

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("createdUsers", payload?.data?.data);
        state.createdUsers = payload;
      })

      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // edit user

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updatedUser", payload?.data?.data);
        state.updatedUser = payload;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // delete user

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updatedUser", payload?.data?.data);
        state.deletedUser = payload;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Export User
      .addCase(exportUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(exportUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("updatedUser", payload?.data?.data);
        state.exportUserData = payload;
      })

      .addCase(exportUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // import User

      .addCase(importUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(importUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("ImportedUsers", payload?.data?.data);
        state.ImportedUsers = payload|| [];
      })

      .addCase(importUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  },
});

export default userDetail.reducer;
