import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let BearerToken = reactLocalStorage.get("Token", false);
let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false);


// get menu category 
 export const GetMenuCategorySlice = createAsyncThunk("GetMenuCategorySlice",async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/category/?restaurant_id=${body?.RestaurantId}`,
    
    );
    console.log("GetMenuCategorySlice",response);
    // toast.success("Successful");

    return response;

  } catch (err) {
      console.log("GetMenuCategorySlice error",err );
    // toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);

// get menu category data 

export const MenuSlice = createAsyncThunk("MenuSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/menu/?restaurant_id=${body?.RestaurantId}&search=${body?.searchValue===undefined?"":body?.searchValue}&item_type=${body?.itemTypeValue===undefined?"":body?.itemTypeValue}`, 

      // {
      //   headers: {
      //     Authorization: `Bearer ${BearerToken}`,
      //   },
      // }
      
      )   
        return response;
    

    } catch (err) {
        // console.log("err++++++++",err.response.data.message);
      // toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);




// Reducer

export const menuReducer = createSlice({
  name: "menuReducer",
  initialState: {
    GetMenuCategoryReducerData : [],
    MenuSliceReducerData: [],  
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
      }
      )

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
      }
      )

      .addCase(MenuSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },

});

export default menuReducer.reducer;
