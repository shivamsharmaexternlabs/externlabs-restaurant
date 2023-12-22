import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false);
let languageSet = reactLocalStorage.get("languageSet", "en");

// create menu
export const CreateMenuSlice = createAsyncThunk(
  "CreateMenuSlice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menuitems/`,
        body?.formData,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );
      // toast.success(response?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.error?.[0]);
      return rejectWithValue(err);
    }
  }
);

// create category
export const CreateCategorySlice = createAsyncThunk(
  "CreateCategorySlice",
  async (body, { rejectWithValue }) => {

    const formData = new FormData();
    formData.append("restaurant_id", body?.restaurant_id);
    formData.append("category_image", body?.category_image);
    formData.append("category_en", body?.category_en);
    formData.append("category_native", body?.category_native);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menu/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${body?.token}`,
            "Accept-Language": languageSet
          },
        }
      );
      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.error?.[0]);
      return rejectWithValue(err);
    }
  }
);
// get menu category 
export const GetMenuCategorySlice = createAsyncThunk(
  "GetMenuCategorySlice",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/category/?restaurant_id=${body?.RestaurantId}&index=true`,
        {
          headers: {
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

//patch category data after drag and drop
export const UpdateMenuCategoryAfterDragAndDrop = createAsyncThunk(
  "UpdateMenuCategoryAfterDragAndDrop",
  async (body, { rejectWithValue }) => {
    try {

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/category/${body?.RestaurantId}/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );
      toast.success(response?.data?.message);

      return response;
    } catch (err) {

      console.log("asdsfgfhjh", err?.response)
      toast.error(err?.response?.data?.message);

      return rejectWithValue(err);
    }
  }
);


//patch menu item data after drag and drop
export const UpdateMenuItemsAfterDragAndDrop = createAsyncThunk(
  "UpdateMenuItemsAfterDragAndDrop",
  async (body, { rejectWithValue }) => {
    console.log("bodyOfUpdateMenuItemDragAndDrop", body?.BearerToken)
    try {

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/item_index/`,
        body,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );

      console.log("jhgfdfghjk", response?.data?.message)
      toast.success(response?.data?.message);
      // toast.success(response?.data?.detail);

      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message);

      return rejectWithValue(err);
    }
  }
);


// get menu category data

export const MenuSlice = createAsyncThunk(
  "MenuSlice",
  async (body, { rejectWithValue }) => {
    console.log("jhgfcgvhj", body);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menu/?restaurant_id=${body?.RestaurantId
        }&menu_id=${body?.MenuId === undefined ? "" : body?.MenuId}&search=${body?.searchValue === undefined ? "" : body?.searchValue
        }&is_veg=${body?.itemTypeValue === "VEG" ? "True" : ""
        }&is_non_veg=${body?.itemTypeValue === "NON_VEG" ? "True" : ""
        }&is_favorite=${body?.itemTypeValue === "BESTSELLER" ? "True" : ""
        }&index=true`,
        {
          headers: {
            "Accept-Language": languageSet
          },
        }

      );

      return response;
    } catch (err) {
      // toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

// get favorite dishes Slice
export const favoriteMenuSlice = createAsyncThunk(
  "favoriteMenuSlice",
  async (body, { rejectWithValue }) => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menu/?restaurant_id=${body?.RestaurantId}&is_favorite=True`,
        {
          headers: {
            "Accept-Language": languageSet
          },
        }
      );
      return response;
    } catch (err) {
      // toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

export const GetSampleUploadSlice = createAsyncThunk(
  "GetSampleUploadSlice",
  async (body, { rejectWithValue }) => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/sample_excel/`,
        {
          headers: {
            "Accept-Language": languageSet
          },
        }
      );
      return response;
    } catch (err) {
      // toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);

// edit menu
export const EditMenuItemSlice = createAsyncThunk(
  "EditMenuItemSlice",
  async (body, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("restaurant_id", body?.restaurant_id);
      formData.append("description_en", body?.description_en);
      formData.append("description_native", body?.description_native);

      if (typeof body.image === "string" || body.image === null) {
        delete body.image;
      } else {
        formData.append("image", body?.image);
      }

      formData.append("item_name_en", body?.item_name_en);
      formData.append("item_name_native", body?.item_name_native);
      formData.append("item_price", body?.item_price);
      formData.append("calories", body?.calories);
      formData.append("menu_id", body?.menu_id);
      formData.append("is_veg", (body?.item_type === "VEG"));
      formData.append("is_non_veg", (body?.item_type === "NON_VEG"));
      formData.append("currency", body?.currency);
      formData.append("calories_unit", body?.calories_unit);


      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menuitems/${body?.item_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );
      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.error?.[0]);
      return rejectWithValue(err);
    }
  }
);


export const EditCategorySlice = createAsyncThunk(
  "EditCategorySlice",
  async (body, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("restaurant_id", body?.restaurant_id);

      if (body.category_image) {
        formData.append("category_image", body?.category_image);
      }

      formData.append("category_en", body?.category_en);
      formData.append("category_native", body?.category_native);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menu/${body?.menu_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );

      toast.success(response?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.error?.[0]);
      return rejectWithValue(err);
    }
  }
);

// delete menu item
export const DeleteMenuItemSlice = createAsyncThunk(
  "DeleteMenuItemSlice",
  async (body, { rejectWithValue }) => {

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menuitems/${body?.item_id}/`,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );

      return response;
    } catch (err) {
      toast.error(err?.response?.data?.error?.[0]);
      return rejectWithValue(err);
    }
  }
);
// delete category item
export const DeleteMenuCategorySlice = createAsyncThunk(
  "DeleteMenuCategorySlice",
  async (body, { rejectWithValue }) => {

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}restaurant_app/menu/${body?.menu_id}/ `,
        {
          headers: {
            Authorization: `Bearer ${body?.BearerToken}`,
            "Accept-Language": languageSet
          },
        }
      );

      languageSet &&    languageSet === "en" ? toast.success("Deleted Successfully") : toast.success("تم الحذف بنجاح")

      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);
// Reducer

export const menuReducer = createSlice({
  name: "menuReducer",
  initialState: {
    GetMenuCategoryReducerData: [],
    GetReorderCategoryReducerData: [],
    MenuSliceReducerData: [],
    favoriteMenuSliceReducerData: [],
    CreateMenuSliceReducerData: [],
    CreateCategoryReducerData: [],
    EditMenuSliceReducerData: [],
    EditCategoryReducerData: [],
    GetSampleUploadReducerData: [],
    DeleteMenuItemReducerData: [],
    DeleteMenucategoryReducerData: [],
    UpdateMenuCategoryAfterDragAndDroprReducerData: [],
    UpdateMenuItemsAfterDragAndDropReducerData: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetMenuCategorySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetMenuCategorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetMenuCategoryReducerData = action.payload;
      })

      .addCase(GetMenuCategorySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(MenuSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(MenuSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.MenuSliceReducerData = action.payload;
      })

      .addCase(MenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(favoriteMenuSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(favoriteMenuSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteMenuSliceReducerData = action.payload;
      })

      .addCase(favoriteMenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(CreateMenuSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(CreateMenuSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.CreateMenuSliceReducerData = action.payload;
        toast.success(action?.payload?.data?.message);
      })

      .addCase(CreateMenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(CreateCategorySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(CreateCategorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.CreateCategoryReducerData = action.payload;
      })

      .addCase(CreateCategorySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(GetSampleUploadSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetSampleUploadSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetSampleUploadReducerData = action.payload;
      })

      .addCase(GetSampleUploadSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(EditMenuItemSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(EditMenuItemSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.EditMenuSliceReducerData = action.payload;
      })

      .addCase(EditMenuItemSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(EditCategorySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(EditCategorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.EditCategoryReducerData = action.payload;
      })

      .addCase(EditCategorySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteMenuItemSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(DeleteMenuItemSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.DeleteMenuItemReducerData = action.payload;
        toast.success("Item Deleted Successfully");

      })

      .addCase(DeleteMenuItemSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteMenuCategorySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(DeleteMenuCategorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.DeleteMenucategoryReducerData = action.payload;
        // (action?.payload?.status === 204)
        // console.log("DeleteMenucategoryReducerData", action?.payload?.status === 204)
      })

      .addCase(DeleteMenuCategorySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(UpdateMenuCategoryAfterDragAndDrop.pending, (state) => {
        state.loading = true;
      })

      .addCase(UpdateMenuCategoryAfterDragAndDrop.fulfilled, (state, action) => {
        state.loading = false;
        state.UpdateMenuCategoryAfterDragAndDroprReducerData = action.payload;
      })

      .addCase(UpdateMenuCategoryAfterDragAndDrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })

      .addCase(UpdateMenuItemsAfterDragAndDrop.pending, (state) => {
        state.loading = true;
      })

      .addCase(UpdateMenuItemsAfterDragAndDrop.fulfilled, (state, action) => {
        state.loading = false;
        state.UpdateMenuItemsAfterDragAndDropReducerData = action.payload;
      })

      .addCase(UpdateMenuItemsAfterDragAndDrop.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
  },
});

export default menuReducer.reducer;
