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

const CreateEditTable = ({ translaterFun, openPopup, closePopup, tableProperty, EditTableData, OpenActionFun, setItemData, ManageOrderTableSelectorDataProp
}) => {

    const [searchCategoryData, setSearchCategoryData] = useState("")
    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const dispatch = useDispatch();


    let BearerToken = reactLocalStorage.get("Token", false);
    let languageSet = reactLocalStorage.get("languageSet", false);
    const RestaurantIdLocalStorageData = reactLocalStorage.get("RestaurantId", false);


    const defaultEditValueCategory = {
        category_en: EditTableData?.category,
        Capacity: EditTableData?.no_of_persons,
        TableNo: EditTableData?.table_number
    };

    const ValidateEditCategory = yup.object({
        category_en: yup.string().required(translaterFun("enter-category-name")),
        // Capacity: yup.string().required(translaterFun("enter-capacity")),
        TableNo: yup.string().matches(/^[\w- ]+$/, translaterFun("table-number-should-be-alphanumeric-or-with-hyphen")).required(translaterFun("enter-table-no")),
    });

    const handleCreateEditTableSubmit = async (values) => {
        await dispatch(LoadingSpinner(true))

        if (tableProperty === "add-new-table") {
            try {
                let handleCreateTablePayload = {
                    "restaurant_id": RestaurantIdLocalStorageData,
                    "category": values?.category_en,
                    "no_of_persons": values?.Capacity,
                    "table_number": values?.TableNo,
                    BearerToken
                }

                let responseData = await dispatch(PostManageOrderTableSlice(handleCreateTablePayload));

                console.log("mhjhsdsd", responseData)
                if (responseData?.payload?.status == 201) {
                    setItemData({ category: handleCreateTablePayload?.category })
                    closePopup(false)
                    // setOpenMenuActionToggle()
                    await dispatch(LoadingSpinner(false))

                }
                else {
                    await dispatch(LoadingSpinner(false))
                }

                setTimeout(async () => {
                    await dispatch(GetManageOrderTableSlice({ RestaurantId: RestaurantIdLocalStorageData, BearerToken, category: handleCreateTablePayload?.category }))
                }, 500)
            }
            catch (error) {
                await dispatch(LoadingSpinner(false))
            }
        }
        else {
            try {

                let handleEditTablePayload = {
                    "restaurant_id": RestaurantIdLocalStorageData,
                    "table_id": EditTableData?.table_id,
                    "category": values?.category_en,
                    "no_of_persons": values?.Capacity,
                    "table_number": values?.TableNo,
                    BearerToken
                }


                let responseData = await dispatch(UpdateManageOrderTableSlice(handleEditTablePayload));

                console.log("mhjhsdsd", responseData)
                if (responseData?.payload?.status == 200) {
                    closePopup(false)
                    setItemData({ category: handleEditTablePayload?.category })
                    // setOpenMenuActionToggle()
                    await dispatch(LoadingSpinner(false))

                }
                else {
                    await dispatch(LoadingSpinner(false))
                }

                setTimeout(async () => {
                    await dispatch(GetManageOrderTableSlice({ RestaurantId: RestaurantIdLocalStorageData, BearerToken, category: handleEditTablePayload?.category }))
                }, 500)
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
        // setSearchCategoryData(searchData) 
        defaultEditValueCategory.category_en = searchData

    }


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
                            initialValues={defaultEditValueCategory}
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
                                        <ErrorMessage name="category_en" />
                                    </p>
                                </div>
                                <div className="formbox mb-3 col-sm-6"  >
                                    <label>  {translaterFun("capacity")} </label>
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