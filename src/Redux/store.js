import { configureStore } from "@reduxjs/toolkit";
import    signInReducer   from "./slices/SignInSlice";
import  signUpReducer    from "./slices/SignUpSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import  resetPasswordReducer   from "./slices/resetPasswordSlice";
import  menuReducer  from "./slices/menuSlice";
import  managerReducer  from "./slices/managerSlice";
import  toggleBarReducer  from "./slices/sideBarToggle";
import uploadMenuReducer from "./slices/uploadMenuSlice"
export const store = configureStore({
  reducer: {
    SignInApiData: signInReducer,
    SignUpApiData:signUpReducer ,
    ForgotPasswordApiData :forgotPasswordReducer,
    ResetPasswordApiData:resetPasswordReducer,
    MenuApiData:menuReducer,
    ManagerApiData:managerReducer,
    ToggleBarData:toggleBarReducer,
    UploadMenuData:uploadMenuReducer
  },
});
