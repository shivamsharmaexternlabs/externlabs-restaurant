import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

    
let RestaurantId = reactLocalStorage.get("RestaurantId", false);
let BearerToken = reactLocalStorage.get("Token", false);

// get leads Restaurant Slice 
export const LeadsRestaurantSlice = createAsyncThunk("LeadsRestaurantSlice",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/?page=${body?.pagination === undefined? 1 : body?.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }
      ); 
      console.log("LeadsRestaurantSlice",response?.data ); 

      return response;

    } catch (err) {

      console.log("shfjjerr", err)
      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);


// create leads Restaurant Slice 
export const CreateLeadsRestaurantSlice = createAsyncThunk("CreateLeadsRestaurantSlice",async (body, { rejectWithValue }) => {
  console.log("sjdhbcjwhbvjhwjvhb", body)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}sales/leads/`, body ,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
        },
      }); 
      console.log("LeadsRestaurantSlice",response?.data ); 

      return response;

    } catch (err) {

      console.log("shfjjerr", err)
      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);



// create Restaurant After SignUp Slice 
export const CreateRestaurantsOnBoardSlice = createAsyncThunk("CreateRestaurantsOnBoardSlice",async (body, { rejectWithValue }) => { 
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/`, body ,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
        },
      }); 
      console.log("LeadsRestaurantSlice",response?.data ); 

      return response;

    } catch (err) { 
      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);



// Update Restaurant (PATCH REQUEST ...)
export const UpdateRestaurantSlice = createAsyncThunk("UpdateRestaurantSlice",async (body, { rejectWithValue }) => {
  console.log("sjdhbcjwhbvjhwjvhb", body)
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/${RestaurantId}/`, body ,
      {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      }); 
      console.log("UpdateRestaurantSlice",response?.data ); 

      return response;

    } catch (err) {

      console.log("shfjjerr", err)
      toast.error(err?.response?.data?.error[0]);
      return rejectWithValue(err);
    }
  }
);



// Reducer
export const LeadsRestaurantReducer = createSlice({
  name: "LeadsRestaurantReducer",
  initialState: {
    LeadsRestaurantReducerData: [],
    CreateLeadsRestaurantReducerData : [],
    RestaurantOnBoardReducerData : [],
    UpdateRestaurantReducerData : [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

    // get Leads Restaurant Reducer
      .addCase(LeadsRestaurantSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(LeadsRestaurantSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.LeadsRestaurantReducerData = action.payload;
      })

      .addCase(LeadsRestaurantSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })

      // Create Leads Restaurant Reducer
      .addCase(CreateLeadsRestaurantSlice.pending, (state) => { 
        state.loading = true;
      })

      .addCase(CreateLeadsRestaurantSlice.fulfilled, (state, action) => { 
        state.loading = false;
        state.CreateLeadsRestaurantReducerData = action.payload;
        toast.success("Lead Created Successfully")
      })

      .addCase(CreateLeadsRestaurantSlice.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })


      // Create  Restaurant after onboard Reducer
      .addCase(CreateRestaurantsOnBoardSlice.pending, (state) => { 
        state.loading = true;
      })

      .addCase(CreateRestaurantsOnBoardSlice.fulfilled, (state, action) => { 
        console.log("nbsdsdsdsbs",  action)
        // state.loading = false;
        state.RestaurantOnBoardReducerData = action.payload;
        // toast.success("restorent Created Successfully")
      })

      .addCase(CreateRestaurantsOnBoardSlice.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })


      // Create  Restaurant after onboard Reducer
      .addCase(UpdateRestaurantSlice.pending, (state) => { 
        state.loading = true;
      })

      .addCase(UpdateRestaurantSlice.fulfilled, (state, action) => { 
        state.loading = false;
        state.UpdateRestaurantReducerData = action.payload;
        toast.success("restorent Created Successfully")
      })

      .addCase(UpdateRestaurantSlice.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })
       
  },

});

export default LeadsRestaurantReducer.reducer;
