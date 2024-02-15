import React, { useState, useEffect } from 'react'
import globe from '../../images/Globe.svg'
import '../../Components/DashboardComponents/DashboardHeader/dashboardHeader.css'
import { useDispatch } from 'react-redux'
import { reactLocalStorage } from "reactjs-localstorage";
import { LanguageChange, ToggleNewLeads } from '../../Redux/slices/sideBarToggle'

function LanguageComponent() {
    const [SelectToggleValue, setSelectToggleSelectTogglealue] = useState(false)
    const [languagesDataKey, setlanguagesDataKey] = useState("")
  const [languagesDataValue, setlanguagesDataValue] = useState("English")
    const dispatch = useDispatch()
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
    const openSelectToggleFun = () => {
        setSelectToggleSelectTogglealue(o => !o)
    }

    const languageDataFun = (e, value, key) => {


        setlanguagesDataValue(value == "English" ? "عربي" : "English")
        setlanguagesDataKey(key)

        setSelectToggleSelectTogglealue(o => !o)

        if (key !== languageDAta) {
            window.location.reload()
            reactLocalStorage.set("languageSet", key);
        }
    }
    return (
        <>
            <img src={globe} alt='Language img' className='globeimg' />
            <button className='' onClick={(e) => openSelectToggleFun()}> {languageDAta === "en" ? "عربي" : "English"} </button>
            {SelectToggleValue && <ul className=''  >
                {languageData?.map((items, id) => {
                    return <li onClick={(e) => languageDataFun(e, items?.key, items?.value)}> {items?.key}  </li>
                })}
            </ul>}
        </>
    )
}

export default LanguageComponent