import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


let languageSet = reactLocalStorage.get("languageSet", "en");

// Post Manage Order Table
 export const PostManageOrderTableSlice = createAsyncThunk("PostManageOrderTableSlice",async (body, { rejectWithValue }) => {
  console.log("snbdvhgsvdcsd0",body)
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant_table/`,
      body
    ,
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

export const GetManageOrderTableSlice = createAsyncThunk("GetManageOrderTableSlice",async (body, { rejectWithValue }) => {
  console.log("snbdvhgsvdcsd0",body)
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant_table/?restaurant_id=${body?.RestaurantId}` 
    ,
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
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
}
);

 
// Reducer

export const ManageOrderTableReducer = createSlice({
    name: "manageOrderTableReducer",
    initialState: {
      data : [],
      GetManageOrderTableData:[],
      loading: false,
      error: null,
    },
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(PostManageOrderTableSlice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(PostManageOrderTableSlice.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
        )
  
        .addCase(PostManageOrderTableSlice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(GetManageOrderTableSlice.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(GetManageOrderTableSlice.fulfilled, (state, action) => {
          state.loading = false;
          state.GetManageOrderTableData = action.payload;
        }
        )
  
        .addCase(GetManageOrderTableSlice.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  
  });
  
  export default ManageOrderTableReducer.reducer;