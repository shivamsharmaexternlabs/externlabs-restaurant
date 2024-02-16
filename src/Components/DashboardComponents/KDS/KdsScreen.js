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
    const[logoutHookFun]=useLogoutHook('')

    /**
     * Handles the logout action.
     */
    const handleLogout = () => {
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

                        <button className='kds-logout' onClick={handleLogout}>
                            <img className="kds-logoutimg" alt="Notification_Icon" src={Logout} />
                            <span>Log Out</span>
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