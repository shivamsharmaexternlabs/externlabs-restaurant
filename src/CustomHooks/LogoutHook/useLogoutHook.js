import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
/**
 * Custom Hook for logout.
 * @returns {JSX.Element} Custom Hook for logout.
 * @category Custom Hook
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