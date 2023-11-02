import React from 'react'
import './dashboardHeader.css'
import user from '../../../images/user.png'
import notify from '../../../images/icon6.svg' 

const DashboardHeader = () => {
  return (
    <>
        <header>
          <div className='leftpart'>  <form> <input type='search' placeholder='Search…' /> </form> </div>
          <div className='rightpart'>
            <span className='notifyimg'> <img src={notify} alt='notify img' /> </span>
            <div className='user'>
              <figure> <img src={user} alt='user img' />  </figure>
              <div className='userinfo'>
                <h3>Austin Robertson</h3>
                <p>Admin</p>
              </div>
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