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


const PaymentHistory = ({ translaterFun }) => {

    const [SelectedMonth, setSelectedMonth] = useState("Month")
    const [PaymentHistoryDetails, setPaymentHistoryDetails] = useState([])
    const [LoadSpiner, setLoadSpiner] = useState(false)
    const [SubscriptionPlan, setSubscriptionPlan] = useState([])



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

                console.log("mnsbghdcshds", response)
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


    const unsubscribePaymentFunc = async (e, item) => {

        let responseData = await dispatch(UnsubscribePaymentSlice({ subscription_id: item?.subscription_id, BearerToken }))
        console.log("jhvsdvd", responseData)
    }



    useEffect(() => {

        // if (subscriptionDetails && PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]) {

        //     let filterProductObject = subscriptionDetails.filter((items) =>
        //         items?.product?.id == PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]?.product_id

        //     )

        //     setPaymentHistoryDetails(filterProductObject)
        // }
        if (PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]) {
            setPaymentHistoryDetails(PaymentSelectorData?.PaymentHistoryReducerData?.data)
        }

    }, [PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]])

    console.log("kjhjgjhdbsd", SubscriptionPlan)


    const PlanChangeFun=(e)=>{

        setSelectedMonth(e.target.value)
    }

    console.log("ldkjfsdf",SelectedMonth)

    return (
        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart paymenthispage'>
                        <div className='title'>
                            <h2> Subscription Plan </h2>
                            <div className='selectmonth'>
                                <select className='form-select' onChange={(e)=>PlanChangeFun(e)}>
                                    <option value={"Month"}> Month </option>
                                    <option  value={"Year"}> Year </option>
                                </select>
                            </div>
                        </div>

                        <ul className='paylist'>

                            { SelectedMonth != "Month" ? SubscriptionPlan && SubscriptionPlan?.map((items, id) => {
                                console.log("mndbsbsfds", items)
                                return items?.interval === "year" && items?.is_active === true && items?.plan_id?.language === languageSet && <li key={id}>

                                    <h3> {items?.plan_id?.name} </h3>
                                    <p>{items?.plan_id?.description}</p>
                                    <h4>
                                         {/* {`${CurrencySymbol[0][items?.currency]} ${items?.amount}`} */}
                                        {items?.currency} {items?.amount}
                                    <span>/ {items?.interval}</span></h4>
                                </li>
                            }) :
                            SubscriptionPlan && SubscriptionPlan?.map((items, id) => {
                                console.log("mndbsbsfds", items)
                                return items?.interval === "month" && items?.is_active === true && items?.plan_id?.language === languageSet && <li key={id}>

                                    <h3> {items?.plan_id?.name} </h3>
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

                                {PaymentSelectorData?.PaymentHistoryReducerData?.data?.map((item, id) => {

                                    return <tr key={id}>
                                        <td><span className='dot dotgreen'></span> {item?.status ? "Current Plan" : "Cancelled Plan"}</td>
                                        <td>{item?.currency.toUpperCase()} {item?.amount}</td>
                                        <td>{item?.created_at.split("T")[0]}</td>
                                        <td>{item?.product_name} {translaterFun("plan")}</td>
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
