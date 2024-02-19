import React from 'react'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent'

const ViewKot = () => {
  return (
    <>

      <PopUpComponent classNameValue="itemtablepopup d-none">
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

          <div className=''>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>

      </PopUpComponent>
    </>
  )
}

export default ViewKot