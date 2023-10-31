import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router';
import './resetPassword.css'

const ResetPassword = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className='resetpasswordpage'>
                <Formik
                //   initialValues={defaultValue}
                //   validationSchema={Validate}
                //   onSubmit={handleSubmit}
                >
                    <div className="loginpage">
                        <div className="login-box">
                            <div className="title">
                                <h2>Reset Password</h2>
                                <p>Enter your email address and we’ll send you an email with instructions to reset your password</p>
                            </div>
                            <Form>
                                <div className="formbox">
                                    <label>Email </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="Email"
                                    />
                                    {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                    <p className="text-danger">
                                        <ErrorMessage name="email" />
                                    </p>
                                </div>


                                <button type="submit" className="btn"> Sign in </button>
                            </Form>

                        </div>
                    </div>
                </Formik>


            </div>
        </>
    )
}

export default ResetPassword