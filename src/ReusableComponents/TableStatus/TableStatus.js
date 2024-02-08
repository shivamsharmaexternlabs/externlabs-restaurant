import React from 'react'
import {TableStatusData} from '../../Components/DashboardComponents/ManageOrder/TableStatusColor';

const TableStatus = ({ translaterFun }) => {
    return (
        <>
            {TableStatusData?.map((item, id) => {
                return <> 
                    <span style={{ background: item?.colorCode }}  className={`${item?.name =="disabled-table"?"colorDefine":""} me-1`}>

                    </span>
                    <div>  { translaterFun( item?.name)}
                    </div>
                </>
            })}

        </>


    )
}

export default TableStatus;
