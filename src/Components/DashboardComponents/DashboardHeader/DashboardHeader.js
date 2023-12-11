import React from 'react'
import { useNavigate } from "react-router-dom"
import './dashboardHeader.css'
import user from '../../../images/user.png'
import notify from '../../../images/icon6.svg'
import logout from '../../../images/logout.svg'
import { reactLocalStorage } from "reactjs-localstorage";
import { LanguageChange, ToggleNewLeads } from '../../../Redux/slices/sideBarToggle'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { useTranslation } from "react-i18next"

const DashboardHeader = ({ popUpHookFun }) => {

  const [LogOutToggle, setLogOutToggle] = useState(false)
  const [languagesToggle, setlanguagesToggle] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let BearerToken = reactLocalStorage.get("Token", false);

  let UserTypeData = reactLocalStorage.get("Type", false);

  let UserNameData = reactLocalStorage.get("FirstName", false);

  const handleLogout = () => {
    // reactLocalStorage.remove("token")
    navigate("/")
    reactLocalStorage.clear()
    window.location.reload()
  }



  const PopUpToggleFun = () => {
    // popUpHookFun((o) => !o);
    dispatch(ToggleNewLeads(true))

  };

  const LogoutFun = () => {

    setLogOutToggle(o => !o)

  }
  const LanguageFun =  (value) => {
    // i18n.changeLanguage(value)  
   
    dispatch(LanguageChange(value))
  }



  return (
    <>
      <header>
        {/* <div className='leftpart'>  <form> <input type='search' placeholder='Search…' /> </form> </div> */}
        <div className='rightpart'>

          {UserTypeData !== "owner" && <button type='button' className="btn2 me-3"
            onClick={(e) => PopUpToggleFun()}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
            </svg>
            New Customer
          </button>}

          <span className='notifyimg'> <img src={notify} alt='notify img' onClick={() => {
            LanguageFun()

          }} /> </span>
          <div className='user'  >
            <figure> <img src={user} alt='user img' />  </figure>
            <div className='userinfo'>
              <h3>{UserNameData}</h3>
              <p>{UserTypeData}</p>
            </div>
            <div className='dropdownopt' onClick={(e) => LogoutFun()}>
              <span></span>
              {LogOutToggle && <div className='dropdownoptbox'>
                <button type='button' className='' onClick={(e) => handleLogout(e)}>
                  <img src={logout} alt='img' />

                  {/*  */}
                   {t("logout")}

                </button>
                <button type='button' className='' onClick={(e) => LanguageFun("en")}>
                  English
                </button>
                <br />
                <button type='button' className='' onClick={(e) => LanguageFun("ar")}>
                  عربي
                </button>
              </div>}
            </div>
          </div>
        </div>
      </header>

      {/* <div className='dasboardbody'>
          <div className='sidebar'>
            <figure className='logo'>
              <img src={logo} alt='logoimg' />
            </figure>
            <ul className='navmenu'>
              <li className='active'>  <img src={icon7} alt='img' /> </li>
              <li>  <img src={icon8} alt='img' /> </li>
              <li>  <img src={icon9} alt='img' /> </li>
              <li>  <img src={icon10} alt='img' /> </li>
              <li>  <img src={icon11} alt='img' /> </li>
            </ul>
          </div>

          <div className='contentpart managerpage'>
            <div className='managertitle'>
              <h2>Managers</h2>
              <button className='managerbtn' type='button'> <img src={plus} alt='img' /> Add Manager </button>
            </div>
          </div>

        </div> */}


    </>
  )
}

export default DashboardHeader
