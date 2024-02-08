import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

let languageSet = reactLocalStorage.get("languageSet", "en");

export const ManagerSlice = createAsyncThunk("ManagerSlice",async (body, { rejectWithValue }) => { 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/staff/?page=${body?.pageination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
          "Accept-Language": languageSet
        },
      }
      
      );  

      return response;

    } catch (err) {
       toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



export const ManagerDeleteSlice = createAsyncThunk("ManagerDeleteSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}restaurant_app/staff/${body?.item}/`,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
          "Accept-Language": languageSet
        },
      }
      
      ); 

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);



export const StaffRoleSlice = createAsyncThunk("StaffRoleSlice",async (body, { rejectWithValue }) => { 
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}user_auth/groups/`,
    {
      headers: {
        Authorization: `Bearer ${body?.Token}`,
        "Accept-Language": languageSet
      },
    }
    
    );  

    console.log("hvdgsddd",response)
    return response;

  } catch (err) {
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
    managerDeleteReducer:[],
    StaffRoleSliceData:[],
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

      .addCase(ManagerDeleteSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(ManagerDeleteSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.managerDeleteReducer = action.payload;
        toast.success(action?.payload?.data?.message);
      }
      )

      .addCase(ManagerDeleteSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(StaffRoleSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(StaffRoleSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.StaffRoleSliceData = action.payload;
        toast.success(action?.payload?.data?.message);
      }
      )

      .addCase(StaffRoleSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


  },

});

export default managerReducer.reducer;
