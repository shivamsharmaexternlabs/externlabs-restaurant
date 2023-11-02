import React, { useState } from 'react'

const usePopUpHook = () => {
    const [state,setState] = useState()
    const toggleFun = (state)=>{

        setState(state)
        
    }
  return [state,toggleFun]
}

export default usePopUpHook