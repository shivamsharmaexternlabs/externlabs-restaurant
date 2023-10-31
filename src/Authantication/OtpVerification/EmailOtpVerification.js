import React, { useState , useEffect } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Carosel from "./Carosel";
import OtpInput from 'react-otp-input';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import './emailOtpVerification.css'


const EmailOtpVerification = () => {

    const [otpvalue, setOtpValue] = useState('')
    // const products = useSelector(state => state.productReducer.products)
    let navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    let EmailVerificationValue = reactLocalStorage.get('EmailVerification', true);

    const VerifyOtp = async () => {

        //     await axios
        //         .post(`${process.env.REACT_APP_BASE_URL}/verifyemailphoneotp`,
        //             {
        //                 phone_number: localStorageDetails.phoneNumber,
        //                 mobile_otp: otpvalue
        //             }
        //         )
        //         .then((response) => {
        //             toast.success("Verified Phone successfully");

        //             navigate('/login')
        //         })
        //         .catch((err) => {
        //             toast.warn(err.response.data.message);



        //         });
    };

    useEffect(() => {
        let interval;
    
        if (isTimerRunning) {
          interval = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer === 1) {
                clearInterval(interval);
                setIsTimerRunning(false);
                return 0;
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
    
        return () => clearInterval(interval);
      }, [isTimerRunning]);

      const handleResendOTP = () => {
        console.log('Resending OTP==>');
        setTimer(60);
        setIsTimerRunning(true);
      };

    const handleChange = (otpvalue) => setOtpValue(otpvalue);

    const SendOtpFun = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/resendotp`,
                {
                    number: EmailVerificationValue,
                }
            )
            .then((response) => {
                toast.success("Please check your sms");


            })
            .catch((err) => {
                toast.warn(err.response.data.message);



            });
    }

    return (
        <div className="otppage">
            <div className="loginpage">
                <div className="otpbox">
                    <div className="title">
                        <h2>One Time Password</h2>
                        <p>Enter the 6 digit code you received on mobile number</p>
                    </div>
                    <div className="email_number"> {EmailVerificationValue}  </div>
                    <div className="otp_container">
                        <OtpInput
                            value={otpvalue}
                            onChange={handleChange}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />} />
                    </div>

                    {/* 
                        <div className="send_otp"> 
                            <a href="#" onClick={() => SendOtpFun()}> Resend OTP </a> 
                        </div> 
                                            
                        <div className="button_login_div">
                            <button className="button_otp" onClick={(e) => VerifyOtp(e)}> Verify OTP </button> 
                        </div> 
                    */}

                    <div className="resendtext">Resend OTP in <span>{isTimerRunning ? <span>{timer == 60 ? '01:00' : `00:${timer}`}</span> : <span onClick={handleResendOTP}>Resend</span>}</span></div>

                </div>
            </div>
        </div>

    );
};

export default EmailOtpVerification;
