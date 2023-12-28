
// Importing necessary dependencies from React and other libraries
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { SignInSlice } from "../../Redux/slices/SignInSlice";
import { reactLocalStorage } from "reactjs-localstorage";
import PasswordEye from "../../ReusableComponents/PasswordEye/PasswordEye";
import { useTranslation } from "react-i18next";

// Functional component for the Login page
const Login = () => {
  // Initializing Redux dispatch function
  const dispatch = useDispatch();

  // Initializing navigation hook from react-router-dom
  const navigate = useNavigate();

  // State for managing loading spinner
  const [loadspiner, setLoadSpiner] = useState(false);

  // State for managing password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [languageToggleValue,setlanguageToggleValue] = useState(false);

  // Retrieving data from the Redux store using useSelector
  const User = useSelector((state) => state.SignInApiData);

  // Retrieving RestaurantId from local storage
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  let languageSetDAta = reactLocalStorage.get("languageSet", false);

  const { t, i18n } = useTranslation()


  // useEffect to handle changes in the Redux store data
  useEffect(() => {
    // Checking if the status is 200, indicating successful login
    if (User?.data?.status === 200) {
      setLoadSpiner(false);
      // reactLocalStorage.set("languageSet", "en");

      // Checking user type and redirecting accordingly
      if (User?.data?.data?.type == "owner") {
        reactLocalStorage.set("payment_status", User?.data?.data?.payment_status);

        if (User?.data?.data?.payment_status === false) {
          navigate(`/subscription/page`);
        } else if (User?.data?.data?.payment_status === true) {
          navigate(`/${User?.data?.data?.restaurants?.[0]?.restaurant_id}/admin/dashboard`);
        }
      } else {
        navigate(`/admin/leads`);
      }
    }

    // Checking for a 400 status error in the Redux store data
    if (User?.error?.response?.status === 400) {
      setLoadSpiner(false);
    }

    if(User?.data.length == 0){
      reactLocalStorage.remove("payment_status")
    }
  }, [User]);

  // Initial values for the Formik form
  const defaultValue = {
    email_or_phone: "",
    password: "",
  };

  console.log("User",User)

  // Validation schema for the form using yup
  const Validate = yup.object({
    email_or_phone: yup.string().required(t("email-or-phone-number-is-required")),

    password: yup.string().required(t("password-is-required")).matches(/^\S*$/, t('password-must-not-contain-spaces')),
  });

  // Handling form submission
  const handleSubmit = (values) => {
    dispatch(SignInSlice(values));
    setLoadSpiner(true);
  };

  const languageSwitchFun = (e) => {

    setlanguageToggleValue(e.target.checked)
    console.log("jhgchvjhk", e.target.checked)
    if(e.target.checked === true) { 
      i18n.changeLanguage("ar")
       reactLocalStorage.set("languageSet", "ar");
      // window.location.reload()

    }
    else{ 
      i18n.changeLanguage("en")
      reactLocalStorage.set("languageSet", "en");
      // window.location.reload()
    }
    window.location.reload()
  }

  
  
  useEffect(() => {
    console.log("anbsddchsds",languageSetDAta)
    // if(languageSet==false){
    //   setlanguageToggleValue()
    // }
    if(languageSetDAta==false){
      reactLocalStorage.set("languageSet", "en");
    }
    i18n.changeLanguage(languageSetDAta)
  }, [languageSetDAta])

 console.log("sdvsdvs",languageSetDAta)

  // JSX structure for the Login component
  return (
    <>
      <div className="loginpage" dir="ltr">
        {/* Formik wrapper for form management */}
        <Formik
          initialValues={defaultValue}
          validationSchema={Validate}
          onSubmit={handleSubmit}
        >
          <div className="login-box">
            <div className="title">
              <h2>{t("sign-in-login")}</h2>
              <p>{t("sign-in-to-stay-connected")}</p>
              <div className="switchtogglebtn">
                English
                <label class="switch">
                  <input type="checkbox" checked={languageSetDAta == "en" || languageSetDAta==false?false:true}   onChange={(e) => languageSwitchFun(e)} />
                  <span class="slider round"></span>
                </label>
                عربي

              </div>
            </div>
            {/* Actual form inside the Formik wrapper */}
            <Form>
              <div className="formbox" dir={languageSetDAta == "ar" ? "rtl" : ""}>
                <label>{t("email-or-phone-no")} </label>
                {/* Input field for email or phone number */}
                <Field
                  name="email_or_phone"
                  type="text"
                  className={`form-control `}
                  autoComplete="off"
                  placeholder={t("email-or-phone-no")}
                   
                />
                {/* Error message for email or phone validation */}
                <p className="text-danger">
                  <ErrorMessage name="email_or_phone" />
                </p>
              </div>

              <div className="formbox" dir={languageSetDAta == "ar" ? "rtl" : ""}>
                <label>{t("password")} </label>
                {/* Password input field with optional visibility toggle */}
                <PasswordEye  t={t}/>
                {/* Error message for password validation */}
                <p className="text-danger">
                  <ErrorMessage name="password" />
                </p>
                {showPassword ? (
                  // Eye icon for hiding password
                  <span className="imgcloseeye" onClick={() => setShowPassword(false)}>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.11775 10.967C0.96075 10.676 0.96075 10.323 1.11775 10.032C3.00975 6.533 6.50475 3.5 9.99975 3.5C13.4948 3.5 16.9898 6.533 18.8818 10.033C19.0388 10.324 19.0388 10.677 18.8818 10.968C16.9898 14.467 13.4948 17.5 9.99975 17.5C6.50475 17.5 3.00975 14.467 1.11775 10.967Z"
                        stroke="#A3ABA8"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.1213 8.37868C13.2929 9.55025 13.2929 11.4497 12.1213 12.6213C10.9497 13.7929 9.05025 13.7929 7.87868 12.6213C6.70711 11.4497 6.70711 9.55025 7.87868 8.37868C9.05025 7.20711 10.9497 7.20711 12.1213 8.37868Z"
                        stroke="#A3ABA8"
                        stroke-width="1.4286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  // Empty fragment for conditional rendering
                  <>
                  </>
                )}
              </div>

              {/* Submit button for the form */}
              <button type="submit" className="btn">
              {t("sign-in-login")}
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
};

// Exporting the Login component
export default Login;
