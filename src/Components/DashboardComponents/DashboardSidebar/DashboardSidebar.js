import React from 'react'
import './dashboardSidebar.css'
import logo from '../../../images/logo2.svg'
import icon7 from '../../../images/icon7.svg'
import icon8 from '../../../images/icon8.svg'
import icon9 from '../../../images/icon9.svg'
import icon10 from '../../../images/icon10.svg'
import icon11 from '../../../images/icon11.svg'
import plus from '../../../images/plus.svg'

const DashboardSidebar = () => {
  return (
    <>
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

      {/* <div className='contentpart managerpage'>
      <div className='managertitle'>
        <h2>Managers</h2>
        <button className='managerbtn' type='button'> <img src={plus} alt='img' /> Add Manager </button>
      </div>
    </div> */}



    </>
  )
}

export default DashboardSidebar