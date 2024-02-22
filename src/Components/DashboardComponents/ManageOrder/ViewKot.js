import React from 'react'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent';
import closeicon from '../../../images/close.svg'

const ViewKot = () => {
  
  return (
    <>

      <PopUpComponent classNameValue="itemtablepopup  d-none ">
        <span className='closebtn'> <img src={closeicon} alt='img' /> </span>
        <div className='popuptitle'>
          <h3> Table no. 1</h3>
          <h4> Dine In</h4>
        </div>
        <div className='popupbody'>
          <div className='itemtable'>
            <table>
              <tr>
                <th>Items </th>
                <th> Qty. </th>
                <th> Price </th>
              </tr>
              <tr>
                <td> Vegetable Pizza </td>
                <td> <button type='button'> 1 </button> </td>
                <td> Sar 120  </td>
              </tr>
              <tr>
                <td> Vegetable Pizza </td>
                <td> <button type='button'> 1 </button> </td>
                <td> Sar 120  </td>
              </tr>
              <tr>
                <td> Vegetable Pizza </td>
                <td> <button type='button'> 1 </button> </td>
                <td> Sar 120  </td>
              </tr>
              <tr>
                <td> Vegetable Pizza </td>
                <td> <button type='button'> 1 </button> </td>
                <td> Sar 120  </td>
              </tr>
              <tr>
                <td> Vegetable Pizza </td>
                <td> <button type='button'> 1 </button> </td>
                <td> Sar 120  </td>
              </tr>
            </table>
          </div>

          <div className='totalbox'>
             <ul>
              <li> <span> Sub Total </span> <span> Sar 480  </span>  </li>
              <li> <span>Tax </span> <span> </span> Sar 480 </li>
              <li> <span> <b> Total Payment </b></span> <span> <b>Sar480</b> </span> </li>
             </ul>
          </div>
        </div>

      </PopUpComponent>
    </>
  )
}

export default ViewKot ; 