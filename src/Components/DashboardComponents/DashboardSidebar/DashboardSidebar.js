import React, { useEffect, useState } from 'react'
import './dashboardSidebar.css'
import logo from '../../../images/logo2.svg'
import fulllogo from '../../../images/logo.svg'
import icon7 from '../../../images/icon7.svg'
import icon7h from '../../../images/icon7h.svg'
import icon8 from '../../../images/icon8.svg'
import icon8h from '../../../images/icon8h.svg'
import icon9 from '../../../images/icon9.svg'
import icon10 from '../../../images/icon10.svg'
import icon10h from '../../../images/icon10h.svg'
import icon11 from '../../../images/icon11.svg'
import icon13 from '../../../images/icon13.svg'
import icon13h from '../../../images/icon13h.svg'
import icon14 from '../../../images/icon14.svg'
import icon14h from '../../../images/icon14h.svg'
import icon15 from '../../../images/icon15.svg'
import managerorder  from "../../../images/managerorder.png"
import managerOrderDArk  from "../../../images/managerOrderDArk.png"

import { ToggleBar } from '../../../Redux/slices/sideBarToggle'  
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, NavLink, useNavigate, Route } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage'
import { useTranslation } from 'react-i18next';
import useLogoutHook from '../../../CustomHooks/LogoutHook/useLogoutHook'
import {  routes } from "../../../Utils/constants";

const DashboardSidebar = () => {

  const {  DASHBOARD, CATEGORIES, MANAGE_ORDER, MANAGER,  PAYMENT_HISTORY, LEADS, RESTAURANT ,ADMIN} = routes
  const { t, i18n } = useTranslation()

  let UserTypeData = reactLocalStorage.get("Type", false);

  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  const[logoutHookFun]=useLogoutHook('')
  const navigate = useNavigate()
  const [ToggleHeader, setToggleHeader] = useState()

  const dispatch = useDispatch();
  let param = useLocation();


  const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.toggle);
  const ManagerApiSelectorData = useSelector((state) => state.ToggleBarData);


  const PopUpToggleFun = () => {
    setToggleHeader(o => !o)
  }

  useEffect(() => {
    dispatch(ToggleBar(ToggleHeader))
  }, [ToggleHeader])


  useEffect(() => {
    i18n.changeLanguage(ManagerApiSelectorData?.languagechange)
  }, [ManagerApiSelectorData?.languagechange])

  const handleLogout = () => {   
    logoutHookFun()
  }


  return (
    <>
      <div className='sidebar'>
        <figure className='logo' onClick={(e) => PopUpToggleFun(e, o => !o)}>
          <img src={logo} alt='logoimg' className='smalllogo' />
          <img src={fulllogo} alt='logoimg' className='fulllogo' />
        </figure>
        <ul className='navmenu'>
          {UserTypeData !== "sales"
            &&
            <>

              <li className="">
                <NavLink
                  to={`/${RestaurantId}${DASHBOARD}`}
                  className={` ${param.pathname === `:id${DASHBOARD}` ? "active" : ""
                    } `} >
                  <div className='normalicon'>
                    <img src={icon7} alt='img' /> <span className='text'>{t("dashboard")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={icon7h} alt='icon8h img' /> <span className='text'>{t("dashboard")}</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}${MANAGER}`}
                  className={` ${param.pathname === `:id${MANAGER}` ? "active" : ""
                    } `}
                >
                  <div className='normalicon'>
                    <img src={icon8} alt='img' /> <span className='text'>{t("staff-members")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={icon8h} alt='icon8h img' /> <span className='text'>{t("staff-members")}</span>
                  </div>

                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}${CATEGORIES}`} className={` ${param.pathname === `:id${CATEGORIES}` ? "active" : ""
                  } `}>
                  <div className='normalicon'>
                    <img src={icon10} alt='img' /> <span className='text'>{t("menu-categories")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={icon10h} alt='icon8h img' /> <span className='text'>{t("menu-categories")}</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}/${ADMIN}`} className={` ${param.pathname === `:id/${ADMIN}` ? "active" : ""
                  } `}>

                  <div className='normalicon'>
                    <img src={icon13} alt='img' /> <span className='text'>{t("media-files")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={icon13h} alt='icon8h img' /> <span className='text'>{t("media-files")}</span>
                  </div>

                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}${PAYMENT_HISTORY}`} className={` ${param.pathname === `:id${PAYMENT_HISTORY}` ? "active" : ""
                  } `}>

                  <div className='normalicon'>
                    <img src={icon14} alt='img' /> <span className='text'>{t("payment-history")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={icon14h} alt='icon8h img' /> <span className='text'>{t("payment-history")}</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}${MANAGE_ORDER}`} className={` ${param.pathname === `:id${MANAGE_ORDER}` ? "active" : ""
                  } `}>

                  <div className='normalicon'>
                    <img src={managerOrderDArk} alt='img' /> <span className='text'>{t("manage-orders")}</span>
                  </div>

                  <div className='activeicon'>
                    <img src={managerorder} alt='icon8h img' /> <span className='text'>{t("manage-orders")}</span>
                  </div>
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to="#/admin/categories"
                  className={` ${param.pathname === "/admin/categories" ? "active" : ""
                    } `}>
                  <img src={icon11} alt='img' /> <span className='text'>Dashboard</span>
                </NavLink>
              </li> */}

            </>

          }
          {UserTypeData === "sales" && <>  <li>
            <NavLink
              to={`${LEADS}`}
              className={` ${param.pathname === `${LEADS}` || param?.state?.currentData?.lead_id ? "active" : ""
                } `}

            >
              <div className='normalicon'>
                <img src={icon8} alt='img' /> <span className='text'>{t("leads")}</span>
              </div>

              <div className='activeicon'>
                <img src={icon8h} alt='icon8h img' /> <span className='text'>{t("leads")}</span>
              </div>

              {/* <img src={icon8} alt='img' /> <span className='text'>Leads</span> */}

            </NavLink>
          </li>
            <li>
              <NavLink
                to={`${RESTAURANT}`}
                className={` ${param.pathname === `${RESTAURANT}` || param?.state?.currentData?.restaurant_id ? "active" : ""
                  } `}

              >
                <div className='normalicon'>
                  <img src={icon10} alt='img' /> <span className='text'>{t("restaurants")}</span>
                </div>

                <div className='activeicon'>
                  <img src={icon10h} alt='icon8h img' /> <span className='text'>{t("restaurants")}</span>
                </div>

              </NavLink>
            </li>
          </>}
          {/* <li>
            <NavLink
              to="#/admin/categories"
              className={` ${param.pathname === "/admin/categories" ? "active" : ""
                } `}>
              <img src={icon11} alt='img' /> <span className='text'>Dashboard</span>
            </NavLink>
          </li> */}
        </ul>
        <button  type='button' className='logoutbtn' onClick={(e) => handleLogout(e)}> <img src={icon15} alt='logout - img' /> <span>Log Out </span> </button>
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