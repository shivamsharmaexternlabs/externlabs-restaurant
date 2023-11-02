import React from 'react'
import './manager.css'
import plus from '../../../images/plus.svg'
import user from '../../../images/user.png'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import manager from '../../../images/manager.png'
import deleteimg from '../../../images/delete.png'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";


const Manager = () => {
    return (

        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart managerpage'>
                        <div className='managertitle'>
                            <h2>Managers</h2>
                            <button type='button' className='mangerbtn'> <img src={plus} alt='plusimg' /> Add Manager</button>
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

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>Landon Kirby</td>
                                    <td>Landonkirby@gmail.com</td>
                                    <td>+97 2265 58694</td>
                                    <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                    <td>
                                        <button className='asbtn'> Transfer </button>
                                        <button className='asbtn'> Delete </button>
                                    </td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>



                <div className='popup addmanagerpopup d-none'>
                    <div className='popupinner'>
                        <div className='popuptitle'>
                            <h2> Add New Manager  </h2>
                        </div>
                        <div className='popupbody'>

                            <Formik
                            
                            >
                                <Form>
                                    <img src={manager} alt='manager img' className='managerimg' />
                                    <div className="formbox mb-3">
                                        <label>Name </label>
                                        <Field
                                            name="text"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="Enter your Name"
                                        />
                                        {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                        <p className="text-danger small">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>
                                    <div className="formbox mb-3">
                                        <label>Email </label>
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

                                    <div className="formbox mb-3">
                                        <label>Mobile Number </label>
                                        <Field

                                            type="number"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="Enter your mobile number"
                                        />
                                        {/* <img src={sms} alt="sms img" className="imgsms" /> */}
                                        <p className="text-danger">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>

                                    <div className="formbox">
                                        <label>Assign to Restaurant (optional) </label>
                                        <select className={`form-control `}>
                                            <option>  Assign to Restaurant (optional) </option>
                                            <option>  Assign to Restaurant (optional) </option>
                                            <option>  Assign to Restaurant (optional) </option>
                                            <option>  Assign to Restaurant (optional) </option>
                                        </select>

                                        <p className="text-danger">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>

                                    <div className='text-end mt-5'>
                                        <button type="submit" className="cancelbtn"> Cancel </button>
                                        <button type="submit" className="submit mx-3"> Submit </button>
                                    </div>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>

                <div className='popup wantmanager '>
                    <div className='popupinner'>
                        <div className='popupbody'>
                            <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
                            <h2>Do you want to Delete this Manager?</h2>
                            <div className='text-center'>
                                <button type="button">Cancel </button>
                                <button type="button" className='ms-4'>Yes, I’m Sure</button>
                            </div>
                        </div>
                    </div>
                </div>


            </DashboardLayout>

        </>
    )
}

export default Manager