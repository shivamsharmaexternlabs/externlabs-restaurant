import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './leads.css' 
import DashboardLayout from "../../DashboardComponents/DashboardLayout/DashboardLayout";
import DashboardSidebar from "../../DashboardComponents/DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent"; 
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { ManagerSlice } from "../../../Redux/slices/managerSlice";
import user from '../../../images/user.png'
import share from '../../../images/share.svg'
import copy from '../../../images/copy.svg'
import share2 from '../../../images/share2.svg'
import ReactPaginate from 'react-paginate';

import imgicon from '../../../images/imgicon.svg'



const Leads = () => {

  const itemsPerPage = 5;
  const [data, setData] = useState({ results: [] })
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [deletePopup, deletePopUpFun] = usePopUpHook("")
  const LeadsSelectorData = useSelector((state) => state.LeadsApiData);
  let BearerToken = reactLocalStorage.get("Token", false);
  const dispatch = useDispatch();
  const [CurrentPage, setCurrentPage] = useState(0)

  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };

  const CancelBtnFun = () => {
    popUpHookFun(false);
  };
  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.

    let ManagerSlicePayload = {
      Token: BearerToken,
      pageination: page
    }
    dispatch(ManagerSlice(ManagerSlicePayload));
    setCurrentPage(page - 1);
  }


  const handleDelete = (e, item) => {
    console.log("dsfahg", item.user_id)
    setUserId(item.user_id)
    deletePopUpFun(true)
  }
  const [UserId, setUserId] = useState("")
  useEffect(() => {
    if (LeadsSelectorData?.data?.status === 201) {
      setLoadSpiner(false);
      popUpHookFun(false);

      let ManagerSlicePayload = {
        Token: BearerToken,
        pageination: 1,
      };
      dispatch(ManagerSlice(ManagerSlicePayload));
    } else if (LeadsSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsSelectorData]);
  return (
    <>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart leadpage">
            <div className="title">
              <h2>Leads</h2>
              <button type='button' className="btn2" onClick={(e) => PopUpToggleFun()}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                </svg> Add New Leads </button>
            </div>



            <div className='managertable'>
              <table>
                <tr>
                  <th></th>
                  <th>User Name </th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Assigned to </th>
                  <th>Assigned to</th>
                </tr>



                {data?.results?.map((items, id) => { 
                  return <tr>
                    <td> <img src={user} alt='img' /> </td>
                    <td>{`${items?.first_name} ${items?.last_name} `}</td>
                    <td>{items?.email}</td>
                    <td>{items?.phone_number}</td>
                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                    <td>
                      {/* <button className='asbtn'> Transfer </button> */}
                      <button className='asbtn' onClick={(e) => handleDelete(e, items)}> Delete </button>
                    </td>
                  </tr>
                })} 
                 
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(data?.count / itemsPerPage)}
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
          {/* children part start */}

          <div className="popuptitle">
            <h2>New Leads </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form className="row">
                <div className="col-12  mb-3 ">
                  <div className="formbox">
                    <label>Restaurant Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your First Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-4  mb-3">
                  <div className="formbox ">
                    <label> Shop no. (Optional) </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Shop no."
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8 mb-3">
                  <div className="formbox ">
                    <label> Street Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Street Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label> City Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your City Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8  mb-3">
                  <div className="formbox ">
                    <label> Landmark (Optional) </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Nearby Landmark"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> Pincode </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Pincode"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> State </label>
                    <select className={`form-control `}>
                      <option> State </option>
                      <option> State </option>
                      <option> State </option>
                      <option> State </option>
                    </select>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-6  mb-3">
                  <div className="formbox ">
                    <label> Country </label>
                    <select className={`form-control `}>
                      <option> Country </option>
                      <option> Country </option>
                      <option> Country </option>
                      <option> Country </option>
                    </select>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>
                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Address </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Address"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Franchise Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your franchise name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Franchise Name </label>
                    <textarea className="form-control"> </textarea>

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>
                <div className='text-end mt-5'>
                  <button type="btn" className="btn2" onClick={(e) => CancelBtnFun(e)} > Cancel </button>
                  <button type="submit" className="btn2 mx-3"> Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}

      {popUpHook && (
        <PopUpComponent
          classNameValue={"onboardingpopup d-none"}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun}
        >
          {/* children part start */}

          <div className="popuptitle">
            <h2>Onboarding </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form className="row">
                <div className="col-12  mb-3 ">
                  <div className="formbox">
                    <label>Restaurant Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your First Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-4  mb-3">
                  <div className="formbox ">
                    <label> Shop no. (Optional) </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Shop no."
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8 mb-3">
                  <div className="formbox ">
                    <label> Street Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Street Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label> City Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your City Name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8  mb-3">
                  <div className="formbox ">
                    <label> Landmark (Optional) </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Nearby Landmark"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> Pincode </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Pincode"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-3  mb-3">
                  <div className="formbox ">
                    <label> State </label>
                    <select className={`form-control `}>
                      <option> State </option>
                      <option> State </option>
                      <option> State </option>
                      <option> State </option>
                    </select>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-6  mb-3">
                  <div className="formbox ">
                    <label> Country </label>
                    <select className={`form-control `}>
                      <option> Country </option>
                      <option> Country </option>
                      <option> Country </option>
                      <option> Country </option>
                    </select>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>
                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Address </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Address"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Franchise Name </label>
                    <Field
                      name="first_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your franchise name"
                    />

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12  mb-3">
                  <div className="formbox ">
                    <label> Franchise Name </label>
                    <textarea className="form-control"> </textarea>

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>
                <div className='text-end mt-5'>
                  <button type="btn" className="btn2" onClick={(e) => CancelBtnFun(e)} > Cancel </button>
                  <button type="submit" className="btn2 mx-3"> Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}


      {popUpHook && (
        <PopUpComponent
          classNameValue={"onboardingpopup d-none"}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun} >
          {/* children part start */}

          <div className="popuptitle">
            <h2>Onboarding </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form className="row">

                <div className="col-md-12 mb-3">
                  <div className="formbox">
                    <label>Email </label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Email"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                </div>

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

      <div className="popup successpopup d-none">
        <div className="innerpopup">
          <img src={imgicon} alt="img" />
          <h3> Success !</h3>
          <p>[Restaurant name] is successfully registered</p>
          <div className="sharebtnbox">
            <span> <img src={share} alt="img" /> Link </span>  
            <input type="text" placeholder="link" />
            <button type="button" className="copybtn"> <img src={copy} alt="img" /> </button>
            <button type="button" className="sharebtn"> <img src={share2} alt="img" /> </button>
            
          </div>
          <button className="btn2"> Back to home </button>
        </div>
      </div>



      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};

export default Leads;
