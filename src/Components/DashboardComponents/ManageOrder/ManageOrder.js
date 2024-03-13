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
import { GetQrCodeSlice } from '../../../Redux/slices/qrCodeSlice.js';
import { useDispatch } from 'react-redux';
import useDownloadQr from '../../../CustomHooks/useDownloadQr.js';
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetManageOrderTableSlice, GetSampleTableDownloadSlice, PostBulkTableUploadSlice } from '../../../Redux/slices/manageOrderTableSlice.js';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle.js';
import ViewKot from './ViewKot.js';
import { useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";


// Functional component for the ManageOrder page
const ManageOrder = ({ translaterFun }) => {

    const [selected, setSelected] = useState([]);
    const [Options, setOptions] = useState([]);
    const [AllTableData, setAllTableData] = useState([]);


    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const [ItemData, setItemData] = useState([])
    const [SelectToggleValue, setSelectToggleSelectTogglealue] = useState(false)
    const [DownloadQrHook, DownloadQrSetFun] = useDownloadQr("");
    const inputRefBulkTableUpload = useRef(null);
    const [openAction, setOpenAction] = useState(true)
    const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState()
    const dotButtonRef = useRef(null);


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
            let responseTableData = await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }));
            if (responseTableData?.payload?.status === 200) {
                setAllTableData(responseTableData?.payload?.data);
                let options = [];
                let SelectedData = [];
                responseTableData?.payload?.data?.forEach((singleCategory) => {
                    SelectedData.push({ label: singleCategory?.key, value: singleCategory?.key, lengthSize: singleCategory?.value });
                    options.push({ label: singleCategory?.key, value: singleCategory?.key, lengthSize: singleCategory?.value });
                });
                setOptions(options);
                // // By default all category is selected...
                setSelected(SelectedData);
            }

        })()
    }, [])

    useEffect(() => {
        let interval
        (async () => {
            interval = setInterval(() => {
                dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }));

            }, 10000);
        })()

        return () => {
            clearInterval(interval)
        };

    }, [])




    useEffect(() => {

        (async () => {

            let options = [];
            ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.forEach((singleCategory) => {
                options.push({ label: singleCategory?.key, value: singleCategory?.key, lengthSize: singleCategory?.value });
            });


            let datapush = []
            ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.forEach((items) => {
                selected?.forEach((itemsSelect) => {
                    if (items?.key == itemsSelect?.label) {
                        datapush.push({ label: items?.key, value: items?.key, lengthSize: items?.value })
                    }


                })

            })

            setOptions(options);

            setSelected(datapush)



        })()

    }, [ManageOrderTableSelectorData?.GetManageOrderTableData?.data])




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
                setTimeout(async () => {
                    window.location.reload()
                }, 2000)
                // setTimeout(async () => {
                //     // await dispatch(LoadingSpinner(true))
                //     await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }))
                //     // await dispatch(GetCategoryTableSlice({ BearerToken: BearerToken, RestaurantId: RestaurantId }))

                // }, 2000)
            }
            // else{

            // }

            await dispatch(LoadingSpinner(false))
        } catch (error) {
            await dispatch(LoadingSpinner(false))
        }
    }

    const MultiSelectFun = (e) => {
        setSelected(e)
    }



    useEffect(() => {

        const handleOutsideClick = (e) => { 
            console.log("dmvsdsds",e.target)
            // if (dotButtonRef.current.contains(e.target)) { 
            //     setOpenMenuActionToggle(null)
            // } 

            if(e.target.id !== "stopeToggle"){
                setOpenMenuActionToggle(null) 
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };

    },[]);



    return (
        <>
            <Helmet>
                <title>Manage Order | Harbor Bites</title>
                <meta name="description" content="Effortlessly manage your order in one place. " />
            </Helmet>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className="contentpart manageorderpage" ref={dotButtonRef} >
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
                                    <MultiSelect
                                        options={Options}
                                        value={selected}
                                        onChange={MultiSelectFun}
                                        // closeOnChangedValue={true}
                                        labelledBy="Select"
                                        // hasSelectAll={false}
                                        // isLoading={!selected?.length}
                                        shouldToggleOnHover={true}
                                        className='deedee'
                                        overrideStrings={
                                            {
                                                selectSomeItems: translaterFun("select-some-items"),
                                                allItemsAreSelected: translaterFun("all-items-are-selected"),
                                                selectAll: translaterFun("select-all"),
                                                search: translaterFun("search"),
                                            }
                                        }
                                        valueRenderer={
                                            (selected, _options) => {
                                                return selected?.length > 0 ? selected?.length > 4 ? selected?.slice(0, 4)?.map(({ label }) => label + " , ") : selected?.map(({ label }) => label + " , ") : `${translaterFun("select-some-items")}`;
                                            }
                                        }
                                    />
                                </div>

                            </div>}

                            <div className='rightpart'>
                                <TableStatus
                                    translaterFun={translaterFun}
                                />
                            </div>


                        </div>

                        <div>
                            {selected?.map((item, id) => {
                                return <div key={id} className='actable'>

                                    <h2>{item?.value}</h2>

                                    <ul className='actablelist'>
                                        <BookingTable translaterFun={translaterFun}
                                            currentSelectedCategory={item}
                                            OpenMenuActionToggle={OpenMenuActionToggle}
                                            setOpenMenuActionToggle={setOpenMenuActionToggle}
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

                        ManageOrderTableSelectorDataProp={ManageOrderTableSelectorData?.GetManageOrderTableData?.data}
                    />
                }

                {/* add table end */}
            </div>
            <ViewKot />

            <LodingSpiner />
        </>
    )
}

// Exporting the ManageOrder component
export default ManageOrder;
