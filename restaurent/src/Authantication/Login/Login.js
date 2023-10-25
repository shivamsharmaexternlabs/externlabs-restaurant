import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SignIn } from "../../Redux/slices/SignIn";
import "./login.css";
// import logo from "../../Assets/logo.svg";
// import sms from "../../Assets/sms.svg";
// import closeeye from "../../Assets/closeeye.svg";
// import lock from "../../Assets/lock.svg";
import { useDispatch, useSelector } from "react-redux";
// import LodingSpiner from "../LoadinSpinner";

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [loadspiner, setLoadSpiner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const User = useSelector((state) => state.signIn);
  // console.log("User", User)

  // useEffect(() => {
  //   if (User?.data[0]?.status == 200) {
  //     setLoadSpiner(false);
  //     navigate("/");
  //     window.location.reload(true);
  //   }
  // }, [User]);

  // useEffect(() => {
  //   if (User?.error == "Rejected") {
  //     setLoadSpiner(false);
  //   }
  // }, [User]);

  const defaultValue = {
    email: "",
    password: "",
  };

  const Validate = yup.object({
    email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid"),
    password: yup.string().required("Password is required")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain 8 character, at least one lowercase, one uppercase,one digit and one special character"),
  });

  const handleSubmit = (values) => {
    console.log("values", values);
    // setShowPassword(false);
     
    dispatch(SignIn(values));
    setLoadSpiner(true);
  };

  return (
    <>
      <Formik
        initialValues={defaultValue}
        validationSchema={Validate}
        onSubmit={handleSubmit}
      >
        <div className="loginpage">
          <div className="login-box">
              <div className="logo">
                {/* <img src={logo} alt="logo-img" /> */}
                <p> OCP Fleet Management </p>
              </div>

            <h2>Sign into your account</h2>

            <Form>
              <div className="formbox">
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

              <div className="formbox">
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
                  // <img
                  //   src={closeeye} alt="sms img" className="imgcloseeye" onClick={() => setShowPassword(true)} />
                )}
                {/* <img src={lock} alt="sms img" className="imglock" /> */}
              </div>

              <button type="submit" className="btn">
                {" "}
                Sign in{" "}
              </button>
            </Form>
          </div>
        </div>
      </Formik>
      {/* <LodingSpiner loadspiner={loadspiner} /> */}
    </>
  );
};

export default Login;
