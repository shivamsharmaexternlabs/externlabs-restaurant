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
import { GetRestaurantsOnBoardSlice } from '../../../Redux/slices/leadsRestaurantSlice'
import { useSelector } from 'react-redux'

const DashboardHeader = ({ popUpHookFun }) => {

  const [LogOutToggle, setLogOutToggle] = useState(false)
  const [languagesDataKey, setlanguagesDataKey] = useState("")
  const [languagesDataValue, setlanguagesDataValue] = useState("English")
  const [SelectToggleValue, setSelectToggleSelectTogglealue] = useState(false)

  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);


  const navigate = useNavigate()
  const dispatch = useDispatch();
  const params = useLocation()
  const { t, i18n } = useTranslation();
  let BearerToken = reactLocalStorage.get("Token", false);

  let UserTypeData = reactLocalStorage.get("Type", false);

  let UserNameData = reactLocalStorage.get("FirstName", false);
  let languageSetData = reactLocalStorage.get("languageSet", false);

  const handleLogout = () => {
    navigate("/")
    var myItem = localStorage.getItem('languageSet');
    localStorage.clear();
    localStorage.setItem('languageSet', myItem);

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

  const languageDataFun = (e, value, key) => {


    setlanguagesDataValue(value == "English" ? "عربي" : "English")
    setlanguagesDataKey(key)

    setSelectToggleSelectTogglealue(o => !o)

    if (key !== languageDAta) {
      window.location.reload()
      reactLocalStorage.set("languageSet", key);
    }
  }

  const openSelectToggleFun = () => {
    setSelectToggleSelectTogglealue(o => !o)
  }

  // useEffect(() => {

  //   // i18n.changeLanguage(languageSetData) 


  // }, [languageSetData])

  const ViewProfileFun = async () => {
    let dispatchDataGetRestaurantsOnBoardSlice = await dispatch(GetRestaurantsOnBoardSlice({ RestaurantId: params?.pathname?.split("/")?.[1], Token: BearerToken }))

    console.log("sjdvhsdfsd0", dispatchDataGetRestaurantsOnBoardSlice?.payload.data)
    // { RestaurantId: params?.pathname?.split("/")?.[1], Token: BearerToken }
    // navigate(`/admin/viewProfile/${params?.pathname?.split("/")?.[1]}`) 

    navigate(`/${params?.pathname?.split("/")?.[1]}/admin/viewProfile/`, {
      state: {
        page: "profilePage",
        currentData: dispatchDataGetRestaurantsOnBoardSlice?.payload?.data,
      }
    })
  }


  // let data=[
  // {ass:"a1212a",
  // dasa:["q11a","q31a","q41a","q51a","q61a","q71a",]},

  // {ass:"a12125a",
  // dasa:["q11q","q33q","q44q","q15q","q16q","q77q",]}
  //    ,

  //    {ass:"a1213a",
  //    dasa:["l11e","l13e","l42e","l53e","l63e","l77e",]},

  //    {ass:"a1214a",
  //    dasa:["n12s","n13s","n24s","n15s","n63s","n77s",]}

  // ]
console.log("hgfghjk", LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data)

  return (
    <>
      <header>


        {/* <div className='leftpart'>  <form> <input type='search' placeholder='Search…' /> </form> </div> */}
        <div className='rightpart'>
          <div className='languaselist'>
            <img src={globe} alt='Language img' className='globeimg' />
            <button className='' onClick={(e) => openSelectToggleFun()}> {languageDAta === "en" ? "عربي" : "English"} </button>
            {SelectToggleValue && <ul className=''  >
              {languageData?.map((items, id) => {
                return <li onClick={(e) => languageDataFun(e, items?.key, items?.value)}> {items?.key}  </li>
              })}
            </ul>}
          </div>

          {UserTypeData !== "owner" && params?.pathname?.split("/")?.[2] !== "restaurantdetail" && <button type='button' className="btn2 me-3"
            onClick={(e) => PopUpToggleFun()}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
            </svg>
            {t("new-customer")}
          </button>}

          <span className='notifyimg'> <img src={notify} alt='notify img' /> </span>
          <div className='user'  >
            <figure>

              {UserTypeData !== "owner" && <img src={user} alt='user img' />}  
              {UserTypeData === "owner" && <img src={LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.logo == "undefined" ? user :
                LeadsRestaurantSelectorData?.GetRestaurantsOnBoardSliceReducerData?.data?.logo} alt='user img' />}


            </figure>
            <div className='userinfo'>
              <h3>{UserNameData}</h3>
              <p>{t(UserTypeData)} </p>
            </div>


            <div className='dropdownopt' onClick={(e) => LogoutFun()}>
              <span></span>
              {LogOutToggle && <div className='dropdownoptbox'>

              {UserTypeData === "owner" && <button type='button' className='' onClick={(e) => ViewProfileFun(e)}>



                  {t("view-profile")}

                </button>}
                <button type='button' className='' onClick={(e) => handleLogout(e)}>
                  {/* <img src={logout} alt='img' /> */}


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
