// Importing necessary dependencies from React and other libraries
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from 'react-router';
import * as yup from "yup";
import './resetPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ResetPasswordSlice } from '../../Redux/slices/resetPasswordSlice';
import { reactLocalStorage } from 'reactjs-localstorage';

// Functional component for ResetPassword page
/**
 * ResetPassword Component - Handles resetting the password.
 * 
 * @category Dashboard Component
 * @returns {JSX.Element} - JSX Element representing the ResetPassword component.
 */
const ResetPassword = () => {
    // Initializing Redux dispatch function
    const dispatch = useDispatch();
    // Hook for accessing the current location object
    const params = useLocation();
    // Retrieving BearerToken from local storage
    let BearerToken = reactLocalStorage.get("Token", false);

    // useEffect to extract and set BearerToken from the URL parameters
    useEffect(() => {
        if (params?.pathname) {
            let splitdata = params?.pathname?.split("/")?.[3]
            reactLocalStorage.set("Token", splitdata);
        }
    }, [params]);

    // Initial values for the Formik form
    const defaultValue = {
        new_pass: "",
        confirm_pass: ""
    };

    // Validation schema for the form using yup
    const Validate = yup.object({
        new_pass: yup.string().required("Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
        confirm_pass: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password must not contain spaces'),
    });

    // Handling form submission
    /**
     * Handles form submission.
     * Dispatches the ResetPasswordSlice action if the new password matches the confirm password.
     * Displays an error toast if the passwords do not match.
     * @function handleSubmit
     * @category ResetPassword Functions
     * @param {Object} values - Form values containing the new and confirm passwords.
     * @returns {void}
     */
    const handleSubmit = (values) => {
        values["BearerToken"] = BearerToken;
        // Checking if the new password matches the confirm password
        if (values.new_pass === values.confirm_pass) {
            dispatch(ResetPasswordSlice(values));
        } else {
            toast.error("Password not matched");
        }
    };

    // JSX structure for the ResetPassword component
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
                                <h2>Reset Password</h2>
                                <p>Enter your new password</p>
                            </div>
                            {/* Actual form inside the Formik wrapper */}
                            <Form>
                                <div className="formbox">
                                    <label>Password </label>
                                    {/* Input field for new password */}
                                    <Field
                                        name="new_pass"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="**********"
                                    />
                                    {/* Error message for new password validation */}
                                    <p className="text-danger">
                                        <ErrorMessage name="new_pass" />
                                    </p>
                                </div>
                                <div className="formbox">
                                    <label>Confirm Password </label>
                                    {/* Input field for confirming new password */}
                                    <Field
                                        name="confirm_pass"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder="***********"
                                    />
                                    {/* Error message for confirm password validation */}
                                    <p className="text-danger">
                                        <ErrorMessage name="confirm_pass" />
                                    </p>
                                </div>
                                {/* Submit button for the form */}
                                <button type="submit" className="btn"> Reset </button>
                            </Form>
                        </div>
                    </div>
                </Formik>
            </div>
        </>
    );
}

// Exporting the ResetPassword component
export default ResetPassword;
