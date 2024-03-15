import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import './orderHistory.css'
import OrderHistoryBox from './OrderHistoryBox';

function KotOrderHistory({ translaterFun }) {
    return (
        <DashboardLayout>
            <div className='dasboardbody'>
                <DashboardSidebar />
                <OrderHistoryBox translaterFun={translaterFun}/>
            </div>
        </DashboardLayout>
    )
}

export default KotOrderHistory