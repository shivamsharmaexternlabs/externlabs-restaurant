// Import React and necessary dependencies
import React, { useEffect, useState } from 'react'
import './adminProfilePage.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import editbanner from '../../../images/editbanner.png';
import PhoneInput from "react-phone-input-2"
import user from '../../../images/user.svg';
import upload2 from '../../../images/upload2.svg';
import burgerimg from '../../../images/burgerimg.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import { SignUpSlice } from "../../../Redux/slices/SignUpSlice";
import { CreateRestaurantsOnBoardSlice, GetRestaurantsOnBoardSlice, LeadsRestaurantSlice, UpdateRestaurantSlice } from '../../../Redux/slices/leadsRestaurantSlice';
import { ResetPasswordSlice } from '../../../Redux/slices/resetPasswordSlice'
import close from "../../../images/close.svg";
import { UpdateLeadsSlice } from '../../../Redux/slices/leadsSlice'
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import SucessRegisteredPopup from '../../../ReusableComponents/SucessRegisteredPopup/SucessRegisteredPopup';
import editimg from '../../../images/edit.svg'
import { Helmet } from "react-helmet";


/**
 * AdminProfilePage component for handling Profile information of user.
 * @category Dashboard Component
 * @param {object} props - Component props.
 * @param {function} props.translaterFun - Function for translating text.
 * @returns {JSX.Element} AdminProfilePage component.
 */

