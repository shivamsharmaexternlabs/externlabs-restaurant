import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate,useLocation } from 'react-router';
import * as yup from "yup";
import './resetPassword.css'
// import {Forgotpassword} from '../../Redux/slices/forgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ResetPasswordSlice } from '../../Redux/slices/resetPasswordSlice';
import { reactLocalStorage } from 'reactjs-localstorage';

const ResetPassword = () => {


 
    const dispatch = useDispatch();
    const  params = useLocation();

    let BearerToken = reactLocalStorage.get("Token", false);
    
    useEffect(() => {
        if(params?.pathname){

            let splitdata =params?.pathname.split("/")[3] 
            reactLocalStorage.set("Token",splitdata);
        }
    }, [params])
    
    // const navigate = useNavigate();
    // const [loadspiner, setLoadSpiner] = useState(false);
    // const ForgotPasswordSelectorData = useSelector((state) => state?.Forgotpassword); 
    // console.log("ForgotPasswordSelectorData",ForgotPasswordSelectorData);

    // useEffect(() => {
    //     if (ForgotPasswordSelectorData?.data[0]?.status === 201) {
    //       setLoadSpiner(false);
    //       navigate("/emailotpverification");
    //       window.location.reload(true);
    //     }
    //    else if (ForgotPasswordSelectorData?.error === "Rejected") {
    //       setLoadSpiner(false);
    //     }
    //   }, [ForgotPasswordSelectorData]);

    const defaultValue = {
        new_pass: "",
        confirm_pass: ""
      };
    
      const Validate = yup.object({
        new_pass: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
        confirm_pass: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
      });



    const handleSubmit = (values) => {
        console.log("values", values); 
        values["BearerToken"] = BearerToken;
        if(values.new_pass == values.confirm_pass){
            dispatch(ResetPasswordSlice(values));
        }
        else{
            toast.error("Password not matched");
        }
        
        // setLoadSpiner(true);
      };

    return (
        <>
            <div className='resetpasswordpage'>
                <Formik
                  initialValues={defaultValue}
                  validationSchema={Validate}
                  onSubmit={handleSubmit}
                >
                    <div className="loginpage">
                        <div className="login-box">
                            <div className="title">
                                <h2>Reset Password</h2>
                                <p>Enter your new password</p>
                            </div>
                            <Form>
                                <div className="formbox">
                                    <label>Password </label>
                                    <Field
                                        name="new_pass"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="**********"
                                    />
                                    {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                    <p className="text-danger">
                                        <ErrorMessage name="new_pass" />
                                    </p>
                                </div>
                                <div className="formbox">
                                    <label>Confirm Password </label>
                                    <Field
                                        name="confirm_pass"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="***********"
                                    />
                                    {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                    <p className="text-danger">
                                        <ErrorMessage name="confirm_pass" />
                                    </p>
                                </div>


                                <button type="submit" className="btn"> Reset </button>
                            </Form>

                        </div>
                    </div>
                </Formik>
                {/* <LodingSpiner loadspiner={loadspiner} /> */}


            </div>
        </>
    )
}

export default ResetPassword