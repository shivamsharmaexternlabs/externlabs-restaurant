
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

const Subscription = () => {
  const dispatch = useDispatch();
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);
  const [subscriptionDetails, setSubscriptionDetails] = useState('')

  const [SubscriptionPlanDetails, setSubscriptionPlanDetails] = useState('')

  const PaymentSelectorData = useSelector((state) => state.PaymentApiData);
 
  useEffect(() => {
    const stripe = new Stripe('sk_test_51O9jGdSBj5xgDd5yhzRUw4RGNDghmoH2uXTXtiG1kpDU0FIzb0TNSVwWgwBUHnB2ppfpprAKZevZ5GvXulcmdE8B00DEJ06sMQ');
 

    const getPrice = async () => {
      const getPriceAwait = await stripe.prices.list({
        expand: ['data.product']
      });
      
      console.log("nvsgdshdnms",getPriceAwait)

      let filterdata = getPriceAwait?.data?.filter((item) =>
        item?.recurring?.interval == "year" || item?.recurring?.interval == "month"
      )
      setSubscriptionDetails(filterdata)

    } 

    getPrice()

  }, []);


 
  useEffect(() => {
    if (PaymentSelectorData?.PaymentPostReducerData?.status === 200) {
      // window.location.replace(PaymentSelectorData?.PaymentPostReducerData?.data?.url?.url)
      window.open(PaymentSelectorData?.PaymentPostReducerData?.data?.url?.url, "_blank", "noreferrer");
    }
    else if (PaymentSelectorData?.error === "Rejected") {
      
    }
  }, [PaymentSelectorData?.PaymentPostReducerData]);

  

  const PaymentFunc = (price_id) => { 
    dispatch(PaymentPostSlice({ price_id , restaurant_id : RestaurantId}));
  }


  return (
    <>
      <div className='subscriptionpage'>
        <div className='title'>
          <h2> Explore our pricing plans</h2>
          <p>Donec ligula ligula, porta at urna non, faucibus congue urna. Nullam nulla purus, facilisis vitae odio ac, tempus aliquet dolor.</p>
        </div>

        <div className='subscriptiontabs'>
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Monthly</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Yearly</button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
              <ul>

                {subscriptionDetails && subscriptionDetails?.map((items, id) => {
                  {/* console.log("-->item", items) */}
                  return items?.recurring?.interval === "month" && items?.product?.active === true && <li key={id} className=''>
                    <div className='title'>
                      <div className='iconbox'>
                        <img src={subicon1} alt='img' className='img' />
                        <img src={subicon1h} alt='img' className='activeimg'/>
                      </div>
                      <h3>{items?.currency?.toUpperCase()} {items?.unit_amount / 100}<span>/per {items?.recurring?.interval}</span></h3>
                    </div>
                    <div className='info'>
                      <h4>{items?.product?.name?.charAt(0)?.toUpperCase() + items?.product?.name?.slice(1)}</h4>
                      <p>{items?.product?.description}</p>

                      <button type='button' onClick={() => PaymentFunc(items.id)}>
                        Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                        </svg>
                      </button>
                    </div>
                    <ul className='infolist'>
                      {items?.product?.features?.map((item, id) => {
                        return <li> <img src={checkbox} alt='checkbox icon' /><span>{item.name}</span> </li>
                      })
                      }
                      {/* <li> <img src={checkbox} alt='checkbox icon' /><span>Post 3 Ads per week</span> </li>
                      <li> <img src={checkbox} alt='checkbox icon' /><span>Multiple images & videos </span> </li>
                      <li> <img src={checkbox} alt='checkbox icon' /><span>Featured ads</span> </li>
                      <li> <img src={checkbox} alt='checkbox icon' /><span>Special ads badge</span> </li>
                      <li> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li>
                      <li> <img src={checkbox} alt='checkbox icon' /><span>Max 12 team members</span> </li> */}
                    </ul>
                  </li>
                })}


                {/* <li className='basic'>
                  <button type='button' className='rebtn'>Recommended</button>
                  <div className='title'>
                    <div className='iconbox'>
                      <img src={subicon2} alt='img' className='img' />
                      <img src={subicon2h} alt='img' className='activeimg' />
                    </div>
                    <h3> SAR89<span> /Per Month</span></h3>
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



              </ul>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
              <ul>

                {subscriptionDetails && subscriptionDetails?.map((items, id) => {
                  {/* let price_id = items?.id; */ }
                  return items?.recurring?.interval === "year" && items?.product?.active === true && <li className=''>
                    <div className='title'>
                      <div className='iconbox'>
                        <img src={subicon1} alt='img' className='img' />
                        <img src={subicon1h} alt='img' className='activeimg' />
                      </div>
                      <h3>{items?.currency.toUpperCase()} {items?.unit_amount / 100}<span>/per {items?.recurring?.interval}</span></h3>
                    </div>
                    <div className='info'>
                      <h4>{items?.product?.name.charAt(0).toUpperCase() + items?.product?.name.slice(1)}</h4>
                      <p>{items?.product?.description}</p>
                      <button type='button' onClick={() => PaymentFunc(items.id)}>
                        Get Started
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="8" viewBox="0 0 22 8">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" />
                        </svg>
                      </button>
                    </div>
                    <ul className='infolist'>
                      {items?.product?.features?.map((item, id) => {
                        return <li> <img src={checkbox} alt='checkbox icon' /><span>{item.name}</span> </li>
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
