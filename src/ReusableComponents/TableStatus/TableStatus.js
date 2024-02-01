import React from 'react'

const TableStatus = ({ statusName, colorCode }) => {
    return (
        <>

             <span style={ { background: colorCode}} ></span> {statusName}
        </>

        
    )
}

export default TableStatus;
