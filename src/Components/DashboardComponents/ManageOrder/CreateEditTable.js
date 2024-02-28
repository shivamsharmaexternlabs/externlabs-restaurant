import React, { useState } from 'react'
import category from "../../../images/manager.png";


import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook';
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import { useDispatch } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetManageOrderTableSlice, PostManageOrderTableSlice, UpdateManageOrderTableSlice } from '../../../Redux/slices/manageOrderTableSlice';
import SelectAndSearchComponent from '../../../ReusableComponents/SelectAndSearchComponent/SelectAndSearchComponent';

const CreateEditTable = ({ translaterFun, openPopup, closePopup, tableProperty, EditTableData, OpenActionFun, ManageOrderTableSelectorDataProp
}) => {

    const [SearchCategoryData, setSearchCategoryData] = useState(null)
    const [CategoryDataError, setCategoryDataError] = useState("")
    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const dispatch = useDispatch();


    let BearerToken = reactLocalStorage.get("Token", false);
    const RestaurantIdLocalStorageData = reactLocalStorage.get("RestaurantId", false);


    const defaultEditValueCategory = {
        // category_en: EditTableData?.[0]?.category,
        Capacity: EditTableData?.[0]?.no_of_persons,
        TableNo: EditTableData?.[0]?.table_number
    }; 

    console.log("nbdvdsdd",EditTableData)
    const defaultValueCategory = {
        // category_en: SearchCategoryData, 
        // category_en: "", 
        Capacity: "",
        TableNo: ""
    };

    // console.log("nbsbsdsdd", defaultEditValueCategory)

    const ValidateEditCategory = yup.object({
        // [A-Za-z0-9-]
        // category_en: yup.string().matches(/^[A-Za-z\s_-]*$/,console.log("sdfsdfs"), translaterFun("Category Name should be Alphabetic Character")).required(translaterFun("enter-category-name")),
        TableNo: yup.string().matches(/^[\w- ]+$/, translaterFun("table-number-should-be-alphanumeric-or-with-hyphen")).required(translaterFun("enter-table-no")),
    });

    const handleCreateEditTableSubmit = async (values) => {

        let valueData = /^[A-Za-z\s_-]*$/

         
        if (!valueData.test(SearchCategoryData)) {
            setCategoryDataError("enter valid category")

            console.log("mbvdmsmdd", "enter valid category")

        }
        else if(SearchCategoryData==null || SearchCategoryData==""){
            setCategoryDataError("please enter category")
            console.log("mbvdmsmdd", "enter  category")

        }
        else {
            setCategoryDataError("")
            console.log("mbvdmsmdd", " valid category done")

        }


        // console.log("SearchCategoryData1111", values?.category_en.test(/^[A-Za-z\s_-]*$/).required("enter-category-name"))
        // console.log("SearchCategoryData1111", values)


        //  

        if (tableProperty === "add-new-table") {
            try {
                let handleCreateTablePayload = {
                    "restaurant_id": RestaurantIdLocalStorageData,
                    "category": SearchCategoryData,
                    "no_of_persons": values?.Capacity,
                    "table_number": values?.TableNo,
                    BearerToken
                }
                let responseData 

                if (!valueData.test(SearchCategoryData)) {
                    setCategoryDataError("enter valid category")  
                }
                else if(SearchCategoryData==null || SearchCategoryData==""){
                    setCategoryDataError("please enter category")  
        
                }
                else {
                    await dispatch(LoadingSpinner(true))
                    setCategoryDataError("")
                    // console.log("mbvdmsmdd", " valid category done")
                    responseData = await dispatch(PostManageOrderTableSlice(handleCreateTablePayload));

        
                }

 
                // console.log("mhjhsdsd", responseData)
                if (responseData?.payload?.status == 201) {
                    // setItemData({ category: handleCreateTablePayload?.category })
                    closePopup(false)
                    OpenActionFun(false)
                    // setOpenMenuActionToggle()
                    setTimeout(async () => {

                        await dispatch(GetManageOrderTableSlice({ RestaurantId: RestaurantIdLocalStorageData, BearerToken }))
                        await dispatch(LoadingSpinner(false))
                    }, 500)
                    // await dispatch(LoadingSpinner(false))

                }
                else {
                    await dispatch(LoadingSpinner(false))
                }


            }
            catch (error) {
                await dispatch(LoadingSpinner(false))
            }
        }
        else {

            await dispatch(LoadingSpinner(true))
            try {


                let handleEditTablePayload = {
                    "restaurant_id": RestaurantIdLocalStorageData,
                    "table_id": EditTableData?.[0]?.table_id,
                    "category":SearchCategoryData?SearchCategoryData: EditTableData?.[0]?.category,
                    "no_of_persons": values?.Capacity,
                    "table_number": values?.TableNo,
                    BearerToken
                }


                let responseData = await dispatch(UpdateManageOrderTableSlice(handleEditTablePayload));

                // console.log("mhjhsdsd", responseData)
                if (responseData?.payload?.status == 200) {
                    closePopup(false)
                    // setItemData({ category: handleEditTablePayload?.category })
                    // setOpenMenuActionToggle()
                    OpenActionFun(false)
                    setTimeout(async () => {
                        await dispatch(GetManageOrderTableSlice({ RestaurantId: RestaurantIdLocalStorageData, BearerToken }))
                        await dispatch(LoadingSpinner(false))
                    }, 500)
                    // await dispatch(LoadingSpinner(false))

                }
                else {
                    await dispatch(LoadingSpinner(false))
                }


            }
            catch (error) {
                await dispatch(LoadingSpinner(false))
            }
        }
    };


    const PopUpCategoriesToggleFun = () => {
        popUpCategoriesHookFun((o) => !o);
    };

    const CancelCategoryBtnFun = () => {
        closePopup(false)
        OpenActionFun(false)
    };

    const newfunC = (searchData) => {
        console.log("nbsbsdsdd", searchData)
        setSearchCategoryData(searchData)
        setCategoryDataError("")
        // defaultValueCategory.category_en = searchData;
        // ValidateEditCategory.category_en=yup.string().matches(/^[A-Za-z\s_-]*$/,console.log("nbsbsdsdd1") ,translaterFun("Category Name should be Alphabetic Character")).required(translaterFun("enter-category-name"))
        // console.log("defaultEditValueCategory", defaultEditValueCategory, searchData)
        // console.log("bvhgsdsdfs", ValidateEditCategory)
    }

    console.log("defaultEditValueCategory111", EditTableData?.length == "1", defaultValueCategory.category_en)
    return (
        <div>


            {openPopup && (
                <PopUpComponent

                    classNameValue={"addcategorypopup"}
                    PopUpToggleFun={PopUpCategoriesToggleFun}
                    popUpHookFun={popUpCategoriesHookFun}

                >
                    {/* children part start */}

                    <div className="popuptitle">
                        <h3>{translaterFun(tableProperty)} </h3>
                    </div>

                    <div className="popupbody">
                        <Formik
                            // enableReinitialize
                            // initialValues={defaultEditValueCategory}
                            initialValues={EditTableData?.length == "1" ? defaultEditValueCategory : defaultValueCategory}
                            validationSchema={ValidateEditCategory}
                            onSubmit={handleCreateEditTableSubmit}

                        >
                            <Form className="row">
                                <img src={category} alt="manager img" class="categoryimg" />
                                <div className="formbox mb-3" dir='ltr'>
                                    <label>{translaterFun("category")}</label>
                                    {/* <Field
                                        name="category_en"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder={translaterFun("enter-category-name")}
                                    />*/}


                                    <SelectAndSearchComponent
                                        EditTableData={EditTableData}
                                        newFun={newfunC}
                                        ManageOrderTableSelectorDataProp={ManageOrderTableSelectorDataProp}
                                    // ManageOrderTableSelectorDataProp1={ManageOrderTableSelectorDataProp1}


                                    />


                                    <p className="text-danger small mb-0">
                                        {/* <ErrorMessage name="category_en" /> */}
                                        {CategoryDataError}
                                    </p>
                                </div>
                                <div className="formbox mb-3 col-sm-6"  >
                                    <label>  {translaterFun("capacity-optional")} </label>
                                    <Field
                                        name="Capacity"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder={translaterFun("no-of-persons")}
                                    />

                                    <p className="text-danger small mb-0">
                                        <ErrorMessage name="Capacity" />
                                    </p>
                                </div>
                                <div className="formbox mb-3 col-sm-6"  >
                                    <label>{translaterFun("table-number")} </label>
                                    <Field
                                        name="TableNo"
                                        type="text"
                                        className={`form-control `}
                                        autoComplete="off"
                                        placeholder={translaterFun("table-number")}
                                    />
                                    <p className="text-danger small mb-0">
                                        <ErrorMessage name="TableNo" />
                                    </p>
                                </div>



                                <div className="col-12  submitcategorybox mt-3 text-center">
                                    <button
                                        type="button"
                                        className="btn3"
                                        onClick={(e) => CancelCategoryBtnFun(e)}
                                    >
                                        {translaterFun("cancel")}
                                    </button>
                                    <button type="submit" className="submit btn2 mx-3">
                                        {" "}
                                        {translaterFun("submit")}{" "}
                                    </button>
                                </div>
                            </Form>


                        </Formik>
                    </div>

                    {/* children part end */}
                </PopUpComponent>
            )}


        </div>
    )
}

export default CreateEditTable