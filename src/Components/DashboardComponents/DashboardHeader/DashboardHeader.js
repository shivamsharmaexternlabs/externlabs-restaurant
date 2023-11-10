import React from 'react'
import {useNavigate} from "react-router-dom"
import './dashboardHeader.css'
import user from '../../../images/user.png'
import notify from '../../../images/icon6.svg' 
import { reactLocalStorage } from "reactjs-localstorage";


const DashboardHeader = ({popUpHookFun}) => {
  const navigate=useNavigate()
  let BearerToken = reactLocalStorage.get("Token", false);

   const handleLogout=()=>{
    // reactLocalStorage.remove("token")
    navigate("/")
    reactLocalStorage.clear()
    window.location.reload()
   }
  return (
    <>
      <header>
        <div className='leftpart'>  <form> <input type='search' placeholder='Search…' /> </form> </div>
        <div className='rightpart'>
          <span className='notifyimg'> <img src={notify} alt='notify img' /> </span>
          <div className='user'  >
            <figure> <img src={user} alt='user img' />  </figure>
            <div className='userinfo'>
              <h3>Austin Robertson</h3>
              <p>Admin</p>
            </div>
            <button type='button' className='btn2 ms-3 py-1' onClick={(e)=>handleLogout(e)}> Logout </button>
          </div>
        </div>
      </header>

      {/* <div className='dasboardbody'>
          <div className='sidebar'>
            <figure className='logo'>
              <img src={logo} alt='logoimg' />
            </figure>
            <ul className='navmenu'>
              <li className='active'>  <img src={icon7} alt='img' /> </li>
              <li>  <img src={icon8} alt='img' /> </li>
              <li>  <img src={icon9} alt='img' /> </li>
              <li>  <img src={icon10} alt='img' /> </li>
              <li>  <img src={icon11} alt='img' /> </li>
            </ul>
          </div>

          <div className='contentpart managerpage'>
            <div className='managertitle'>
              <h2>Managers</h2>
              <button className='managerbtn' type='button'> <img src={plus} alt='img' /> Add Manager </button>
            </div>
          </div>

        </div> */}


    </>
  )
}

export default DashboardHeader