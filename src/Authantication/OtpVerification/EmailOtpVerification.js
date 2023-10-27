import React, { useState } from "react";
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
        <div className="conatiner-fluid">
            <div className="row m-0 p-0">
                <div className='col-md-7  carosel_bg d-md-block d-none' >
                    <div className="accountslider-part">
                        {/* <Carosel /> */}
                    </div>
                </div>
                <div className="col-md-5 col-sm-12 col-12 account-part">
                    <div className="right_part verifyphone-part ">
                        <div className="sign_up ">Verification Code</div>
                        <div className="sign_up_ ">Please type verification code send to</div>
                        <div className="email_number">
                            {EmailVerificationValue}  </div>

                        <div className="otp_container">
                            <OtpInput
                                value={otpvalue}
                                onChange={handleChange}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <div className="send_otp"> <a href="#" onClick={() => SendOtpFun()}> Resend OTP </a> </div>
                        <div className="button_login_div"> <button className="button_otp" onClick={(e) => VerifyOtp(e)}> Verify OTP </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailOtpVerification;
