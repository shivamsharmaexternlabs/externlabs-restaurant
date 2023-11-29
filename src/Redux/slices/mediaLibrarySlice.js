import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


// Get Media Library Slice
export const GetMediaLibrarySlice = createAsyncThunk(
  "GetMediaLibrarySlice",
  async (body, { rejectWithValue }) => {
    console.log("hgfcdx", body)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/bulk_image_upload/?restaurant_id=${body?.RestaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
          },
        }
      );
      // toast.success(response?.data?.message);
      console.log("media Library response", response)
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
      return rejectWithValue(err);
    }
  }
);


// (Upload) Post Media Library Slice
export const PostMediaLibrarySlice = createAsyncThunk(
  "PostMediaLibrarySlice",
  async (body, { rejectWithValue }) => {
    try {
      const formData = new FormData();

       formData.append("restaurant_id", body?.restaurant_id);
     
      if (body?.images) {

        for(let i=0; i<body?.images.length; i++){ 
          formData.append("images", body?.images[i]);
        } 
      } 
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/bulk_image_upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
          },
        }
      );

      console.log("errefgeggggg")
      return response;
    } catch (err) {
      console.log("errefgeg", err)
      // toast.error(err);
      return rejectWithValue(err);
    }
  }
);

// Reducer
export const mediaLibraryReducer = createSlice({
  name: "mediaLibraryReducer",
  initialState: {
    GetMediaLibrarySliceReducerData: [],
    PostMediaLibraryReducerData: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
    // get media library reducer cases
      .addCase(GetMediaLibrarySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetMediaLibrarySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetMediaLibrarySliceReducerData = action.payload;
        toast.success(action?.payload?.data?.message);
      })

      .addCase(GetMediaLibrarySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

// Upload media library reducer cases
      .addCase(PostMediaLibrarySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(PostMediaLibrarySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.PostMediaLibraryReducerData = action.payload;
        toast.success(action?.payload?.data?.message);
      })

      .addCase(PostMediaLibrarySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default mediaLibraryReducer.reducer;
