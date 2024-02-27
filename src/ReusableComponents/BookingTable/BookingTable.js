import React, { useEffect, useRef, useState } from 'react'
import dot from '../../images/dot.svg'
import edit1 from "../../images/edit.svg";
import downloadimg from "../../images/download.png";
import { TableStatusData } from '../../Components/DashboardComponents/ManageOrder/TableStatusColor';
import usePopUpHook from '../../CustomHooks/usePopUpHook/usePopUpHook';
import CreateEditTable from '../../Components/DashboardComponents/ManageOrder/CreateEditTable';
import { useDispatch } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetManageOrderTableSlice, UpdateManageOrderTableSlice } from '../../Redux/slices/manageOrderTableSlice';
import { GetQrCodeSlice } from '../../Redux/slices/qrCodeSlice';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../../Redux/slices/sideBarToggle';
import useDownloadQr from '../../CustomHooks/useDownloadQr';
import ViewKot from '../../Components/DashboardComponents/ManageOrder/ViewKot';


const BookingTable = ({ translaterFun, allTableData, setAllTableData, currentSelectedCategory }) => {


    const [openAction, setOpenAction] = useState(null)
    const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState(null)
    const [EditTableData, setEditTableData] = useState([])

    const [LoadSpiner, setLoadSpiner] = useState(false)

    const dotButtonRef = useRef(null);
    const dotEditRef = useRef(null);
    const dotDisableRef = useRef(null);
    const dotDownloadQRRef = useRef(null);
    // const dotOrderRef = useRef(null);

    const [DownloadQrHook, DownloadQrSetFun] = useDownloadQr("");
    const [TableDisableValue, setTableDisableValue] = useState({
        id: null,
        Booleanvalue: false
    })

    const ManageOrderTableSelectorData = useSelector((state) => state.ManageOrderTableApiData);
    const QrDownloadSelectorData = useSelector((state) => state.QrCodeApiData);

    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const dispatch = useDispatch()

    let BearerToken = reactLocalStorage.get("Token", false);
    let RestaurantId = reactLocalStorage.get("RestaurantId", false);


    const TableDisableFun = async (e, item) => {

        setTableDisableValue({
            id: "id",
            Booleanvalue: e.target.checked
        })


        await dispatch(LoadingSpinner(true))

        console.log("msbdjhgfhjkhgsd", e.target.checked, item)


        let handleDisableTablePayload = {
            "restaurant_id": RestaurantId,
            "table_id": item?.table_id,
            "is_active": !e.target.checked ? true : false,
            BearerToken
        }
        try {
            let responseData = await dispatch(UpdateManageOrderTableSlice(handleDisableTablePayload));

            console.log("mhjhsdsd", responseData)
            if (responseData?.payload?.status == 200) {
                await dispatch(LoadingSpinner(false))
                setOpenMenuActionToggle(null);

            }
            else {
                await dispatch(LoadingSpinner(false))
            }

            setTimeout(async () => {
                await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }))
            }, 500)

        }
        catch (error) {
            await dispatch(LoadingSpinner(false))
        }

    }
    const PopUpEditCategoriesToggleFun = () => {
        popUpCategoriesHookFun(true);
    }

    // useEffect(() => {
    //     let selcg = async () => {
    //         if (BearerToken !== false) {
    //             dispatch(LoadingSpinner(true));
    //             try {
    //                 let responseData = await dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken  }))
    //                 console.log("1111111111111111111111")

    //                 if (responseData?.payload?.status == 200) {
    //                     await dispatch(LoadingSpinner(false))

    //                 }
    //                 else {
    //                     await dispatch(LoadingSpinner(false))
    //                 }
    //             }
    //             catch (error) {
    //                 await dispatch(LoadingSpinner(false))
    //             }
    //         }
    //     }
    //     selcg()
    //     // GetManageOrderTableSlice
    // }, [BearerToken])


    const OpenActionFun = (e, id, item) => {

        // console.log("sbdjshdjhd", OpenMenuActionToggle, item?.table_id, OpenMenuActionToggle === item?.table_id)
        // setOpenAction(id)


        if (OpenMenuActionToggle === item?.table_id) {
            setOpenMenuActionToggle(null);
        } else {
            setOpenMenuActionToggle(item?.table_id);
        }
        // setOpenMenuActionToggle(item?.table_id);

        setTableDisableValue({
            id: "id",
            Booleanvalue: item?.is_active !== true ? true : false
        })
    }

    console.log("OpenMenuActionToggle", OpenMenuActionToggle)
    useEffect(() => {

        const handleOutsideClick = (e) => {

            if (dotButtonRef.current && !dotButtonRef.current.contains(e.target) &&
                dotEditRef.current && !dotEditRef.current.contains(e.target) &&
                dotDisableRef.current && !dotDisableRef.current.contains(e.target) &&
                dotDownloadQRRef.current && !dotDownloadQRRef.current.contains(e.target)
            ) {

                setTimeout(() => {
                    setOpenMenuActionToggle(null);
                }, 200)

            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [OpenMenuActionToggle]);


    const EditTableFun = (e, items) => {
        setEditTableData(items)
        setOpenMenuActionToggle(null);
        setOpenAction(o => !o)

    }

    const DownloadQrFun = async (e, item) => {
        console.log("smhdjsdd", item)
        await dispatch(LoadingSpinner(false))

        let responseData = await dispatch(GetQrCodeSlice({
            restaurant_id: item?.restaurant_id,
            table_id: item?.table_id,
            BearerToken
        }))


        if (responseData?.payload.status == 200) {


            await dispatch(LoadingSpinner(false))
            setOpenMenuActionToggle(null);

            DownloadQrSetFun(responseData?.payload?.data?.results)

        }
        else {
            await dispatch(LoadingSpinner(false))
        }
    }

    // dispatch( GetQrCodeSlice())


    const ViewOrderFun = (e, item) => {

        // console.log("jhsfgfhdsd",ManageOrderTableSelectorData?.GetManageOrderTableData?.data)

    }
    console.log("jhsfgfhdsd all data", allTableData)
    console.log("jhsfgfhdsd currentSelectedCategory", currentSelectedCategory)
    console.log("jhsfgfhdsd aisa chahiye", ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.[0]?.value)


    return (
        <>
            {ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.map((tableAllData, id1) => {
                {/* console.log("tableAllData?.key ", tableAllData )
                console.log("currentSelectedCategory?.value", currentSelectedCategory?.value) */}
                return tableAllData?.key === currentSelectedCategory?.value &&  tableAllData?.value?.map((item, id) => {
                     

                    return <>
                        {<li className={`${item?.is_active === true ? "" : "overlayout"}  ${item?.status == "Available" ? "tablecolorGray" : "tablecolorGreen"} tablsCss`}
                        >
                            {item?.table_number}
                            <div className='acedittable'>
                                <button type="button" class="" ref={dotButtonRef} onClick={(e) => OpenActionFun(e, id, item)}>  <img src={dot} alt='img' /> </button>

                                {item?.table_id == OpenMenuActionToggle && <div className="btnbox">
                                    <button type="button" className="editbtn" ref={dotEditRef}
                                        onClick={(e) => PopUpEditCategoriesToggleFun(e, item)}
                                    >
                                        <img src={edit1} alt="img" />{" "}
                                        <span onClick={(e) => EditTableFun(e, item)}>
                                            {translaterFun("edit")}
                                        </span>
                                    </button>
                                    <button type='button' className='switchbtn mt-1' ref={dotDisableRef}>
                                        <label className="switch">
                                            <input type="checkbox"

                                                checked={TableDisableValue?.Booleanvalue}

                                                onChange={(e) => TableDisableFun(e, item)} />
                                            <span className="slider round"></span>
                                        </label>
                                        <span> {translaterFun("disabled")} </span>
                                    </button>
                                    <button className=" mt-1 "
                                        ref={dotDownloadQRRef}
                                        onClick={(e) => DownloadQrFun(e, item)}
                                    >
                                        <img src={downloadimg} alt="delete icon " />    <span className='downloadQrclass'>  {translaterFun("download-QR")} </span>
                                    </button>
                                    <button className=" mt-1 "
                                        ref={dotDownloadQRRef}
                                        onClick={(e) => ViewOrderFun(e, item)}
                                    >
                                        <img src={downloadimg} alt="delete icon " />    <span className='downloadQrclass'>  {translaterFun("view-order")} </span>
                                    </button>
                                </div>}


                            </div>
                        </li>}

                    </>
                })
            })}

            {openAction && <CreateEditTable BookingTable
                translaterFun={translaterFun}
                openPopup={popUpcategoriesHook}
                closePopup={popUpCategoriesHookFun}
                tableProperty={"edit-table"}
                EditTableData={EditTableData}
                OpenActionFun={setOpenAction}
                ManageOrderTableSelectorDataProp={ManageOrderTableSelectorData?.GetCategoryTableData?.data}
            />}

            <LoadingSpinner loadspiner={LoadSpiner} />

            <ViewKot />
        </>
    )
}

export default BookingTable
