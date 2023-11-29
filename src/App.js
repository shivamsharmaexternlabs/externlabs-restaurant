import logo from './logo.svg';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../src/Authantication/Login/Login";
import Signup from './Authantication/SignUp/Signup';
import './App.css';
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
import Subscription from './Components/SubscriptionPage/Subscription.js';
import DndCategories from './Components/DashboardComponents/DndCategories/DndCategories.js';
import axios from 'axios';
import { reactLocalStorage } from "reactjs-localstorage"; 
import { toast } from "react-toastify";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AllMedia from './Components/DashboardComponents/AllMedia/AllMedia.js';
import PaymentHistory from './Components/DashboardComponents/PaymentHistory/PaymentHistory.js';



function App() {

  const navigate=useNavigate()


  axios.interceptors.response.use(
    (response) => {  
      
      return response;
    },
    (error) => {
      if (error?.response?.status == 401) { 
        if(error?.response?.data?.error=="Token is invalid" || error?.response?.data?.error=="Token is expired"  ){ 
          navigate("/")
          reactLocalStorage.clear()
          // window.location.reload()
          toast.error(error?.response?.data?.error);

        }
        

        // const myTimeout = setTimeout(sessionStorageClearFun, 2000);
      }
       
      return Promise.reject(error);
    }
  );
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/:id" element={<Login />}></Route>
        <Route path="/emailotpverification" element={<EmailOtpVerification />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/user_auth/resetpassword/:id" element={<ResetPassword />}></Route>
        <Route path="/:id/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/:id/admin/categories" element={ <DndProvider backend={HTML5Backend}><Categories /></DndProvider>}></Route>
        <Route path="/:id/admin/categories/reorder/" element={ <DndProvider backend={HTML5Backend}><DndCategories /></DndProvider>}></Route>
        <Route path="/:id/admin/manager" element={<Manager />}></Route>
        <Route path="/:id/menu" element={<Menu />}></Route>         
        <Route path='/admin/leads' element={<Leads />}></Route>
        <Route path='/admin/menucategories' element={<Menucategories />}></Route>
        <Route path='/admin/restaurantdetail/:id' element={<RestaurantDetail />}></Route>  

        <Route path='/subscription' element={<Subscription />}></Route>

        <Route path="/dndcategories" element={<DndCategories />}></Route>
        <Route path="/allmedia" element={<AllMedia />}></Route>
        <Route path="/:id/admin/paymenthistory" element={<PaymentHistory />}></Route>

        

      </Routes>
      
      <ToastContainer autoClose={2000} />

    </>
  );

}

export default App;
