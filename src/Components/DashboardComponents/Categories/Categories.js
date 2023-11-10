import React, { useEffect, useState } from "react";
import "./categories.css";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import dish1 from "../../../images/dish1.png";
import dish2 from "../../../images/dish2.png";
import dish3 from "../../../images/dish3.png";
import category from "../../../images/category.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import manager from "../../../images/manager.png";
import { UploadMenuSlice } from "../../../Redux/slices/uploadMenuSlice"
import { GetMenuCategorySlice, MenuSlice, favoriteMenuSlice } from '../../../Redux/slices/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

const Categories = () => {
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
  const [ActiveCategory, setActiveCategory] = useState(undefined);

  const dispatch = useDispatch();
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
  const RestaurantIdLocalStorageData = reactLocalStorage.get("RestaurantId", false);

  console.log("RestaurantIdLocalStorageData", RestaurantIdLocalStorageData);
  const PopUpToggleFun = () => {
    popUpHookFun(o => !o)
  }

  const PopUpCategoriesToggleFun = () => {
    popUpCategoriesHookFun((o) => !o);
  };
  const CancelBtnFun = () => {
    popUpHookFun(false);
  };
  const CancelCategoryBtnFun = () => {
    popUpCategoriesHookFun(false);
  };
  const UploadMenuFile = (e) => {
    console.log("hjgsdh", e?.target?.files[0]);
    const formData = new FormData();
    let payload = {
      file: e?.target?.files[0],
      restaurant_id: RestaurantIdLocalStorageData
    }
    formData.append("file", payload?.file);
    formData.append("restaurant_id", payload?.restaurant_id);
    console.log("shgdah", payload, formData)
    dispatch(UploadMenuSlice(formData))
  };
  console.log("MenuApiSelectorDATAINSIDECATEGORYsirjgkwhkwjb :", MenuApiSelectorData);

  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);

    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.MenuSliceReducerData.status === 200) {
      setLoadSpiner(false);

    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.favoriteMenuSliceReducerData.status === 200) {
      setLoadSpiner(false);

    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [MenuApiSelectorData?.GetMenuCategoryReducerData, MenuApiSelectorData?.MenuSliceReducerData, MenuApiSelectorData?.favoriteMenuSliceReducerData]);

  useEffect(() => {

    let MenuSlicePayload = {
      "RestaurantId": RestaurantIdLocalStorageData
    }

    dispatch(GetMenuCategorySlice(MenuSlicePayload));
    dispatch(favoriteMenuSlice(MenuSlicePayload));

  }, [])



  // console.log("nchgsddsdsd", MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0])
  console.log("ActiveCategory", ActiveCategory)



  useEffect(() => {
    setActiveCategory(MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id)

    let MenuSlicePayload = {
      "searchValue": undefined,
      "itemTypeValue": undefined,
      "RestaurantId": RestaurantIdLocalStorageData,
      "MenuId": MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id,
    }

    dispatch(MenuSlice(MenuSlicePayload));

  }, [MenuApiSelectorData?.GetMenuCategoryReducerData])

  const CategoryTabFun = (e, categoryItem) => {

    let MenuSlicePayload = {
      "searchValue": "",
      "itemTypeValue": "",
      "RestaurantId": RestaurantIdLocalStorageData,
      "MenuId": categoryItem?.menu_id
    }

    dispatch(MenuSlice(MenuSlicePayload));
    setActiveCategory(categoryItem?.menu_id);
    console.log("hgvujvjvhjvvhv", ActiveCategory)
  }

  return (
    <>
      <DashboardLayout>
        <div className='dasboardbody'>
          <DashboardSidebar />
          <div className='contentpart categorypage'>
            <div className='title'>
              <h2>Categories</h2>
              <div className="btnbox">

                <div className="btn1 uploadbtn-wrapper">
                  <button type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" />
                  </svg> Upload Menu </button>
                  <input type="file" accept="xlxs" onChange={(e) => UploadMenuFile(e)} />
                </div>

                <button
                  type="button"
                  className="menubtn btn2"
                  onClick={(e) => PopUpToggleFun()}
                >
                  {" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                  </svg>
                  Add Menu
                </button>
                <button
                  type="button"
                  className="categorybtn btn2"
                  onClick={(e) => PopUpCategoriesToggleFun()}
                >
                  {" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                  </svg>
                  Add Categories
                </button>
              </div>
            </div>

            <div className='categorycontent'>
              <div className='leftpart'>
                <div className='topdishestabpart'>
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      {/* CATEGORY MANAGEMENT */}
                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map((item, id) => {
                        return <button onClick={(e) => CategoryTabFun(e, item)} class="nav-link active" key={id} id="nav-dishes1-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes1" type="button" role="tab" aria-controls="nav-dishes1" aria-selected="true">
                          <div>
                            <figure>
                              <img src={dish1} alt="img" />
                            </figure>
                            <h3>{item?.category}</h3>
                            <div className='buttonbox'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      })}

                    </div>
                  </nav>

                  <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-dishes1" role="tabpanel" aria-labelledby="nav-dishes1-tab" tabindex="0">
                      <ul>

                        {/* CATEGORY ITEMS DATA MANAGEMENT */}
                        {
                          MenuApiSelectorData?.MenuSliceReducerData?.data?.[0]?.item_id?.map((items, ids) => {

                            return <li key={ids}>
                              <h4>{items?.item_name}</h4>
                              <div className='tabinfo'>
                                <div className='leftpart'>
                                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                                  <span className='price'>{`$${items?.item_price}`}</span>
                                </div>
                                <div className='rightpart'>
                                  <img src={dish3} alt='img' />
                                </div>
                              </div>
                            </li>
                          })
                        }
                      </ul>
                    </div>

                    {/* <div class="tab-pane fade" id="nav-dishes2" role="tabpanel" aria-labelledby="nav-dishes2-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <h4>Spaghetti</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Vegetable Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Mushroom Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>OTC Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                            </ul>
                                        </div> 

                                         <div class="tab-pane fade" id="nav-dishes3" role="tabpanel" aria-labelledby="nav-dishes3-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <h4>Spaghetti</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Vegetable Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Mushroom Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>OTC Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                            </ul>
                                        </div>  */}

                  </div>
                </div>
              </div>
              <div className='rightpart'>
                <div className='bestsellerpart'>
                  <h2>Bestseller</h2>
                  <ul>

                    {/* FAVORITE DISHES MANAGEMENT */}
                    {
                      MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.map((items, favoriteId) => {

                        return items?.item_id?.map((item, favoriteDishId) => {
                          return <li key={favoriteDishId}>
                            <div className='leftpart'>
                              <img src={dish1} alt='img' />
                            </div>
                            <div className='rightpart'>
                              <h3>{item?.item_name}</h3>
                              <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                              <span className='price'> {`$${item?.item_price}`} </span>
                            </div>
                          </li>
                        })

                      })
                    }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {popUpHook && (
        <PopUpComponent
          classNameValue={"addmenupopup d-block"}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun}        >
          {/* children part start */}
          <div className="popuptitle">
            <h2>Add Menu Item</h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form className="row">
                <div className="col-12 mb-3">
                  <div className="formbox ">
                    <label>Name </label>
                    <Field name="first_name" type="text" className={`form-control `} autoComplete="off" placeholder="Enter your First Name" />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label>Item Price </label>
                    <div className="sarbox">
                      <Field name="first_name" type="text" className={`form-control `} autoComplete="off" placeholder="Enter the amount" />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8 mb-3">
                  <div className="formbox ">
                    <label>Calories </label>
                    <div className="caloriesbox">
                      <Field name="first_name" type="text" className={`form-control `} autoComplete="off" placeholder="Type Here" />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="formbox">
                    <label>Category </label>
                    <select className={`form-control `}>
                      <option> Item Type 1 </option>
                      <option> Item Type 2 </option>
                      <option> Item Type 3 </option>
                      <option> Item Type 4 </option>
                    </select>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label>Description (Optional) </label>
                    <textarea className={`form-control `} autoComplete="off" placeholder="Type Here"></textarea>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label className="d-block">Upload Image (Optional) </label>
                    <div className=" uploadwrapper ">
                      <button type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" fill= '#8D8D8D' />
                      </svg> Upload </button>
                      <input type="file" 
                      onChange={(e) => UploadMenuFile(e)} 
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="button" className="btn3" onClick={(e) => CancelBtnFun(e)}> Cancel </button>
                  <button type="submit" className="btn2 submit mx-3">  Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      {popUpcategoriesHook && (
        <PopUpComponent
          classNameValue={"addcategorypopup"}
          PopUpToggleFun={PopUpCategoriesToggleFun}
          popUpHookFun={popUpCategoriesHookFun}
        >
          {/* children part start */}

          <div className="popuptitle mb-5">
            <h2>Add Category </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form className="row">
              <img src={category} alt="manager img" class="categoryimg" />
                <div className="formbox mb-3">
                  <label>Category Name </label>
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

                {/* <div className="col-md-12 mb-3"> */}
                <div className="formbox ">
                  <label className="d-block">Upload Image (Optional) </label>
                  <div className=" uploadwrapper ">
                    <button type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" fill= '#8D8D8D' />
                    </svg> Upload </button>
                    <input type="file" 
                    onChange={(e) => UploadMenuFile(e)} 
                    />
                  </div>
                  <p className="text-danger small mb-0">
                    <ErrorMessage name="first_name" />
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
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                  </select>

                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>

                <div className="text-end mt-5">
                  <button
                    type="btn"
                    className="cancelbtn"
                    onClick={(e) => CancelBtnFun(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button type="submit" className="submit mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      {popUpcategoriesHook && (
        <PopUpComponent
          classNameValue={"addmanagerpopup d-none"}
          PopUpToggleFun={PopUpCategoriesToggleFun}
          popUpHookFun={popUpCategoriesHookFun}
        >
          {/* children part start */}

          <div className="popuptitle">
            <h2>Add Menu Items </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form>
                <img src={manager} alt="manager img" />
                <div className="formbox mb-3">
                  <label>Onboarding </label>
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
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                  </select>

                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>

                <div className="text-end mt-5">
                  <button
                    type="btn"
                    className="cancelbtn"
                    onClick={(e) => CancelCategoryBtnFun(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button type="submit" className="submit mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};

export default Categories;
