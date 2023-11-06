import React from 'react'
import './dashboardLayout.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader'  


const DashboardLayout = ({children}) => {
  return (
    <div className='dasboardpageouter fullsidebar'>
        <DashboardHeader/>
        {children}
    </div>
  )
}

export default DashboardLayout