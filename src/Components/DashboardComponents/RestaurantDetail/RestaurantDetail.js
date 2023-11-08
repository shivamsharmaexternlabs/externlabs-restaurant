import React from 'react'
import './restaurantdetail.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import editbanner from '../../../images/editbanner.png';
import user from '../../../images/user.svg';
import burgerimg from '../../../images/burgerimg.png';
import { Formik, Form, Field, ErrorMessage } from "formik";


const RestaurantDetail = () => {
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
                <div className='rightpart'>
                  <button type='button' className='btn2'>Reset Password</button>
                  <button type='button' className='btn2 ms-3'>Edit Profile</button>
                </div>
              </div>
            </div>

            <div className='mt-4 mb-2 editprofileform'>
              <Formik>
                <Form className="row">
                  <div className='col-md-6'>

                    <div className="formbox mb-3">
                      <label>Category Name </label>
                      <Field
                        name="first_name"
                        type="text"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Name"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="first_name" />
                      </p>
                    </div>

                    <div className="formbox mb-3">
                      <label>Email </label>
                      <Field
                        name="first_name"
                        type="email"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Email"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="first_name" />
                      </p>
                    </div>

                    <div className="formbox mb-3">
                      <label>Phone Number </label>
                      <Field
                        name="first_name"
                        type="number"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter your Phone Number"
                      />
                      <p className="text-danger small mb-0">
                        <ErrorMessage name="first_name" />
                      </p>
                    </div>

                    <div className='row'>
                      <div className='col-md-4'>
                        <div className="formbox mb-3">
                          <label>Shop no. (Optional) </label>
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

                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>Street Name </label>
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
                    </div>

                    <div className='row'>
                      <div className='col-md-4'>
                        <div className="formbox mb-3">
                          <label>City Name </label>
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
                      <div className='col-md-8'>
                        <div className="formbox mb-3">
                          <label>Landmark (Optional) </label>
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
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='row'>
                      <div className='col-md-3'>
                        <div className="formbox mb-3">
                          <label>Pincode </label>
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

                      <div className='col-md-3'>
                        <div className="formbox mb-3">
                          <label>State </label>
                          <select className={`form-control `}>
                            <option> option1 </option>
                            <option> option1 </option>
                            <option> option1 </option>
                          </select>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className="formbox mb-3">
                          <label>Country </label>
                          <select className={`form-control `}>
                            <option> option1 </option>
                            <option> option1 </option>
                            <option> option1 </option>
                          </select>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-12  mb-3'>
                        <div className="formbox">
                          <label>Address </label>
                          <textarea className={`form-control `} style={{height:'100px'}} placeholder='Enter your full address'></textarea>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className='col-md-12 mb-3'>
                        <div className="formbox">
                          <label>Description</label>
                          <textarea className={`form-control `} style={{height:'100px'}} placeholder='Enter your full address'></textarea>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                    </div>
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
