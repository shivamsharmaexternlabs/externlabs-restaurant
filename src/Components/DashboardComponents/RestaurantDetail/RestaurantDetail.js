import React, { useEffect, useState } from 'react'
import './restaurantdetail.css'
import imgicon from '../../../images/imgicon.svg'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import editbanner from '../../../images/editbanner.png';
import PhoneInput from "react-phone-input-2"
import user from '../../../images/user.svg';
import burgerimg from '../../../images/burgerimg.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import share from '../../../images/share.svg'
import share2 from '../../../images/share2.svg'
// import close from "../../../images/close.svg";
import { RWebShare } from "react-web-share";
import copy from '../../../images/copy.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import { SignUpSlice } from "../../../Redux/slices/SignUpSlice";
import { CreateRestaurantsOnBoardSlice, LeadsRestaurantSlice, UpdateRestaurantSlice } from '../../../Redux/slices/leadsRestaurantSlice';
import { ResetPasswordSlice } from '../../../Redux/slices/resetPasswordSlice'
import close from "../../../images/close.svg";
import { UpdateLeadsSlice } from '../../../Redux/slices/leadsSlice'
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'

const RestaurantDetail = ({ translaterFun }) => {
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [ResetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [dataaa, setDataaa] = useState("")
  const routeData = useLocation();
  const [OnBordPopUp, setOnBordPopUp] = useState(false);
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [CreateLeadOnBoardPayloadState, setCreateLeadOnBoardPayloadState] = useState("")

  const [countrycode, setCountryCode] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [HandleFormData, setHandleFormData] = useState(false)
  const SignUpSelectorData = useSelector((state) => state.SignUpApiData);
  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
  const LeadsSelectorData = useSelector((state) => state.LeadsApiData);
  const ResetPasswordSelectorData = useSelector((state) => state.ResetPasswordApiData);
  console.log("fhsga", HandleFormData)
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  let BearerToken = reactLocalStorage.get("Token", false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let submitAction = undefined;


  const defaultSignUpValue = {

    password: "",
    confirm_password: "",

  };

  const ValidateSignUp = yup.object({
    // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    // first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
    // last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
    // phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    password: yup.string().required(translaterFun("password-is-required")).matches(/^\S*$/, translaterFun("password-not-contain-spaces")),
    confirm_password: yup.string().required(translaterFun("confirm-password-is-required")).matches(/^\S*$/, translaterFun("password-not-contain-spaces")),

  });

  const defaultResetPasswordValue = {
    new_pass: "",
    confirm_pass: ""
  }

  const resetPasswordValidate = yup.object({
    new_pass: yup.string().required(translaterFun("password-is-required")).matches(/^\S*$/, translaterFun("password-not-contain-spaces")),
    confirm_pass: yup.string().required(translaterFun("confirm-password-is-required")).matches(/^\S*$/, translaterFun("password-not-contain-spaces")),
  });

  const defaultValue = {
    restaurant_name: routeData?.state?.currentData?.restaurant_name,

    owner_name: routeData?.state?.currentData?.owner?.first_name === undefined ? routeData?.state?.currentData?.contact_name : routeData?.state?.currentData?.owner?.first_name,
    email: routeData?.state?.currentData?.owner?.email === undefined ? routeData?.state?.currentData?.email : routeData?.state?.currentData?.owner?.email,
    // phone_ext: routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[0] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[0],
    // phone: routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[1] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[1],

    shop_no: routeData?.state?.currentData?.shop_no === undefined ? routeData?.state?.currentData?.shop_number : routeData?.state?.currentData?.shop_no,
    street: routeData?.state?.currentData?.street === undefined ? routeData?.state?.currentData?.street_name : routeData?.state?.currentData?.street,
    city: routeData?.state?.currentData?.city,
    landmark: routeData?.state?.currentData?.landmark,
    pincode: routeData?.state?.currentData?.pincode,
    state: routeData?.state?.currentData?.state,
    country: routeData?.state?.currentData?.country,
    description: routeData?.state?.currentData?.description,


  };

  useEffect(() => {

    // dispatch(LoadingSpinner(false))

    if (routeData?.state?.currentData) {
      setPhoneNumber(routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[1] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[1])
      setCountryCode(routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[0] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[0])
    }

  }, [routeData?.state?.currentData])

  console.log("LeadsRestaurantSelectorData", LeadsRestaurantSelectorData)

  const Validate = yup.object({
    restaurant_name: yup.string().required(translaterFun("restaurant-name-is-required")),
    owner_name: yup.string().required(translaterFun("owner-name-is-required")),
    email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, translaterFun("email-is-invalid")).matches(/^\S*$/, 'First name must not contain spaces'),
    // phone_ext: yup.string().required(translaterFun('Phone Extension is required').matches(/^\S*$/, 'Phone Extension must not contain spaces'),
    // phone: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required(translaterFun('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    // shop_no: yup.string().required(translaterFun("shop-no-is-required")),
    // street: yup.string().required(translaterFun("street-name-is-required")),
    city: yup.string().required(translaterFun("city-name-is-required")),
    // landmark: yup.string().required(translaterFun("landmark-is-required")),
    pincode: yup.string().matches(/^[0-9]+$/, translaterFun("pincode-must-contain-only-digits")).required(translaterFun('pincode-is-required')).matches(/^\S*$/, translaterFun("pincode-must-not-contain-spaces")),
    state: yup.string().required(translaterFun("state-is-required")),
    country: yup.string().required(translaterFun("country-is-required")),
    // description: yup.string().required(translaterFun("description-is-required")),
  });

  const handleSubmitOnBoardPassAndConfPass = async (values) => {
    await dispatch(LoadingSpinner(true))

    try {
      let SignUpForOnBoardPayload = {
        email: CreateLeadOnBoardPayloadState?.email,
        password: values?.password,
        confirm_password: values?.confirm_password,
        first_name: CreateLeadOnBoardPayloadState?.owner_name,
        phone_number: countrycode + "-" + phonenumber,
        type: "owner",
        token: BearerToken
      }

      // Call signUp API Here...
      await dispatch(SignUpSlice(SignUpForOnBoardPayload))
    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }

  }

  const callBackFuncAfterSignUp = async () => {
    setOnBordPopUp(false)

    await dispatch(LoadingSpinner(true))

    try {
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

      await dispatch(CreateRestaurantsOnBoardSlice(payloadOnBoard))
      await dispatch(LoadingSpinner(false))

    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }

  }

  const CopyLinkFun = () => {
    navigator.clipboard.writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url);
  }

  const BackToHomeFun = () => {
    // window.location.reload(false)
    setSuccessPopup(false)

    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: 1,
    };
    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
    navigate(`/admin/leads`)
    window.location.reload(false);
  }


  useEffect(() => {
    if (LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.status === 201) {
      setSuccessPopup(true)
      setOnBordPopUp(false)
    }
    else if (LeadsRestaurantSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData]);


  useEffect(() => {
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
    if (LeadsRestaurantSelectorData?.UpdateRestaurantReducerData?.status === 200) {
      setLoadSpiner(false);

      // callBackFuncAfterSignUp();

      // navigate("/emailotpverification");
    }
    else if (LeadsRestaurantSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [LeadsRestaurantSelectorData?.UpdateRestaurantReducerData]);

  useEffect(() => {
    if (LeadsSelectorData?.UpdateLeadReducerData?.status === 200) {

      setLoadSpiner(false);

    }
    else if (LeadsSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [LeadsSelectorData?.UpdateLeadReducerData]);


  const handleSubmit =  (values) => {
    // await dispatch(LoadingSpinner(true))

    if (routeData?.state?.page === "lead") {
      setOnBordPopUp(true)
      console.log("jgsdhsdsbds", values)
      setCreateLeadOnBoardPayloadState(values)

      const updateLeadPayload = {
        description: values?.description,
        restaurant_name: values?.restaurant_name,
        contact_name: values?.owner_name,
        email: values?.email,
        phone: countrycode + "-" + phonenumber,
        shop_number: values?.shop_no,
        street_name: values?.street,
        city: values?.city,
        landmark: values?.landmark,
        pincode: values?.pincode,
        state: values?.state,
        country: values?.country,
        leadId: routeData?.state?.currentData?.lead_id,
        Token: BearerToken
      }

      // Please do not remove this comment => UpdateLeadsSlice
      // dispatch(UpdateLeadsSlice(updateLeadPayload));

    }


    else {
      //  if(!HandleFormData==true){
      let UpdateRestroPayload = {
        restaurant_name: values?.restaurant_name,
        shop_no: values?.shop_no,
        street: values?.street,
        city: values?.city,
        landmark: values?.landmark,
        pincode: values?.pincode,
        state: values?.state,
        country: values?.country,
        description: values?.description,
        Token: BearerToken,
        RestaurantId: routeData?.state?.currentData?.restaurant_id
      }

      dispatch(UpdateRestaurantSlice(UpdateRestroPayload));
      setHandleFormData(false)

      //  }
      // dispatch(UpdateRestaurantSlice(UpdateRestroPayload));

      // Patch API for restaurant edit will run

    }

    // setDataaa(values)
  }


  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };

  useEffect(() => {
    if (ResetPasswordSelectorData?.data?.status === 200) {
      setLoadSpiner(false);
      setResetPasswordPopup(false);
      // navigate("/emailotpverification");
    }
    else if (ResetPasswordSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [ResetPasswordSelectorData]);

  const resetPasswordSubmit = async (values) => {
    await dispatch(LoadingSpinner(true));

    let forgetPayload = {
      restaurant_id: routeData?.state?.currentData?.restaurant_id,
      new_pass: values?.new_pass,
      confirm_pass: values?.confirm_pass,
      BearerToken
    }

    try {

      await dispatch(ResetPasswordSlice(forgetPayload));
      await dispatch(LoadingSpinner(true))

    } catch (error) {
      await dispatch(LoadingSpinner(true))
    }

  }

  const resetPasswordFunc = (e, routeData) => {
    setResetPasswordPopup(true)


  }

  const closeResetPasswordFun = () => {
    setResetPasswordPopup(false)
    window.location.reload()
  }

  const handleOnChange1 = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library
    let data = [];
    let CountryCode = eventTargetValue.split(" ");
    setCountryCode(CountryCode[0]);
    CountryCode.slice(1).map((items, id) => {
      data.push(items);
    });
    let myString = data.join("").replace(/\D/g, "");
    setPhoneNumber(myString);
  };



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

            <div className={`mt-4 mb-2 editprofileform ${!HandleFormData ? "" : ""}`}>
              <Formik
                initialValues={defaultValue}
                validationSchema={Validate}

                onSubmit={(values) => {
                  if (submitAction === "primary") {
                    console.log("dhgasjh")
                    // handleSubmit(values);
                  }
                  else if (routeData?.state?.page == "lead") {
                    handleSubmit(values)
                  }
                  else if (submitAction === "secondary") {
                    console.log("dhgasjh11")
                    handleSubmit(values);
                  }
                }}
              >
                {({ handleSubmit, initialValues, values }) => (<Form className="row">
                  <div className='col-md-6'>
                    <div className="formbox mb-3 ">
                      <label>{translaterFun("restaurant-name")}</label>
                      <Field
                        name="restaurant_name"
                        type="text"
                        className={` form-control ${HandleFormData ? "" : "numbersdds"}`}
                        disabled={HandleFormData ? '' : "true"}
                        autoComplete="off"
                        placeholder={translaterFun("enter-your-name")}
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="restaurant_name" />
                      </p>
                    </div>

                    <div className={`${routeData?.state?.page !== "lead" ? "formbox mb-3" : "formbox mb-3"} `}>
                      <label> {translaterFun("owner-name")} </label>
                      <Field
                        name="owner_name"
                        type="text"
                        disabled="true"
                        className={`form-control ${HandleFormData && routeData?.state?.page !== "lead" ? "numbersdds" : "numbersdds"}`}
                        autoComplete="off"
                        placeholder={translaterFun("enter-owner-name")}
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="owner_name" />
                      </p>
                    </div>

                    <div className={`${routeData?.state?.page !== "lead" ? "formbox mb-3" : "formbox mb-3"} `}>
                      <label>{translaterFun("email")} </label>
                      <Field
                        name="email"
                        type="email"
                        disabled='true'
                        className={`form-control ${HandleFormData && routeData?.state?.page !== "lead" ? "numbersdds" : "numbersdds"}`}
                        autoComplete="off"
                        placeholder={translaterFun("enter-your-email")}
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="email" />
                      </p>
                    </div>


                    <div className='row'>

                      <div className="col-md-12  mb-3">
                        {<div className={`${HandleFormData && routeData?.state?.page !== "lead" ? "formbox numbersdds" : "formbox numbersdds"} `}>
                          <label> {translaterFun("phone-number")} </label>

                          <PhoneInput
                            // country={"in"}
                            value={countrycode + phonenumber}
                            onChange={routeData?.state?.page == "lead" ? handleOnChange1 : ""}
                            className="input_filed"
                          />
                        </div>}
                      </div>

                    </div>

                    <div className='row'>
                      <div className='col-md-4'>
                        <div className="formbox mb-3">
                          <label>{translaterFun("shop-no-optional")}</label>
                          <Field
                            name="shop_no"
                            type="text"
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            disabled={HandleFormData ? '' : "true"}
                            autoComplete="off"
                            placeholder={translaterFun("enter-your-shop-no")}
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="shop_no" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>{translaterFun("street-name")} </label>
                          <Field
                            name="street"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            autoComplete="off"
                            placeholder={translaterFun("enter-your-street-name")}
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
                          <label>{translaterFun("city-name")}</label>
                          <Field
                            name="city"
                            type="text"
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            disabled={HandleFormData ? '' : "true"}
                            autoComplete="off"
                            placeholder={translaterFun("enter-your-city-name")}
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="city" />
                          </p>
                        </div>
                      </div>
                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>{translaterFun("landmark-optional")} </label>
                          <Field
                            name="landmark"
                            type="text"
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            disabled={HandleFormData ? '' : "true"}
                            autoComplete="off"
                            placeholder={translaterFun("nearby-landmark")}
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
                          <label>{translaterFun("pincode")}  </label>
                          <Field
                            name="pincode"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            autoComplete="off"
                            placeholder={translaterFun("pincode")}
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="pincode" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-3'>
                        <div className="formbox mb-3">
                          <label>{translaterFun("state")}  </label>
                          <Field
                            name="state"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            autoComplete="off"
                            placeholder={translaterFun("state")}
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="state" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className="formbox mb-3">
                          <label>{translaterFun("country")}  </label>
                          <Field
                            name="country"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}`}
                            autoComplete="off"
                            placeholder={translaterFun("country")}
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="country" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-12  mb-3">
                        <div className="formbox ">
                          <label> {translaterFun("description")}  </label>
                          <Field
                            name="description"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}  `}
                            autoComplete="off"
                            placeholder={translaterFun("type-here")}
                          />

                          <p className="text-danger small mb-0">
                            <ErrorMessage name="description" />
                          </p>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div className='submitbox'>

                    {
                      routeData?.state?.page === "restaurant" && <button type='button' className='btn2' onClick={(e) => resetPasswordFunc(e, routeData)}>
                        {translaterFun("reset-password")} </button>
                    }

                    {
                      routeData?.state?.page !== "restaurant" && <button type='submit' className='btn2 ms-3'  >
                        {translaterFun("onBoard-and-Create-Password")} </button>
                    }
                    {
                      <>

                        {routeData?.state?.page === "restaurant" && !HandleFormData &&
                          <button type="submit" className="btn1 mx-3"
                            onClick={(e) => {
                              submitAction = "primary";
                              setHandleFormData(true)
                            }}
                          >{translaterFun("edit-profile")}</button>}

                        {HandleFormData && <button type="submit" className="btn2 mx-3"
                          onClick={(e) => {
                            submitAction = "secondary";
                            handleSubmit(e)
                          }}
                        > {translaterFun("save-profile")}</button>
                        }

                      </>

                    }

                  </div>
                </Form>
                )}

              </Formik>

            </div>
          </div>
        </div>

        {/* Password Confirm_password in onBoard leads */}
        {OnBordPopUp && (
          <PopUpComponent
            classNameValue={"onboardingpopup "}
            PopUpToggleFun={PopUpToggleFun}
            popUpHookFun={popUpHookFun} >
            <button type="button" className="closebtn" onClick={(e) => setOnBordPopUp(false)}> <img src={close} alt="close icon" /> </button>


            <div className="popuptitle">
              <h2>{translaterFun("onboarding")}</h2>
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
                      <label>{translaterFun("password")} </label>
                      <Field
                        name="password"
                        type="text"
                        className={`form-control `}
                        placeholder="************"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="password" />
                      </p>
                    </div>

                  </div>
                  <div className="col-md-12 mb-3">

                    <div className="formbox mb-3">
                      <label>{translaterFun("confirm-password")} </label>
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
                    <button type="submit" className="btn2 mx-3"> {translaterFun("submit")} </button>
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

            <button type="button" className="closebtn" onClick={(e) => closeResetPasswordFun()}> <img src={close} alt="close icon" /> </button>
            <div className="popuptitle">
              <h2>{translaterFun("reset-password")} </h2>
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
                      <label>{translaterFun("password")}  </label>
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
                      <label>{translaterFun("confirm-password")} </label>
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
                    <button type="submit" className="btn2 mx-3"> {translaterFun("submit")} </button>
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
              <h3> {translaterFun("success")} !</h3>
              <p>{translaterFun("successfully-registered")}</p>
              <div className="sharebtnbox">
                <span> <img src={share} alt="img" /> {translaterFun("link")} </span>
                <input type="text" placeholder={translaterFun("link")} value={LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url} />
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

      </DashboardLayout>
      <LodingSpiner loadspiner={loadspiner} />
    </>
  )
}

export default RestaurantDetail
