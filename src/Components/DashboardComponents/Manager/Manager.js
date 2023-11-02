import React, { useEffect, useState } from 'react'
import './manager.css'
import plus from '../../../images/plus.svg'
import user from '../../../images/user.png'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import manager from '../../../images/manager.png'
import deleteimg from '../../../images/delete.png'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent'
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook'
import { useDispatch, useSelector } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage'
import { SignUpSlice } from '../../../Redux/slices/SignUpSlice'
import { useNavigate } from 'react-router-dom'
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import { ManagerSlice } from '../../../Redux/slices/managerSlice'


const Manager = () => {

    const [loadspiner, setLoadSpiner] = useState(false);

    const dispatch = useDispatch();
    const [popUpHook, popUpHookFun] = usePopUpHook("")
    const SignUpSelectorData = useSelector((state) => state.SignUpApiData);
    let BearerToken = reactLocalStorage.get("Token", false);
    console.log("SignUpSelectorData : ", SignUpSelectorData)


    const ManagerApiSelectorData = useSelector((state) => state.ManagerApiData?.data.data);

    console.log("ManagerApiSelectorData===>>>", ManagerApiSelectorData);


    useEffect(() => {

        dispatch(ManagerSlice());

    }, []);



    const PopUpToggleFun = () => {
        popUpHookFun(o => !o)
    }


    useEffect(() => {
        console.log("SignUpSelectorData", SignUpSelectorData)
        if (SignUpSelectorData?.data?.status === 201) {
            setLoadSpiner(false);
            popUpHookFun(false);
        }
        else if (SignUpSelectorData?.error === "Rejected") {
            setLoadSpiner(false);
            popUpHookFun(true);
        }
    }, [SignUpSelectorData]);


    const defaultValue = {
        email: "sa21m@gmail.com",
        first_name: "sam",
        last_name: "sams",
        password: "Demo@123",
        confirm_password: "Demo@123",
        phone_number: "9087365441",
        type: "manager",
        token: BearerToken

    };

    const Validate = yup.object({
        email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
        first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
        last_name: yup.string().required("last name is required").matches(/^\S*$/, 'Last name must not contain spaces'),
        password: yup.string().required("Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
        confirm_password: yup.string().required("Confirm Password is required").matches(/^\S*$/, 'Password name must not contain spaces'),
        phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces')


    });

    const handleSubmit = (values) => {
        console.log("kkkkkkkkkkk", values)
        dispatch(SignUpSlice(values))
        // reactLocalStorage.set("EmailVerification", values.email);
        // setLoadSpiner(true);
    };



    return (

        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart managerpage'>
                        <div className='managertitle'>
                            <h2>Managers</h2>
                            <button type='button' className='mangerbtn' onClick={(e) => PopUpToggleFun()}> <img src={plus} alt='plusimg' /> Add Manager</button>
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



                                {ManagerApiSelectorData?.map((items, id) => {
                                    console.log("ManagerApiSelectorData items ", id, items)
                                    return <tr>
                                        <td> <img src={user} alt='img' /> </td>
                                        <td>{`${items?.first_name} ${items?.last_name} `}</td>
                                        <td>{items?.email}</td>
                                        <td>{items?.phone_number}</td>
                                        <td>Lorem ipsum dolor sit amet consetur dign....</td>
                                        <td>
                                            <button className='asbtn'> Transfer </button>
                                            <button className='asbtn'> Delete </button>
                                        </td>
                                    </tr>
                                })}





                                {/* <tr>
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
                                </tr> */}

                            </table>
                        </div>
                    </div>
                </div>



                {/* <div className='popup addmanagerpopup d-none'>
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
                </div> */}


                {popUpHook &&
                    <PopUpComponent
                        classNameValue={"addmanagerpopup"}
                        PopUpToggleFun={PopUpToggleFun}
                        popUpHookFun={popUpHookFun}
                    >
                        {/* children part start */}

                        <div className='popuptitle'>
                            <h2> Add New Manager  </h2>
                        </div>
                        <div className='popupbody'>

                            <Formik
                                initialValues={defaultValue}
                                validationSchema={Validate}
                                onSubmit={handleSubmit}

                            >
                                <Form>
                                    <img src={manager} alt='manager img' className='managerimg' />
                                    <div className="formbox mb-3">
                                        <label>First Name </label>
                                        <Field
                                            name="first_name"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="Enter your First Name"
                                        />

                                        <p className="text-danger small">
                                            <ErrorMessage name="first_name" />
                                        </p>
                                    </div>

                                    <div className="formbox mb-3">
                                        <label>Last Name </label>
                                        <Field
                                            name="last_name"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="Enter your Last Name"
                                        />

                                        <p className="text-danger small">
                                            <ErrorMessage name="last_name" />
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
                                        <p className="text-danger">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>

                                    <div className="formbox mb-3">
                                        <label>Mobile Number </label>
                                        <Field
                                            name="phone_number"
                                            type="number"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="Enter your mobile number"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="phone_number" />
                                        </p>
                                    </div>

                                    <div className="formbox mb-3">
                                        <label>Password </label>
                                        <Field
                                            name="password"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="************"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="password" />
                                        </p>
                                    </div>

                                    <div className="formbox mb-3">
                                        <label>Confirm Password </label>
                                        <Field
                                            name="confirm_password"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder="************"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="confirm_password" />
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
                                        <button type="btn" className="cancelbtn"  > Cancel </button>
                                        <button type="submit" className="submit mx-3"> Submit </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>

                        {/* children part end */}

                    </PopUpComponent>}


                {

                    false && <PopUpComponent
                        classNameValue={"wantmanager"}

                    >
                        <div className='popupbody'>
                            <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
                            <h2>Do you want to Delete this Manager?</h2>

                        </div>

                    </PopUpComponent>
                }

                {/* <div className='popup wantmanager d-none '>
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
                </div> */}


            </DashboardLayout>
            <LodingSpiner loadspiner={loadspiner} />

        </>
    )
}

export default Manager