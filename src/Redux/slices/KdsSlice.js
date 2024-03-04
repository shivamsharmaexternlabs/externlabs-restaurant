import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetKdsSlice = createAsyncThunk(
    "GetKdsSlice",
    async (body, { rejectWithValue }) => {
       try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}kds/kot/?restaurant_id=${body.restaurant_id}`,
          {
            headers: {
                Authorization: `Bearer ${body.token}`                
            },
          }
        );
        // toast.success("Successful");
        return response;
      } catch (err) {
        // toast.error(err?.response?.data?.message);
        return rejectWithValue(err);
      }
    }
  );

  export const UpdateKdsSlice = createAsyncThunk(
    "UpdateKdsSlice",
    async ( body , { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}kds/kot/${body.kot_id}/?restaurant_id=${body.restaurant_id}`,
          {status:body.status},
          {
            headers: {
              Authorization: `Bearer ${body.token}`
            },
          }
        );
        // toast.success("Successful");
        return response;
      } catch (err) {
        // toast.error(err?.response?.data?.message);
        return rejectWithValue(err);
      }
    }
  );
  


  export const kdsReducer = createSlice({
    name: "kdsReducer",
    initialState: {
      GetKdsReducerData: [],
      UpdateKdsReducerData:[],
      loading: false,
      error: null,
    },
    reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetKdsSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetKdsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetKdsReducerData = action.payload;
      })

      .addCase(GetKdsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(UpdateKdsSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(UpdateKdsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.UpdateKdsReducerData = action.payload;
      })

      .addCase(UpdateKdsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    },
});
export default kdsReducer.reducer;