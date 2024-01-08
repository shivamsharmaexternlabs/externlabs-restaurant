import React, { useEffect, useState } from 'react'
import './manager.css'
import plus from '../../../images/plus.svg'
import user from '../../../images/user.png'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import manager from '../../../images/manager.png'
import deleteimg from '../../../images/delete.png'
import PhoneInput from "react-phone-input-2"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent'
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook'
import { useDispatch, useSelector } from 'react-redux'
import { reactLocalStorage } from 'reactjs-localstorage'
import { SignUpSlice } from '../../../Redux/slices/SignUpSlice'
import { useNavigate } from 'react-router-dom'
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import { ManagerSlice, ManagerDeleteSlice } from '../../../Redux/slices/managerSlice'
import ReactPaginate from 'react-paginate';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle'
import { Helmet } from "react-helmet";

const Manager = ({ translaterFun }) => {
    const itemsPerPage = 5;
    const [loadspiner, setLoadSpiner] = useState(false);
    const [data, setData] = useState({ results: [] })
    const [CurrentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch();
    const [popUpHook, popUpHookFun] = usePopUpHook("")
    const [deletePopup, deletePopUpFun] = usePopUpHook("")
    const [UserId, setUserId] = useState("")
    const SignUpSelectorData = useSelector((state) => state.SignUpApiData);
    let BearerToken = reactLocalStorage.get("Token", false);

    const [countrycode, setCountryCode] = useState("+91");
    const [phonenumber, setPhoneNumber] = useState("");


    const ManagerApiSelectorData = useSelector((state) => state.ManagerApiData?.data);



    useEffect(() => {
        setData(ManagerApiSelectorData?.data)
    }, [ManagerApiSelectorData]);

    useEffect(() => {

        (async function () {
            if (BearerToken !== false) {
                dispatch(LoadingSpinner(true))
                try {
                    let ManagerSlicePayload = {
                        Token: BearerToken,
                        pageination: 1
                    }

                    await dispatch(ManagerSlice(ManagerSlicePayload))
                    dispatch(LoadingSpinner(false))
                } catch (error) {
                    dispatch(LoadingSpinner(false))
                }
            }
        })()

    }, [BearerToken])

    const PopUpToggleFun = () => {
        popUpHookFun(o => !o)
    }


    useEffect(() => {
        if (SignUpSelectorData?.data?.status === 201) {
            setLoadSpiner(false);
            popUpHookFun(false);

            let ManagerSlicePayload = {
                Token: BearerToken,
                pageination: 1
            }
            dispatch(ManagerSlice(ManagerSlicePayload));
        }
        else if (SignUpSelectorData?.error === "Rejected") {
            setLoadSpiner(false);
            popUpHookFun(true);
        }
    }, [SignUpSelectorData]);

    // useEffect(() => {
    //     if (SignUpSelectorData?.data?.status === 201) {
    //         setLoadSpiner(false);
    //         popUpHookFun(false);

    //         let ManagerSlicePayload = {
    //             Token: BearerToken,
    //             pageination: 1
    //         }
    //         dispatch(ManagerSlice(ManagerSlicePayload));
    //     }
    //     else if (SignUpSelectorData?.error === "Rejected") {
    //         setLoadSpiner(false);
    //         popUpHookFun(true);
    //     }
    // }, [ManagerApiSelectorData?.managerDeleteReducer]);


    const defaultValue = {
        email: "",
        first_name: "",
        password: "",
        confirm_password: "",
        type: "manager",
        token: BearerToken

    };

    const Validate = yup.object({
        // email: yup.string().required("Email is required").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is Invalid").matches(/^\S*$/, 'First name must not contain spaces'),
        first_name: yup.string().required(translaterFun("first-name-is-required")).matches(/^[\w\-\s\u0600-\u06FF]+$/, 'Name must not contain special characters'),
        // first_name: yup.string().required("first name is required").matches(/^\S*$/, 'First name must not contain spaces'),
        // last_name: yup.string().required("last name is required").matches(/^[a-zA-Z0-9]+$/, 'Last name must not contain contain spaces & special characters'),
        password: yup.string().required(translaterFun("password-is-required")).matches(/^\S*$/, 'Password name must not contain spaces'),
        confirm_password: yup.string().required(translaterFun("confirm-password-is-required")).matches(/^\S*$/, 'Password name must not contain spaces'),
        // phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone Number is required').matches(/^\S*$/, 'Phone Number must not contain spaces')
    });


    const handleSubmit = async (values) => {
        dispatch(LoadingSpinner(true))
        let SignUpForOnBoardPayload = {
            email: values?.email,
            password: values?.password,
            confirm_password: values?.confirm_password,
            first_name: values?.first_name,
            // last_name: values?.last_name,
            phone_number: `${countrycode}-${phonenumber}`,
            type: "manager",
            token: BearerToken
        }
        try {
            await dispatch(SignUpSlice(SignUpForOnBoardPayload))
            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }

        setCurrentPage(0);
        setLoadSpiner(true);
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
        setUserId(item.user_id)
        deletePopUpFun(true)
    }
    const confirmDelete = async (e, item) => {
        await dispatch(LoadingSpinner(true));

        try {
            await dispatch(ManagerDeleteSlice({ item, BearerToken }))
            deletePopUpFun(false)
            setCurrentPage(0);
            let ManagerSlicePayload = {
                Token: BearerToken,
                pageination: 1
            }
            await dispatch(ManagerSlice(ManagerSlicePayload));
            await dispatch(LoadingSpinner(false));
        } catch (error) {
            await dispatch(LoadingSpinner(false));
        }
    }

    const CancelBtnFun = () => {
        popUpHookFun(false);
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
        setCountryCode(CountryCode[0]);
        CountryCode.slice(1).map((items, id) => {
            data.push(items);
        });
        let myString = data.join("").replace(/\D/g, "");
        setPhoneNumber(myString);
    };


    return (

        <>
            <Helmet>
                <title>Manage Your Team | Harbor Bites</title>
                <meta name="description" content="View, Add, and Modify Your Team" />
                {/* <link rel="icon" type="image/x-icon" href="./"/> */}
            </Helmet>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart managerpage'>
                        <div className='managertitle'>
                            <h2>
                                {translaterFun("managers")}
                            </h2>
                            {/* ADD Manager button... */}
                            {/* <button type='button' className='mangerbtn' onClick={(e) => PopUpToggleFun()}> <img src={plus} alt='plusimg' />
                                {translaterFun("add-manager")}
                            </button> */}
                        </div>
                        <div className='managertable'>
                            <table>
                                <tr>
                                    <th></th>
                                    <th>{translaterFun("user-name")}</th>
                                    <th>{translaterFun("email")}</th>
                                    <th>{translaterFun("mobile-no")}</th>
                                    <th>{translaterFun("action")}</th>
                                </tr>



                                {data?.results?.map((items, id) => {
                                    return <tr>
                                        <td> <img src={user} alt='img' /> </td>
                                        <td>{`${items?.first_name}`}</td>
                                        <td>{items?.email}</td>
                                        <td>{items?.phone_number}</td>
                                        <td>
                                            <button className='asbtn' onClick={(e) => handleDelete(e, items)}>
                                                {translaterFun("delete")} </button>
                                        </td>
                                    </tr>
                                })}

                            </table>
                            <ReactPaginate
                                // previousLabel={"Previous"}

                                previousLabel={translaterFun("previous")}
                                i18nIsDynamicList={true}
                                // nextLabel={"Next"}
                                nextLabel={translaterFun("next")}
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





                {popUpHook &&
                    <PopUpComponent
                        classNameValue={"addmanagerpopup"}
                        PopUpToggleFun={PopUpToggleFun}
                        popUpHookFun={popUpHookFun}
                    >
                        {/* children part start */}

                        <div className='popuptitle'>
                            <h2>

                                {translaterFun("add-new-manager")}
                            </h2>
                        </div>
                        <div className='popupbody'>

                            <img src={manager} alt='manager img' className='managerimg' />
                            <Formik
                                initialValues={defaultValue}
                                validationSchema={Validate}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div className="formbox mb-3">
                                        <label>
                                            {translaterFun("name")}  </label>
                                        <Field
                                            name="first_name"
                                            type="text"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder={translaterFun("enter-your-name")}
                                        />
                                        <p className="text-danger small">
                                            <ErrorMessage name="first_name" />
                                        </p>
                                    </div>

                                    {/* <div className="formbox mb-3">
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
                                    </div> */}

                                    <div className="formbox mb-3">
                                        <label>{translaterFun("email")} </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className={`form-control `}
                                            autoComplete="off"
                                            placeholder={translaterFun("email")}

                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>

                                    {/* <div className="formbox mb-3">
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
                                    </div> */}


                                    <div className="formbox mb-3">
                                        <label>{translaterFun("phone-number")} </label>
                                        <PhoneInput
                                            country={"in"}
                                            // value={phonenumber}
                                            onChange={handleOnChange1}
                                            className="input_filed"
                                        />
                                    </div>


                                    <div className="formbox mb-3">
                                        <label>{translaterFun("password")} </label>
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
                                        <label>{translaterFun("confirm-password")} </label>
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

                                    <div className='text-end mt-5 submitbtnbox'>
                                        <button type="btn" className="cancelbtn" onClick={(e) => CancelBtnFun(e)} >  {translaterFun("cancel")}
                                        </button>
                                        <button type="submit" className="submitbtn"> {translaterFun("submit")} </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>


                    </PopUpComponent>}



                {false && <PopUpComponent classNameValue={"wantmanager"}>
                    <div className='popupbody'>
                        <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
                        <h2>Do you want to Delete this Manager?</h2>

                    </div>

                </PopUpComponent>
                }

                {
                    deletePopup &&
                    <PopUpComponent
                        classNameValue={"popup wantmanager "}
                        PopUpToggleFun={PopUpToggleFun}
                        popUpHookFun={popUpHookFun}
                    >
                        {/* children part start */}

                        <div className='popupinner'>
                            <div className='popupbody'>
                                <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
                                <h2>{translaterFun("delete-manager")}</h2>
                                <div className='text-center'>
                                    <button type="button" onClick={(e) => deletePopUpFun(false)}>{translaterFun("cancel")} </button>
                                    <button type="button" className='ms-4' onClick={(e) => confirmDelete(e, UserId)}>{translaterFun("confirm-delete-button")}</button>
                                </div>
                            </div>
                        </div>

                        {/* children part end */}

                    </PopUpComponent>
                }
                {/* <div className='popup wantmanager'>
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