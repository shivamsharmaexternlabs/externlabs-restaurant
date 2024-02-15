import React, { useState } from 'react'
/**
 * Custom Hook for PopUpHook.
 * @returns {JSX.Element} Custom Hook for PopUp.
 * @category Custom PopUp Hook
 * @subcategory ForgotPassword
 */
const usePopUpHook = () => {

    const [state,setState] = useState()
    
    const toggleFun = (state)=>{
      console.log("dbnsdsdd",state)

        setState(state)
        
    }
  return [state,toggleFun]
}

export default usePopUpHook