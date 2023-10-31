import { configureStore } from "@reduxjs/toolkit";
import userDetail from "./slices/userDetailsSlice";
import signIn from "./slices/SignIn";
import Role from "./slices/roleSlice";
import Plans from "./slices/planningSlice";
import LoadingNotice from "./slices/loadingNotice";
import Parking from "./slices/parkingSlice";
import GPSManagement from "./slices/GpsTagSlice";
import dashboardSlice from "./slices/dashboardSlice";
import  MapManagement  from "./slices/MapSlice";
import updatedGetSlices from "./slices/updatedGetSlices";
import  signUp  from "./slices/SignUp";
import Forgotpassword from "./slices/forgotPassword";
import  Resetpassword  from "./slices/resetPassword";
// import { signUp } from "./slices/signup";
// import  signUp  from "./slices/signup";

export const store = configureStore({
  reducer: {
    user: userDetail,
    signIn: signIn,
    signup:signUp ,
    role: Role,
    plannings: Plans,
    loadingNotice: LoadingNotice,
    parkings: Parking,
    gps: GPSManagement,
    dashboard: dashboardSlice,
    map :MapManagement,
    updatedgetApi :updatedGetSlices,
    Forgotpassword :Forgotpassword,
    Resetpassword:Resetpassword
  },
});
