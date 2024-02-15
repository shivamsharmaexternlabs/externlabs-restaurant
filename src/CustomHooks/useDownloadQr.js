import React, { useState } from 'react'
/**
 * Custom Hook for PopUpHook.
 * @returns {JSX.Element} Custom Hook for PopUp.
 * @category Custom PopUp Hook
 * @subcategory ForgotPassword
 */
const useDownloadQr = () => {

    const [state, setState] = useState()

    const QrDownloadHookFun = (parameterData) => {

        console.log("dbncshgds", parameterData)

        parameterData?.map((item, id) => {

            var FileSaver = require('file-saver');
            FileSaver.saveAs(`${item?.qrcode}`, "QrDownload12");

        })


    }
    
    return [state, QrDownloadHookFun]
}

export default useDownloadQr