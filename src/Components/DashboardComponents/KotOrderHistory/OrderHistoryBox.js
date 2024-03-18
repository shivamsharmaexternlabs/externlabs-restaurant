import React, { useEffect, useState } from 'react'
import './orderHistory.css'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import dineIn from '../../../images/greendot.svg'
import takeAway from '../../../images/yellowdot.svg'
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import PopUpComponent from '../../../ReusableComponents/PopUpComponent/PopUpComponent';
import calender from '../../../images/calender.svg'
import search from '../../../images/search-interface-symbol 1 (Traced).svg'
import SelectAndSearchComponent from '../../../ReusableComponents/SelectAndSearchComponent/SelectAndSearchComponent';
import { GetOrdersHistorySlice, GetWaiterNameSlice } from '../../../Redux/slices/KotOrdersHistorySlice';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner';


function OrderHistoryBox({ translaterFun }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const dispatch = useDispatch()
    const { GetOrdersHistoryData } = useSelector((state) => state.OrdersApiData);
    // const { GetWaiterData } = useSelector((state) => state.OrdersApiData);
    const language = localStorage.getItem('languageSet')
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    // const [openDateRange, setOpenDateRange] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [waiterData, setWaiterData] = useState([])
    const [SearchCategoryData, setSearchCategoryData] = useState(null)
    const [searchData, setSearchData] = useState("")
    const restaurantId = localStorage.getItem("RestaurantId")
    const [dateRangeApplied, setDateRangeApplied] = useState(false);
    const token = localStorage.getItem('Token')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    const handleApplyDateRange = async () => {
        //setOpenDateRange(false);
        setShowPopUp(false);
        dispatch(LoadingSpinner(true));

        // Extract start and end dates and perform actions
        if (selectedDateRange) {
            const startDateValue = selectedDateRange.start.toISOString().split('T')[0];
            const endDateValue = selectedDateRange.end.toISOString().split('T')[0];

            // Store start and end dates in state
            setStartDate(startDateValue);
            setEndDate(endDateValue);

            const responseData = await dispatch(GetOrdersHistorySlice({ restaurant_id: restaurantId, waiter: searchData, start_date: startDateValue, end_date: endDateValue, token: token }))
            if (responseData.payload.status === 200) {
                dispatch(LoadingSpinner(false))
            } else {
                dispatch(LoadingSpinner(false))
            }
            setDateRangeApplied(true);
        } else {
            console.warn("date range not visible")
            dispatch(LoadingSpinner(false))
        }
    };

    const handleCancel = () => {
        // Reset start and end dates in state
        setStartDate("");
        setEndDate("");

        dispatch(GetOrdersHistorySlice({ restaurant_id: restaurantId, token: token, waiter: searchData }))
        //setOpenDateRange(false);
        setShowPopUp(false);
        setSelectedDateRange(null); // Reset the date range selection
        setDateRangeApplied(false);
    };


    const handlePageClick = (selectedPage) => {
        const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.

        let orderHistoryPayload = {
            restaurant_id: restaurantId,
            token: token,
            page: page,
            waiter: searchData
        }
        dispatch(GetOrdersHistorySlice(orderHistoryPayload));
        setCurrentPage(page - 1);
    }

    const handleSortByDateClick = () => {
        //setOpenDateRange(true);
        setShowPopUp(true);
    };

    const handleStartEndClick = () => {
        //setOpenDateRange(true);
        setShowPopUp(true);
    };

    const newfunC = (searchData) => {
        setSearchCategoryData(searchData)
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(LoadingSpinner(true))
            const responseData = await dispatch(GetOrdersHistorySlice({ restaurant_id: restaurantId, token: token }))
            if (responseData.payload.status === 200) {
                dispatch(LoadingSpinner(false))
            } else {
                dispatch(LoadingSpinner(false))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        let getWaiterData = async () => {
            try {
                const responseData = await dispatch(GetWaiterNameSlice({ restaurant_id: restaurantId, token: token }));
                if (responseData.payload.status === 200) {
                    const GetWaiterData = responseData.payload.data;

                    if (GetWaiterData && GetWaiterData.results) { // Check if GetWaiterData and GetWaiterData.results are not undefined
                        const { results } = GetWaiterData;

                        // Map over 'results' array to add 'key' property
                        const modifiedWaiterData = results.map(item => {
                            // Create a new object with the 'key' property assigned to the 'first_name'
                            return { ...item, key: item.first_name };
                        });

                        // Update waiterData with modifiedWaiterData
                        setWaiterData(modifiedWaiterData);
                    } else {
                        console.warn("No 'results' array in the response data");
                    }
                } else {
                    console.warn("Status code indicates an error:", responseData.payload.status);
                }
            } catch (error) {
                console.error("Error while fetching waiter data:", error);
            }
        };

        getWaiterData();
    }, []);


    useEffect(() => {
        // Check if searchData is not empty
        if (searchData !== "") {
            // Dispatch API call
            const fetchData = async () => {
                try {
                    const responseData = await dispatch(GetOrdersHistorySlice({ restaurant_id: restaurantId, waiter: searchData, token: token, start_date: startDate, end_date: endDate }));
                    // Handle response data if needed
                } catch (error) {
                    console.error("Error fetching orders history:", error);
                }
            };
            fetchData();
        } else {
            dispatch(GetOrdersHistorySlice({ restaurant_id: restaurantId, token: token, waiter: searchData, start_date: startDate, end_date: endDate }))
            console.warn("searchData is empty, API call not dispatched");
        }
    }, [searchData, restaurantId, token]);


    useEffect(() => {
        // Check if SearchCategoryData is not null and exists within waiterData
        if (SearchCategoryData !== null) {
            const matchedWaiter = waiterData.find(waiter => waiter.key === SearchCategoryData);
            if (matchedWaiter) {
                setSearchData(matchedWaiter.key);
            } else {
                setSearchData('')
                console.warn("SearchCategoryData does not exist in waiterData");
            }
        } else {
            setSearchData('')
            console.warn("SearchCategoryData is null");
        }
    }, [SearchCategoryData, waiterData]);

    return (
        <div className='contentpart  historypage'>
            <div className='ordertitle'>
                <h2>
                    {translaterFun("orders-history")}
                </h2>
                <div className='right'>
                    <div className="input-container">
                        <img src={search} alt='search' className="search-icon" style={{ right: language === "en" ? "10px" : "", left: language === "en" ? "" : "10px" }} />
                        <SelectAndSearchComponent
                            EditTableData={undefined}
                            newFun={newfunC}
                            ManageOrderTableSelectorDataProp={waiterData}
                            placeholder={translaterFun("waiter-name")}
                            translaterFun={translaterFun}
                        />
                    </div>
                    {!dateRangeApplied ? (
                        <button onClick={handleSortByDateClick} className='sort-btn'>
                            <img src={calender} alt='calender' className='cal-img' />
                            <span>{translaterFun('sort-by-date')}</span>
                        </button>
                    ) : (
                        <button onClick={handleStartEndClick} className='date-btn'>
                            {selectedDateRange.start.format('YYYY-MM-DD')} - {selectedDateRange.end.format('YYYY-MM-DD')}
                        </button>
                    )}
                </div>
            </div>
            {showPopUp && (
                <PopUpComponent classNameValue={"dateRange-picker"}>
                    <div className='date-range-popup'>
                        <DateRangePicker
                            onSelect={handleDateRangeChange}
                            value={selectedDateRange}
                            numberOfCalendars={2}
                        />
                        <div className="button-container">
                            <button onClick={handleCancel} className='cal-btn'>{translaterFun('cancel')}</button>
                            <button onClick={handleApplyDateRange} className='apply-btn'>{translaterFun('apply')}</button>

                        </div>
                    </div>
                </PopUpComponent>
            )}

            <div className='ordertable'>
                <table>
                    <tr>
                        <th>{translaterFun("table-no")}</th>
                        <th>{translaterFun("customer-name")}</th>
                        <th>{translaterFun("quanitity")}</th>
                        <th>{translaterFun("items")}</th>
                        <th>{translaterFun("variants")}</th>
                        <th>{translaterFun("order-type")}</th>
                        <th>{translaterFun("waiter-name")}</th>
                        <th>{translaterFun("total-amount")}</th>
                    </tr>

                    {GetOrdersHistoryData?.data?.results && GetOrdersHistoryData?.data?.results?.map((bill, billId) => (
                        <tr key={billId} className={`${bill.kot.length - 1 && "lastlength"}`}>
                            <td>
                                <div>{`${bill.restaurant_table.category}   ${bill.restaurant_table.table_number}`}</div>
                            </td>

                            <td>{bill.customer_name}</td>

                            <td>
                                {bill.kot.map((kotItem, kotId) => (
                                    <div key={kotId} className={bill.kot.length > 1 ? '' : ""}>
                                        {kotItem.quantity}
                                    </div>
                                ))}
                            </td>

                            <td>
                                {bill.kot.map((kotItem, kotId) => (
                                    <div key={kotId} className={`${bill.kot.length > 1 ? '' : ""} nowrap`}>
                                        {
                                            (language === "en") ?
                                                <div className="text-container">
                                                    {kotItem?.item?.item_name_en?.length > 25 ?
                                                        <>
                                                            {kotItem?.item?.item_name_en?.slice(0, 30) + "..."}
                                                            <span className='more-text'><b>{translaterFun("more")}</b></span>
                                                            <div className="full-text">{kotItem?.item?.item_name_en}</div>
                                                        </> :
                                                        kotItem?.item?.item_name_en
                                                    }
                                                </div>
                                                :
                                                <div className="text-container">
                                                    {kotItem?.item?.item_name_native?.length > 30 ?
                                                        <>
                                                            {kotItem?.item?.item_name_native?.slice(0, 30) + "..."}
                                                            <span className='more-text'><b>{translaterFun("more")}</b></span>
                                                            <div className="full-text">{kotItem?.item?.item_name_native}</div>
                                                        </> :
                                                        kotItem?.item?.item_name_native
                                                    }
                                                </div>
                                        }

                                    </div>
                                ))}
                            </td>


                            <td>
                                {bill.kot.map((kotItem, kotId) => (
                                    <div key={kotId} className={bill.kot.length > 1 ? '' : ""}>
                                        {language === "en" ?
                                            (kotItem.variant.variant_name_en !== "" ? kotItem.variant.variant_name_en : '_')
                                            :
                                            (kotItem.variant.variant_name_native !== "" ? kotItem.variant.variant_name_native : '_')
                                        }
                                    </div>
                                ))}
                            </td>


                            <td>
                                {bill.kot.map((kotItem, kotId) => (
                                    <div key={kotId} className={bill.kot.length > 1 ? '' : ""}>
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

                            <td>
                                <div>{bill.waiter_name}</div>
                            </td>

                            <td>
                                {bill.amount} SAR
                            </td>
                        </tr>
                    ))}

                </table>

                {GetOrdersHistoryData.data && GetOrdersHistoryData.data.results.length !== 0 && (
                    <ReactPaginate
                        previousLabel={translaterFun("previous")}
                        nextLabel={translaterFun("next")}
                        pageCount={Math.ceil(GetOrdersHistoryData?.data?.count / itemsPerPage)}
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


            <LodingSpiner />
        </div>
    )
}

export default OrderHistoryBox