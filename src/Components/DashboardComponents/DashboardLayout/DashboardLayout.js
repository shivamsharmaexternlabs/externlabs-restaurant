import React from 'react'
import './dashboardLayout.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader'  


const DashboardLayout = ({children,isFullScreen}) => {
  return (
    <div className={`dasboardpageouter ${isFullScreen?'fullsidebar':""}`}>
        <DashboardHeader/>
        {children}
    </div>
  )
}

export default DashboardLayout