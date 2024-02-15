import React, { useState, useEffect, useRef } from 'react'
import globe from '../../images/Globe.svg'
import '../../Components/DashboardComponents/DashboardHeader/dashboardHeader.css'
import { useDispatch } from 'react-redux'
import { reactLocalStorage } from "reactjs-localstorage";
import { LanguageChange, ToggleNewLeads } from '../../Redux/slices/sideBarToggle'

function LanguageComponent() {
    const dispatch = useDispatch()
    let languageDAta = reactLocalStorage.get("languageSet", false);

    // ===== If We click on outside logout dropdown then dropdown will close ==========
    //  ========================= STARTS HERE =======================
    const [modalOpen, setModalOpen] = useState(false);

    const buttonRef = useRef(null);
    const listRef = useRef(null);

    const openLangModal = () => {
        setModalOpen(!modalOpen);
    };

    const closeLangModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target) &&
                listRef.current && !listRef.current.contains(e.target)) {
                closeLangModal();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeLangModal]);


    //  ========================== ENDS HERE =======================

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
        closeLangModal();

        if (key !== languageDAta) {
            window.location.reload()
            reactLocalStorage.set("languageSet", key);
        }
    }



    return (
        <>
            <img src={globe} alt='Language img' className='globeimg' />
            <button className='' ref={buttonRef} onClick={(e) => openLangModal()}> {languageDAta === "en" ? "عربي" : "English"} </button>
            {modalOpen && <ul className='' ref={listRef} >
                {languageData?.map((items, id) => {
                    return <li onClick={(e) => languageDataFun(e, items?.key, items?.value)}> {items?.key}  </li>
                })}
            </ul>}
        </>
    )
}

export default LanguageComponent