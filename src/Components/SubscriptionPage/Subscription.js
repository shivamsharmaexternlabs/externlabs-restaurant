
import React, { useEffect, useState } from 'react'
import "./subscription.css"
import subicon1 from '../../images/subicon1.svg'
import subicon1h from '../../images/subicon1-h.svg'
import checkbox from '../../images/checkbox.svg'
import subicon2h from '../../images/subicon1-h.svg'
import subicon2 from '../../images/subicon2.svg'
import Stripe from 'stripe';
import { useDispatch, useSelector } from 'react-redux'
import { PaymentPostSlice } from '../../Redux/slices/paymentSlice'
import { reactLocalStorage } from 'reactjs-localstorage'
import DashboardHeader from '../DashboardComponents/DashboardHeader/DashboardHeader'
import usePopUpHook from '../../CustomHooks/usePopUpHook/usePopUpHook'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";

const Subscription = ({ translaterFun }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let RestaurantId = reactLocalStorage.get("RestaurantId", false);
  let BearerToken = reactLocalStorage.get("Token", false);
  let languageSet = reactLocalStorage.get("languageSet", "en");

  const [subscriptionDetails, setSubscriptionDetails] = useState('')
  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [SubscriptionPlan, setSubscriptionPlan] = useState([])

  const PaymentSelectorData = useSelector((state) => state.PaymentApiData);
  const LanguageSelected = reactLocalStorage.get("languageSet", false);


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

  console.log("subscriptionDetailsdfgfds", subscriptionDetails)



  useEffect(() => {
    if (PaymentSelectorData?.PaymentPostReducerData?.status === 200) {
      // window.location.replace(PaymentSelectorData?.PaymentPostReducerData?.data?.url?.url)
      console.log("jgvgfssdds", PaymentSelectorData?.PaymentPostReducerData)
      window.location.href = PaymentSelectorData?.PaymentPostReducerData?.data?.url?.transaction?.url;
      // navigate(`/${PaymentSelectorData?.PaymentPostReducerData?.data?.url?.transaction?.url}`,);
    }
    else if (PaymentSelectorData?.error === "Rejected") {

    }
  }, [PaymentSelectorData?.PaymentPostReducerData]);



  const PaymentFunc = (price_id) => {
    dispatch(PaymentPostSlice({ price_id, restaurant_id: RestaurantId, BearerToken }));
  }


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



  let subscriptionDetails1 =
    [
      {
        "price_id": "d8f0be5f-95ec-4b51-bc56-12af58f6f374",
        "is_active": true,
        "interval": "month",
        "amount": 500.0,
        "currency": "SAR",
        "created_at": "2023-12-15T08:31:54.479543Z",
        "updated_at": "2023-12-15T08:31:54.479554Z",
        "plan_id": {
          "plan_id": "d8b00d32-ab3c-4a36-80b7-3aeffde66d35",
          "name": "Basic",
          "description": "this is my field",
          "features": [
            {
              "name": "Online Presence"
            },
            {
              "name": "Digital Menu"
            },
            {
              "name": "Admin Panel"
            },
            {
              "name": "Managers (Upto 2)"
            },
            {
              "name": "Printed Stickers (Upto 4)"
            }
          ],
          "language": "en",
          "is_active": true,
          "created_at": "2023-12-15T08:30:07.384022Z",
          "updated_at": "2023-12-15T08:30:07.384043Z"
        }
      },
      {
        "price_id": "5c74b700-a888-4f3e-b10e-e37fbf0a6bd3",
        "is_active": true,
        "interval": "year",
        "amount": 800.0,
        "currency": "SAR",
        "created_at": "2023-12-15T08:32:08.452038Z",
        "updated_at": "2023-12-15T08:32:08.452081Z",
        "plan_id": {
          "plan_id": "d8b00d32-ab3c-4a36-80b7-3aeffde66d35",
          "name": "Basic",
          "description": "this is my field",
          "features": [
            {
              "name": "Online Presence"
            },
            {
              "name": "Digital Menu"
            },
            {
              "name": "Admin Panel"
            },
            {
              "name": "Managers (Upto 2)"
            },
            {
              "name": "Printed Stickers (Upto 4)"
            }
          ],
          "language": "en",
          "is_active": true,
          "created_at": "2023-12-15T08:30:07.384022Z",
          "updated_at": "2023-12-15T08:30:07.384043Z"
        }
      },
      {
        "price_id": "3f30bfe1-8882-40c2-bd2e-1e374aec2400",
        "is_active": true,
        "interval": "month",
        "amount": 541.0,
        "currency": "SAR",
        "created_at": "2023-12-15T08:32:19.065124Z",
        "updated_at": "2023-12-15T08:32:19.065150Z",
        "plan_id": {
          "plan_id": "613c4aea-0ae7-4b8d-b1cd-0a0a76da1772",
          "name": "premium",
          "description": "fhbuvih",
          "features": [
            {
              "name": "Online Presence"
            },
            {
              "name": "Digital Menu"
            },
            {
              "name": "Admin Panel"
            },
            {
              "name": "Managers (Upto 2)"
            },
            {
              "name": "Printed Stickers (Upto 4)"
            }
          ],
          "language": "en",
          "is_active": true,
          "created_at": "2023-12-15T08:30:27.326744Z",
          "updated_at": "2023-12-15T08:30:27.326757Z"
        }
      },
      {
        "price_id": "bc68de58-6fbc-4c93-8856-23bfbeb459d9",
        "is_active": true,
        "interval": "year",
        "amount": 8744.0,
        "currency": "SAR",
        "created_at": "2023-12-15T08:32:29.424164Z",
        "updated_at": "2023-12-15T08:32:29.424177Z",
        "plan_id": {
          "plan_id": "613c4aea-0ae7-4b8d-b1cd-0a0a76da1772",
          "name": "premium",
          "description": "fhbuvih",
          "features": [
            {
              "name": "Online Presence"
            },
            {
              "name": "Digital Menu"
            },
            {
              "name": "Admin Panel"
            },
            {
              "name": "Managers (Upto 2)"
            },
            {
              "name": "Printed Stickers (Upto 4)"
            }
          ],
          "language": "en",
          "is_active": true,
          "created_at": "2023-12-15T08:30:27.326744Z",
          "updated_at": "2023-12-15T08:30:27.326757Z"
        }
      }
    ]

  return (
    <>
      <Helmet>
        <title>Subscription Plans | Harbor Bites </title>
        <meta name="description" content="Browse through tailored subscription plans exclusively designed for restaurants. Discover your options and features without the need for alterations. Find the ideal plan to elevate your establishment." />
        {/* <link rel="icon" type="image/x-icon" href="./"/> */}
      </Helmet>
      <DashboardHeader popUpHookFun={popUpHookFun} />
      <div className='subscriptionpage'>
        <div className='title'>
          <h2> {translaterFun("explore-our-pricing-plans")}</h2>
          {/* <p> Donec ligula ligula, porta at urna non, faucibus congue urna. Nullam nulla purus, facilisis vitae odio ac, tempus aliquet dolor.</p> */}
        </div>

        <div className='subscriptiontabs'>
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{translaterFun("monthly")}</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">{translaterFun("yearly")}</button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
              <ul>

                {SubscriptionPlan && SubscriptionPlan?.map((items, id) => {
                  console.log("sjdhsjddf", items)
                  return items?.interval === "month" && items?.is_active === true && items?.plan_id?.language === LanguageSelected && <li key={id} className=''>
                    <div className='title'>
                      <div className='iconbox'>
                        <img src={subicon1} alt='img' className='img' />
                        <img src={subicon1h} alt='img' className='activeimg' />
                      </div>
                      <h3>{items?.currency?.toUpperCase()} {items?.amount}<span>/{translaterFun("per")} {translaterFun(items?.interval)}</span></h3>
                    </div>
                    <div className='info'>
                      <h4>{items?.plan_id?.name}</h4>
                      <p>{items?.plan_id?.description}</p>

                      <button type='button' onClick={() => PaymentFunc(items?.price_id)}>
                        {translaterFun("get-started")}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                        </svg>
                      </button>
                    </div>
                    <ul className='infolist'>
                      {items?.plan_id?.features?.map((item, id) => {
                        return (<li className={item?.active != true ? "disable" : ""} >
                          <img src={checkbox} alt='checkbox icon' />
                          <span > {item?.name}</span>
                        </li>)
                      })
                      }

                      {/* {items?.plan_id?.features?.map((item, id) => {
                        return (!item?.active && <li className={item?.active != true ? "disable" : ""} >
                          <img src={checkbox} alt='checkbox icon' />
                          <span > {item?.name}</span>
                        </li>)
                      })
                      } */}
                      {/* <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li> */}



                    </ul>
                  </li>
                })}



              </ul>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
              <ul>

                {SubscriptionPlan && SubscriptionPlan?.map((items, id) => {
                  {/* let price_id = items?.id; */ }
                  return items?.interval === "year" && items?.is_active === true && items?.plan_id?.language === LanguageSelected && <li className=''>
                    <div className='title'>
                      <div className='iconbox'>
                        <img src={subicon1} alt='img' className='img' />
                        <img src={subicon1h} alt='img' className='activeimg' />
                      </div>
                      <h3>{items?.currency.toUpperCase()} {items?.amount}<span>/{translaterFun("per")} {translaterFun(items?.interval)}</span></h3>
                    </div>
                    <div className='info'>
                      <h4>{items?.plan_id?.name}</h4>
                      <p>{items?.plan_id?.description}</p>
                      <button type='button' onClick={() => PaymentFunc(items?.price_id)}>
                        {translaterFun("get-started")}
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                        </svg>
                      </button>
                    </div>
                    <ul className='infolist'>
                      {/* {items?.plan_id?.features?.map((item, id) => {
                        return <li> <img src={checkbox} alt='checkbox icon' /><span>{item.name}</span> </li>
                      })
                      } */}

                      {items?.plan_id?.features?.map((item, id) => {
                        return (<li className={item?.active != true ? "disable" : ""} >
                          <img src={checkbox} alt='checkbox icon' />
                          <span > {item?.name}</span>
                        </li>)
                      })
                      }

                    </ul>
                  </li>
                })}


                {/* <li className=''>
                  <div className='title'>
                    <div className='iconbox'>
                      <img src={subicon1} alt='img' className='img' />
                      <img src={subicon1h} alt='img' className='activeimg' />
                    </div>
                    <h3>SAR49<span>/Per Year</span></h3>
                  </div>
                  <div className='info'>
                    <h4>Basic</h4>
                    <p>Upgrade your social portfolio with a stunning profile & enhanced shots.</p>
                    <button type='button'>
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                        <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                      </svg>
                    </button>
                  </div>
                  <ul className='infolist'>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>User Dashboard</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Post 3 Ads per week</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Multiple images & videos </span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Featured ads</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Special ads badge</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Max 12 team members</span> </li>
                  </ul>
                </li> */}

                {/* <li className='basic'>
                  <button type='button' className='rebtn'>Recommended</button>
                  <div className='title'>
                    <div className='iconbox'>
                      <img src={subicon2} alt='img' className='img' />
                      <img src={subicon2h} alt='img' className='activeimg' />
                    </div>
                    <h3> SAR89<span> /Per Year</span></h3>
                  </div>
                  <div className='info'>
                    <h4>Premium</h4>
                    <p>Upgrade your social portfolio with a stunning profile & enhanced shots.</p>
                    <button type='button'>
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                        <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                      </svg>
                    </button>
                  </div>
                  <ul className='infolist'>
                    <li className='active' > <img src={checkbox} alt='checkbox icon' /><span>User Dashboard</span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Post 3 Ads per week</span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Multiple images & videos </span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Featured ads</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Special ads badge</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Max 12 team members</span> </li>

                  </ul>
                </li> */}

                {/* <li className=''>
                  <div className='title'>
                    <div className='iconbox'>
                      <img src={subicon1} alt='img' className='img' />
                      <img src={subicon1h} alt='img' className='activeimg' />
                    </div>
                    <h3> $21<span>/Per Month</span></h3>
                  </div>
                  <div className='info'>
                    <h4>Basic</h4>
                    <p>Upgrade your social portfolio with a stunning profile & enhanced shots.</p>
                    <button type='button'>
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3.75 12H20.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <ul className='infolist'>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>User Dashboard</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Post 3 Ads per week</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Multiple images & videos </span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Featured ads</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Special ads badge</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li>
                    <li> <img src={checkbox} alt='checkbox icon' /><span>Max 12 team members</span> </li>

                  </ul>
                </li> */}

              </ul>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Subscription
