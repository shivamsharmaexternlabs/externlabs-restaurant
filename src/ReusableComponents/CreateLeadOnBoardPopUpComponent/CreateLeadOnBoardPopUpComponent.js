
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import usePopUpHook from "../../CustomHooks/usePopUpHook/usePopUpHook";
import PopUpComponent from "../../ReusableComponents/PopUpComponent/PopUpComponent";
import close from "../../images/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
// import { ManagerSlice } from "../../../Redux/slices/managerSlice";
import * as yup from "yup";
import user from '../../images/user.png'
import share from '../../images/share.svg'
import copy from '../../images/copy.svg'
import share2 from '../../images/share2.svg'
import ReactPaginate from 'react-paginate';
import PhoneInput from "react-phone-input-2"
import imgicon from '../../images/imgicon.svg'
import { toast } from "react-toastify";

import { CreateLeadsRestaurantSlice, LeadsRestaurantSlice, CreateRestaurantsOnBoardSlice } from "../../Redux/slices/leadsRestaurantSlice";

import { RWebShare } from "react-web-share";
import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SignUpSlice } from "../../Redux/slices/SignUpSlice";
import { LoadingSpinner, ToggleNewLeads } from "../../Redux/slices/sideBarToggle";
import SucessRegisteredPopup from "../SucessRegisteredPopup/SucessRegisteredPopup";
import LodingSpiner from "../../Components/LoadingSpinner/LoadingSpinner";
// import CreateLeadOnBoardPopUpComponent from "../../../ReusableComponents/CreateLeadOnBoardPopUpComponent/CreateLeadOnBoardPopUpComponent";

import { routes } from "../../Utils/constants";


