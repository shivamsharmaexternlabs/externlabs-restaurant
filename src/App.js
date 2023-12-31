import logo from './logo.svg';
import "./i18n/config.js"
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
import { useEffect } from 'react';
/* import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'ar',
  resources: {
    en: {
      translations: require('../../../i18n/locales/en/translations.json')
    },
    ar: {
      translations: require('../../../i18n/locales/ar-sa/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'ar']; */

function App() {

  const navigate=useNavigate()


  let Token=reactLocalStorage.get("Token",false)

  axios.interceptors.response.use(

    (response) => {

      return response;
    },
    (error) => {
      if (error?.response?.status == 401) {
        console.log("zasdfgnbsad",error?.response)
        if(error?.response?.data?.error=="Token is invalid" || error?.response?.data?.error=="Token is expired"  ){

          reactLocalStorage.clear()
          navigate("/")
          toast.error(error?.response?.data?.error);
          // window.location.reload()

        }


        // const myTimeout = setTimeout(sessionStorageClearFun, 2000);
      }

      return Promise.reject(error);
    }
  );
console.log("dfghjk",Token)




  useEffect(()=>{

    if(Token == false){

      navigate("/")
    }

  },[Token])

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
        <Route path="/:id/admin/allmedia" element={<AllMedia />}></Route>
        <Route path="/:id/admin/paymenthistory" element={<PaymentHistory />}></Route>



        <Route path='/admin/leads' element={<Leads />}></Route>
        <Route path='/admin/menucategories' element={<Menucategories />}></Route>
        <Route path='/admin/restaurantdetail/:id' element={<RestaurantDetail />}></Route>

        <Route path='/subscription' element={<Subscription />}></Route>





      </Routes>

      <ToastContainer autoClose={2000} />

    </>
  );

}

export default App;
