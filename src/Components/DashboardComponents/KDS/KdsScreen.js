import React, { useState } from 'react'
import './kdsScreen.css'
import Logout from '../../../images/logout.svg'
import KdsBox from './KdsBox'
import LanguageComponent from '../../../ReusableComponents/LanguageComponent/LanguageComponent'
import useLogoutHook from '../../../CustomHooks/LogoutHook/useLogoutHook'
import { reactLocalStorage } from 'reactjs-localstorage'
import OrderHistoryBox from '../KotOrderHistory/OrderHistoryBox'

/**
 * KdsScreen component represents the main screen of the kitchen display system (KDS).
 * @returns {JSX.Element} KdsScreen component JSX
 *  @category KDS
 */

function KdsScreen({ translaterFun }) {
    const [logoutHookFun] = useLogoutHook('')
    let logoImage = reactLocalStorage.get("Logo", false);
    const [historyPage, setHistoryPage] = useState(false)


    /**
  * Handles logout  .
  * @function handleLogout
  * @category KdsScreen function
  * @subCategory Dashboard Component
  */

    const handleLogout = (e) => {
        logoutHookFun()
    }
    const handleClick = () => {
        setHistoryPage(!historyPage);
    }

    return (
        <>
            <div className="kdspage">
                <div className="kds-header">
                    <img className="kdslogoimg" alt="logo_img" src={logoImage} />
                    <div className="kdsRight">
                        <button type="submit" className="history-btn" onClick={handleClick}>
                            {historyPage ? translaterFun('kds-screen') : translaterFun('kot-history')}
                        </button>
                        <div className="languaselist">
                            <LanguageComponent />
                        </div>

                        <button type="button" className="kds-logout" onClick={(e) => handleLogout(e)}>
                            <img className="kds-logoutimg" alt="Notification_Icon" src={Logout} />
                            <span>{translaterFun('logout')}</span>
                        </button>
                    </div>
                </div>

                <div className="contentpart">
                    {historyPage ? <OrderHistoryBox translaterFun={translaterFun} /> : <KdsBox translaterFun={translaterFun} />}
                </div>
            </div>
        </>

    )
}

export default KdsScreen