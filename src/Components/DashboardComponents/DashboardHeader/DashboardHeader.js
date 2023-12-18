import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import './dashboardHeader.css'
import user from '../../../images/user.png'
import notify from '../../../images/icon6.svg'
import logout from '../../../images/logout.svg'
import globe from '../../../images/Globe.svg'
import { reactLocalStorage } from "reactjs-localstorage";
import { LanguageChange, ToggleNewLeads } from '../../../Redux/slices/sideBarToggle'
import { useDispatch } from 'react-redux'
import { useState } from 'react'


import { useTranslation } from "react-i18next"

const DashboardHeader = ({ popUpHookFun }) => {

  const [LogOutToggle, setLogOutToggle] = useState(false)
  const [languagesDataKey, setlanguagesDataKey] = useState("")
  const [languagesDataValue, setlanguagesDataValue] = useState("English")
const [SelectToggleValue,setSelectToggleSelectTogglealue] = useState(false)
  


  const navigate = useNavigate()
  const dispatch = useDispatch();
  const params=useLocation()
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

  let languageDAta = reactLocalStorage.get("languageSet", false);

  // const LanguageFun = (value) => {
  //   // i18n.changeLanguage(value)  
  //   reactLocalStorage.set("languageSet", value);
  //   dispatch(LanguageChange(value))
  // }

  useEffect(() => {
    if (languageDAta !== false) {
      dispatch(LanguageChange(languageDAta))
    }
  }, [languageDAta])
  
  let languageData = [
    { value: "en", key: "English" },
    { value: "ar", key: "عربي" }

  ]

  const languageDataFun =(e,value,key)=>{


    setlanguagesDataValue(  value=="English"?"عربي":"English")
    setlanguagesDataKey(key)
    
    setSelectToggleSelectTogglealue(o=>!o)
    
    if(key !== languageDAta){
      window.location.reload()
      reactLocalStorage.set("languageSet", key);
    }
  }

  const openSelectToggleFun=()=>{
    setSelectToggleSelectTogglealue(o=>!o)
  }

  return (
    <>
      <header>
        {/* <div className='leftpart'>  <form> <input type='search' placeholder='Search…' /> </form> </div> */}
        <div className='rightpart'>
          <div className='languaselist'>
            <img src={globe} alt='Language img' className='globeimg'/>
            <button className='' onClick={(e)=>openSelectToggleFun()}> { languageDAta === "en" ?  "عربي" : "English" } </button>
            {SelectToggleValue && <ul className=''  >
              {languageData?.map((items,id)=>{
               return  <li onClick={(e)=>languageDataFun(e, items?.key, items?.value)}> {items?.key}  </li> 
              })} 
            </ul>}
          </div>

          {UserTypeData !== "owner" && params?.pathname?.split("/")?.[2] !=="restaurantdetail" && <button type='button' className="btn2 me-3"
            onClick={(e) => PopUpToggleFun()}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
            </svg>
            {t("new-customer")}
          </button>}

          <span className='notifyimg'> <img src={notify} alt='notify img'  /> </span>
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
                {/* <button type='button' className='' onClick={(e) => LanguageFun("en")}>
                  English
                </button>
                <button type='button' className='' onClick={(e) => LanguageFun("ar")}>
                  عربي
                </button> */}
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
