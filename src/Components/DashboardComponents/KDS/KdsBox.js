import React, { useState } from 'react'
import './kdsScreen.css'
import foodparcel from '../../../images/food-parcel.svg'
import cooking from '../../../images/cooking.svg'
import DineIn from '../../../images/plate.svg'
import takeAwayVerified from '../../../images/take-away-verified.svg'
import DineInVerified from '../../../images/dineInVerified.svg'


function KdsBox() {

  const [data, setdata] = useState([
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
          extras: "",
          status: "done",
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
          extras: "",
          status: "done",
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
          status: "done",
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
          extras: "",
          status: "done",
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
          extras: "",
          status: "done",
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
          extras: "",
          status: "cooking",
        },
      ],
    },
  ]);

  return (
    <div>
      <div className='kgcardpart'>
        {data.map((item) => (
          <div className='kgcardbox'>
            <div className='kgcardtitle'
              style={{
                backgroundColor:
                  item.orderType === "take Away" ? "#eabb36" : "#42B856",
              }}>
              <div className='leftpart'>
                <h3>{item.name}</h3>
                {/* <h4>00:10:53 </h4> */}
              </div>
              <div className='rightpart'>
                <h2> Table No.{item.tableNo}</h2>
              </div>
            </div>
            {/* <div className='deliveryinfo'>
                <h3> <img src={item.orderType == "take Away" ? foodparcel : DineIn} alt='img' /> {item.orderType}</h3>
                <h4>{item.orderNo}</h4>
              </div> */}
            <ul className='kgcardlist' key={item.id}>
              {item.orderDetails.map((order, index) => {
                return (
                  <>
                    <li key={index}>
                      <div className='leftpart'>
                        <h3> {order.quantity} X {order.name}</h3>
                        <p>{order.extras}</p>
                      </div>
                      <div className='rightpart'>
                        <button
                          type="button"
                          style={{
                            borderColor:
                              item.orderType === "take Away"
                                ? "#eabb36"
                                : "#42B856",
                            color:
                              item.orderType === "take Away"
                                ? "#eabb36"
                                : "#42B856",
                          }}
                        >
                          {order.status === "done"
                            ? "Mark as done"
                            : "Start Cooking"}{" "}
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
                  </>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KdsBox