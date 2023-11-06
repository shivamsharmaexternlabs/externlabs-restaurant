import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// Reset password
let BearerToken = reactLocalStorage.get("Token", false);
export const ManagerSlice = createAsyncThunk("ManagerSlice",async (body, { rejectWithValue }) => {
  console.log("sdffas",body)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/manager/?page=${body}`,
      {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      }
      
      );
      console.log("ManagerSlice response -> ",response);
      // toast.success("Successful");

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



// Reducer

export const managerReducer = createSlice({
  name: "managerReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(ManagerSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ManagerSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      }
      )

      .addCase(ManagerSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },

});

export default managerReducer.reducer;
