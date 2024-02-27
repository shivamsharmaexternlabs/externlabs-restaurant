// Importing necessary dependencies and assets
import React, { useEffect, useRef, useState } from 'react';
import "./ManageOrder.css"
import "./ManageOrder.js"
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner';
import { Helmet } from "react-helmet";
import TableStatus from '../../../ReusableComponents/TableStatus/TableStatus.js';
import BookingTable from '../../../ReusableComponents/BookingTable/BookingTable.js';
import { TableStatusData, TableTypeData } from "./TableStatusColor.js";
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook.js';
import CreateEditTable from './CreateEditTable.js';
import arrow from '../../../images/arrowy.svg'
import { GetQrCodeSlice } from '../../../Redux/slices/qrCodeSlice.js';
import { useDispatch } from 'react-redux';
import useDownloadQr from '../../../CustomHooks/useDownloadQr.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetCategoryTableSlice, GetManageOrderTableSlice, GetSampleTableDownloadSlice, PostBulkTableUploadSlice } from '../../../Redux/slices/manageOrderTableSlice.js';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle.js';
import ViewKot from './ViewKot.js';
import { useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";


// Functional component for the ManageOrder page
const ManageOrder = ({ translaterFun }) => {

    const [selected, setSelected] = useState([]);
    const [Options, setOptions] = useState([]);
    const [AllTableData, setAllTableData] = useState([]);

    console.log("selected", selected)

    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const [ItemData, setItemData] = useState([])
    const [SelectToggleValue, setSelectToggleSelectTogglealue] = useState(false)
    const [DownloadQrHook, DownloadQrSetFun] = useDownloadQr("");
    const inputRefBulkTableUpload = useRef(null);
    const [openAction, setOpenAction] = useState(true)


    // Hooks for managing state and navigation
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // Retrieving data from local storage
    // let BearerToken = reactLocalStorage.get("Token", false)
    // const RestaurantId = reactLocalStorage.get("RestaurantId", false);

    // Selecting data from Redux store
    const ManageOrderTableSelectorData = useSelector((state) => state?.ManageOrderTableApiData);

    // JSX structure for the ManageOrder component

    let BearerToken = reactLocalStorage.get("Token", false);
    let RestaurantId = reactLocalStorage.get("RestaurantId", false);


    const AddTableFun = () => {
        setOpenAction(true);
        popUpCategoriesHookFun(true);
    }

    const TableTypeFun = (e, item) => {
        setItemData(item)
        setSelectToggleSelectTogglealue(o => !o)
    }
    const openSelectToggleFun = () => {
        setSelectToggleSelectTogglealue(o => !o)
    }

    useEffect(() => {

        (async () => {
            // setItemData(responseData?.payload?.data?.[0])
            let responseData = await dispatch(GetCategoryTableSlice({
                BearerToken: BearerToken,
                RestaurantId: RestaurantId
            }))

            if (responseData?.payload?.status == 200) {

                setItemData(responseData?.payload?.data?.[0])

                let options = [];
                responseData?.payload?.data?.map((singleCategory) => {
                    options.push({ label: singleCategory?.category, value: singleCategory?.category });
                });

                setOptions(options);

                // By default all category is selected...
                setSelected(options);
            }


            let responseTableData = await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }));
            
            console.log("responseTableData", responseTableData)

            if(responseTableData?.payload?.status === 200){
                setAllTableData(responseTableData?.payload?.data);
            }

            
        })()

    }, [openAction])


    const BulkDownload = async () => {
        let responseData = await dispatch(GetQrCodeSlice({
            restaurant_id: RestaurantId,
            table_id: "",
            type: "all",
            BearerToken
        }))

        if (responseData?.payload.status == 200) {

            // await dispatch(LoadingSpinner(false))
            var blob = new Blob([responseData?.payload?.data], { type: "application/zip" });
            var objectUrl = URL.createObjectURL(blob);
            window.open(objectUrl);
        }
    }




    const SampleTableDownload = async (e) => {
        try {

            let responseData = await dispatch(GetSampleTableDownloadSlice());
            if (responseData?.payload?.status === 200) {
                DownloadQrSetFun([{ "qrcode": responseData?.payload?.data }], "bulk_table_sample_file")
            }

            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }

    }

    const resetFileInput = () => {
        inputRefBulkTableUpload.current.value = null;
    }


    const UploadMenuFile = async (e) => {
        await dispatch(LoadingSpinner(true))

        const formData = new FormData();

        formData.append("file", e?.target?.files?.[0]);
        formData.append("restaurant_id", RestaurantId);

        const UploadPayload = {
            formData,
            BearerToken
        }

        try {
            // let response = await dispatch(UploadMenuSlice(UploadPayload));
            let response = await dispatch(PostBulkTableUploadSlice(UploadPayload));


            resetFileInput();

            if (response?.payload?.status === 200) {
                await dispatch(LoadingSpinner(true))
                window.location.reload()
                // setTimeout(async () => {
                //     // await dispatch(LoadingSpinner(true))
                //     await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }))
                //     await dispatch(GetCategoryTableSlice({ BearerToken: BearerToken, RestaurantId: RestaurantId }))

                // }, 2000)
            }

            await dispatch(LoadingSpinner(false))
        } catch (error) {
            await dispatch(LoadingSpinner(false))
        }
    }





    return (
        <>
            <Helmet>
                <title>Manage Order | Harbor Bites</title>
                <meta name="description" content="Effortlessly manage your order in one place. " />
                {/* <link rel="icon" type="image/x-icon" href="./"/> */}
            </Helmet>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className="contentpart manageorderpage" >
                        <div  >
                            <div className='btngroup mb-3'  >
                                {/* <button type='button' className='btn2'> Bulk Upload  </button> */}
                                <div className="uploadbtn-wrapper btn2">
                                    <button type="button" onClick={(e) => SampleTableDownload(e)}>
                                        {translaterFun("sample-download")}
                                    </button>
                                </div>

                                <div className="uploadbtn-wrapper btn2">
                                    <button type="button" className=''>
                                        {translaterFun("bulk-upload")}
                                    </button>

                                    <input type="file" accept=".xlxs, .xlsx, .xls, .pdf"
                                        ref={inputRefBulkTableUpload}
                                        onChange={(e) => UploadMenuFile(e)}
                                    />
                                </div>


                                <div className="uploadbtn-wrapper btn2">
                                    <button type="button" onClick={(e) => BulkDownload(e)}>
                                        {translaterFun("download-all-qr")}
                                    </button>
                                </div>

                                <button type='button' className='btn2' onClick={(e) => AddTableFun(e)}>
                                    <svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                                    </svg>
                                    {translaterFun("add-table")}
                                </button>

                            </div>
                        </div>
                        <div className='infotable'>

                            {<div className={`${ManageOrderTableSelectorData?.GetCategoryTableData?.data?.length === 0 ? "invisible" : ""} leftpart multiselectDropdown`}>
                                <div className=' '>
                                    {/* <h1>Select Fruits</h1> */}
                                    {/* <pre>{JSON.stringify(selected)}</pre> */}
                                    <MultiSelect
                                        options={Options}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                        // hasSelectAll={false}
                                        // isLoading={!selected?.length}
                                        shouldToggleOnHover={true}
                                        overrideStrings={
                                            {
                                                selectSomeItems: translaterFun("select-some-items"),
                                                allItemsAreSelected: translaterFun("all-items-are-selected"),
                                                selectAll: translaterFun("select-all"),
                                                search: translaterFun("search"),
                                            }
                                        }
                                    />
                                </div>
                                {/* <button type='button' onClick={(e) => openSelectToggleFun()}> {ItemData?.category} <img src={arrow} alt='img' /> </button> */}
                                {/* {SelectToggleValue && <ul>
                                    <li className="activeselect"
                                        onClick={(e) => TableTypeFun(e, {category : "All"})}
                                    >

                                        {translaterFun("all")}
                                    </li>
                                    {ManageOrderTableSelectorData?.GetCategoryTableData?.data?.map((item, id) => {
                                        return <li className={` ${item?.category === ItemData?.category ? "activeselect" : ""}`} onClick={(e) => TableTypeFun(e, item)}>
                                            {item?.category}
                                        </li>
                                    })}

                                </ul>} */}
                            </div>}
                            
                            <div className='rightpart'>
                                <TableStatus
                                    translaterFun={translaterFun}
                                />
                            </div>


                        </div>

                        <div>

                            {selected?.map((item, id) => {
                                {/* console.log("jhsfgfhdsd under selected", item) */ }

                                return <div key={id} className='actable'>
                                    <h2>{item?.value}</h2>
                                    <ul className='actablelist'>
                                        <BookingTable translaterFun={translaterFun}
                                            ItemData={ItemData}
                                            setItemData={setItemData}
                                            currentSelectedCategory={item}
                                            allTableData={AllTableData}
                                            setAllTableData={setAllTableData}
                                        />


                                    </ul>
                                </div>
                            })}


                        </div>
                    </div>
                </div>

            </DashboardLayout >

            <div>
                {/* add table start*/}
                {openAction &&
                    <CreateEditTable
                        translaterFun={translaterFun}
                        openPopup={popUpcategoriesHook}
                        closePopup={popUpCategoriesHookFun}
                        tableProperty={"add-new-table"}
                        OpenActionFun={setOpenAction}
                        setItemData={setItemData}
                        ManageOrderTableSelectorDataProp={ManageOrderTableSelectorData?.GetCategoryTableData?.data}
                    />
                }

                {/* add table end */}
            </div>
            {/* <ViewKot /> */}

            <LodingSpiner />
        </>
    )
}

// Exporting the ManageOrder component
export default ManageOrder;
