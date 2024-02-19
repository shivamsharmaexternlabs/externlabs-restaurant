import React from 'react'

const PopUpComponent = ({ children ,classNameValue,PopUpToggleFun,}) => { 

  return (

    <div className={`${classNameValue} popup`}>
      <div className='popupinnerbox'>

        {children}  


        {/* <div className='text-end mt-5'>
          <button type="submit" className="cancelbtn" onClick={(e)=>PopUpToggleFun()}> Cancel </button>
          <button type="submit" className="submit mx-3"> Submit </button>
        </div> */}


      </div>
    </div>
  )
}

export default PopUpComponent