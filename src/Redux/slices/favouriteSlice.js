import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);
let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false);

export const favoriteMenuItemSlice = createAsyncThunk(
  "favoriteMenuItemSlice",
  async (body, { rejectWithValue }) => {
    console.log("GetMenuCatdszdfsfdsdegorySlice", body);
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${BearerToken}`,
      };

      let reqOptions = {
        url: `${process.env.REACT_APP_BASE_URL}restaurant_app/menuitems/${body}/update-favorite/`,
        method: "PATCH",
        headers: headersList,
      };
      const response = await axios.request(reqOptions);
      return response;
    } catch (err) {
      // console.log("err++++++++",err.response.data.message);
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

export const menuItemFavouriteReducer = createSlice({
  name: "menuItemFavouriteReducer",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(favoriteMenuItemSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(favoriteMenuItemSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(favoriteMenuItemSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuItemFavouriteReducer.reducer;
