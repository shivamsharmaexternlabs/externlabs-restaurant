import React from 'react'
import kdslogo from '../../../images/logo2.svg'
import './kdsScreen.css'
import KdsNotification from '../../../images/KdsNotification.svg'
// import foodparcel from '../../../images/food-parcel.svg'
// import cooking from '../../../images/cooking.svg'
// import DineIn from '../../../images/plate.svg'
// import takeAwayVerified from '../../../images/take-away-verified.svg'
// import DineInVerified from '../../../images/dineInVerified.svg'
import KdsBox from './KdsBox'


function KdsScreen() {
    return (
        <>
            <div className='kdspage'>
                <div className='kds-header'>
                    <img className='kdslogoimg' alt='logo_img' src={kdslogo} />
                    <img className="kdsnotifimg" alt="Notification_Icon" src={KdsNotification} />
                </div>

                <div className='contentpart'>
                    <KdsBox/>                   
                </div>
            </div>
        </>

    )
}

export default KdsScreen