import React, { useState } from 'react'

const usePopUpHook = () => {

    const [state,setState] = useState()
    const toggleFun = (state)=>{
      console.log("dbnsdsdd",state)

        setState(state)
        
    }
  return [state,toggleFun]
}

export default usePopUpHook