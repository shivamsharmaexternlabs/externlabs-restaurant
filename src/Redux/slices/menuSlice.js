import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// Reset password
let BearerToken = reactLocalStorage.get("Token", false);
export const MenuSlice = createAsyncThunk("MenuSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/menu/?restaurant_id=f5297be5-299f-44bc-bc1e-03809f8b66f0`, 

      {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      }
      
      );
      console.log("response",response);
      toast.success("Successful");

      return response;

    } catch (err) {
        console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



// Reducer

export const menuReducer = createSlice({
  name: "menuReducer",
  initialState: {
    data: [],  
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(MenuSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(MenuSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      }
      )

      .addCase(MenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default menuReducer.reducer;
