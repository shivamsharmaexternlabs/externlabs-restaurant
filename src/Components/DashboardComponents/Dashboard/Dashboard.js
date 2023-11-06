import React,{useEffect, useState} from 'react'
import './dashboard.css'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar' 
import DashboardLayout from '../DashboardLayout/DashboardLayout' 

const Dashboard = () => {

 
 

    
 
  return (
    <>
      <DashboardLayout  >
        <div className='dasboardbody'>
          <DashboardSidebar   />
          <div className='contentpart dashboardpage'>
            <div className='bannerbox'>
              <h2> Good Morning</h2>
              <h3> Austine Robertson</h3>
              <div className='text-end'>
                <button type='button' className='btn me-3'>Add Manager </button>
                <button type='button' className='btn'>Add Menu </button>
              </div>
            </div>

          </div>
        </div>


      </DashboardLayout>


    </>
  )
}

export default Dashboard