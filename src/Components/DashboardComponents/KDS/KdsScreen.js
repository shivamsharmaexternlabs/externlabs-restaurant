import React from 'react'
import kdslogo from '../../../images/logo2.svg'
import './kdsScreen.css'
// import KdsNotification from '../../../images/KdsNotification.svg'
import Logout from '../../../images/logout.svg'
import KdsBox from './KdsBox'


function KdsScreen() {

    const handleLogout = () => {
        alert("logout successfull")
    }

    return (
        <>
            <div className='kdspage'>
                <div className='kds-header'>
                    <img className='kdslogoimg' alt='logo_img' src={kdslogo} />
                    <button className='kds-logout' onClick={handleLogout}>
                        <img className="kds-logoutimg" alt="Notification_Icon" src={Logout} />
                        <span>Log Out</span>
                    </button>
                </div>
                
                <div className='contentpart'>
                    <KdsBox />
                </div>
            </div>
        </>

    )
}

export default KdsScreen