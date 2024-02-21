import React from 'react'
import kdslogo from '../../../images/kdslogo.svg'
import './kdsScreen.css'
import Logout from '../../../images/logout.svg'
import KdsBox from './KdsBox'
import LanguageComponent from '../../../ReusableComponents/LanguageComponent/LanguageComponent'
import useLogoutHook from '../../../CustomHooks/LogoutHook/useLogoutHook'


/**
 * KdsScreen component represents the main screen of the kitchen display system (KDS).
 * @returns {JSX.Element} KdsScreen component JSX
 *  @category KDS
 *
 */
function KdsScreen() {
    const [logoutHookFun] = useLogoutHook('')
    const language = localStorage.getItem('languageSet');


    /**
  * Handles logout  .
  * @function handleLogout
  * @category KdsScreen function
  * @subCategory Dashboard Component
  */

    const handleLogout = (e) => {
        logoutHookFun()
    }

    return (
        <>
            <div className='kdspage'>
                <div className='kds-header'>
                    <img className='kdslogoimg' alt='logo_img' src={kdslogo} />
                    <div className='kdsRight'>
                        <div className='languaselist'>
                            <LanguageComponent />
                        </div>

                        <button type='button' className='kds-logout' >
                            <img className="kds-logoutimg" alt="Notification_Icon" src={Logout} />
                            <span onClick={(e) => handleLogout(e)}>{language === 'en' ? "Log Out" : "تسجيل خروج"}</span>
                        </button>
                    </div>
                </div>

                <div className='contentpart'>
                    <KdsBox />
                </div>
            </div>
        </>

    )
}

export default KdsScreen