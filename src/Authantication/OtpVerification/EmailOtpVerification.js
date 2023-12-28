// Importing necessary dependencies from React and other libraries
import React, { useState, useEffect } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import './emailOtpVerification.css'

// Functional component for EmailOtpVerification page
const EmailOtpVerification = () => {
    // State for managing OTP input value
    const [otpvalue, setOtpValue] = useState('');
    // Navigation hook from react-router-dom
    let navigate = useNavigate();
    // State for managing the timer
    const [timer, setTimer] = useState(60);
    // State for tracking whether the timer is running
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Retrieving email from local storage
    let EmailVerificationValue = reactLocalStorage.get('EmailVerification', true);

    // Function to verify OTP
    const VerifyOtp = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}user_auth/verify_otp/`,
                {
                    email: EmailVerificationValue,
                    otp: otpvalue
                }
            );
            // Setting token to local storage upon successful verification
            reactLocalStorage.set("Token", response?.data?.token);
            toast.success("Verified Phone successfully");
            navigate("/success");
        } catch (err) {
            toast.warn(err?.response?.data?.message);
        }
    };

    // useEffect to handle the countdown timer
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

    // Function to handle resending OTP
    const handleResendOTP = () => {
        setTimer(60);
        setIsTimerRunning(true);
    };

    // Function to handle OTP input change
    const handleChange = (otpvalue) => {
        setOtpValue(otpvalue);
    }

    // Function to resend OTP
    const SendOtpFun = () => {
        axios
            .post(
                `${process.env.REACT_APP_BASE_URL}user_auth/resend_otp/`,
                {
                    email: EmailVerificationValue,
                }
            )
            .then((response) => {
                toast.success(response?.data?.message);
            })
            .catch((err) => {
                toast.warn(err?.response?.data?.error?.non_field_errors?.[0]);
            });
    }

    // JSX structure for the EmailOtpVerification component
    return (
        <div className="otppage">
            <div className="loginpage">
                <div className="otpbox">
                    <div className="title">
                        <h2>One Time Password</h2>
                        <p>Enter the 6 digit code you received on Mail</p>
                    </div>
                    <div className="email_number"> {EmailVerificationValue} </div>
                    <div className="otp_container">
                        {/* OTP input component */}
                        <OtpInput
                            value={otpvalue}
                            onChange={handleChange}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />} />
                    </div>
                    <div className="col-12">
                        {/* Submit button for the form */}
                        <button type="submit" className="btn" onClick={(e) => VerifyOtp(e)}> Submit </button>
                    </div>
                    <div className="resendtext">Resend OTP in <span>{isTimerRunning ? <span>{timer == 60 ? '01:00' : `00:${timer}`}</span> : <span onClick={SendOtpFun}>Resend</span>}</span></div>
                </div>
            </div>
        </div>
    );
};

// Exporting the EmailOtpVerification component
export default EmailOtpVerification;
