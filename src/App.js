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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const ManagerApiSelectorData = useSelector((state) => state.ToggleBarData);


  let Token = reactLocalStorage.get("Token", false)
  let payment_status = reactLocalStorage.get("payment_status", false)
  let UserTypeData = reactLocalStorage.get("Type", false);

  axios.interceptors.response.use(

    (response) => {

      return response;
    },
    (error) => {
      if (error?.response?.status == 401) {
        console.log("zasdfgnbsad", error?.response)
        if (error?.response?.data?.error == "Token is invalid" || error?.response?.data?.error == "Token is expired") {

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
  console.log("dfghjk", Token)




  // useEffect(()=>{

  //   if(Token == false){

  //     navigate("/")
  //   }

  // },[Token])
  let languageDAta = reactLocalStorage.get("languageSet", false);


  useEffect(() => {
    i18n.changeLanguage(ManagerApiSelectorData?.languagechange)
  }, [ManagerApiSelectorData?.languagechange])



  return (
    <>
      <div className={languageDAta == "ar" ? "arabic" : ""} dir={languageDAta == "ar" ? "rtl" : ""}>
        {Token &&
          <Routes>
            {/* <Route path="/emailotpverification" element={<EmailOtpVerification  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path="/signup" element={<Signup  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path='/success' element={<Success  translaterFun={t} />}></Route>   // Please do not remove this comment...*/}
            {/* <Route path="/forgotpassword" element={<ForgotPassword  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            <Route path="/user_auth/resetpassword/:id" element={<ResetPassword translaterFun={t} />}></Route>
            <Route path="/:id/admin/dashboard" element={<Dashboard translaterFun={t} />}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories" element={<DndProvider backend={HTML5Backend}><Categories translaterFun={t} /></DndProvider>}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories/reorder/" element={<DndProvider backend={HTML5Backend}><DndCategories translaterFun={t} /></DndProvider>}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/manager" element={<Manager translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path="/:id/admin/allmedia" element={<AllMedia translaterFun={t} />}></Route>{/* convert in arabic  */}
            <Route path="/:id/admin/paymenthistory" element={<PaymentHistory translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/leads' element={<Leads translaterFun={t} />}></Route>
            <Route path='/admin/menucategories' element={<Menucategories translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/restaurantdetail/:id' element={<RestaurantDetail translaterFun={t} />}></Route>
            {!payment_status && <Route path='/subscription' element={<Subscription translaterFun={t} />}></Route>}
          </Routes>
        }
        <Routes>
          <Route path="/" element={<Login translaterFun={t} />}></Route>
          <Route path="/:id" element={<Login translaterFun={t} />}></Route> 

        </Routes>

        <Routes>
          <Route path="/:id/menu" element={<Menu translaterFun={t} />}></Route>

        </Routes>

        <ToastContainer autoClose={2000} />
      </div>
    </>
  );

}

export default App;
