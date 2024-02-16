import React, { useEffect, useState } from 'react'
import './kdsScreen.css'
import foodparcel from '../../../images/food-parcel.svg'
import cooking from '../../../images/cooking.svg'
import DineIn from '../../../images/plate.svg'
import takeAwayVerified from '../../../images/take-away-verified.svg'
import DineInVerified from '../../../images/dineInVerified.svg'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent'
import markAsDone from '../../../images/mark-as-done.svg'
import { useSelector, useDispatch } from 'react-redux';
import { GetKdsSlice, UpdateKdsSlice } from '../../../Redux/slices/KdsSlice'


/**
* KdsBox component displays kitchen display system (KDS) information.
* @returns {JSX.Element} KdsBox component JSX
*  @category KDS
*/
function KdsBox() {
  /**
   * State to hold KDS data.
   * @type {Array<object>}
   */

  const dispatch = useDispatch()
  const language = localStorage.getItem('languageSet')
  const { GetKdsReducerData } = useSelector((state) => state.KdsApiData)
  const restaurant_id = localStorage.getItem('RestaurantId')
  const token = localStorage.getItem('Token')

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleStartCooking = (itemIndex, orderIndex, order) => {
    let kot_id = order?.kot_id
    setCurrentOrder({ itemIndex, orderIndex, kot_id });
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed && currentOrder && GetKdsReducerData && GetKdsReducerData.data) {
      const { itemIndex, orderIndex, kot_id } = currentOrder;
      const currentStatus = GetKdsReducerData.data[itemIndex].kds[orderIndex].status;
      if (currentStatus === "kot_generated") {
        const updateKdsResponseData = await dispatch(
          UpdateKdsSlice({ kot_id: kot_id, status: "start_cooking", token: token })
        );
        if (updateKdsResponseData.payload.status === 200) {
          dispatch(GetKdsSlice({ restaurant_id: restaurant_id, token: token }));
        }
      } else if (currentStatus === "start_cooking") {
        const updateKdsResponseData = await dispatch(
          UpdateKdsSlice({ kot_id: kot_id, status: "done", token: token })
        );
        if (updateKdsResponseData.payload.status === 200) {
          dispatch(GetKdsSlice({ restaurant_id: restaurant_id, token: token }));
        }
      }

    }
    setShowConfirmation(false);
  };


  useEffect(() => {
    if (!restaurant_id) {
      console.warn("Restaurant ID not found in local storage.")
    } else {
      // setInterval(()=>{
      dispatch(GetKdsSlice({ restaurant_id: restaurant_id, token: token }))
      // },3000)     
    }
  }, [])


  return (
    <div>
      <div className='kgcardpart'>
        {GetKdsReducerData?.data?.map((item, index) => {
          return <div className='kgcardbox' key={index}>
            <div className='kgcardtitle'
              style={{ backgroundColor: item?.kds?.[0]?.order_type === "take_away" ? "#eabb36 " : "#42B856" }}
            >
              <div className='leftpart'>
                <h3>
                  {item?.kds?.[0]?.restaurant_table?.category}
                </h3>
                {/* <h4>00:10:53</h4> */}
              </div>
              <div className='rightpart'>
                <h2>{language === 'en' ? "Table No." : "رقم الجدول"}
                  {item?.kds?.[0]?.restaurant_table.table_number}
                </h2>
              </div>
            </div>
            <div className='deliveryinfo'
              style={{ backgroundColor: item?.kds?.[0]?.order_type === 'take_away' ? "rgb(234 187 54 / 10%)" : "rgb(117 234 54 / 10%)" }}
            >
              <h3  ><img
                src={item?.kds?.[0]?.order_type === 'take_away' ? foodparcel : DineIn}
                alt='parcel' />
                {item?.kds?.[0]?.order_type === 'take_away' ?
                  (language === 'en' ? "Take Away" : "يبعد") :
                  (language === 'en' ? "Dine In" : "تناول الطعام في")}
              </h3>
              <h4>{""}</h4>
            </div>
            <ul className='kgcardlist'>
              {item?.kds?.map((order, orderIndex) => {
                return (
                  <li key={orderIndex}>
                    <div className='leftpart'>
                      <h3 style={{ textDecoration: order.status === 'done' ? "line-through" : "none" }}>
                        {order.quantity} X {language === 'en' ? order.item.item_name_en : order.item.item_name_native}
                      </h3>
                      <p style={{ textDecoration: order.status === 'done' ? "line-through" : "none", color: "#998888" }}>
                        {language === 'en' ? order.variant.variant_name_en : order.variant.variant_name_native}
                      </p>
                    </div>
                    <div className='rightpart'>
                      {order.status === 'done' ? "" :
                        <button
                          type="button"
                          style={{
                            borderColor: order.order_type === "take_away" ? "#eabb36" : "#42B856",
                            color: order.order_type === "take_away" ? "#eabb36" : "#42B856",
                          }}
                          onClick={() => handleStartCooking(index, orderIndex, order)}
                        >
                          {(order.status === "kot_generated") ? "Start Cooking" : "Mark as done"}
                          <img
                            src={
                              order.status === "start_cooking"
                                ? order.order_type === "take_away"
                                  ? takeAwayVerified
                                  : DineInVerified
                                : cooking
                            }
                            alt="img"
                          />
                        </button>
                      }
                    </div>
                  </li>
                );
              })}
            </ul>

          </div>


        })}
      </div>
      {showConfirmation && (
        <PopUpComponent classNameValue={"kds-popup"}>
          <div className="popupbody">
            <img
              src={
                currentOrder &&
                  GetKdsReducerData.data[currentOrder.itemIndex].kds[currentOrder.orderIndex]
                    .status === "kot_generated"
                  ? cooking
                  : markAsDone
              }
              alt='Cooking pan'
              height={markAsDone ? "80px" : "100px"}
              width={"100px"}
            />
            <h2 className='popup-head'>
              {currentOrder &&
                GetKdsReducerData.data[currentOrder.itemIndex].kds[currentOrder.orderIndex]
                  .status === "kot_generated"
                ? "Are you sure?"
                : "Do you want to \n Mark it as Done?"}
            </h2>
            <p className='popup-para'>
              {currentOrder &&
                GetKdsReducerData.data[currentOrder.itemIndex].kds[currentOrder.orderIndex]
                  .status === "kot_generated"
                ? "You are starting Cooking"
                : ""}
            </p>
            <div className="popup-btn">
              <button onClick={() => setShowConfirmation(false)} className='popup-cal-btn'>Cancel</button>
              <button
                onClick={() => {
                  handleConfirmation(true);
                  setShowConfirmation(false);
                }}
                style={{ backgroundColor: "#EA6A12" }}
                className='popup-yes-btn'
              >
                Yes
              </button>
            </div>
          </div>
        </PopUpComponent>
      )}

    </div>
  )
}

export default KdsBox
