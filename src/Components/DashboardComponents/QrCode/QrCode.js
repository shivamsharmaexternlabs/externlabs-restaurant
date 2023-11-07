import React, { useState } from 'react'
import './qrCode.css'
import { saveAs } from "file-saver";
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'

const QrCode = () => {


    const [loadspiner, setLoadSpiner] = useState(false);

    const QrCodeDownloadFun = () => { 
        let url = "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        saveAs(url, "Twitter-logo");

    }


    return (

        <>
            <DashboardLayout  >
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart dashboardpage'>
{/* 
                        <div>
                            Generated QR Codes
                        </div>


                        <button onClick={(e) => QrCodeDownloadFun()}>
                            Download
                        </button> */}

                        <div className='title'>
                            <h2></h2>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
            <LodingSpiner loadspiner={loadspiner} />


        </>
    )
}

export default QrCode