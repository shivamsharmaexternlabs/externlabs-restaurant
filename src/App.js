import logo from './logo.svg';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "../src/Authantication/Login/Login";
import Signup from './Authantication/SignUp/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import EmailOtpVerification from './Authantication/OtpVerification/EmailOtpVerification';
import Success from './Authantication/Success/Success';
import Menu from './Components/Menu/Menu';
import ForgotPassword from './Authantication/ForgotPassword/ForgotPassword';
import ResetPassword from './Authantication/ResetPassword/ResetPassword';
import Dashboard from './Components/DashboardComponents/Dashboard/Dashboard';
import Manager from './Components/DashboardComponents/Manager/Manager'; 
import Categories from './Components/DashboardComponents/Categories/Categories'; 
import Leads from './Components/LeadsComponents/Leads/Leads';
import Menucategories from './Components/LeadsComponents/MenuCategories/Menucategories';
import RestaurantDetail from './Components/DashboardComponents/RestaurantDetail/RestaurantDetail.js'


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/emailotpverification" element={<EmailOtpVerification />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/user_auth/resetpassword/:id" element={<ResetPassword />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/categories" element={<Categories />}></Route>
        <Route path="/manager" element={<Manager />}></Route>
        <Route path="/:id/menu" element={<Menu />}></Route> 
        <Route path='/admin/leads' element={<Leads />}></Route>
        <Route path='/admin/menucategories' element={<Menucategories />}></Route>
        <Route path='/admin/restaurantdetail' element={<RestaurantDetail />}></Route>
      </Routes>
      
      <ToastContainer autoClose={2000} />

    </>
  );

}

export default App;
