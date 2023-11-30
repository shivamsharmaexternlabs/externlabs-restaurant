import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './forgotPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import LodingSpiner from '../../Components/LoadingSpinner/LoadingSpinner';
import { ForgotPasswordSlice } from '../../Redux/slices/forgotPasswordSlice';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [loadspiner, setLoadSpiner] = useState(false);
    const ForgotPasswordSelectorData = useSelector((state) => state?.ForgotPasswordApiData); 

    useEffect(() => {
        if (ForgotPasswordSelectorData?.data[0]?.status === 200) {
          setLoadSpiner(false);
        //   toast.success(ForgotPasswordSelectorData?.data[0].data.message)
        //   navigate("/emailotpverification");
        //   window.location.reload(true);
        }
       else if (ForgotPasswordSelectorData?.error === "Rejected") {
          setLoadSpiner(false);
        }
      }, [ForgotPasswordSelectorData]);

    const defaultValue = {
        email: ""
      };
    
      const Validate = yup.object({
        email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'Email Number must not contain spaces'),
      });



    const handleSubmit = (values) => {
        dispatch(ForgotPasswordSlice(values));
        setLoadSpiner(true);
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
                                <h2>Forgot Password</h2>
                                <p>Enter your email address and we’ll send you an email with instructions to reset your password</p>
                            </div>
                            <Form>
                                <div className="formbox">
                                    <label>Email </label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="Email"
                                    />
                                    {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                    <p className="text-danger">
                                        <ErrorMessage name="email" />
                                    </p>
                                </div>


                                <button type="submit" className="btn"> Submit </button>
                            </Form>

                        </div>
                    </div>
                </Formik>
                <LodingSpiner loadspiner={loadspiner} />


            </div>
        </>
    )
}

export default ForgotPassword