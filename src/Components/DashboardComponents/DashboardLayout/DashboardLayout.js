import React from 'react'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import DashboardFooter from '../DashboardFooter/DashboardFooter'


const DashboardLayout = ({children}) => {
  return (
    <div>
        <DashboardHeader/>
        {children}
        <DashboardFooter/>
        

    </div>
  )
}

export default DashboardLayout