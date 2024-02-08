import React, { useState } from 'react'
import dot from '../../images/dot.svg'
import edit1 from "../../images/edit.svg";
import downloadimg from "../../images/download.png";
import {TableStatusData} from '../../Components/DashboardComponents/ManageOrder/TableStatusColor';
import usePopUpHook from '../../CustomHooks/usePopUpHook/usePopUpHook';
import CreateEditTable from '../../Components/DashboardComponents/ManageOrder/CreateEditTable';


const BookingTable = ({ translaterFun }) => {


    const [openAction, setOpenAction] = useState(null)
    const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState(null)

    const [TableDiableValue, setTableDiableValue] = useState({id:null,
        Booleanvalue:null
        })

        const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");


    const OpenActionFun = (e, id) => {
        console.log("sbdjshdjhd", id)
        // setOpenAction(id)
        if (OpenMenuActionToggle === id) {
            setOpenMenuActionToggle(null);
          } else {
            setOpenMenuActionToggle(id);
          }

    }

    const TableDiableFun =(e,id)=>{
        setTableDiableValue({id:id,
        Booleanvalue:e.target.checked
        })
        console.log("msbdsd",e.target.checked)

    }
    const PopUpEditCategoriesToggleFun =()=>{
        popUpCategoriesHookFun(true); 
    }
    
    console.log("dsfsdfsdfsdfdew",false+1)

     
    return (
        <>
            {TableStatusData?.map((item, id) => {
                return<>
                 {  <li style={{ background: item?.colorCode }} className={`${TableDiableValue?.id==id?TableDiableValue?.Booleanvalue===true?"overlayout":"":""} `}>
                    T1
                    <div className='acedittable'>
                        <button type="button" class="" onClick={(e) => OpenActionFun(e, id)}>  <img src={dot} alt='img' /> </button>

                        {id==OpenMenuActionToggle && <div className="btnbox  ">
                            <button type="button" className="editbtn"
                              onClick={(e) => PopUpEditCategoriesToggleFun(e, item)
                              }
                            >
                                <img src={edit1} alt="img" />{" "}    <span> {translaterFun("edit")} </span>
                            </button>
                            <button type='button' className='switchbtn mt-1' >
                                <label className="switch">
                                    <input type="checkbox"  onChange={(e)=>TableDiableFun(e,id)}/>
                                    <span className="slider round"></span>
                                </label>
                                <span> {translaterFun("disabled")} </span>
                            </button>
                            <button className=" mt-1 "
                            // onClick={(e) => DeleteCategoryfun(e, item)}
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

             />
        </>
    )
}

export default BookingTable
