import { configureStore } from "@reduxjs/toolkit";
import    signInReducer   from "./slices/SignInSlice";
import  signUpReducer    from "./slices/SignUpSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import  resetPasswordReducer   from "./slices/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    SignInApiData: signInReducer,
    SignUpApiData:signUpReducer ,
    ForgotPasswordApiData :forgotPasswordReducer,
    ResetPasswordApiData:resetPasswordReducer
  },
});
