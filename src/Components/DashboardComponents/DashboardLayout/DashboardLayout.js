import React from 'react'
import './dashboardLayout.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader'  
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook'
import { useSelector } from 'react-redux'


const DashboardLayout = ({children,isFullScreen}) => {

  const [popUpHook, popUpHookFun] = usePopUpHook("")

  const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.toggle);


  console.log("dbvnvadnd",popUpHook)
  return (
    <div className={`dasboardpageouter ${ToggleBarSelectorData?'fullsidebar':""}`}>
        <DashboardHeader 
        popUpHookFun={popUpHookFun}
        />
        {children}
    </div>
  )
}

export default DashboardLayout