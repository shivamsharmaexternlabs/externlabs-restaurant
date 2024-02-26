import React, { useEffect, useState } from 'react'
import './paymenthistory.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentHistorySlice, UnsubscribePaymentSlice } from '../../../Redux/slices/paymentSlice'
import { reactLocalStorage } from 'reactjs-localstorage'
import Stripe from 'stripe';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle'
import axios from 'axios'
import { CurrencySymbol } from '../Categories/CurrencySymbol'
import { Helmet } from "react-helmet";


/**
 * PaymentHistory Component - Displays the payment history and subscription plans.
 * 
 * @category Dashboard Component
 * @param {Function} translaterFun - Function for translating text.
 * @returns {JSX.Element} - JSX Element representing the PaymentHistory component.
 */
const PaymentHistory = ({ translaterFun }) => {

    const [SelectedMonth, setSelectedMonth] = useState("Month")
    const [PaymentHistoryDetails, setPaymentHistoryDetails] = useState([])
    const [TransactionIdArr, setTransactionIdArr] = useState([])
    const [TransactionIdObjCounter, setTransactionIdObjCounter] = useState({})
    const [LoadSpiner, setLoadSpiner] = useState(false)
    const [SubscriptionPlan, setSubscriptionPlan] = useState([])

    // const [inputs, setInputs] = useState([{ firstName: "", lastName: "" }]);

    // const handleAddInput = () => {
    //   setInputs([...inputs, { firstName: "", lastName: "" }]);
    // };

    // const handleChange = (event, index) => {
    //   let { name, value } = event.target;
    //   let onChangeValue = [...inputs];
    //   onChangeValue[index][name] = value;
    //   setInputs(onChangeValue);
    // };

    // const handleDeleteInput = (index) => {
    //   const newArray = [...inputs];
    //   newArray.splice(index, 1);
    //   setInputs(newArray);
    // };


    const dispatch = useDispatch();
    const PaymentSelectorData = useSelector((state) => state.PaymentApiData);
    let BearerToken = reactLocalStorage.get("Token", false)
    let languageSet = reactLocalStorage.get("languageSet", "en");


    // --------------------please don't remove this comment ------------------------------
    // useEffect(() => {
    //     const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

    //     const getPrice = async () => {
    //         const getPriceAwait = await stripe.prices.list({
    //             expand: ['data.product']
    //         });

    //         let filterdata = getPriceAwait?.data?.filter((item) =>
    //             item?.recurring?.interval == "year" || item?.recurring?.interval == "month"
    //         )

    //         setSubscriptionDetails(filterdata)
    //     }
    //     getPrice()

    // }, []);

    useEffect(() => {

        let getPaymentApi = async (BearerToken1) => {

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}payment/price/`,

                    {
                        headers: {
                            Authorization: `Bearer ${BearerToken1}`,
                            "Accept-Language": languageSet
                        },
                    }
                );

                // console.log("mnsbghdcshds", response)
                setSubscriptionPlan(response?.data)
                return response;

            } catch (err) {
                // toast.error(err?.response?.data?.message);
                // return rejectWithValue(err);
            }

        }

        BearerToken && getPaymentApi(BearerToken)

    }, [])


    useEffect(() => {
        const myFunc = async () => {

            if (BearerToken !== false) {
                dispatch(LoadingSpinner(true))
                try {
                    await dispatch(PaymentHistorySlice(BearerToken));
                    dispatch(LoadingSpinner(false))
                } catch (error) {
                    dispatch(LoadingSpinner(false))
                }

            }

        }

        myFunc();
    }, [BearerToken]);


    // const unsubscribePaymentFunc = async (e, item) => {

    //     let responseData = await dispatch(UnsubscribePaymentSlice({ subscription_id: item?.subscription_id, BearerToken }))
    //     console.log("jhvsdvd", responseData)
    // }



    useEffect(() => {

        let newObj = {};
        let newPaymentResponse = [];

        let newObjCounter = {};

        if (PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]) {

            PaymentSelectorData?.PaymentHistoryReducerData?.data?.map((item) => {
                if (newObjCounter[item?.transaction_id]) {
                    newObjCounter[item?.transaction_id]++;
                }
                else {
                    newObjCounter[item?.transaction_id] = 1;
                }

                if (newObj[item?.transaction_id]) {

                }
                else {
                    newObj[item?.transaction_id] = item;
                    newPaymentResponse.push(item)
                }
            })

            newPaymentResponse.sort((a, b) => {
                return b.id - a.id;
            });


            setTransactionIdArr(newPaymentResponse);
            setTransactionIdObjCounter(newObjCounter);
            // setPaymentHistoryDetails(PaymentSelectorData?.PaymentHistoryReducerData?.data)
            setPaymentHistoryDetails(newPaymentResponse)
        }





    }, [PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]])

     /**
     * Handles the change in selected month for payment history.
     *  @function PlanChangeFun
     * @category payment history Functions
     * @param {Event} e - The event object.
     * @returns {void}
     */

    const PlanChangeFun = (e) => {

        setSelectedMonth(e.target.value)
    }


    return (
        <>
            <Helmet>
                <title>Track Payment History | Harbor Bites</title>
                <meta name="description" content="Access a comprehensive record of your transaction history. Monitor payments, review invoices, and stay updated on your financial activity effortlessly." />
                {/* <link rel="icon" type="image/x-icon" href="./"/> */}
            </Helmet>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />


                    <div className='contentpart paymenthispage'>
                        <div className='title'>
                            <h2> {translaterFun("subscription-plan")} </h2>
                            <div className='selectmonth'>
                                <select className='form-select' onChange={(e) => PlanChangeFun(e)}>
                                    <option value={"Month"}> {translaterFun("monthly")} </option>
                                    <option value={"Year"}> {translaterFun("yearly")} </option>
                                </select>
                            </div>
                        </div>

                        <ul className='paylist'>

                            {SelectedMonth != "Month" ? SubscriptionPlan && SubscriptionPlan?.map((items, id) => {
                                {/* console.log("SubscriptionPlan items", items?.plan_id?.plan_id); */}
                                // console.log("TransactionIdArr huygftyguhijoihugy", TransactionIdArr?.[TransactionIdArr.length - 1]?.price_id?.plan_id?.plan_id)
                                


                                return items?.interval === translaterFun("payment-yearly") && items?.is_active === true && items?.plan_id?.language == languageSet && <li key={id}>

                                    <h3> {items?.plan_id?.name} </h3>

                                    {items?.price_id === PaymentHistoryDetails?.[PaymentHistoryDetails.length - 1]?.price_id?.price_id && <button type='button' className='btn2 planbtn' > Active <span className='dott'></span>

                                    </button>}


                                    <p>{items?.plan_id?.description}</p>
                                    <h4>
                                        {/* {`${CurrencySymbol[0][items?.currency]} ${items?.amount}`} */}
                                        {items?.currency} {items?.amount}
                                        <span>/ {items?.interval}</span></h4>
                                </li>
                            }) :
                                SubscriptionPlan && SubscriptionPlan?.map((items, id) => {

                                    return items?.interval === translaterFun("payment-montly") && items?.is_active === true && items?.plan_id?.language === languageSet && <li key={id}>

                                        <h3> {items?.plan_id?.name} </h3>
                                        {items?.price_id === PaymentHistoryDetails?.[PaymentHistoryDetails.length - 1]?.price_id?.price_id && <button type='button' className='btn2 planbtn' > Active <span className='dott'></span> </button>}
                                        <p>{items?.plan_id?.description}</p>
                                        <h4>
                                            {/* {`${CurrencySymbol[0][items?.currency]} ${items?.amount}`} */}
                                            {items?.currency} {items?.amount}

                                            <span>/ {items?.interval}</span></h4>
                                    </li>
                                })}

                        </ul>

                        <h2 className='paymenttile'>{translaterFun("payment-history")} </h2>

                        <div className='paymenttable'>
                            <table>
                                <tr>
                                    <th>{translaterFun("status")}</th>
                                    <th>{translaterFun("amount")}</th>

                                    <th>{translaterFun("start-date")}</th>

                                    <th>{translaterFun("plan")}</th>

                                    <th>{translaterFun("end-date")}</th>

                                    {/* <th>{translaterFun("action")}</th> */}



                                </tr>

                                {TransactionIdArr?.map((item, id) => {
                                    // console.log("msdvhdvsd", item?.transaction_id)


                                    return <tr key={id}>
                                        <td><span className={`dot ${TransactionIdObjCounter[item?.transaction_id] == 1 ? "dotgreen" : "dotred"}`}></span> {TransactionIdObjCounter[item?.transaction_id] == 1 ? "Current Plan" : "Expired Plan"}</td>
                                        <td>{item?.currency?.toUpperCase()} {item?.amount}</td>
                                        <td>{item?.created_at?.split("T")?.[0]}</td>
                                        <td>{item?.price_id?.plan_id?.name} </td>
                                        <td>{item?.expiry_date}</td>

                                        {/* <td>
                                             <button type='button' className='btn1'
                                            onClick={(e) => unsubscribePaymentFunc(e, item)}
                                        > {translaterFun("cancel")}</button> </td> */}
                                    </tr>
                                })}

                            </table>
                        </div>

                    </div>
                </div>
            </DashboardLayout>
            <LodingSpiner loadspiner={LoadSpiner} />

        </>
    )
}

export default PaymentHistory
