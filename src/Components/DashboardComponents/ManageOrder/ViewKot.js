import React from 'react'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent';
import closeicon from '../../../images/close.svg'
import { useSelector } from 'react-redux';

const ViewKot = ({ ViewKotPopupState, viewKotPopupStateValue, translaterFun }) => {

  const GetKdsReducerData = useSelector((state) => state.ManageOrderTableApiData?.GetOrderKotData);

  const language = localStorage.getItem('languageSet');

  console.log("nbzvsdsd", GetKdsReducerData)


  function processKdsData(kdsData) {
    let dineIn = [];
    let takeAway = [];
    let sumDineInData = []
    let sumTakeAwayData = []


    if (kdsData && kdsData.data?.results?.[0]) {
      for (let i = 0; i < kdsData?.data.results[0].kot.length; i++) {
        dineIn.push({
          tableName: kdsData.data?.results[i]?.restaurant_table?.table_number,
          tableId: kdsData.data?.results[i]?.kot[0]?.restaurant_table?.table_id,
          items: [],
        });
        takeAway.push({
          tableName: kdsData.data?.results[i]?.restaurant_table?.table_number,
          tableId: kdsData.data?.results[i]?.kot[0]?.restaurant_table?.table_id,
          items: [],
        });
      }

      for (let table of kdsData.data?.results) {
        console.log("hjvssdsd",table)

         for (let item of table?.kot) {
           dineIn.forEach((insideTable) => {
            console.log("hjvssdsd1",insideTable)
            if (
              table.restaurant_table?.table_number === insideTable.tableName &&
              item.order_type === "dine_in"
            ) { 
               
              sumDineInData.push(item?.variant?.amount !== null ? item?.variant?.amount * item?.quantity
                : item?.quantity * item?.item?.item_price)

              insideTable.items.push(item);
            }
          });
          takeAway.forEach((insideTable) => {
            if (
              table.restaurant_table?.table_number === insideTable.tableName &&
              item.order_type === "take_away"
            ) {
              // sumTakeAwayData.push(item?.item.item_price * item?.quantity)
              sumTakeAwayData.push(item?.variant?.amount !== null ? item?.variant?.amount * item?.quantity
                : item?.quantity * item?.item?.item_price)

              insideTable.items.push(item);
            }
          });
        }
      }
    } else {
      console.warn("KDS data is undefined or null");
    }
    console.log("nbvsdsdsd", sumDineInData)

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

  console.log("sngsdsddhsd", dineInTakeAwayData)
  return (
    <>

      {viewKotPopupStateValue && <PopUpComponent classNameValue="itemtablepopup">
        <span className='closebtn' onClick={() => closePopupFun()}> <img src={closeicon} alt='img' /> </span>
        <div className='popuptitle'>
          <h3>{translaterFun("table-no")} {GetKdsReducerData?.data?.results?.[0]?.restaurant_table?.table_number}</h3>
        </div>

        <div className='popupbody scroller'>
          {dineInTakeAwayData?.[0]?.items?.length !== 0 && <div className='popuptitle'>
            <h4 className={dineInTakeAwayData?.[0]?.items?.order_type === "take_away" ? "color_takeaway" : " color_takeaway1"} >

              {dineInTakeAwayData?.[0]?.items?.order_type === 'take_away' ? translaterFun("take-away") :
                translaterFun("dine-in")}
            </h4>

            <div className='itemtable  '>
              <table  >
                <tr>
                  <th>{translaterFun("items")} </th>
                  <th> {translaterFun("qty")} </th>
                  <th> {translaterFun("price")} </th>
                </tr>
                {dineInTakeAwayData?.[0]?.items?.map((orderTypeData, id) => {
                  console.log("dbncghcnasdads", orderTypeData)
                  return <tr>
                    <td>{language === 'en' ? orderTypeData?.item?.item_name_en : orderTypeData?.item?.item_name_native}
                      {orderTypeData?.variant?.amount !== null && <div>({language === 'en' ? orderTypeData?.variant?.variant_name_en : orderTypeData?.variant?.variant_name_native})</div>}
                    </td>
                    <td> <button type='button'> {`${orderTypeData?.variant?.amount !== null ? orderTypeData?.variant?.amount + "x" + orderTypeData?.quantity : orderTypeData?.item?.item_price + "x" + orderTypeData?.quantity}`}</button> </td>
                    <td>
                      {orderTypeData?.variant?.amount !== null ? orderTypeData?.variant?.amount * orderTypeData?.quantity
                        : orderTypeData?.quantity * orderTypeData?.item?.item_price
                      }  </td>
                  </tr>
                })}
              </table>
            </div>
          </div>}


          {dineInTakeAwayData?.[1]?.items?.length !== 0 && <div className='popupbody popuptitle  pt-3'>
            <h4 className={dineInTakeAwayData?.[1]?.items?.order_type !== "take_away" ? "color_takeaway" : " color_takeaway1"}  >

              {dineInTakeAwayData?.[1]?.items?.order_type !== 'take_away' ? translaterFun("take-away") : translaterFun("dine-in")}
            </h4>

            <div className='itemtable  w-100 '>
              <table  >
                <tr>
                  <th>{translaterFun("items")} </th>
                  <th> {translaterFun("qty")} </th>
                  <th> {translaterFun("price")} </th>
                </tr>
                {dineInTakeAwayData?.[1]?.items?.map((orderTypeData, id) => {
                  console.log("dbncghcnasdads", orderTypeData)
                  return <tr>
                    <td>{language === 'en' ? orderTypeData?.item?.item_name_en : orderTypeData?.item?.item_name_native}
                      {orderTypeData?.variant?.amount !== null && <div>({language === 'en' ? orderTypeData?.variant?.variant_name_en : orderTypeData?.variant?.variant_name_native})</div>}
                    </td>
                    <td> <button type='button'> {`${orderTypeData?.variant?.amount !== null ? orderTypeData?.variant?.amount + "x" + orderTypeData?.quantity : orderTypeData?.item?.item_price + "x" + orderTypeData?.quantity}`}</button> </td>
                    <td>
                      {orderTypeData?.variant?.amount !== null ? orderTypeData?.variant?.amount * orderTypeData?.quantity
                        : orderTypeData?.quantity * orderTypeData?.item?.item_price
                      }  </td>
                  </tr>
                })}
              </table>
            </div>
          </div>}


          <div className='totalbox'>
            <ul>
              {/* <li> <span> Sub Total </span> <span> Sar 480  </span>  </li> */}
              {/* <li> <span>Tax </span> <span> </span> Sar 480 </li> */}
              <li> <span> <b> {translaterFun("total-payment")} </b></span> <span> <b> {GetKdsReducerData?.data?.results?.[0]?.amount}</b> </span> </li>
            </ul>
          </div>
        </div>




      </PopUpComponent>}
    </>
  )
}

export default ViewKot; 