import React,{useState} from 'react'
import './dashboard.css'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import DashboardLayout from '../DashboardLayout/DashboardLayout'

const Dashboard = () => {
  // const [isFullScreen,setIsFullScreen]=useState(true)
  // const updateClassState=(value)=>{
  //   setIsFullScreen(value)
  // }
  const [isFullScreen,setIsFullScreen]=useState(false)
  const handleImageClick=()=>{
    console.log("gfsdgh",isFullScreen)
    setIsFullScreen(isFullScreen)
    // updateClassState(!isFullScreen)
  }
  return (
    <>
      <DashboardLayout isFullScreen={isFullScreen}>
        <div className='dasboardbody'>
          <DashboardSidebar updateClassState={handleImageClick} />
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