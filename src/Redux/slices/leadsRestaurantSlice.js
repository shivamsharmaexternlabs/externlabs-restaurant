import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { string } from "yup";


let RestaurantId = reactLocalStorage.get("RestaurantId", false);
let BearerToken = reactLocalStorage.get("Token", false);
let languageSet = reactLocalStorage.get("languageSet", "en");

// get leads Restaurant Slice 
export const LeadsRestaurantSlice = createAsyncThunk("LeadsRestaurantSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/?page=${body?.pagination === undefined ? 1 : body?.pagination}`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
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


// create leads Restaurant Slice 
export const CreateLeadsRestaurantSlice = createAsyncThunk("CreateLeadsRestaurantSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}sales/leads/`, body,
      {
        headers: {
          Authorization: `Bearer ${body?.BearerToken}`,
          "Accept-Language": languageSet
        },
      });
    console.log("bhgfcgvhj", response)

    return response;

  } catch (err) {

    toast.error(err?.response?.data?.error?.[0]);
    return rejectWithValue(err);
  }
}
);


// get a single Restaurant
export const GetRestaurantsOnBoardSlice = createAsyncThunk("GetRestaurantsOnBoardSlice", async (body, { rejectWithValue }) => {
  try {
    console.log("bhgvcfcgvhb", body)
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/${body?.RestaurantId}/`,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
          "Accept-Language": languageSet
        },
      });

    return response;

  } catch (err) {
    toast.error(err?.response?.data?.error?.[0]);
    return rejectWithValue(err);
  }
}
);




// create Restaurant After SignUp Slice 
export const CreateRestaurantsOnBoardSlice = createAsyncThunk("CreateRestaurantsOnBoardSlice", async (body, { rejectWithValue }) => {
  try {

    const formData = new FormData();
    // formData.append("restaurant_id", body?.restaurant_id);
    formData.append("restaurant_name", body?.restaurant_name);
    formData.append("shop_no", body?.shop_no);
    formData.append("street", body?.street);
    formData.append("city", body?.city);
    formData.append("landmark", body?.landmark);
    formData.append("pincode", body?.pincode);
    formData.append("state", body?.state);
    formData.append("country", body?.country);
    formData.append("description", body?.description);
    formData.append("owner_id", body?.owner_id);
    formData.append("Token", body?.Token);
    formData.append("logo", body?.Logo);


    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/`, formData,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
          "Accept-Language": languageSet
        },
      });

    return response;

  } catch (err) {
    toast.error(err?.response?.data?.error?.[0]);
    return rejectWithValue(err);
  }
}
);



// Update Restaurant (PATCH REQUEST ...)
export const UpdateRestaurantSlice = createAsyncThunk("UpdateRestaurantSlice", async (body, { rejectWithValue }) => {

  const formData = new FormData();

  formData.append("restaurant_name", body?.restaurant_name);
  formData.append("shop_no", body?.shop_no);
  formData.append("street", body?.street);
  formData.append("city", body?.city);
  formData.append("landmark", body?.landmark);
  formData.append("pincode", body?.pincode);
  formData.append("state", body?.state);
  formData.append("country", body?.country);
  formData.append("description", body?.description);
  // formData.append("owner_id", body?.owner_id);
  formData.append("RestaurantId", body?.RestaurantId);
  if(typeof(body?.logo)!= "string"  )
{
  formData.append("logo", body?.logo)
}   
console.log("sdfdgfhgjh",typeof(body?.logo))
  try {
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}restaurant_app/restaurant/${body?.RestaurantId}/`,  
    formData  ,
      {
        headers: {
          Authorization: `Bearer ${body?.Token}`,
          "Accept-Language": languageSet
        },
      });

    return response;

  } catch (err) {

    toast.error(err?.response?.data?.error?.[0]);
    return rejectWithValue(err);
  }
}
);



// Reducer
export const LeadsRestaurantReducer = createSlice({
  name: "LeadsRestaurantReducer",
  initialState: {
    LeadsRestaurantReducerData: [],
    CreateLeadsRestaurantReducerData: [],
    GetRestaurantsOnBoardSliceReducerData: [],
    RestaurantOnBoardReducerData: [],
    UpdateRestaurantReducerData: [],
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
        console.log("CreateLeadsRestaurantReducerData", action.payload)
        // toast.success("Lead Created Successfully")
      })

      .addCase(CreateLeadsRestaurantSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })


      // Get a single Restaurant 
      .addCase(GetRestaurantsOnBoardSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetRestaurantsOnBoardSlice.fulfilled, (state, action) => {
        state.GetRestaurantsOnBoardSliceReducerData = action.payload;
      })

      .addCase(GetRestaurantsOnBoardSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Create  Restaurant after onboard Reducer
      .addCase(CreateRestaurantsOnBoardSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(CreateRestaurantsOnBoardSlice.fulfilled, (state, action) => {
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

        toast.success(action?.payload?.data?.message)
      })

      .addCase(UpdateRestaurantSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })

  },

});

export default LeadsRestaurantReducer.reducer;
