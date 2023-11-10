import React, { useEffect, useState } from 'react'
import './restaurantdetail.css'
import imgicon from '../../../images/imgicon.svg'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import editbanner from '../../../images/editbanner.png';
import user from '../../../images/user.svg';
import burgerimg from '../../../images/burgerimg.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import share from '../../../images/share.svg'
import share2 from '../../../images/share2.svg'
import { RWebShare } from "react-web-share";
import copy from '../../../images/copy.svg'
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import { SignUpSlice } from "../../../Redux/slices/SignUpSlice";
import { CreateRestaurantsOnBoardSlice, LeadsRestaurantSlice, UpdateRestaurantSlice } from '../../../Redux/slices/leadsRestaurantSlice';
import { ResetPasswordSlice } from '../../../Redux/slices/resetPasswordSlice'
import close from "../../../images/close.svg";

const RestaurantDetail = () => {
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [ResetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [dataaa, setDataaa] = useState("")
  const routeData = useLocation();
  const [OnBordPopUp, setOnBordPopUp] = useState(false);
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [CreateLeadOnBoardPayloadState, setCreateLeadOnBoardPayloadState] = useState("")

  const SignUpSelectorData = useSelector((state) => state.SignUpApiData);
  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
  const ResetPasswordSelectorData = useSelector((state) => state.ResetPasswordApiData);

console.log("ResetPasswordSelectorData", ResetPasswordSelectorData)
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  console.log("hgdchsdd", routeData)
  let BearerToken = reactLocalStorage.get("Token", false);

  const dispatch = useDispatch();

  const defaultSignUpValue = {

    password: "Demo@123",
    confirm_password: "Demo@123",

  };

  const ValidateSignUp = yup.object({
    // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    // first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
    // last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
    // phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),

  });

  const defaultResetPasswordValue = {
    new_pass: "",
    confirm_pass: ""
  }

  const resetPasswordValidate = yup.object({
    new_pass: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    confirm_pass: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
  });

  const defaultValue = {
    restaurant_name: routeData?.state?.currentData?.restaurant_name,

    owner_name: routeData?.state?.currentData?.owner?.first_name === undefined ? routeData?.state?.currentData?.contact_name : routeData?.state?.currentData?.owner?.first_name,
    email: routeData?.state?.currentData?.owner?.email === undefined ? routeData?.state?.currentData?.email : routeData?.state?.currentData?.owner?.email,
    phone: routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone : routeData?.state?.currentData?.owner?.phone_number,

    shop_no: routeData?.state?.currentData?.shop_no === undefined ? routeData?.state?.currentData?.shop_number : routeData?.state?.currentData?.shop_no,
    street: routeData?.state?.currentData?.street === undefined ? routeData?.state?.currentData?.street_name : routeData?.state?.currentData?.street,
    city: routeData?.state?.currentData?.city,
    landmark: routeData?.state?.currentData?.landmark,
    pincode: routeData?.state?.currentData?.pincode,
    state: routeData?.state?.currentData?.state,
    country: routeData?.state?.currentData?.country,
    description: routeData?.state?.currentData?.description

  };

  const Validate = yup.object({
    restaurant_name: yup.string().required("Restaurant name is required"),
    owner_name: yup.string().required("name is required"),
    email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    phone: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    shop_no: yup.string().required("shop_no is required"),
    street: yup.string().required("street name is required"),
    city: yup.string().required("City name is required"),
    landmark: yup.string().required("landmark is required"),
    pincode: yup.string().matches(/^[0-9]+$/, 'pincode must contain only digits').required('pincode is required').matches(/^\S*$/, 'pincode must not contain spaces'),
    state: yup.string().required("state is required"),
    country: yup.string().required("country is required"),
    description: yup.string().required("description is required"),
    // password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    // confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
  });

  const handleSubmitOnBoardPassAndConfPass = (values) => {
    console.log("pass anf confirm password ", values);
    console.log("kdhsbjhdsbjfhs", CreateLeadOnBoardPayloadState);

    let SignUpForOnBoardPayload = {
      email: CreateLeadOnBoardPayloadState?.email,
      password: values?.password,
      confirm_password: values?.confirm_password,
      first_name: CreateLeadOnBoardPayloadState?.owner_name,
      phone_number: CreateLeadOnBoardPayloadState?.phone,
      type: "owner",
      token: BearerToken
    }

    // Call signUp API Here...
    dispatch(SignUpSlice(SignUpForOnBoardPayload))


    console.log("SignUpForOnBoardPayload", SignUpForOnBoardPayload)

  }

  const callBackFuncAfterSignUp = () => {

    console.log("CreateLeadOnBoardPayloadState", CreateLeadOnBoardPayloadState, SignUpSelectorData)

    const payloadOnBoard = {
      "restaurant_name": CreateLeadOnBoardPayloadState?.restaurant_name,
      "shop_no": CreateLeadOnBoardPayloadState?.shop_no,
      "street": CreateLeadOnBoardPayloadState?.street,
      "city": CreateLeadOnBoardPayloadState?.city,
      "landmark": CreateLeadOnBoardPayloadState?.landmark,
      "pincode": CreateLeadOnBoardPayloadState?.pincode,
      "state": CreateLeadOnBoardPayloadState?.state,
      "country": CreateLeadOnBoardPayloadState?.country,
      "description": CreateLeadOnBoardPayloadState?.description,
      "owner_id": SignUpSelectorData?.data?.data?.owner_id,
      "Token": BearerToken
    }

    dispatch(CreateRestaurantsOnBoardSlice(payloadOnBoard))
  }

  const CopyLinkFun = () => {
    navigator.clipboard.writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url);
  }

  const BackToHomeFun = () => {
    window.location.reload(false)
    setSuccessPopup(false)

    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: 1,
    };
    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));

  }


  useEffect(() => {
    if (LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.status === 201) { 

      setSuccessPopup(true)
      setOnBordPopUp(false)


    }
    else if (LeadsRestaurantSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData]);

  console.log("dgfhgsvd",LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData)

  useEffect(() => {
    console.log("SignUpSelectorData", SignUpSelectorData)
    if (SignUpSelectorData?.data?.status === 201) {
      setOnBordPopUp(false)
      setLoadSpiner(false);
      callBackFuncAfterSignUp();

      // navigate("/emailotpverification");
    }
    else if (SignUpSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [SignUpSelectorData]);
 
 
  useEffect(() => {
    console.log("LeadsRestaurantSelectorData?.UpdateRestaurantReducerData", LeadsRestaurantSelectorData)
    if (LeadsRestaurantSelectorData?.UpdateRestaurantReducerData?.status === 200) {
      setLoadSpiner(false);

      // callBackFuncAfterSignUp();

      // navigate("/emailotpverification");
    }
    else if (LeadsRestaurantSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [LeadsRestaurantSelectorData?.UpdateRestaurantReducerData]);

  const handleSubmit = (values) => {

    if (routeData?.state?.page === "lead") {
      setOnBordPopUp(true)

      setCreateLeadOnBoardPayloadState(values)

      console.log("nvdcssd", values)
      console.log("routeData", routeData?.state?.page)
      // on Board and create password 

    }


    else {

      let UpdateRestroPayload = {
        restaurant_name: values?.restaurant_name,
        shop_no: values?.shop_no,
        street: values?.street,
        city: values?.city,
        landmark: values?.landmark,
        pincode: values?.pincode,
        state: values?.state,
        country: values?.country,
        description: values?.description
      }

      dispatch(UpdateRestaurantSlice(UpdateRestroPayload));

      console.log("UpdateRestroPayload", UpdateRestroPayload)
      console.log("routeData", routeData?.state?.page)
      // Patch API for restaurant edit will run



    }

    // setDataaa(values)
  }

  // console.log("bavgchd",dataaa)

  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };

  useEffect(() => {
    console.log("djfhvhsjfhjhrvg",ResetPasswordSelectorData )
    if (ResetPasswordSelectorData?.data?.status === 200) {
      setLoadSpiner(false);
      setResetPasswordPopup(false);
      console.log("AFter Success reset Password", ResetPasswordSelectorData)
      // navigate("/emailotpverification");
    }
   else if(ResetPasswordSelectorData?.error == "Rejected"){
      setLoadSpiner(false);
    }
  }, [ResetPasswordSelectorData]);

  const resetPasswordSubmit = (values) => {
    console.log("shgbdfjgvhf", values, routeData?.state?.currentData?.restaurant_id)
    let forgetPayload = {
      restaurant_id: routeData?.state?.currentData?.restaurant_id,
      new_pass: values?.new_pass,
      confirm_pass: values?.confirm_pass,
    }

    dispatch(ResetPasswordSlice(forgetPayload));
  }

  const resetPasswordFunc = (e, routeData) => {
    setResetPasswordPopup(true)
    // console.log("routeData ", e.target.values);

    console.log("routeDajhrfbjwrhgbfta", routeData?.state?.currentData?.restaurant_id);

  }

  return (
    <>

      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart restaurantdetailpage">
            <img src={burgerimg} alt='img' className='burgerimg' />
            <div className='editprofilebanner'>
              <figure>
                <img src={editbanner} alt='img' className='w-100' />
              </figure>
              <div className='info'>
                <img src={user} alt='img' />

              </div>
            </div>

            <div className='mt-4 mb-2 editprofileform'>
              <Formik
                initialValues={defaultValue}
                validationSchema={Validate}
                onSubmit={handleSubmit}
              >
                <Form className="row">
                  <div className='col-md-6'>

                    <div className="formbox mb-3">
                      <label>Restaurant Name </label>
                      <Field
                        name="restaurant_name"
                        type="text"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Name"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="restaurant_name" />
                      </p>
                    </div>

                    <div className="formbox mb-3">
                      <label>Owner Name </label>
                      <Field
                        name="owner_name"
                        type="text"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Name"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="owner_name" />
                      </p>
                    </div>

                    <div className="formbox mb-3">
                      <label>Email </label>
                      <Field
                        name="email"
                        type="email"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Email"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="email" />
                      </p>
                    </div>

                    <div className="formbox mb-3">
                      <label>Phone Number </label>
                      <Field
                        name="phone"
                        type="number"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Phone Number"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="phone" />
                      </p>
                    </div>

                    <div className='row'>
                      <div className='col-md-4'>
                        <div className="formbox mb-3">
                          <label>Shop no. (Optional) </label>
                          <Field
                            name="shop_no"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Enter your Shop no."
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="shop_no" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>Street Name </label>
                          <Field
                            name="street"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Enter your Street Name"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="street" />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-4'>
                        <div className="formbox mb-3">
                          <label>City Name </label>
                          <Field
                            name="city"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Enter your City Name"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="city" />
                          </p>
                        </div>
                      </div>
                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>Landmark (Optional) </label>
                          <Field
                            name="landmark"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Nearby Landmark"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="landmark" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <div className='col-md-3'>
                        <div className="formbox mb-3">
                          <label>Pincode </label>
                          <Field
                            name="pincode"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Pincode"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="pincode" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-3'>
                        <div className="formbox mb-3">
                          <label>State </label>
                          <Field
                            name="state"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="state"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="state" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className="formbox mb-3">
                          <label>Country </label>
                          <Field
                            name="country"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="country"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="country" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-12  mb-3">
                        <div className="formbox ">
                          <label> Description </label>
                          <Field
                            name="description"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Type here..."
                          />

                          <p className="text-danger small mb-0">
                            <ErrorMessage name="description" />
                          </p>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className='submitbox'>
                    {routeData?.state.page === "MenuCategory" && <button type='button' className='btn2' onClick={(e) => resetPasswordFunc(e, routeData)}>Reset Password</button>}
                    {
                      <button type='submit' className='btn2 ms-3'  >{routeData?.state.page === "MenuCategory" ? 'Edit Profile' : "OnBoard and Create Password"}</button>
                    }

                  </div>
                </Form>


              </Formik>

            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Password Confirm_password in onBoard leads */}
      {OnBordPopUp && (
        <PopUpComponent
          classNameValue={"onboardingpopup "}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun} >
          <button type="button" className="closebtn" onClick={(e)=>setOnBordPopUp(false)}> <img src={close} alt="close icon" /> </button>


          <div className="popuptitle">
            <h2>Onboarding </h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultSignUpValue}
              validationSchema={ValidateSignUp}
              onSubmit={handleSubmitOnBoardPassAndConfPass}
            >
              <Form className="row">

                <div className="col-md-12 mb-3">

                  <div className="formbox">
                    <label>Password </label>
                    <Field
                      name="password"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="************"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="password" />
                    </p>
                  </div>

                </div>
                <div className="col-md-12 mb-3">

                  <div className="formbox mb-3">
                    <label>Confirm Password </label>
                    <Field
                      name="confirm_password"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="************"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="confirm_password" />
                    </p>
                  </div>

                </div>
                <div className='text-center mt-1'>
                  <button type="submit" className="btn2 mx-3"> Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

        </PopUpComponent>
      )}


      {/* reset password popup*/}
      {ResetPasswordPopup && (
        <PopUpComponent
          classNameValue={"onboardingpopup "}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun} >


          <div className="popuptitle">
            <h2>Reset Password </h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultResetPasswordValue}
              validationSchema={resetPasswordValidate}
              onSubmit={resetPasswordSubmit}
            >
              <Form className="row">

                <div className="col-md-12 mb-3">

                  <div className="formbox">
                    <label>Password </label>
                    <Field
                      name="new_pass"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="************"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="new_pass" />
                    </p>
                  </div>

                </div>
                <div className="col-md-12 mb-3">

                  <div className="formbox mb-3">
                    <label>Confirm Password </label>
                    <Field
                      name="confirm_pass"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="************"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="confirm_pass" />
                    </p>
                  </div>

                </div>
                <div className='text-center mt-1'>
                  <button type="submit" className="btn2 mx-3"> Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

        </PopUpComponent>
      )}



      {/* Successful sign up and Onboard (copy link and share part) */}
      {SuccessPopup &&
        <div className="popup successpopup ">
          <div className="innerpopup">
            <img src={imgicon} alt="img" />
            <h3> Success !</h3>
            <p>[Restaurant name] is successfully registered</p>
            <div className="sharebtnbox">
              <span> <img src={share} alt="img" /> Link </span>
              <input type="text" placeholder="link" value={LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url} />
              <button type="button" className="copybtn"> <img src={copy} alt="img" onClick={(e) => CopyLinkFun(e)} /> </button>
              <button type="button" className="sharebtn">
                <RWebShare data={{
                  // text: "Web Share - GFG",
                  url: LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url,
                  // title: "Gfg"
                }}
                  onClick={() => console.log("Shared successfully!")} >

                  <img src={share2} alt="img" />
                </RWebShare>
              </button>

            </div>
            <button className="btn2" onClick={(e) => BackToHomeFun()}> Back to home </button>
          </div>
        </div>
      }
    </>
  )
}

export default RestaurantDetail
