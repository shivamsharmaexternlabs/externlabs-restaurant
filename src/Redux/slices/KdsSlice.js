import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let languageSet = reactLocalStorage.get("languageSet", "en");

export const GetKdsSlice = createAsyncThunk(
    "GetKdsSlice",
    async (body, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}restaurant_app/category/`,
          {
            headers: {
                Authorization: `Bearer ${body?.BearerToken}`,
                "Accept-Language": languageSet
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
    },
});
export default kdsReducer.reducer;