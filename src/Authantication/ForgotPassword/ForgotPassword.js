// Importing necessary dependencies from React and other libraries
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './forgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import LodingSpiner from '../../Components/LoadingSpinner/LoadingSpinner';
import { ForgotPasswordSlice } from '../../Redux/slices/forgotPasswordSlice';

// Functional component for the ForgotPassword page
const ForgotPassword = () => {
    // Initializing Redux dispatch function
    const dispatch = useDispatch();
    
    // State for managing loading spinner
    const [loadspiner, setLoadSpiner] = useState(false);
    
    // Retrieving data from the Redux store using useSelector
    const ForgotPasswordSelectorData = useSelector((state) => state?.ForgotPasswordApiData);

    // useEffect to handle changes in the Redux store data
    useEffect(() => {
        // Checking if the status is 200, indicating success
        if (ForgotPasswordSelectorData?.data[0]?.status === 200) {
            setLoadSpiner(false);
        }
        // Checking if there is an error in the Redux store data
        else if (ForgotPasswordSelectorData?.error === "Rejected") {
            setLoadSpiner(false);
        }
    }, [ForgotPasswordSelectorData]);

    // Initial values for the Formik form
    const defaultValue = {
        email: ""
    };
    
    // Validation schema for the form using yup
    const Validate = yup.object({
        email: yup.string()
            .required("Email is required")
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid")
            .matches(/^\S*$/, 'Email Number must not contain spaces'),
    });

    // Handling form submission
    const handleSubmit = (values) => {
        dispatch(ForgotPasswordSlice(values));
        setLoadSpiner(true);
    };

    // JSX structure for the ForgotPassword component
    return (
        <>
            <div className='resetpasswordpage'>
                {/* Formik wrapper for form management */}
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
                            {/* Actual form inside the Formik wrapper */}
                            <Form>
                                <div className="formbox">
                                    <label>Email </label>
                                    {/* Input field for email */}
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="Email"
                                    />
                                    {/* Error message for email validation */}
                                    <p className="text-danger">
                                        <ErrorMessage name="email" />
                                    </p>
                                </div>

                                {/* Submit button for the form */}
                                <button type="submit" className="btn"> Submit </button>
                            </Form>
                        </div>
                    </div>
                </Formik>
                {/* Loading spinner component */}
                <LodingSpiner loadspiner={loadspiner} />
            </div>
        </>
    );
}

// Exporting the ForgotPassword component
export default ForgotPassword;
