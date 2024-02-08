import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";


let languageSet = reactLocalStorage.get("languageSet", "en");
// SignIn

export const SignInSlice = createAsyncThunk("SignInSlice", async (body, { rejectWithValue }) => {
  try {
    const dataa=await body?.transFun 
    console.log("sadsfsdwedas",dataa)
     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/signin/`, body,
      {
        headers: {
          "Accept-Language": languageSet
        },
      });
    // console.log("khdgjdssd",response?.data?.message)
    if (response?.data?.type == "owner" || response?.data?.type == "sales") {
      toast.success(response?.data?.message);

    } else {
      if (languageSet == "en") {
        toast.error(  "You are not autherized ");
      }
      else {
        toast.error("لم يتم التصريح لك");
      }

    }

    reactLocalStorage.set("Token", response?.data?.token);
    reactLocalStorage.set("FirstName", response?.data?.first_name);
    if (response?.data?.type !== "sales") {
      reactLocalStorage.set("RestaurantId", response?.data?.restaurants?.[0]?.restaurant_id); //need condition when role is "sales" then only we have to

    }

    reactLocalStorage.set("Type", response?.data?.type);

    // reactLocalStorage.set("id",response?.data?.currentUser?.user_id);
    // reactLocalStorage.set("name",response?.data?.currentUser?.user_name);
    // reactLocalStorage.set("email",response?.data?.currentUser?.user_email);
    // reactLocalStorage.set("employee_id",response?.data?.currentUser?.employee_id);
    // reactLocalStorage.set("national_id",response?.data?.currentUser?.national_id);
    // reactLocalStorage.set("role_id",response?.data?.currentUser?.role_id);
    // reactLocalStorage.set("role_name",response?.data?.currentUser?.role_name);

    // let Permission =  JSON.stringify(response?.data?.currentUser?.permissions);
    // reactLocalStorage.set("Permissions",Permission);

    return response;

  } catch (err) {

    toast.error(err?.response?.data?.error?.[0]);
    return rejectWithValue(err);
  }
}
);




// Reducer

export const signInReducer = createSlice({
  name: "signInReducer",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(SignInSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(SignInSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = (action.payload);
      }
      )

      .addCase(SignInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })




  },

});

export default signInReducer.reducer;
