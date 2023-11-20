import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './menucategories.css'
import DashboardLayout from "../../DashboardComponents/DashboardLayout/DashboardLayout";
import DashboardSidebar from "../../DashboardComponents/DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { ManagerSlice } from "../../../Redux/slices/managerSlice";
import * as yup from "yup";
import user from '../../../images/user.png'
import share from '../../../images/share.svg'
import copy from '../../../images/copy.svg'
import share2 from '../../../images/share2.svg'
import ReactPaginate from 'react-paginate';
import PhoneInput from "react-phone-input-2"
import imgicon from '../../../images/imgicon.svg'
import { CreateLeadsRestaurantSlice, LeadsRestaurantSlice, CreateRestaurantsOnBoardSlice } from "../../../Redux/slices/leadsRestaurantSlice";
import { SignUpSlice } from "../../../Redux/slices/SignUpSlice";
import { RWebShare } from "react-web-share";
import { useNavigate } from "react-router-dom";



const Leads = () => {
  let submitAction = undefined;
  const itemsPerPage = 5;
  
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [CreateLeadOnBoardPayloadState, setCreateLeadOnBoardPayloadState] = useState("")
  
  
  let BearerToken = reactLocalStorage.get("Token", false);
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [CurrentPage, setCurrentPage] = useState(0);
  const [OnBordPopUp, setOnBordPopUp] = useState(false)
  const [SuccessPopup, setSuccessPopup] = useState(false)



  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
  const SignUpSelectorData = useSelector((state) => state.SignUpApiData);

  console.log("LeadsRestaurantSelectorData", LeadsRestaurantSelectorData)

  const defaultValue = {
    restaurant_name: "",
    owner_name: "",
    email: "",
    phone_ext: "",
    phone: "",
    shop_no: "",
    street: "",
    city: "",
    landmark: "",
    pincode: "",
    state: "",
    country: "",
    description: ""

  };

  const Validate = yup.object({
    restaurant_name: yup.string().required("Restaurant name is required"),
    owner_name: yup.string().required("name is required"),
    // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    phone: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    // shop_no: yup.string().required("shop_no is required"),    
    // street: yup.string().required("street name is required"),
    city: yup.string().required("City name is required"),
    // landmark: yup.string().required("landmark is required"),
    pincode: yup.string().matches(/^[0-9]+$/, 'pincode must contain only digits').required('pincode is required').matches(/^\S*$/, 'pincode must not contain spaces'),
    state: yup.string().required("state is required"),
    country: yup.string().required("country is required"),
    // description: yup.string().required("description is required"),
    // password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    // confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),


  });


  // const defaultSignUpValue = {
  //   email: "sa21m@gmail.com",
  //   first_name: "sams",
  //   password: "Demo@123",
  //   confirm_password: "Demo@123",
  //   phone_number: "9087365441",
  //   type:"owner"
  // };

  // const ValidateSignUp = yup.object({
  //   email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
  //   first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
  //   // last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
  //   phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
  //   password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
  //   confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),

  // });


  const defaultSignUpValue = {

    password: "",
    confirm_password: "",

  };

  const ValidateSignUp = yup.object({
    // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
    // first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
    // last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
    // phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces'),
    password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
    confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),

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

  const CreateLeadBtnFun = (values) => {

    let createLeadPayload = {
      "description": values?.description,
      "restaurant_name": values?.restaurant_name,
      "contact_name": values?.owner_name,
      "email": values?.email,
      "phone": `${values?.phone_ext} ${values?.phone}`,
      "shop_number": values?.shop_no,
      "street_name": values?.street,
      "city": values?.city,
      "landmark": values?.landmark,
      "pincode": values?.pincode,
      "state": values?.state,
      "country": values?.country,
      "status_type": "LEAD",
      "BearerToken": BearerToken
    }

    console.log("CreateLeadBtnFun", values)
    console.log("createLeadPayload", createLeadPayload)

    dispatch(CreateLeadsRestaurantSlice(createLeadPayload))

  }


  const CreateLeadOnBoard = (values) => {


    setOnBordPopUp(true)
    popUpHookFun((o) => !o);
    setCreateLeadOnBoardPayloadState(values)
    console.log("CreateLeadOnBoard", values)


  }


  useEffect(() => {

    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: 1,
    };
    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));

  }, []);


  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };


  const CancelBtnFun = () => {
    popUpHookFun(false);
  };

  const CopyLinkFun = () => {
    navigator.clipboard.writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url);
  }

  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.
    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: page,
    };

    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
    setCurrentPage(page - 1);
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

  // Use effect after password and confirm password...
  useEffect(() => {
    if (LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData?.status === 201) {
      setLoadSpiner(false);
      popUpHookFun(false);

      // let LeadsRestaurantSlicePayload = {
      //   Token: BearerToken,
      //   RestaurantId: RestaurantId,
      //   pagination: 1,
      // };
      // dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
    }
    else if (LeadsRestaurantSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsRestaurantSelectorData?.CreateLeadsRestaurantReducerData]);



  console.log("vsdccds", LeadsRestaurantSelectorData)
  useEffect(() => {
    if (LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.status === 201) {



      setSuccessPopup(true)
      setOnBordPopUp(false)
      // setLoadSpiner(false);
      // popUpHookFun(false);

      // let LeadsRestaurantSlicePayload = {
      //   Token: BearerToken,
      //   RestaurantId: RestaurantId,
      //   pagination: 1,
      // };
      // dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));


    }
    else if (LeadsRestaurantSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData]);


  useEffect(() => {
    console.log("SignUpSelectorData", SignUpSelectorData)
    if (SignUpSelectorData?.data?.status === 201) {
      setLoadSpiner(false);
      callBackFuncAfterSignUp();

      // navigate("/emailotpverification");
    }
    else if (SignUpSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [SignUpSelectorData]);


  // const handleOnChange1 = (
  //   currentValue,
  //   objectValue,
  //   eventData,
  //   eventTargetValue
  // ) => {
  //   // we are not using all the parameters in this function , but all parameters are important becouse of this library
  //   let data = [];
  //   let CountryCode = eventTargetValue.split(" ");
  //   setCountryCode(CountryCode[0]);
  //   CountryCode.slice(1).map((items, id) => {
  //     data.push(items);
  //   });
  //   let myString = data.join("").replace(/\D/g, "");
  //   // setPhoneNumber(myString);
  // };

  // console.log("hgdhghssa", LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData.data.url)


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
  // let  RestaurantId= reactLocalStorage.get("RestaurantId",false);

  const RestaurantsDetailsFun = (e, items, AllData) => { 
     navigate(`/${RestaurantId}/admin/restaurantdetail/${items?.restaurant_id}`, {
      state: {
        page:"MenuCategory", 
        currentData: items, 
      }
    })
  }




return (
  <>
    <DashboardLayout>
      <div className="dasboardbody">
        <DashboardSidebar />
        <div className="contentpart leadpage">
          <div className="title">
            <h2>Restaurants</h2>
            <button type='button' className="btn2" onClick={(e) => PopUpToggleFun()}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
              </svg>New Customer</button>
          </div>



          <div className='managertable'>
            <table>
              <tr>
                <th></th>
                <th>Restaurant Name </th>
                <th>Name </th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Generated Link</th>
                <th>Action</th>
              </tr>



              {LeadsRestaurantSelectorData?.LeadsRestaurantReducerData?.data?.results?.map((items, id) => {
                console.log("jsvsh")
                return <tr key={id}>
                  <td> <img src={user} alt='img' /> </td>
                  <td>{items?.restaurant_name}</td>
                  <td>{`${items?.owner?.first_name} `}</td>
                  <td>{items?.owner?.email}</td>
                  <td>{items?.owner?.phone_number}</td>
                  <td> {items?.url} </td>
                  <td>
                  <button type="button"  className="asbtn" onClick={(e) => RestaurantsDetailsFun(e, items)}> View </button>
                    {/* <button className='asbtn'> Transfer </button> */}
                    {/* <button className='asbtn' onClick={(e) => handleDelete(e, items)}> Delete </button> */}
                  </td>
                  {/* <td>
                      <button className='asbtn' onClick={(e) => handleDelete(e, items)}> Delete </button>
                    </td>  */}
                </tr>
              })}

            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(LeadsRestaurantSelectorData?.LeadsRestaurantReducerData?.data?.count / itemsPerPage)}
              onPageChange={handlePageClick}
              forcePage={CurrentPage}
              disabledClassName={"disabled"}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>


        </div>
      </div>
    </DashboardLayout>



    {popUpHook && (
      <PopUpComponent
        classNameValue={"leadpopup "}
        PopUpToggleFun={PopUpToggleFun}
        popUpHookFun={popUpHookFun}
      >


        <div className="popuptitle">
          <h2>New Customer</h2>
        </div>
        <div className="popupbody">
          <Formik
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


              <Form className="row">

                <div className="col-12  mb-3 ">
                  <div className="formbox">
                    <label>Restaurant Name </label>
                    <Field
                      name="restaurant_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter Restaurant Name "
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="restaurant_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3 ">
                  <div className="formbox">
                    <label>Owner Name </label>
                    <Field
                      name="owner_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter Owner Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="owner_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3 ">
                  <div className="formbox">
                    <label>Email </label>
                    <Field
                      name="email"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Email"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                </div>

                <div className="col-md-2  mb-3">
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
                </div>

                <div className="col-md-10  mb-3">
                  <div className="formbox ">
                    <label> Phone Number </label>
                    <Field
                      name="phone"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Phone Number"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="formbox ">
                    <label> Shop no./Building (Optional) </label>
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

                <div className="col-md-6 mb-3">
                  <div className="formbox ">
                    <label> Area/Street Name (Optional) </label>
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

                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label> Town/City Name </label>
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

                <div className="col-md-8  mb-3">
                  <div className="formbox ">
                    <label> Landmark (Optional) </label>
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

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> Pincode </label>
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

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> State </label>
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

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> Country </label>
                    <Field
                      name="country"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                    // placeholder="Pincode"
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


                <div className='text-end mt-5'>
                  <button type="button" className="btn2" onClick={(e) => {
                    submitAction = "primary";
                    handleSubmit(e)
                  }} > Create Lead </button>

                  <button type="submit" className="btn2 mx-3" onClick={(e) => {
                    submitAction = "secondary";
                    handleSubmit(e)
                  }} > Onboard and Create Password </button>
                </div>
              </Form>

            )}
          </Formik>
        </div>

      </PopUpComponent>
    )}

   

    {/* Password Confirm_password in onBoard leads */}
    {OnBordPopUp && (
      <PopUpComponent
        classNameValue={"onboardingpopup "}
        PopUpToggleFun={PopUpToggleFun}
        popUpHookFun={popUpHookFun} >


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
        {/* children part end */}
      </PopUpComponent>
    )}


    {/* SuccessFull On Board */}
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



    <LodingSpiner loadspiner={loadspiner} />
  </>
);
};

export default Leads;
