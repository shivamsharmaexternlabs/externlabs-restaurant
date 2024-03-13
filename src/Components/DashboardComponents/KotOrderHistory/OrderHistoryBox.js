import React, { useEffect, useState } from 'react'
import './orderHistory.css'
import ReactPaginate from 'react-paginate';
// import { useDispatch, useSelector } from 'react-redux';
// import user from '../../../images/user.png'
import dineIn from '../../../images/greendot.svg'
import takeAway from '../../../images/yellowdot.svg'
import filter from '../../../images/filtericon.svg'
// import { GetKdsSlice } from '../../../Redux/slices/KdsSlice';

function OrderHistoryBox({ translaterFun }) {
    const data = [
        {
            "kot": [
                {
                    "order_type": "take_away",
                    "quantity": 2,
                    "item": {
                        "item_name_en": "Minced beef with tofu",
                        "item_name_native": "لحم بقري مفروم مع التوفو"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": ""
                    }
                },
                {
                    "order_type": "dine_in",
                    "quantity": 2,
                    "item": {
                        "item_name_en": "Minced beef with tofu",
                        "item_name_native": "لحم بقري مفروم مع التوفو"
                    },
                    "variant": {
                        "variant_name_en": "medium",
                        "variant_name_native": "واسطة"
                    }
                }
            ],
            "amount": 220.5,
            "customer_name": "Priya",
            "restaurant_table": {
                "category": "Ac",
                "table_number": "100"
            },
            "waiter_name": "Harshit"
        },
        {
            "kot": [
                {
                    "order_type": "take_away",
                    "quantity": 1,
                    "item": {
                        "item_name_en": "Minced beef with tofu",
                        "item_name_native": "لحم بقري مفروم مع التوفو"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": ""
                    }
                }
            ],
            "amount": 60.0,
            "customer_name": "Priya",
            "restaurant_table": {
                "category": "Ac",
                "table_number": "100"
            },
            "waiter_name": "Test"
        }
    ]
    const [selectedOrderType, setSelectedOrderType] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const language = localStorage.getItem('languageSet')

    

    const handleOrderTypeChange = (event) => {
        setSelectedOrderType(event.target.value);
    };

    

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div className='contentpart  historypage'>
            <div className='ordertitle'>
                <h2>
                    {translaterFun("orders-history")}
                </h2>
                {/* ADD Manager button... */}
                <div style={{ display: "flex" }}>
                  
                    <select onChange={handleOrderTypeChange} value={selectedOrderType} className="custom-select">
                        <option value="">All Orders</option>
                        <option value="dine_in">{translaterFun("dine-in")}</option>
                        <option value="take_away">{translaterFun("take-away")}</option>
                    </select>
                    {/* <p>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button onClick={() => handleDateRangeChange(startDate, endDate)}>Apply</button>
                    </p> */}
                </div>

            </div>
            <div className='ordertable'>
                <table>
                    <tr>

                        <th>{translaterFun("table-no")}</th>
                        <th>{translaterFun("Customer Name")}</th>
                        <th>{translaterFun("Quanitity")}</th>
                        <th>{translaterFun("Item")}</th>
                        <th>{translaterFun("Variant")}</th>
                        <th>{translaterFun("order-type")}</th>
                        <th>{translaterFun("waiter-name")}</th>
                        <th>{translaterFun("total-amount")}</th>

                    </tr>

                    {data?.map((bill, billId) => {
                        console.log({ bill });
                        return (
                            <tr key={billId} className={`${bill.kot.length - 1 && "lastlength"}`}>
                                <td >
                                    <div>{bill.restaurant_table.category}</div>
                                    <div>{bill.restaurant_table.table_number}</div>
                                </td>

                                <td >{bill.customer_name}</td>

                                <td>
                                    {bill.kot.map((kotItem, kotId) => (
                                        <div key={kotId} className={bill.kot.length > 1 ? 'mb-5' : "mb-1"}>
                                            {kotItem.quantity}
                                        </div>
                                    ))}
                                </td>

                                <td>
                                    {bill.kot.map((kotItem, kotId) => (
                                        <div key={kotId} className={bill.kot.length > 1 ? 'mb-5' : "mb-1"}>
                                            {language === 'en' ? kotItem.item.item_name_en : kotItem.item.item_name_native}
                                        </div>
                                    ))}
                                </td>

                                <td >{"jghjhgjg"}</td>

                                <td>
                                    {bill.kot.map((kotItem, kotId) => (
                                        <div key={kotId} className={bill.kot.length > 1 ? 'mb-5' : "mb-1"}>
                                            {kotItem.order_type === 'take_away' ? (
                                                <>
                                                    <img src={takeAway} alt='takeaway' className='order-type-dot' />
                                                    {translaterFun("take-away")}
                                                </>
                                            ) : (
                                                <>
                                                    <img src={dineIn} alt='dinein' className='order-type-dot' />
                                                    {translaterFun("dine-in")}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </td>

                                <td >
                                    <div >{bill.waiter_name}</div>
                                </td>

                                <td >
                                    {bill.amount} SAR
                                </td>
                            </tr>
                        );
                    })}

                </table>

                {data && data.length !== 0 && (
                    <ReactPaginate
                        previousLabel={translaterFun("previous")}
                        nextLabel={translaterFun("next")}
                        pageCount={Math.ceil(data.reduce((total, currentItem) => total + currentItem.kot.length, 0) / itemsPerPage)}
                        onPageChange={handlePageClick}
                        forcePage={currentPage}
                        disabledClassName={"disabled"}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                )}


            </div>
        </div>
    )
}

export default OrderHistoryBox