import React from 'react'
import dot from '../../images/dot.svg'
import edit1 from "../../images/edit.svg";
import deleteicon from "../../images/delete.svg";


const BookingTable = ({ statusName, colorCode, translaterFun }) => {
    return (
        <>
            <li style={{ background: colorCode }}>
                T1
                <div className='acedittable'>
                    <button type="button" class="">  <img src={dot} alt='img' /> </button>
                    <div className="btnbox">
                        <button type="button" className="editbtn"
                        //   onClick={(e) => PopUpEditCategoriesToggleFun(e, item)
                        //   }
                        >
                            <img src={edit1} alt="img" />{" "} {translaterFun("edit")}
                        </button>
                        <button className="deletbtn"
                        // onClick={(e) => DeleteCategoryfun(e, item)}
                        >
                            <img src={deleteicon} alt="delete icon " /> {translaterFun("delete")}
                        </button>
                    </div>
                </div>
            </li>
        </>
    )
}

export default BookingTable
