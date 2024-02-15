import React, { useEffect, useState } from 'react'
import dot from '../../images/dot.svg'
import edit1 from "../../images/edit.svg";
import downloadimg from "../../images/download.png";
import { TableStatusData } from '../../Components/DashboardComponents/ManageOrder/TableStatusColor';
import usePopUpHook from '../../CustomHooks/usePopUpHook/usePopUpHook';
import CreateEditTable from '../../Components/DashboardComponents/ManageOrder/CreateEditTable';
import { useDispatch } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetManageOrderTableSlice } from '../../Redux/slices/manageOrderTableSlice';
import { GetQrCodeSlice } from '../../Redux/slices/qrCodeSlice';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../../Redux/slices/sideBarToggle';
import useDownloadQr from '../../CustomHooks/useDownloadQr';


const BookingTable = ({ translaterFun }) => {


    const [openAction, setOpenAction] = useState(null)
    const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState(null)
    const [EditTableData, setEditTableData] = useState([])
    const [DownloadQrHook, DownloadQrSetFun] = useDownloadQr("");

    const [TableDiableValue, setTableDiableValue] = useState({
        id: null,
        Booleanvalue: null
    })

    const ManageOrderTableSelectorData = useSelector((state) => state.ManageOrderTableApiData);
    const QrDownloadSelectorData = useSelector((state) => state.QrCodeApiData);
    console.log("ManageOrderTableSelectorData", ManageOrderTableSelectorData)

    const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
    const dispatch = useDispatch()

    let BearerToken = reactLocalStorage.get("Token", false);
    let RestaurantId = reactLocalStorage.get("RestaurantId", false);


    const OpenActionFun = (e, id) => {
        console.log("sbdjshdjhd", id)
        // setOpenAction(id)
        if (OpenMenuActionToggle === id) {
            setOpenMenuActionToggle(null);
        } else {
            setOpenMenuActionToggle(id);
        }

    }

    const TableDiableFun = (e, id) => {
        setTableDiableValue({
            id: id,
            Booleanvalue: e.target.checked
        })
        console.log("msbdsd", e.target.checked)

    }
    const PopUpEditCategoriesToggleFun = () => {
        popUpCategoriesHookFun(true);
    }

    useEffect(() => {

        if (BearerToken !== false) {
            dispatch(GetManageOrderTableSlice({ RestaurantId, BearerToken }))
        }



        // GetManageOrderTableSlice

    }, [])


    console.log("kshdhgjhsd", ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.results)


    const EditTableFun = (e, items) => {
        // setEditTableData( items)
        return items
    }

    const DownloadQrFun = async (e, item) => {
        console.log("smhdjsdd", item)
        await dispatch(LoadingSpinner(false))




        let responseData = await dispatch(GetQrCodeSlice({
            restaurant_id: item?.restaurant_id,
            table_id: item?.table_id,
            BearerToken
        }))

        console.log("mhjhsdsd", responseData?.payload?.data?.results?.[0])

        if (responseData?.payload.status == 200) {


            await dispatch(LoadingSpinner(false))

            DownloadQrSetFun(responseData?.payload?.data?.results)

        }
        else {
            await dispatch(LoadingSpinner(false))
        }
    }

    // dispatch( GetQrCodeSlice())

    return (
        <>
            {ManageOrderTableSelectorData?.GetManageOrderTableData?.data?.map((item, id) => {
                return <>
                    {<li
                        //   style={{ background: item?.colorCode }}
                        className={`${TableDiableValue?.id == id ? TableDiableValue?.Booleanvalue === true ? "overlayout" : "" : ""}  ${item?.status == "Available" ? "tablecolorGray" : "tablecolorGreen"} tablsCss`}>
                        {item?.table_number}
                        <div className='acedittable'>
                            <button type="button" class="" onClick={(e) => OpenActionFun(e, id)}>  <img src={dot} alt='img' /> </button>

                            {id == OpenMenuActionToggle && <div className="btnbox  ">
                                <button type="button" className="editbtn"
                                    onClick={(e) => PopUpEditCategoriesToggleFun(e, item)
                                    }
                                >
                                    <img src={edit1} alt="img" />{" "}    <span
                                        onClick={(e) => EditTableFun(e, item)}>
                                        {translaterFun("edit")} </span>
                                </button>
                                <button type='button' className='switchbtn mt-1' >
                                    <label className="switch">
                                        <input type="checkbox" onChange={(e) => TableDiableFun(e, id)} />
                                        <span className="slider round"></span>
                                    </label>
                                    <span> {translaterFun("disabled")} </span>
                                </button>
                                <button className=" mt-1 "
                                    onClick={(e) => DownloadQrFun(e, item)}
                                >
                                    <img src={downloadimg} alt="delete icon " />    <span className='downloadQrclass'>  {translaterFun("download-QR")} </span>
                                </button>
                            </div>}


                        </div>
                    </li>}

                </>
            })}

            <CreateEditTable BookingTable
                translaterFun={translaterFun}
                openPopup={popUpcategoriesHook}
                closePopup={popUpCategoriesHookFun}
                tableProperty={"edit-table"}
                EditTableData={EditTableData}

            />
        </>
    )
}

export default BookingTable
