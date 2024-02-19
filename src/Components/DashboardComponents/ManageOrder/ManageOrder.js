// Importing necessary dependencies and assets
import React, { useEffect, useState } from 'react';
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
import { GetManageOrderTableSlice, GetSampleTableDownloadSlice, PostBulkTableUploadSlice } from '../../../Redux/slices/manageOrderTableSlice.js';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle.js';
import ViewKot from './ViewKot.js';


// Functional component for the ManageOrder page
const ManageOrder = ({ translaterFun }) => {

    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const [ItemData, setItemData] = useState("")
    const [SelectToggleValue, setSelectToggleSelectTogglealue] = useState(false)
    const [DownloadQrHook, DownloadQrSetFun] = useDownloadQr("");

    // Hooks for managing state and navigation
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // Retrieving data from local storage
    // let BearerToken = reactLocalStorage.get("Token", false)
    // const RestaurantId = reactLocalStorage.get("RestaurantId", false);

    // Selecting data from Redux store
    // const MediaLibrarySelectorData = useSelector((state) => state?.MediaLibraryApiData);

    // JSX structure for the ManageOrder component

    let BearerToken = reactLocalStorage.get("Token", false);
    let RestaurantId = reactLocalStorage.get("RestaurantId", false);


    const AddTableFun = () => {
        popUpCategoriesHookFun(true);
    }

    const TableTypeFun = (e, item) => {
        setItemData(translaterFun(item?.name))
        setSelectToggleSelectTogglealue(o => !o)
    }
    const openSelectToggleFun = () => {
        setSelectToggleSelectTogglealue(o => !o)
    }

    useEffect(() => {
        setItemData(translaterFun(TableTypeData?.[0]?.name))
    }, [])


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
            console.log("responseData", responseData)

            dispatch(LoadingSpinner(false))
        } catch (error) {
            dispatch(LoadingSpinner(false))
        }

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


            console.log("respokjhgfhnse", response)
            // resetFileInput();

            if (response?.payload?.status === 200) {
                // await dispatch(LoadingSpinner(true))

                setTimeout(async () => {
                    await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }))
                }, 500)
            }

            await dispatch(LoadingSpinner(false))
        } catch (error) {
            await dispatch(LoadingSpinner(false))
        }
    }
// console.log("TableTypeData", TableTypeData)
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
                    <div className="contentpart manageorderpage">
                        <div className='text-end mb-3'>
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
                                    // ref={inputRef}
                                    onChange={(e) => UploadMenuFile(e)}
                                />
                            </div>


                            <div className="uploadbtn-wrapper btn2">
                                <button type="button" onClick={(e) => BulkDownload(e)}>
                                    {translaterFun("download-all-qr")}
                                </button>
                            </div>

                            <button type='button' className='btn2 me-0' onClick={(e) => AddTableFun(e)}>
                                <svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                                </svg>
                                {translaterFun("add-table")}
                            </button>

                        </div>
                        <div className='infotable'>
                            <div className='leftpart'>
                                <button type='button' onClick={(e) => openSelectToggleFun()}> {ItemData} <img src={arrow} alt='img' /> </button>
                                {SelectToggleValue && <ul>
                                    {TableTypeData.map((item, id) => {
                                        return <li className={` ${translaterFun(item?.name) === ItemData ? "activeselect" : ""}`} onClick={(e) => TableTypeFun(e, item)}> {translaterFun(item?.name)} </li>
                                    })}

                                </ul>}
                            </div>
                            <div className='rightpart'>
                                <TableStatus

                                    translaterFun={translaterFun}
                                />
                            </div>


                        </div>

                        <div>
                            <div className='actable'>
                                <h2>{ItemData}</h2>
                                <ul className='actablelist'>
                                    <BookingTable
                                        translaterFun={translaterFun}
                                    />

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </DashboardLayout>

            <div>
                {/* add table start*/}
                <CreateEditTable
                    translaterFun={translaterFun}
                    openPopup={popUpcategoriesHook}
                    closePopup={popUpCategoriesHookFun}
                    tableProperty={"add-new-table"}
                />

                {/* add table end */}
            </div>
            <ViewKot />

            <LodingSpiner />
        </>
    )
}

// Exporting the ManageOrder component
export default ManageOrder;
