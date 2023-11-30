import React, { useState, useEffect } from "react";
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

            await axios
                .post(`${process.env.REACT_APP_BASE_URL}user_auth/verify_otp/`,
                    {
                        email: EmailVerificationValue,
                        otp: otpvalue
                    }
                )
                .then((response) => {
                    reactLocalStorage.set("Token",response?.data?.token);
                    toast.success("Verified Phone successfully");
                    navigate("/success")
                })
                .catch((err) => {
                    toast.warn(err.response.data.message);



                });
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
        setTimer(60);
        setIsTimerRunning(true);
    };

    const handleChange = (otpvalue) => {
        setOtpValue(otpvalue);
    }

    const SendOtpFun = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}user_auth/resend_otp/`,
                {
                    email: EmailVerificationValue,
                 }
            )
            .then((response) => {
                

                toast.success(response.data.message);


            })
            .catch((err) => {

                toast.warn(err?.response.data.error.non_field_errors[0]);



            });
    }

    return (
        <div className="otppage">
            <div className="loginpage">
                <div className="otpbox">
                    <div className="title">
                        <h2>One Time Password</h2>
                        <p>Enter the 6 digit code you received on Mail</p>
                    </div>
                    <div className="email_number"> {EmailVerificationValue}  </div>
                    <div className="otp_container">
                        <OtpInput
                            value={otpvalue}
                            onChange={handleChange}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />} />
                    </div>


 
                    {/* <div className="button_login_div">
                        <button className="button_otp" onClick={(e) => VerifyOtp(e)}> Verify OTP </button>
                    </div> */}

<div className="col-12">
                   
                  <button type="submit" className="btn" onClick={(e) => VerifyOtp(e)}> Submit </button>
                </div>

                    <div className="resendtext">Resend OTP in <span>{isTimerRunning ? <span>{timer == 60 ? '01:00' : `00:${timer}`}</span> : <span onClick={SendOtpFun}>Resend</span>}</span></div>

                </div>
            </div>
        </div>

    );
};

export default EmailOtpVerification;
