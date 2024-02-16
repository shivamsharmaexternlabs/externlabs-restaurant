import React, { useState } from 'react'
/**
 * Custom Hook for PopUpHook.
 * @returns {JSX.Element} Custom Hook for PopUp.
 * @category Custom PopUp Hook
 * @subcategory ForgotPassword
 */
const usePopUpHook = () => {        // this hook uses in files: AdminProfilePage.js ,Categories.js, DashboardLayout.js, CreateEditTable.js,
                                    //ManageOrder.js, Manager.js,  RestaurantDetail.js, Leads.js, Resturant.js, Subscription.js, BookingTable.js,
                                    //CreateLeadOnBoardPopUpComponent.js
    const [state,setState] = useState()
    
    const toggleFun = (state)=>{
      console.log("dbnsdsdd",state)

        setState(state)
        
    }
  return [state,toggleFun]
}

export default usePopUpHook