const CreateLeadOnBoardPopUpComponent = ({ translaterFun }) => {
    const{RESTAURANT_DETAIL}=routes
    let submitAction = undefined;
    const itemsPerPage = 5;

    // const [loadspiner, setLoadSpiner] = useState(false);
    const [LoadSpiner, setLoadSpiner] = useState(false)
    const [popUpHook, popUpHookFun] = usePopUpHook("")
    const [CreateLeadOnBoardPayloadState, setCreateLeadOnBoardPayloadState] = useState("")

    const [countrycode, setCountryCode] = useState("+91");

    const [phonenumber, setPhoneNumber] = useState("");
    const [uploadLogoImage, setuploadLogoImage] = useState("");






    let BearerToken = reactLocalStorage.get("Token", false);
    let languageSet = reactLocalStorage.get("languageSet", false);
    let RestaurantId = reactLocalStorage.get("RestaurantId", false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [CurrentPage, setCurrentPage] = useState(0);
    const [OnBordPopUp, setOnBordPopUp] = useState(false)
    const [SuccessPopup, setSuccessPopup] = useState(false)

    const [LeadPopupToggle, setLeadPopupToggle] = useState(true)



    const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
    const SignUpSelectorData = useSelector((state) => state.SignUpApiData);



    const defaultValue = {
        restaurant_name:CreateLeadOnBoardPayloadState?.restaurant_name,   
        owner_name: CreateLeadOnBoardPayloadState?.owner_name,
        email: CreateLeadOnBoardPayloadState?.email,
        // phone_ext: CreateLeadOnBoardPayloadState?.restaurant_name,
        // phone: CreateLeadOnBoardPayloadState?.restaurant_name,
        shop_no: CreateLeadOnBoardPayloadState?.shop_no === undefined?"":CreateLeadOnBoardPayloadState?.shop_no,
        street: CreateLeadOnBoardPayloadState?.street === undefined?"":CreateLeadOnBoardPayloadState?.street,
        city: CreateLeadOnBoardPayloadState?.city === undefined?"":CreateLeadOnBoardPayloadState?.city,
        landmark: CreateLeadOnBoardPayloadState?.landmark === undefined?"":CreateLeadOnBoardPayloadState?.landmark,
        pincode: CreateLeadOnBoardPayloadState?.pincode === undefined?"":CreateLeadOnBoardPayloadState?.pincode,
        state: CreateLeadOnBoardPayloadState?.state === undefined?"":CreateLeadOnBoardPayloadState?.state,
        country: CreateLeadOnBoardPayloadState?.country === undefined?"":CreateLeadOnBoardPayloadState?.country,
        description: CreateLeadOnBoardPayloadState?.description,
        url_slug: CreateLeadOnBoardPayloadState?.url_slug=== undefined?"":CreateLeadOnBoardPayloadState?.url_slug
    };
 

    console.log("CreateLeadOnBoardPayloadStateuytfhgj", defaultValue);


    const Validate = yup.object({
        restaurant_name: yup.string().required(translaterFun("restaurant-name-is-required")),
        owner_name: yup.string().required(translaterFun("name-is-required")),
        // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
        // phone: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
        // shop_no: yup.string().required("shop_no is required"),    
        // street: yup.string().required("street name is required"),
        // city: yup.string().required(translaterFun("city-name-is-required")),
        // landmark: yup.string().required("landmark is required"),
        // pincode: yup.string().matches(/^[0-9]+$/, translaterFun('pincode-must-contain-only-digits')).required(translaterFun('pincode-is-required')).matches(/^\S*$/, translaterFun('pincode-must-not-contain-spaces')),
        pincode: yup.string().matches(/^[0-9]+$/, translaterFun('pincode-must-contain-only-digits')).matches(/^\S*$/, translaterFun('pincode-must-not-contain-spaces')),//this is not mindatory filed becouse we are not using .required
        // state: yup.string().required(translaterFun("state-is-required")),
        // country: yup.string().required(translaterFun("country-is-required")),
        description: yup.string().required(translaterFun("description-is-required")),
        // password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
        // confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
        url_slug: yup.string().matches(/^\S*$/, translaterFun('slug-must-not-contain-spaces'))//this is not mindatory filed becouse we are not using .required
    });





    const defaultSignUpValue = {
        password: "",
        confirm_password: "",

    };

    const ValidateSignUp = yup.object({
        // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
        // first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
        // last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
        // phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
        password: yup.string().required(translaterFun("password-is-required")).matches(/^\S*$/, 'Password name must not contain spaces'),
        confirm_password: yup.string().required(translaterFun("confirm-password-is-required")).matches(/^\S*$/, 'Password name must not contain spaces'),

    });

    const handleSubmitOnBoardPassAndConfPass = async (values) => {
        await dispatch(LoadingSpinner(true))
        try {
            let SignUpForOnBoardPayload = {
                email: CreateLeadOnBoardPayloadState?.email,
                password: values?.password,
                confirm_password: values?.confirm_password,
                first_name: CreateLeadOnBoardPayloadState?.owner_name,
                // phone_number: `${phonenumber}`,
                phone_number: `${countrycode}-${phonenumber}`,
                type: "owner",
                token: BearerToken
            }

            // Call signUp API Here...
            await dispatch(SignUpSlice(SignUpForOnBoardPayload))
            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }

    }

    const CreateLeadBtnFun = async (values) => {
        dispatch(LoadingSpinner(true))
        try {
            // console.log("jhgfgh", countrycode)
            // console.log("jhgfghphonenumber", phonenumber)
            if (countrycode !== "" && phonenumber !== "") {
                let createLeadPayload = {
                    "description": values?.description,
                    "restaurant_name": values?.restaurant_name,
                    "contact_name": values?.owner_name,
                    "email": values?.email,
                    "phone": `${countrycode}-${phonenumber}`,
                    "shop_number": values?.shop_no,
                    "street_name": values?.street,
                    "city": values?.city,
                    "landmark": values?.landmark,
                    "pincode": values?.pincode,
                    "state": values?.state,
                    "country": values?.country,
                    "url_slug": values?.url_slug,
                    "status_type": "Lead",
                    "BearerToken": BearerToken
                }

                console.log("nghddvvwehjvwew",createLeadPayload)


                await dispatch(CreateLeadsRestaurantSlice(createLeadPayload))
                dispatch(LoadingSpinner(false))
            }
            else {
                toast.error(translaterFun("please-enter-your-number"));
                dispatch(LoadingSpinner(false))
                console.log("jhhfghhhp")

            }
            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }


    }


    const CreateLeadOnBoard = (values) => {
        console.log("hgfghjk", countrycode, phonenumber,values)
        // return;

        if (countrycode !== "" && phonenumber !== "") {
            setCreateLeadOnBoardPayloadState(values)
            setOnBordPopUp(true)
            popUpHookFun((o) => !o);
            // dispatch(ToggleNewLeads(false))
            setLeadPopupToggle(false)

        }
        else {
            toast.error(translaterFun("please-enter-your-number"));

        }
    }





    const PopUpToggleFun = () => {
        popUpHookFun((o) => !o);
    };


    const CancelBtnFun = () => {
        popUpHookFun(false);
    };

    const CopyLinkFun = () => {
        console.log("kjdhekjwee")
        navigator.clipboard.writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url);
    }



    const callBackFuncAfterSignUp = async () => {
        setOnBordPopUp(false)

        await dispatch(LoadingSpinner(true))

        try {
            const payloadOnBoard = {
                "restaurant_name": CreateLeadOnBoardPayloadState?.restaurant_name,
                // "url_slug": CreateLeadOnBoardPayloadState?.url_slug,
                "shop_no": CreateLeadOnBoardPayloadState?.shop_no,
                "street": CreateLeadOnBoardPayloadState?.street,
                "city": CreateLeadOnBoardPayloadState?.city,
                "landmark": CreateLeadOnBoardPayloadState?.landmark,
                "pincode": CreateLeadOnBoardPayloadState?.pincode,
                "state": CreateLeadOnBoardPayloadState?.state,
                "country": CreateLeadOnBoardPayloadState?.country,
                "description": CreateLeadOnBoardPayloadState?.description,
                "owner_id": SignUpSelectorData?.data?.data?.owner_id,
                "Token": BearerToken,
                "Logo": uploadLogoImage
            }

            await dispatch(CreateRestaurantsOnBoardSlice(payloadOnBoard))
            await dispatch(LoadingSpinner(false))
        } catch (error) {
            await dispatch(LoadingSpinner(false))
        }

    }

    // Use effect after password and confirm password...
    useEffect(() => {
        if (LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData?.status === 201) {

            setLoadSpiner(false);
            popUpHookFun(false);
            toast.success(LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData?.data?.message)
            // console.log("LeadsRestaurantSelectorData", LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData)
            setTimeout(() => {
                window.location.reload()
            }, 1000);

            // dispatch(ToggleNewLeads(false))

        }
        else if (LeadsRestaurantSelectorData?.error === "Rejected") {
            toast.success(LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData?.data?.error?.[0])
            setLoadSpiner(false);
            popUpHookFun(true);
        }

    }, [LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData]);



    useEffect(() => {
        if (LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.status === 201) {



            setSuccessPopup(true)
            // setOnBordPopUp(false)
            // setLoadSpiner(false);
            // popUpHookFun(false);


        }
        else if (LeadsRestaurantSelectorData?.error === "Rejected") {
            setLoadSpiner(false);
            popUpHookFun(true);
        }
    }, [LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData]);


    useEffect(() => {
        if (SignUpSelectorData?.data?.status === 201) {

            setLoadSpiner(false);
            callBackFuncAfterSignUp();

        }
        else if (SignUpSelectorData?.error == "Rejected") {
            setLoadSpiner(false);
        }
    }, [SignUpSelectorData]);




    const BackToHomeFun = async () => {

        dispatch(LoadingSpinner(true))
        try {
            window.location.reload(false)
            setSuccessPopup(false)
            let LeadsRestaurantSlicePayload = {
                languageSet,
                Token: BearerToken,
                RestaurantId: RestaurantId,
                pagination: 1,
            };
            await dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }
    }

    const RestaurantsDetailsFun = (e, items, AllData) => {
        navigate(`${RESTAURANT_DETAIL}${items?.restaurant_id}`, {
            state: {
                page: "MenuCategory",
                currentData: items,
            }
        })
    }

    const ClosePopupFun = () => {
        window.location.reload()
        popUpHookFun(false)
        dispatch(ToggleNewLeads(false))

    }

    const closeOnBoardFun = () => {
        // dispatch(ToggleNewLeads(true))
        setOnBordPopUp(false)
        setLeadPopupToggle(true)

        // window.location.reload()
    }

    const handleOnChange1 = (
        currentValue,
        objectValue,
        eventData,
        eventTargetValue
    ) => {
        // we are not using all the parameters in this function , but all parameters are important becouse of this library
        let data = [];
        let CountryCode = eventTargetValue?.split(" ");
        setCountryCode(CountryCode?.[0]);
        CountryCode.slice(1).forEach((items, id) => {
            data.push(items);
        });
        let myString = data.join("").replace(/\D/g, "");
        setPhoneNumber(myString);
    };


    const handleUploadLogoImage = (e) => {
        console.log("bhgvfcdxjhghj", e.target?.files)
        setuploadLogoImage(e?.target?.files?.[0]);

    };




    return (
        <>


            <div>
                {LeadPopupToggle && <PopUpComponent
                    classNameValue={"leadpopup "}
                    PopUpToggleFun={PopUpToggleFun}
                    popUpHookFun={popUpHookFun}
                >
                    <button type="button" className="closebtn" onClick={(e) => ClosePopupFun(e)}  > <img src={close} alt="close icon" /> </button>
                    <div className="popuptitle">
                        <h2>{translaterFun("new-customer")}</h2>
                    </div>
                    <div className="popupbody">
                        <Formik
                            enableReinitialize
                            initialValues={defaultValue}
                            validationSchema={Validate}
                            onSubmit={(values) => {
                                if (submitAction === "primary") {
                                    CreateLeadBtnFun(values);
                                }
                                else {
                                    CreateLeadOnBoard(values);
                                }
                            }}
                        >
                            {({ handleSubmit, initialValues, values }) => (


                                <Form className="">
                                    <div className="leadpopupforminner row mx-0">
                                        <div className="col-12  mb-3 ">
                                            <div className="formbox">
                                                <label>{translaterFun("restaurant-name")}</label>
                                                <Field
                                                    name="restaurant_name"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-restaurant-name")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="restaurant_name" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12  mb-3 ">
                                            <div className="formbox">
                                                <label>{translaterFun("owner-name")}</label>
                                                <Field
                                                    name="owner_name"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-restaurant-name")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="owner_name" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12  mb-3 ">
                                            <div className="formbox">
                                                <label>{translaterFun("email")} </label>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-your-email")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="email" />
                                                </p>
                                            </div>
                                        </div>

                                        {/* <div className="col-md-2  mb-3">
                                            <div className="formbox ">
                                            <label> Phone Extension </label>
                                            <Field
                                                name="phone_ext"
                                                type="text"
                                                className={`form-control `}
                                                autoComplete="off"
                                                placeholder="+91"
                                            />

                                            <p className="text-danger small mb-0">
                                                <ErrorMessage name="phone_ext" />
                                            </p>
                                            </div>
                                        </div> */}

                                        <div className="col-md-12  mb-3">
                                            <div className="formbox ">
                                                <label>{translaterFun("phone-number")} </label>
                                                <PhoneInput
                                                    country={"in"}
                                                    value={`${countrycode}-${phonenumber}`}
                                                    onChange={handleOnChange1}
                                                    className="input_filed"
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6 mb-3 pe-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("url-slug")} </label>
                                                <Field
                                                    name="url_slug"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("please-enter-unique-slug")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="url_slug" />
                                                </p>
                                            </div>
                                        </div> */}


                                        <div className="col-md-6 mb-3 pe-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("shop-no-optional")} </label>
                                                <Field
                                                    name="shop_no"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-your-shop-no")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="shop_no" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3 ps-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("area-street-name")}</label>
                                                <Field
                                                    name="street"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-your-street-name")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="street" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-4 mb-3 pe-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("town/city-name")}</label>
                                                <Field
                                                    name="city"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("enter-your-city-name")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="city" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-8  mb-3 ps-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("landmark-optional")} </label>
                                                <Field
                                                    name="landmark"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("nearby-landmark")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="landmark" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-3  mb-3 pe-md-1">
                                            <div className="formbox ">
                                                <label>{translaterFun("pincode")}  </label>
                                                <Field
                                                    name="pincode"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("pincode")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="pincode" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-3  mb-3 px-md-1 ">
                                            <div className="formbox ">
                                                <label>{translaterFun("state")} </label>
                                                <Field
                                                    name="state"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                // placeholder="Pincode"
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="state" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6  mb-3 ps-md-1">
                                            <div className="formbox ">
                                                <label> {translaterFun("country")} </label>
                                                <Field
                                                    name="country"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="country" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-12  mb-3">
                                            <div className="formbox ">
                                                <label>{translaterFun("description")}</label>
                                                <Field
                                                    name="description"
                                                    type="text"
                                                    className={`form-control `}
                                                    autoComplete="off"
                                                    placeholder={translaterFun("type-here")}
                                                />

                                                <p className="text-danger small mb-0">
                                                    <ErrorMessage name="description" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="formbox ">
                                                <label className="d-block">{translaterFun("Logo")} </label>
                                                <div className=" uploadwrapper ">
                                                    <button type="button">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 14 14"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z"
                                                                fill="#8D8D8D"
                                                            />
                                                        </svg>{" "}
                                                        {translaterFun("upload")}{" "}
                                                    </button>
                                                    <input
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg, .svg"
                                                        // value
                                                        onChange={(e) => handleUploadLogoImage(e)}
                                                    />
                                                </div>
                                                {/* <p className="text-danger small mb-0">
                                                    <ErrorMessage name="first_name" />
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-end mt-5'>
                                        <button type="button" className="btn1" onClick={(e) => {
                                            submitAction = "primary";
                                            handleSubmit(e)
                                        }} >{translaterFun("create-lead")}</button>

                                        <button type="submit" className="btn2 mx-3" onClick={(e) => {
                                            submitAction = "secondary";
                                            handleSubmit(e)
                                        }} > {translaterFun("onboard-and-create-password")}</button>
                                    </div>
                                </Form>

                            )}
                        </Formik>
                    </div>

                </PopUpComponent>}

                {/* Password Confirm_password in onBoard leads */}

                {OnBordPopUp && (
                    <PopUpComponent
                        classNameValue={"onboardingpopup "}
                        PopUpToggleFun={PopUpToggleFun}
                        popUpHookFun={popUpHookFun} >
                        <button type="button" className="closebtn" onClick={(e) => closeOnBoardFun()}> <img src={close} alt="close icon" /> </button>
                        <div className="popuptitle">
                            <h2>{translaterFun("onboarding")}</h2>
                        </div>
                        <div className="popupbody">
                            <Formik
                                enableReinitialize
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
                                            <label>{translaterFun("confirm-password")}</label>
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
                                        <button type="submit" className="btn2 mx-3">{translaterFun("submit")} </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        {/* children part end */}
                    </PopUpComponent>
                )}


                {/* SuccessFull On Board */}

                {SuccessPopup &&
                    <SucessRegisteredPopup
                        translaterFun={translaterFun}
                        LeadsRestaurantSelectorData={LeadsRestaurantSelectorData}
                        BackToHomeFun={BackToHomeFun}
                    />
                    // <div className="popup successpopup ">
                    //     <div className="innerpopup">
                    //         <img src={imgicon} alt="img" />
                    //         <h3> {translaterFun("success")}</h3>
                    //         <p>{translaterFun("successfully-registered")}</p>
                    //         <div className="sharebtnbox">
                    //             <span> <img src={share} alt="img" /> {translaterFun("link")}</span>
                    //             <input type="text" placeholder={translaterFun("link")} value={LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url} />
                    //             <button type="button" className="copybtn"> <img src={copy} alt="img" onClick={(e) => CopyLinkFun(e)} /> </button>
                    //             <button type="button" className="sharebtn">
                    //                 <RWebShare data={{
                    //                     // text: "Web Share - GFG",
                    //                     url: LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url,
                    //                     // title: "Gfg"
                    //                 }}
                    //                     onClick={() => console.log("Shared successfully!")} >

                    //                     <img src={share2} alt="img" />
                    //                 </RWebShare>
                    //             </button>

                    //         </div>
                    //         <button className="btn2" onClick={(e) => BackToHomeFun()}>{translaterFun("back-to-home")} </button>
                    //     </div>
                    // </div>
                }

            </div>
            <LodingSpiner loadspiner={LoadSpiner} />
        </>
    )
}




export default CreateLeadOnBoardPopUpComponent
