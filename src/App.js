import "./i18n/config.js"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import Restaurant from './Components/LeadsComponents/Restaurant/Restaurant';
import RestaurantDetail from './Components/DashboardComponents/RestaurantDetail/RestaurantDetail.js'
import Subscription from './Components/SubscriptionPage/Subscription.js';
import DndCategories from './Components/DashboardComponents/DndCategories/DndCategories.js';
import axios from 'axios';
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AllMedia from './Components/DashboardComponents/AllMedia/AllMedia.js';
import ManageOrder from './Components/DashboardComponents/ManageOrder/ManageOrder.js';
import PaymentHistory from './Components/DashboardComponents/PaymentHistory/PaymentHistory.js';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import rotateimage from "./images/rotateimage.png"
import DashboardHeader from './Components/DashboardComponents/DashboardHeader/DashboardHeader.js';
import AdminProfilePage from "./Components/DashboardComponents/AdminProfilePage/AdminProfilePage.js";
import { GetRestaurantsOnBoardSlice } from "./Redux/slices/leadsRestaurantSlice.js";
import { useDispatch } from "react-redux";
import KdsScreen from "./Components/DashboardComponents/KDS/KdsScreen.js";

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
  const locationData = useLocation()
  const dispatch = useDispatch();


  const ManagerApiSelectorData = useSelector((state) => state.ToggleBarData);
  const User = useSelector((state) => state.SignInApiData);



  let Token = reactLocalStorage.get("Token", false)
  let payment_status = reactLocalStorage.get("payment_status", false)
  let UserTypeData = reactLocalStorage.get("Type", false);
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

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
    let splitOrderId = locationData?.pathname?.split?.("/");
    if (locationData?.pathname !== "/" && locationData?.pathname !== `/${splitOrderId[1]}`) {
      i18n.changeLanguage(ManagerApiSelectorData?.languagechange)
    }


  }, [ManagerApiSelectorData?.languagechange])


  useEffect(() => {
    // Checking if the status is 200, indicating successful login
    if (Token) {
      
      // Checking user type and redirecting accordingly
      if (UserTypeData == "owner") { 
        // This api is calling for user logo (on top right) 
        dispatch(GetRestaurantsOnBoardSlice({ RestaurantId, Token }))
      }
    }

  }, [Token]);


  return (
    <>
      <div className={languageDAta == "ar" ? "arabic  " : " "} dir={languageDAta == "ar" ? "rtl" : ""}>
        {Token &&
          <Routes>
            {/* <Route path="/emailotpverification" element={<EmailOtpVerification  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path="/signup" element={<Signup  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path='/success' element={<Success  translaterFun={t} />}></Route>   // Please do not remove this comment...*/}
            {/* <Route path="/forgotpassword" element={<ForgotPassword  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            <Route path="/user_auth/resetpassword/:id" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <ResetPassword translaterFun={t} />}></Route>
            <Route path="/:id/admin/dashboard" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <Dashboard translaterFun={t} />}> </Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <DndProvider backend={HTML5Backend}><Categories translaterFun={t} /></DndProvider>}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories/reorder/" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <DndProvider backend={HTML5Backend}><DndCategories translaterFun={t} /></DndProvider>}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/manager" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <Manager translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path="/:id/admin/allmedia" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <AllMedia translaterFun={t} />}></Route>{/* convert in arabic  */}
            <Route path="/:id/admin/manageorder" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <ManageOrder translaterFun={t} />}></Route>{/* convert in arabic  */}

            <Route path='/:id/admin/viewProfile' element={<AdminProfilePage translaterFun={t} />}></Route>
            <Route path="/:id/admin/paymenthistory" element={payment_status == "false" ? <Subscription translaterFun={t} /> : <PaymentHistory translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/leads' element={<Leads translaterFun={t} />}></Route>
            <Route path='/admin/restaurant' element={<Restaurant translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/restaurantdetail/:id' element={<RestaurantDetail translaterFun={t} />}></Route>  

            {payment_status == "false" && <Route path='/subscription/page' element={<Subscription translaterFun={t} />}></Route>}
          </Routes>
        }

        {!Token &&
          <Routes>
            {/* <Route path="/emailotpverification" element={<EmailOtpVerification  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path="/signup" element={<Signup  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            {/* <Route path='/success' element={<Success  translaterFun={t} />}></Route>   // Please do not remove this comment...*/}
            {/* <Route path="/forgotpassword" element={<ForgotPassword  translaterFun={t} />}></Route> // Please do not remove this comment... */}
            <Route path="/user_auth/resetpassword/:id" element={<Login translaterFun={t} />}></Route>
            <Route path="/:id/admin/dashboard" element={<Login translaterFun={t} />}> </Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories" element={<Login translaterFun={t} />}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/categories/reorder/" element={<Login translaterFun={t} />}></Route>  {/* convert in arabic  */}
            <Route path="/:id/admin/manager" element={<Login translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path="/:id/admin/allmedia" element={<Login translaterFun={t} />}></Route>{/* convert in arabic  */}
            <Route path="/:id/admin/manageorder" element={<Login translaterFun={t} />}></Route>{/* convert in arabic  */}

            <Route path='/:id/admin/viewProfile' element={<Login translaterFun={t} />}></Route>
            <Route path="/:id/admin/paymenthistory" element={<Login translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/leads' element={<Login translaterFun={t} />}></Route>
            <Route path='/admin/restaurant' element={<Login translaterFun={t} />}></Route> {/* convert in arabic  */}
            <Route path='/admin/restaurantdetail/:id' element={<Login translaterFun={t} />}></Route>  

            {payment_status == "false" && <Route path='/subscription/page' element={<Subscription translaterFun={t} />}></Route>}
          </Routes>
        }


        <Routes>

          <Route path="/" element={<Login translaterFun={t} />}></Route>
          <Route path="/:id" element={<Login translaterFun={t} />}></Route>
          <Route path="/:id/menu" element={<Menu translaterFun={t} />}></Route>
          <Route path="/:id/kds/kdsScreen" element={<KdsScreen/>}></Route>
        </Routes>

        <ToastContainer autoClose={2000} />
      </div>
    </>
  );

}

export default App;
