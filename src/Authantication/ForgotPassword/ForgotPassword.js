// Importing necessary dependencies from React and other libraries
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import './forgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import LodingSpiner from '../../Components/LoadingSpinner/LoadingSpinner';
import { ForgotPasswordSlice } from '../../Redux/slices/forgotPasswordSlice';

// Functional component for the ForgotPassword page
/**
 * Forgot Password functional component for forget password.
 * @returns {JSX.Element} ForgotPassword form componentkjhgh ugyftyghuij ygftyguhij gytdtfyguhi ugyftdfgbn gyftdfyuyi ugyftufyguhij hugyftfyguhijo hugyftyguhijo hugyftdfyguhijn uiyfcvb kyutyfyguhinjb bbhbuhbhv bbhiugvh vbbjnhgvcjg bnnhugvch vnbjhgvgcj bnmnkhghvj bnnmnkhgvhj bnmn,hghvj bnmnkhughv nnkhughkv.
 * @category Authentication
 * @subcategory ForgotPassword
 */


const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [loadspiner, setLoadSpiner] = useState(false);

    const ForgotPasswordSelectorData = useSelector((state) => state?.ForgotPasswordApiData);

    useEffect(() => {
        if (ForgotPasswordSelectorData?.data[0]?.status === 200) {
            setLoadSpiner(false);
        }
        else if (ForgotPasswordSelectorData?.error === "Rejected") {
            setLoadSpiner(false);
        }
    }, [ForgotPasswordSelectorData]);

    const defaultValue = {
        email: ""
    };
    /**
     * Validation schema for the forgot password mail form.
     * @type {Object}
     */
    const Validate = yup.object({
        email: yup.string()
            .required("Email is required")
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid")
            .matches(/^\S*$/, 'Email Number must not contain spaces'),
    });


    /**
         * Handles form submission for SignUp.
         * @function handleSubmit
         * @param {Object} values - Object containing the form field values.
         * @returns {void}
         * @category Authentication
         * @subcategory ForgotPassword
         */
    const handleSubmit = (values) => {
        dispatch(ForgotPasswordSlice(values));
        setLoadSpiner(true);
    };

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
