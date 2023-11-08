import React from 'react'
import './restaurantdetail.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'

const RestaurantDetail = () => {
  return (
    <>

      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart restaurantdetailpage">
            
          </div>
        </div>
      </DashboardLayout>

    </>
  )
}

export default RestaurantDetail
