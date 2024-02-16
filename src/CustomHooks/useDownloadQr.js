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
            FileSaver.saveAs(`${item?.qrcode}`, `${item?.table_number?`Table No ${item?.table_number}`:"DownloadQr"}`);

        })


    }
    
    return [state, QrDownloadHookFun]
}

export default useDownloadQr