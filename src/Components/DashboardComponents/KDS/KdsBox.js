import React, { useState } from 'react'
import './kdsScreen.css'
import foodparcel from '../../../images/food-parcel.svg'
import cooking from '../../../images/cooking.svg'
import DineIn from '../../../images/plate.svg'
import takeAwayVerified from '../../../images/take-away-verified.svg'
import DineInVerified from '../../../images/dineInVerified.svg'
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent'


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

  const [data, setData] = useState([
    {
      id: 1,
      name: "Table",
      tableNo: 1,
      orderType: "take Away",
      orderNo: "#2309",
      orderDetails: [
        {
          name: "Sandwich",
          quantity: 1,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: " Vegetable Pizza",
          quantity: 2,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: "Mocktails",
          quantity: 2,
          extras: "without sugar",
          status: "cooking",
        },
      ],
    },
    {
      id: 2,
      name: "Table",
      tableNo: 2,
      orderType: "Dine In",
      orderNo: "#2309",
      orderDetails: [
        {
          name: "Sandwich",
          quantity: 1,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: " Vegetable Pizza",
          quantity: 2,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: "Mocktails",
          quantity: 2,
          extras: "without sugar",
          status: "cooking",
        },
      ],
    },
    {
      id: 3,
      name: "Table",
      tableNo: 3,
      orderType: "take Away",
      orderNo: "#2309",
      orderDetails: [
        {
          name: "Sandwich",
          quantity: 1,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: " Vegetable Pizza",
          quantity: 2,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: "Mocktails",
          quantity: 2,
          extras: "without sugar",
          status: "cooking",
        },
      ],
    },
    {
      id: 4,
      name: "Table",
      tableNo: 4,
      orderType: "Dine In",
      orderNo: "#2309",
      orderDetails: [
        {
          name: "Sandwich",
          quantity: 1,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: " Vegetable Pizza",
          quantity: 2,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: "Mocktails",
          quantity: 2,
          extras: "without sugar",
          status: "cooking",
        },
      ],
    },
    {
      id: 5,
      name: "Table",
      tableNo: 5,
      orderType: "take Away",
      orderNo: "#2309",
      orderDetails: [
        {
          name: "Sandwich",
          quantity: 1,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: " Vegetable Pizza",
          quantity: 2,
          extras: "Extra cheese",
          status: "cooking",
        },
        {
          name: "Mocktails",
          quantity: 7,
          extras: "without sugar",
          status: "cooking",
        },
      ],
    },
  ]);


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleStartCooking = (itemIndex, orderIndex) => {
    setCurrentOrder({ itemIndex, orderIndex });
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      const newData = [...data];
      const { itemIndex, orderIndex } = currentOrder;
      const currentStatus = newData[itemIndex].orderDetails[orderIndex].status;
      if (currentStatus === "cooking") {
        newData[itemIndex].orderDetails[orderIndex].status = "done";
      } else if (currentStatus === "done") {
        newData[itemIndex].orderDetails.splice(orderIndex, 1);
        // newData[itemIndex].orderDetails[orderIndex].status = "completed";
      }
      setData(newData);
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className='kgcardpart'>
        {data.map((item, itemIndex) => (
          <div className='kgcardbox' key={itemIndex}>
            <div className='kgcardtitle' style={{ backgroundColor: item.orderType === "take Away" ? "#eabb36" : "#42B856" }}>
              <div className='leftpart'>
                <h3>{item.name}</h3>
              </div>
              <div className='rightpart'>
                <h2>Table No.{item.tableNo}</h2>
              </div>
            </div>
            <ul className='kgcardlist' key={item.id}>
              {item.orderDetails.map((order, orderIndex) => (
                <li key={orderIndex}>
                  <div className='leftpart'>
                    <h3>{order.quantity} X {order.name}</h3>
                    <p>{order.extras}</p>
                  </div>
                  <div className='rightpart'>
                    <button
                      type="button"
                      style={{
                        borderColor: item.orderType === "take Away" ? "#eabb36" : "#42B856",
                        color: item.orderType === "take Away" ? "#eabb36" : "#42B856",
                      }}
                      onClick={() => handleStartCooking(itemIndex, orderIndex)}
                    >
                      {order.status === "done"
                        ? "Mark as done"
                        : "Start Cooking"}
                      <img
                        src={
                          order.status === "done"
                            ? item.orderType === "take Away"
                              ? takeAwayVerified
                              : DineInVerified
                            : cooking
                        }
                        alt="img"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <PopUpComponent classNameValue={"kds-popup"}>
          <div className="popupbody">
            <img src={cooking} alt='Cookig pan' height={"130px"} width={"130px"} />
            <h2>Are you sure?</h2>
            <p>
              You are{" "}
              {currentOrder &&
                data[currentOrder.itemIndex].orderDetails[currentOrder.orderIndex]
                  .status === "cooking"
                ? "starting Cooking"
                : "marking as done"}
            </p>
            <div className="popup-btn">
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
              <button
                onClick={() => {
                  handleConfirmation(true);
                  setShowConfirmation(false);
                }}
                style={{ backgroundColor: "#EA6A12" }}
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
