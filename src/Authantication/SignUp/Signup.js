import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import LodingSpiner from "../../Components/LoadingSpinner/LoadingSpinner";
import {SignUpSlice} from "../../Redux/slices/SignUpSlice";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadspiner, setLoadSpiner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);


  const SignUpSelectorData = useSelector((state) => state.SignUpApiData); 

  useEffect(() => {
    if (SignUpSelectorData?.data[0]?.status === 201) {
      setLoadSpiner(false);
      navigate("/emailotpverification");
    }
   else if(SignUpSelectorData?.error == "Rejected"){
      setLoadSpiner(false);
    }
  }, [SignUpSelectorData]);


  const defaultValue = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    type:""

  };

  const Validate = yup.object({
    // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
    last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
     phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces')


  });

  const handleSubmit = (values) => {
    dispatch(SignUpSlice(values))
    reactLocalStorage.set("EmailVerification", values.email);
    setLoadSpiner(true);
  };

  return (
    <>
      <div className="signuppage">
        <Formik
          initialValues={defaultValue}
          validationSchema={Validate}
          onSubmit={handleSubmit}
        >
          <div className="loginpage">
            <div className="login-box">
              <div className="title">
                <h2>Sign Up</h2>
                <p>Sign in to stay connected.</p>
              </div>
              <Form className="row">
                <div className="formbox col-md-6">
                  <label> First Name </label>
                  <Field
                    name="first_name"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="First Name"
                  />

                  <p className="text-danger">
                    <ErrorMessage name="first_name" />
                  </p>
                </div>
                <div className="formbox col-md-6">
                  <label> Last Name </label>
                  <Field
                    name="last_name"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Last Name"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="last_name" />
                  </p>
                </div>

                <div className="formbox col-md-6">
                  <label> Email </label>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Email"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>

                <div className="formbox col-md-6">
                  <label> Phone No. </label>
                  <Field
                    name="phone_number"
                    type="number"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Phone No"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="phone_number" />
                  </p>
                </div>




                <div className="formbox col-md-6">
                  <label> Password </label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                  {showPassword ? (
                    <span className="imgcloseeye" onClick={() => setShowPassword(false)} >
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11775 10.967C0.96075 10.676 0.96075 10.323 1.11775 10.032C3.00975 6.533 6.50475 3.5 9.99975 3.5C13.4948 3.5 16.9898 6.533 18.8818 10.033C19.0388 10.324 19.0388 10.677 18.8818 10.968C16.9898 14.467 13.4948 17.5 9.99975 17.5C6.50475 17.5 3.00975 14.467 1.11775 10.967Z" stroke="#A3ABA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.1213 8.37868C13.2929 9.55025 13.2929 11.4497 12.1213 12.6213C10.9497 13.7929 9.05025 13.7929 7.87868 12.6213C6.70711 11.4497 6.70711 9.55025 7.87868 8.37868C9.05025 7.20711 10.9497 7.20711 12.1213 8.37868Z" stroke="#A3ABA8" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                  ) : (
                    <>
                    </>
                  )}
                </div>

                <div className="formbox col-md-6">
                  <label> Confirm Password </label>
                  <Field
                    name="confirm_password"
                    type={showconfirmPassword ? "text" : "confirmPassword"}
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="confirm_password" />
                  </p>loadspiner
                  {showconfirmPassword ? (
                    <span className="imgcloseeye" onClick={() => setShowconfirmPassword(false)} >
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11775 10.967C0.96075 10.676 0.96075 10.323 1.11775 10.032C3.00975 6.533 6.50475 3.5 9.99975 3.5C13.4948 3.5 16.9898 6.533 18.8818 10.033C19.0388 10.324 19.0388 10.677 18.8818 10.968C16.9898 14.467 13.4948 17.5 9.99975 17.5C6.50475 17.5 3.00975 14.467 1.11775 10.967Z" stroke="#A3ABA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.1213 8.37868C13.2929 9.55025 13.2929 11.4497 12.1213 12.6213C10.9497 13.7929 9.05025 13.7929 7.87868 12.6213C6.70711 11.4497 6.70711 9.55025 7.87868 8.37868C9.05025 7.20711 10.9497 7.20711 12.1213 8.37868Z" stroke="#A3ABA8" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                  ) : (
                    <>
                    </>
                  )}
                </div>


                <div className="col-12">
                  <div className="agreetxt"> <input type="checkbox" /> I agree with the terms of use </div>
                  <button type="submit" className="btn"> SignUp  </button>
                </div>
              </Form>
              <div className="alreadytext"> Already have an Account <span className="type-btn" onClick={(e)=>navigate("/")}>Sign in</span></div>
            </div>
          </div>
        </Formik>
        <LodingSpiner loadspiner={loadspiner} />

      </div>
    </>
  );
};

export default Signup;
