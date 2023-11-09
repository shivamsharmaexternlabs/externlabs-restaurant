import React, { useState } from 'react'
import './restaurantdetail.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import editbanner from '../../../images/editbanner.png';
import user from '../../../images/user.svg';
import burgerimg from '../../../images/burgerimg.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

const RestaurantDetail = () => {

  const [dataaa,setDataaa] =useState("")

  const defaultValue = {
    restaurant_name: "shivam restro",
    owner_name: "extern labs",
    email: "sa21m@gmail.com",
    phone: "9087365441",
    shop_no: "52",
    street: "jtm mall",
    city: "gorakhpur",
    landmark: "near phatak",
    pincode: 222202,
    state: "U.P",
    country: "India",
    description: "Description ....."

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

  

  
  const routeData = useLocation();

  console.log("hgdchsdd", routeData)

  // const EditProfileFun =()=>{
  //   handleSubmit()

  //   // const dtata= handleSubmit()
  //   // console.log("nhbsdhgd",dtata)
  // }

  const handleSubmit=(values)=>{

    console.log("nvdcssd",values)
    setDataaa(values)

// return values

  }

  console.log("bavgchd",dataaa)

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
                {/* <div className='rightpart'>
                  <button type='button' className='btn2'>Reset Password</button>
                  <button type='button' className='btn2 ms-3' onClick={(e)=>EditProfileFun(e)}>Edit Profile</button>
                </div> */}
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


                      <div className='col-md-12 mb-3'>
                        <div className="formbox">
                          <label>Description</label>
                          <textarea className={`form-control `} style={{ height: '100px' }} placeholder='Type here...'></textarea>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="description" />
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='rightpart'>
                  <button type='button' className='btn2'>Reset Password</button>
                  <button type='submit' className='btn2 ms-3'  >Edit Profile</button>
                </div>
                </Form>

                
              </Formik>

            </div>
          </div>
        </div>
      </DashboardLayout>

    </>
  )
}

export default RestaurantDetail
