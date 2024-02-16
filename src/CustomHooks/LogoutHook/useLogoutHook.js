import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
/**
 * Custom Hook for PopUpHook.
 * @returns {JSX.Element} Custom Hook for PopUp.
 * @category Custom PopUp Hook
 * @subcategory ForgotPassword
 */
const useLogoutHook = () => {

  const navigate = useNavigate()

  const logoutHookFun = (state) => {    // hook use in these files:DashboarderHeader.js ,KdsSreen.js, DashboardSidebar.js
    navigate("/")
    var myItem = localStorage.getItem('languageSet');
    localStorage.clear();
    localStorage.setItem('languageSet', myItem);
    window.location.reload()

  }
  return [logoutHookFun]
}

export default useLogoutHook