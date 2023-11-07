import React, { useEffect, useState } from 'react'
import './dashboardSidebar.css'
import logo from '../../../images/logo2.svg'
import fulllogo from '../../../images/fulllogo.svg'
import icon7 from '../../../images/icon7.svg'
import icon8 from '../../../images/icon8.svg'
import icon9 from '../../../images/icon9.svg'
import icon10 from '../../../images/icon10.svg'
import icon11 from '../../../images/icon11.svg'
import { ToggleBar } from '../../../Redux/slices/sideBarToggle'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, NavLink, useNavigate, Route } from "react-router-dom";

const DashboardSidebar = () => {




  const [ToggleHeader, setToggleHeader] = useState()

  const dispatch = useDispatch();
  let param = useLocation();


  const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.toggle);

  console.log("sfgdfgdf", ToggleBarSelectorData)

  const PopUpToggleFun = () => {
    setToggleHeader(o => !o)
  }

  useEffect(() => {
    dispatch(ToggleBar(ToggleHeader))
  }, [ToggleHeader])

  return (
    <>
      <div className='sidebar'>
        <figure className='logo' onClick={(e) => PopUpToggleFun(e, o => !o)}>
          <img src={logo} alt='logoimg' className='smalllogo' />
          <img src={fulllogo} alt='logoimg' className='fulllogo' />
        </figure>
        <ul className='navmenu'>
          <li className="">
            <NavLink
              to="/admin/dashboard"
              className={` ${param.pathname === "/admin/dashboard" ? "active" : ""
                } `}
            >

              <img src={icon7} alt='img' /> <span className='text'>Dashboard</span>

            </NavLink>
          </li>
          <li> 
            <NavLink to="/manager"
              className={` ${param.pathname === "/manager" ? "active" : ""
                } `}
            >   <img src={icon8} alt='img' /> <span className='text'>Managers</span>
            </NavLink>
          </li>



          <li>  <NavLink
          to="/admin/categories"
          className={` ${param.pathname === "/admin/categories" ? "active" : ""
            } `} >
              
              <img src={icon9} alt='img' /> <span className='text'>Menu Categories</span> </NavLink> </li>
          <li>  <NavLink
          to="#/admin/qrcodes"
          className={` ${param.pathname === "/admin/qrcodes" ? "active" : ""
            } `}
          
          ><img src={icon10} alt='img' /> <span className='text'>QR Codes</span> </NavLink> </li>
          <li>  <NavLink
          to="#/admin/categories"
          className={` ${param.pathname === "/admin/categories" ? "active" : ""
            } `}
          
          ><img src={icon11} alt='img' /> <span className='text'>Dashboard</span> </NavLink> </li>
        </ul>
      </div>

      {/* <div className='contentpart managerpage'>
      <div className='managertitle'>
        <h2>Managers</h2>
        <button className='managerbtn' type='button'> <img src={plus} alt='img' /> Add Manager </button>
      </div>
    </div> */}



    </>
  )
}

export default DashboardSidebar