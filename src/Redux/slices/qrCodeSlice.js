import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);
let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false);


// get menu category 
 export const GetQrCodeSlice = createAsyncThunk("GetQrCodeSlice",async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/qrcodes/?restaurant_id=${body}`,
    
    );
    console.log("GetQrCodeSlice",response);
    // toast.success("Successful");

    return response;

  } catch (err) {
      console.log("GetQrCodeSlice error",err );
    // toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);
// Reducer

export const qrcodeReducer = createSlice({
    name: "qrcodeReducer",
    initialState: {
      data : [],
      loading: false,
      error: null,
    },
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(GetQrCodeSlice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(GetQrCodeSlice.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
        )
  
        .addCase(GetQrCodeSlice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  
  });
  
  export default qrcodeReducer.reducer;