import React from 'react'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent';
import closeicon from '../../../images/close.svg'
import { useSelector } from 'react-redux';

const ViewKot = ({ ViewKotPopupState, viewKotPopupStateValue }) => {
  const { GetKdsReducerData } = useSelector((state) => state.KdsApiData);

  // console.log("sdgvjsdcsd", GetKdsReducerData?.data?.[0]?.kds)
  const language = localStorage.getItem('languageSet');




  function processKdsData(kdsData) {
    let dineIn = [];
    let takeAway = [];
    let sumDineInData = []
    let sumTakeAwayData = []

    if (kdsData && kdsData.data) {
      for (let i = 0; i < kdsData.data.length; i++) {
        dineIn.push({
          tableName: kdsData.data[i].kds[0].restaurant_table.table_number,
          tableId: kdsData.data[i].kds[0].restaurant_table.table_id,
          items: [],
        });
        takeAway.push({
          tableName: kdsData.data[i].kds[0].restaurant_table.table_number,
          tableId: kdsData.data[i].kds[0].restaurant_table.table_id,
          items: [],
        });
      }

      for (let table of kdsData.data) {
        for (let item of table.kds) {
          dineIn.forEach((insideTable) => {
            if (
              item.restaurant_table.table_number === insideTable.tableName &&
              item.order_type === "dine_in"
            ) {
              sumDineInData.push(item?.item.item_price)

              insideTable.items.push(item);
            }
          });
          takeAway.forEach((insideTable) => {
            if (
              item.restaurant_table.table_number === insideTable.tableName &&
              item.order_type === "take_away"
            ) {
              sumTakeAwayData.push(item?.item.item_price)

              insideTable.items.push(item);
            }
          });
        }
      }
    } else {
      console.warn("KDS data is undefined or null");
    }


    let totalConcat = sumDineInData.concat(sumTakeAwayData)

    let sum = totalConcat.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0);

    let dineInTakeAwayData = dineIn.concat(takeAway)


    return { dineInTakeAwayData, sum };
  }

  const { dineInTakeAwayData, sum } = processKdsData(GetKdsReducerData);

  const closePopupFun = () => {
    ViewKotPopupState(false)
  }

  console.log("sngdhsd", dineInTakeAwayData?.[1]?.items?.length)
  return (
    <>

      {viewKotPopupStateValue && <PopUpComponent classNameValue="itemtablepopup  ">
        <span className='closebtn' onClick={() => closePopupFun()}> <img src={closeicon} alt='img' /> </span>
        <div className='popuptitle'>
          <h3> Table no. {GetKdsReducerData?.data?.[0]?.kds?.[0]?.restaurant_table?.table_number}</h3>
        </div>



        <div className='popupbody   '>
          {dineInTakeAwayData?.[0]?.items?.length !== 0 &&<div className='popuptitle'>
            <h4 className={dineInTakeAwayData?.[0]?.items?.order_type === "take_away" ? "color_takeaway" : " color_takeaway1"} >

              {dineInTakeAwayData?.[0]?.items?.order_type === 'take_away' ? (language === 'en' ? "Take Away" : "يبعد") :
                (language === 'en' ? "Dine In" : "تناول الطعام في")}
            </h4>

            <div className='itemtable  '>
              <table  >
                <tr>
                  <th>Items </th>
                  <th> Qty. </th>
                  <th> Price </th>
                </tr>
                {  dineInTakeAwayData?.[0]?.items?.map((orderTypeData, id) => {
                  console.log("dbncghcnasdads", orderTypeData)
                  return <tr>
                    <td>{language === 'en' ? orderTypeData?.item?.item_name_en : orderTypeData?.item?.item_name_native} </td>
                    <td> <button type='button'>  {orderTypeData?.quantity}</button> </td>
                    <td> {orderTypeData?.item?.item_price}  </td>
                  </tr>
                })}
              </table>
            </div>
          </div>}


         {dineInTakeAwayData?.[1]?.items?.length !== 0 && <div className='popupbody popuptitle  pt-3'>
            <h4 className={dineInTakeAwayData?.[1]?.items?.order_type !== "take_away" ? "color_takeaway" : " color_takeaway1"}  >

              {dineInTakeAwayData?.[1]?.items?.order_type !== 'take_away' ? (language === 'en' ? "Take Away" : "يبعد") :
                (language === 'en' ? "Dine In" : "تناول الطعام في")}
            </h4>

            <div className='itemtable  '>
              <table  >
                <tr>
                  <th>Items </th>
                  <th> Qty. </th>
                  <th> Price </th>
                </tr>
                {  dineInTakeAwayData?.[1]?.items?.map((orderTypeData, id) => {
                  console.log("dbncghcnasdads", orderTypeData)
                  return <tr>
                    <td>{language === 'en' ? orderTypeData?.item?.item_name_en : orderTypeData?.item?.item_name_native} </td>
                    <td> <button type='button'>  {orderTypeData?.quantity}</button> </td>
                    <td> {orderTypeData?.item?.item_price}  </td>
                  </tr>
                })}
              </table>
            </div>
          </div>}


          <div className='totalbox'>
            <ul>
              {/* <li> <span> Sub Total </span> <span> Sar 480  </span>  </li> */}
              {/* <li> <span>Tax </span> <span> </span> Sar 480 </li> */}
              <li> <span> <b> Total Payment </b></span> <span> <b> {sum}</b> </span> </li>
            </ul>
          </div>
        </div>




      </PopUpComponent>}
    </>
  )
}

export default ViewKot; 