// Owner Profile Edit Page Component 
const AdminProfilePage = ({ translaterFun }) => {

  // State and variable Declaration
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [ResetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [CopyValueToggle, setCopyValueToggle] = useState(false)
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
  const [isShown, setIsShown] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [ViewLogoImage, setViewLogoImage] = useState(null);

  const [BannerImage, setBannerImage] = useState(null);
  const [ViewBannerImage, setViewBannerImage] = useState(null);

  // get from local storage to perform certain task by using this...
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

  //console.log("msvdsnd", LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData, routeData?.state?.page)

  const defaultValue = {
    restaurant_name: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.restaurant_name : routeData?.state?.currentData?.restaurant_name,
    owner_name: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.owner?.first_name : routeData?.state?.currentData?.owner?.first_name === undefined ? routeData?.state?.currentData?.contact_name : routeData?.state?.currentData?.owner?.first_name,

    // owner_name: routeData?.state?.page === "profilePage" ?  LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.owner?.first_name :routeData?.state?.currentData?.owner?.first_name === undefined ? routeData?.state?.currentData?.contact_name : routeData?.state?.currentData?.owner?.first_name,
    email: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.owner?.email : routeData?.state?.currentData?.owner?.email === undefined ? routeData?.state?.currentData?.email : routeData?.state?.currentData?.owner?.email,
    // phone_ext: routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[0] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[0],
    // phone: routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone?.split("-")[1] : routeData?.state?.currentData?.owner?.phone_number?.split("-")[1],

    shop_no: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.shop_no : routeData?.state?.currentData?.shop_no === undefined ? routeData?.state?.currentData?.shop_number : routeData?.state?.currentData?.shop_no,
    street: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.street : routeData?.state?.currentData?.street === undefined ? routeData?.state?.currentData?.street_name : routeData?.state?.currentData?.street,
    city: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.city : routeData?.state?.currentData?.city,
    landmark: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.landmark : routeData?.state?.currentData?.landmark,
    pincode: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.pincode === null ? "" : LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.pincode : routeData?.state?.currentData?.pincode === null ? "" : routeData?.state?.currentData?.pincode,
    state: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.state : routeData?.state?.currentData?.state,
    country: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.country : routeData?.state?.currentData?.country,
    description: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.description : routeData?.state?.currentData?.description,
    url_slug: routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.url_slug : routeData?.state?.currentData?.url_slug,



  };
  /**
     * @useEffect
     * fill data from the route data's current data...
     *
     * @dependencies 
     */
  useEffect(() => {

    if (routeData?.state?.currentData) {
      setPhoneNumber(routeData?.state?.currentData?.owner?.phone_number === undefined ? routeData?.state?.currentData?.phone : routeData?.state?.currentData?.owner?.phone_number)
      setCountryCode(routeData?.state?.currentData?.owner?.country_code === undefined ? routeData?.state?.currentData?.country_code : routeData?.state?.currentData?.owner?.country_code)

      setLogoImage(routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.logo : routeData?.state?.currentData?.logo)
      setBannerImage(routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.banner : routeData?.state?.currentData?.banner)
    }

  }, [routeData?.state?.currentData])

  /**
       * @useEffect
       * setting logo and banner if it is in the Api response...
       *
       * @dependencies GetRestaurantsOnBoardSliceReducerData
       */
  useEffect(() => {

    if (LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData) {
      setLogoImage(routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.logo : routeData?.state?.currentData?.logo)
      setBannerImage(routeData?.state?.page === "profilePage" ? LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.banner : routeData?.state?.currentData?.banner)
    }

  }, [LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData])


  /**
       * @useEffect
       * After updating restaurant data , It should show updated data...
       *
       * @dependencies UpdateRestaurantReducerData
       */
  useEffect(() => {

    // dispatch(LoadingSpinner(false))

    if (routeData?.state?.page === "profilePage") {
      dispatch(GetRestaurantsOnBoardSlice({ RestaurantId: routeData?.state?.currentData?.restaurant_id, Token: BearerToken }))
    }

  }, [LeadsRestaurantSelectorData?.UpdateRestaurantReducerData])


  const Validate = yup.object({
    restaurant_name: yup.string().required(translaterFun("restaurant-name-is-required")),
    owner_name: yup.string().required(translaterFun("owner-name-is-required")),
    email: yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, translaterFun("email-is-invalid")).matches(/^\S*$/, 'First name must not contain spaces'),
    // phone_ext: yup.string().required(translaterFun('Phone Extension is required').matches(/^\S*$/, 'Phone Extension must not contain spaces'),
    // phone: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required(translaterFun('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    // shop_no: yup.string().required(translaterFun("shop-no-is-required")),
    // street: yup.string().required(translaterFun("street-name-is-required")),
    // city: yup.string().required(translaterFun("city-name-is-required")),
    // landmark: yup.string().required(translaterFun("landmark-is-required")),
    pincode: yup.string().matches(/^[0-9]+$/, translaterFun("pincode-must-contain-only-digits")).matches(/^\S*$/, translaterFun("pincode-must-not-contain-spaces")),
    // state: yup.string().required(translaterFun("state-is-required")),
    // country: yup.string().required(translaterFun("country-is-required")),
    // description: yup.string().required(translaterFun("description-is-required")),
    // url_slug: yup.string().matches(/^\S*$/, translaterFun('slug-must-not-contain-spaces'))

  });


  //  SignUp APi will be called 
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
      dispatch(LoadingSpinner(false))
    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }

  }

  /**
   * Handles callBack Function After SignUp .
   * @function callBackFuncAfterSignUp
   * @category AdminProfilePage Functions
   * @subCategory Dashboard Component
   */
  // After Sign Up API give response, then Creating Restaurant Api will be called...
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

  /**
     * Handles submit form .
     * @function handleSubmit
     * @param {Object} values - Object containing the values of the form.
     * @category AdminProfilePage Functions
     * @subCategory Dashboard Component
     */
  const handleSubmit = async (values) => {
    // dispatch(LoadingSpinner(true))

    if (routeData?.state?.page === "lead") {


      setCreateLeadOnBoardPayloadState(values)
      setOnBordPopUp(true)

      // const updateLeadPayload = {
      //   description: values?.description,
      //   restaurant_name: values?.restaurant_name,
      //   contact_name: values?.owner_name,
      //   email: values?.email,
      //   phone: countrycode + "-" + phonenumber,
      //   shop_number: values?.shop_no,
      //   street_name: values?.street,
      //   city: values?.city,
      //   landmark: values?.landmark,
      //   pincode: values?.pincode,
      //   state: values?.state,
      //   country: values?.country,
      //   leadId: routeData?.state?.currentData?.lead_id,
      //   Token: BearerToken
      // }

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
        RestaurantId: routeData?.state?.currentData?.restaurant_id,
        logo: logoImage,
        banner: BannerImage,
        url_slug: values?.url_slug,
      }

      let responseData = await dispatch(UpdateRestaurantSlice(UpdateRestroPayload));
      if (responseData?.payload.status == 200) {
        dispatch(LoadingSpinner(false))
      }
      setHandleFormData(false)

    }
  }


  // const PopUpToggleFun = () => {
  //   popUpHookFun((o) => !o);
  // };

  // useEffect(() => {
  //   if (ResetPasswordSelectorData?.data?.status === 200) {
  //     setLoadSpiner(false);
  //     setResetPasswordPopup(false);
  //     // navigate("/emailotpverification");
  //   }
  //   else if (ResetPasswordSelectorData?.error == "Rejected") {
  //     setLoadSpiner(false);
  //   }
  // }, [ResetPasswordSelectorData]);

  // const resetPasswordSubmit = async (values) => {
  //   await dispatch(LoadingSpinner(true));

  //   let forgetPayload = {
  //     restaurant_id: routeData?.state?.currentData?.restaurant_id,
  //     new_pass: values?.new_pass,
  //     confirm_pass: values?.confirm_pass,
  //     BearerToken
  //   }

  //   try {

  //     await dispatch(ResetPasswordSlice(forgetPayload));
  //     await dispatch(LoadingSpinner(false))

  //   } catch (error) {
  //     await dispatch(LoadingSpinner(false))
  //   }

  // }

  // const closeResetPasswordFun = () => {
  //   setResetPasswordPopup(false)
  //   window.location.reload()
  // }

  /**
     * Handles onchange .
     * @function handleOnChange1
     * @param {string} currentValue - currentValue containing the value the currenty there in the input field.
     * @param {object} objectValue - objectValue containing the data.
     * @param {event} eventData - eventData.
      * @param {event} eventTargetValue - eventTargetValue is trageting current value.
     * @category AdminProfilePage Functions
     * @subCategory Dashboard Component
     */

  const handleOnChange1 = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library
    let data = [];
    let countryCode = eventTargetValue?.split(" ");
    setCountryCode(countryCode?.[0]);
    countryCode.slice(1).forEach((items, id) => {
      data.push(items);
    });
    let myString = data.join("").replace(/\D/g, "");
    setPhoneNumber(myString);
  };



  useEffect(() => {

    if (isShown) {
      setCopyValueToggle(false)
    }

  }, [isShown])


  /**
   * Handles logo image upload .
   * @function LogoImageUploadFun
   * @param {e} event - event.
   * @category AdminProfilePage Functions
   * @subCategory Dashboard Component
   */


  const LogoImageUploadFun = (e) => {
    setLogoImage(e?.target?.files?.[0])
    setViewLogoImage(URL.createObjectURL(e?.target?.files?.[0]))
  }

  /**
 * Handles banner image upload .
 * @function BannerImageUploadFun
 * @param {e} event - event.
 * @category AdminProfilePage Functions
 * @subCategory Dashboard Component
 */
  const BannerImageUploadFun = (e) => {
    setBannerImage(e?.target?.files?.[0])
    setViewBannerImage(URL.createObjectURL(e?.target?.files?.[0]))
  }

  return (
    <>
      <Helmet>
        <title>Manage Restaurant Details | Harbor Bites</title>
        <meta name="description" content="Streamline your restaurant's information effortlessly. Edit and manage crucial details hassle-free to keep your digital presence accurate and engaging." />
        {/* <link rel="icon" type="image/x-icon" href="./"/> */}
      </Helmet>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart restaurantdetailpage">
            <img src={burgerimg} alt='img' className='burgerimg' />
            <div className='editprofilebanner'>
              <div className='editbannerimg'>

                {HandleFormData != "" &&
                  <div
                    className={`${HandleFormData ? "editbanneimgbutton" : "numbersdds editbanneimgbutton"}`}
                  >
                    <button type='button'>
                      <img src={upload2} alt='editimg' /></button>
                    <input type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => BannerImageUploadFun(e)} />
                  </div>
                }
              </div>
              <figure>

                <img src={ViewBannerImage == null ? (BannerImage == null ? editbanner : BannerImage) : ViewBannerImage} alt='img'
                  className='w-100' />
              </figure>
              <div className='info'>
                <div className='edituserimg'>
                  <img src={ViewLogoImage == null ? (logoImage == null ? user : logoImage) : ViewLogoImage} alt='img' />
                  {HandleFormData != "" &&
                    <div
                      className={`   ${HandleFormData ? "edituserimgbutton" : "numbersdds edituserimgbutton"}`}

                    >
                      <button type='button'>

                        <img src={upload2} alt='editimg' /></button>
                      <input type="file"

                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => LogoImageUploadFun(e)} />
                    </div>
                  }
                </div>

              </div>
            </div>

            <div className={`mt-4 mb-2 editprofileform ${!HandleFormData ? "" : ""}`}>
              <Formik
                initialValues={defaultValue}
                validationSchema={Validate}
                enableReinitialize
                onSubmit={(values) => {
                  if (routeData?.state?.page == "profilePage") {
                    handleSubmit(values)
                  }
                  else if (submitAction === "secondary") {
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
                            onChange={routeData?.state?.page == "profilePage" ? handleOnChange1 : ""}
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

                      <div className="col-md-6 mb-3 pe-md-1">
                        <div className="formbox ">
                          <label>{translaterFun("url-slug")} </label>
                          <Field
                            name="url_slug"
                            type="text"
                            disabled={HandleFormData ? '' : "true"}
                            className={`form-control ${HandleFormData ? "" : "numbersdds"}  `}
                            // className={`form-control `}
                            autoComplete="off"
                            placeholder={translaterFun("please-enter-unique-slug")}
                          />

                          <p className="text-danger small mb-0">
                            <ErrorMessage name="url_slug" />
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

                    {/* {
                      routeData?.state?.page === "restaurant" && <button type='button' className='btn2' onClick={(e) => resetPasswordFunc(e, routeData)}>
                        {translaterFun("reset-password")} </button>
                    } */}

                    {/* {
                      routeData?.state?.currentData?.status_type !== "On-Boarded" && routeData?.state?.page !== "restaurant" && <button type='submit' className='btn2 ms-3'  >
                        {translaterFun("onBoard-and-Create-Password")} </button>
                    } */}
                    {
                      <>

                        {routeData?.state?.page === "profilePage" && !HandleFormData &&
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




        {/* reset password popup*/}
        {/* {ResetPasswordPopup && (
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
        )} */}


      </DashboardLayout>
      <LodingSpiner loadspiner={loadspiner} />
    </>
  )
}

export default AdminProfilePage
