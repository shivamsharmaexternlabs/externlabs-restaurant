import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

// let BearerToken = reactLocalStorage.get("Token", false)
    
// SignIn

export const SignInSlice = createAsyncThunk("SignIn",async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user_auth/signin/`,body);
      toast.success("Successful");
      reactLocalStorage.set("Token",response?.data?.token);
      // console.log("Tokendfgsrdfryhe",response?.data?.token);


      // reactLocalStorage.set("id",response?.data?.currentUser?.user_id);
      // reactLocalStorage.set("name",response?.data?.currentUser?.user_name);
      // reactLocalStorage.set("email",response?.data?.currentUser?.user_email);
      // reactLocalStorage.set("employee_id",response?.data?.currentUser?.employee_id);
      // reactLocalStorage.set("national_id",response?.data?.currentUser?.national_id);
      // reactLocalStorage.set("role_id",response?.data?.currentUser?.role_id);
      // reactLocalStorage.set("role_name",response?.data?.currentUser?.role_name);

      // let Permission =  JSON.stringify(response?.data?.currentUser?.permissions);
      // reactLocalStorage.set("Permissions",Permission);
      // console.log("Permissions",Permission)

      return response;

    } catch (err) {
      toast.error(err?.response?.data?.message);
      return rejectWithValue(err);
    }
  }
);


// SignOut 

 

 


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
        state.data.push(action.payload);
      }
      )

      .addCase(SignInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       

       
  },

});

export default signInReducer.reducer;
