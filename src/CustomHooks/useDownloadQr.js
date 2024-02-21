import React, { useState } from 'react'
/**
 * Custom Hook for PopUpHook.
 * @returns {JSX.Element} Custom Hook for PopUp.
 * @category Custom Hook
 */
const useDownloadQr = () => {
                                // this hook used in these files : AllMedia.js, Dashboard.js, ManageOrder.js, BookingTable
    const [state, setState] = useState()
                                         

    const QrDownloadHookFun = (parameterData, fileName) => {

        console.log("dbncshgds", parameterData)

        parameterData?.map((item, id) => {

            var FileSaver = require('file-saver');
            FileSaver.saveAs(`${item?.qrcode}`, fileName ? fileName : `${item?.table_number ? `Table No ${item?.table_number}` : "DownloadQr"}`);

        })


    }

    return [state, QrDownloadHookFun]
}

export default useDownloadQr