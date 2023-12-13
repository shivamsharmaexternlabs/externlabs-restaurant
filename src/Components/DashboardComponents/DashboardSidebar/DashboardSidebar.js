import React, { useEffect, useState } from 'react'
import './dashboardSidebar.css'
import logo from '../../../images/logo2.svg'
import fulllogo from '../../../images/logo.svg'
import icon7 from '../../../images/icon7.svg'
import icon8 from '../../../images/icon8.svg'
import icon8h from '../../../images/icon8h.svg'
import icon9 from '../../../images/icon9.svg'
import icon10 from '../../../images/icon10.svg'
import icon11 from '../../../images/icon11.svg'

import icon13 from '../../../images/icon13.svg'
import icon14 from '../../../images/icon14.svg'
import { ToggleBar } from '../../../Redux/slices/sideBarToggle'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, NavLink, useNavigate, Route } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage'
import { useTranslation } from 'react-i18next';

const DashboardSidebar = () => {


  const {t, i18n } = useTranslation()

  let UserTypeData = reactLocalStorage.get("Type", false);

  let  RestaurantId= reactLocalStorage.get("RestaurantId",false);
 


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


  useEffect(()=>{
    i18n.changeLanguage(ManagerApiSelectorData?.languagechange)
  },[ManagerApiSelectorData?.languagechange])


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
                  to={`/${RestaurantId}/admin/dashboard`}
                  className={` ${param.pathname === ":id/admin/dashboard" ? "active" : ""
                    } `}
                >
                  <img src={icon7} alt='img' /> <span className='text'>{t("dashboard")}</span>
               
                </NavLink>
              </li>
              <li>
                <NavLink to={`/${RestaurantId}/admin/manager`}
                  className={` ${param.pathname === ":id/admin/manager" ? "active" : ""
                    } `}
                >   
                
                <div className='normalicon'>
                <img src={icon8} alt='img' /> <span className='text'>{t("managers")}</span>
                </div>

                <div className='activeicon'>
                  <img src={icon8h} alt='icon8h img' /> <span className='text'>{t("managers")}</span>
                </div>




                </NavLink>
              </li>
              <li>
                <NavLink to={`/${RestaurantId}/admin/categories`} className={` ${param.pathname === ":id/admin/categories" ? "active" : ""
                  } `}> <img src={icon10} alt='img' /> <span className='text'>{t("menu-categories")}</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}/admin/allmedia`} className={` ${param.pathname === ":id/admin/allmedia" ? "active" : ""
                  } `}> <img src={icon13} alt='img' /> <span className='text'> {t("media-files")} </span>
                </NavLink>
              </li>

              <li>
                <NavLink to={`/${RestaurantId}/admin/paymenthistory`} className={` ${param.pathname === ":id/admin/paymenthistory" ? "active" : ""
                  } `}> <img src={icon14} alt='img' /> <span className='text'>{t("payment-history")}</span>
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
              to={`/admin/leads`}
              className={` ${param.pathname === "/admin/leads" || param?.state?.currentData?.lead_id  ? "active" : ""
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
                to=  {`/admin/menucategories`}  
                className={` ${param.pathname === "/admin/menucategories" || param?.state?.currentData?.restaurant_id ? "active" : ""
                  } `}

            ><img src={icon10} alt='img' /> <span className='text'>{t("menu-categories")}</span>
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