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


const PaymentHistory = ({translaterFun}) => {

    const [subscriptionDetails, setSubscriptionDetails] = useState('')
    const [PaymentHistoryDetails, setPaymentHistoryDetails] = useState([])
    const [LoadSpiner, setLoadSpiner] = useState(false)


    const dispatch = useDispatch();
    const PaymentSelectorData = useSelector((state) => state.PaymentApiData);
    let BearerToken = reactLocalStorage.get("Token", false)

    useEffect(() => {
        const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

        const getPrice = async () => {
            const getPriceAwait = await stripe.prices.list({
                expand: ['data.product']
            });

            let filterdata = getPriceAwait?.data?.filter((item) =>
                item?.recurring?.interval == "year" || item?.recurring?.interval == "month"
            )

            setSubscriptionDetails(filterdata)
        }
        getPrice()

    }, []);


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
    
 
    const unsubscribePaymentFunc = (e, item) => {

        dispatch(UnsubscribePaymentSlice({ subscription_id: item?.subscription_id, BearerToken }))
    }



    useEffect(() => {

        if (subscriptionDetails && PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]) {

            let filterProductObject = subscriptionDetails.filter((items) =>
                items?.product?.id == PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]?.product_id

            )

            setPaymentHistoryDetails(filterProductObject)
        }

    }, [PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]])


    return (
        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart paymenthispage'>
                        <div className='title'>
                            <h2>{translaterFun("payment-history")} </h2>
                        </div>

                        <ul className='paylist'>

                            {PaymentHistoryDetails?.map((items, id) => {
                                return <li key={id}>
                                    <div className='clear'>
                                        <select >
                                            <option>{items?.recurring?.interval.charAt(0).toUpperCase() + items?.recurring?.interval.slice(1)} </option>
                                        </select>
                                    </div>
                                    <h3> {items?.product?.name.charAt(0).toUpperCase() + items?.product?.name.slice(1)} </h3>
                                    <p>{items?.product?.description}</p>
                                    <h4>{items?.currency?.toUpperCase()} {items?.unit_amount / 100}<span>/Per {items?.recurring?.interval.charAt(0).toUpperCase() + items?.recurring?.interval.slice(1)}</span></h4>
                                </li>
                            })}
                             
                        </ul>

                        <div className='paymenttable'>
                            <table>
                                <tr>
                                <th>{translaterFun("status")}</th>
                                <th>{translaterFun("amount")}</th>

                                <th>{translaterFun("start-date")}</th>

                                <th>{translaterFun("plan")}</th>

                                <th>{translaterFun("end-date")}</th>

                                <th>{translaterFun("action")}</th>


                                     
                                </tr>

                                {PaymentSelectorData?.PaymentHistoryReducerData?.data?.map((item, id) => {

                                    return <tr key={id}>
                                        <td><span className='dot dotgreen'></span> {item?.status ? "Current Plan" : "Cancelled Plan"}</td>
                                        <td>{item?.currency.toUpperCase()} {item?.amount}</td>
                                        <td>{item?.start_date}</td>
                                        <td>{item?.product_name} {translaterFun("plan")}</td>
                                        <td>{item?.end_date}</td>

                                        <td> <button type='button' className='btn1'
                                            onClick={(e) => unsubscribePaymentFunc(e, item)}
                                        > {translaterFun("cancel")}</button> </td>
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
