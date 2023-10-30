import logo from './logo.svg';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import './App.css'; 
import { Route, Routes } from "react-router-dom";
import Login from "../src/Authantication/Login/Login";
import Signup from './Authantication/SignUp/Signup';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import EmailOtpVerification from './Authantication/OtpVerification/EmailOtpVerification';
import Success from './Authantication/Success /Success';
import Menu from './Components/Menu/Menu';


function App() {
  return (
    
    
    <Routes>
    <Route path="/" element={<Login />}></Route>
    <Route path="/emailotpverification" element={<EmailOtpVerification />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path='/Success' element={<Success/>}></Route>


    <Route path="/menu" element={<Menu />}></Route>
    
  </Routes>
  );
}

export default App;
  