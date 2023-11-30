import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


export const UploadMenuSlice = createAsyncThunk("UploadMenuSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}restaurant_app/menuupload/`,body?.formData,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
        },
      }
      
      );
      toast.success("Successful");

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



// Reducer

export const uploadMenuReducer = createSlice({
  name: "uploadMenuReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(UploadMenuSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(UploadMenuSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(UploadMenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },

});

export default uploadMenuReducer.reducer;
