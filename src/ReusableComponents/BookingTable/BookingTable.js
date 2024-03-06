import React, { useEffect, useRef, useState } from 'react'
import dot from '../../images/dot.svg'
import edit1 from "../../images/edit.svg";
import downloadimg from "../../images/download.png";
import  viewkot from "../../images/Group.png"
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
import { GetKdsSlice } from '../../Redux/slices/KdsSlice';


const BookingTable = ({ translaterFun, currentSelectedCategory }) => {


    const [openAction, setOpenAction] = useState(null)
    const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState(null)
    const [EditTableData, setEditTableData] = useState([])

    const [viewKotPopup,setViewKotPopup]= useState(false)

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
    let restaurantId = reactLocalStorage.get("RestaurantId", false);


    const TableDisableFun = async (e, item) => {

        setTableDisableValue({
            id: "id",
            Booleanvalue: e.target.checked
        })


        await dispatch(LoadingSpinner(true))



        let handleDisableTablePayload = {
            "restaurant_id": restaurantId,
            "table_id": item?.table_id,
            "is_active": !e.target.checked ? true : false,
            BearerToken
        }
        try {
            let responseData = await dispatch(UpdateManageOrderTableSlice(handleDisableTablePayload));

            if (responseData?.payload?.status == 200) {
                await dispatch(LoadingSpinner(false))
                setOpenMenuActionToggle(null);

            }
            else {
                await dispatch(LoadingSpinner(false))
            }

            setTimeout(async () => {
                await dispatch(GetManageOrderTableSlice({ "RestaurantId": restaurantId, BearerToken }))
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
    //                 let responseData = await dispatch(GetManageOrderTableSlice({ restaurantId, BearerToken  }))
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


    const ViewOrderFun = async (e, item) => {
        await dispatch(LoadingSpinner(true))
        let responseData = await dispatch(GetKdsSlice({ restaurant_id: restaurantId, token: BearerToken, tableId: item?.table_id }));
        //    console.log

        if (responseData?.payload?.status === 200) {
            await dispatch(LoadingSpinner(false))
            setViewKotPopup(true)
        }
        else{
            await dispatch(LoadingSpinner(false))
        }


    }



    return (
        <>  

            {
                currentSelectedCategory?.lengthSize?.map((item, id) => {
                    return <>
                        {<li className={`${item?.is_active === true ? "" : "overlayout"} 
                         ${item?.status == "Available" ? "tablecolorGray" : "tablecolorGreen" }
                         ${item?.status == "Running" ? "tablecolorYellow" : "tablecolorGreen" }
                        
                        tablsCss`}
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

                                    { item?.status !== "Reserved" && item?.status !== "Running" &&<button type='button' className='switchbtn mt-1' ref={dotDisableRef}>
                                        <label className="switch">
                                            <input type="checkbox"

                                                checked={TableDisableValue?.Booleanvalue}

                                                onChange={(e) => TableDisableFun(e, item)} />
                                            <span className="slider round"></span>
                                        </label>
                                        <span> {translaterFun("disabled")} </span>
                                    </button>}

                                    <button className=" mt-1 "
                                        ref={dotDownloadQRRef}
                                        onClick={(e) => DownloadQrFun(e, item)}
                                    >
                                        <img src={downloadimg} alt="delete icon " />    <span className='downloadQrclass'>  {translaterFun("download-QR")} </span>
                                    </button>

                                    {item?.is_active == true && item?.status == "Running" &&<button className=" mt-1 "
                                        ref={dotDownloadQRRef}
                                        onClick={(e) => ViewOrderFun(e, item)}
                                    >
                                        <img src={viewkot} alt="delete icon " />    <span className='downloadQrclass'>  {translaterFun("view-order")} </span>
                                    </button>}

                                </div>}


                            </div>
                        </li>}

                    </>
                })}


            {openAction && <CreateEditTable BookingTable
                translaterFun={translaterFun}
                openPopup={popUpcategoriesHook}
                closePopup={popUpCategoriesHookFun}
                tableProperty={"edit-table"}
                EditTableData={[EditTableData]}
                OpenActionFun={setOpenAction}
                ManageOrderTableSelectorDataProp={ManageOrderTableSelectorData?.GetManageOrderTableData?.data}
            />}

            <LoadingSpinner loadspiner={LoadSpiner} />

            <ViewKot 
            translaterFun={translaterFun}
             ViewKotPopupState={setViewKotPopup}
             viewKotPopupStateValue={viewKotPopup}
            />
        </>
    )
}

export default BookingTable
