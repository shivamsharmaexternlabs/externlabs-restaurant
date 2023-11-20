
import React, { useEffect } from 'react'
import "./subscription.css"
import subicon1 from '../../images/subicon1.svg'
import subicon1h from '../../images/subicon1-h.svg'
import checkbox from '../../images/checkbox.svg'
import Stripe from 'stripe';

const Subscription = () => {


  // const stripe =  new  Stripe   ('sk_test_51O9jGdSBj5xgDd5yhzRUw4RGNDghmoH2uXTXtiG1kpDU0FIzb0TNSVwWgwBUHnB2ppfpprAKZevZ5GvXulcmdE8B00DEJ06sMQ');
  // const  products  =   stripe.products.list({
  //     limit: 3,
  //   });

  //   console.log("nxbsdsdfsd",products)


  useEffect(() => {
    const stripe =  new  Stripe('sk_test_51O9jGdSBj5xgDd5yhzRUw4RGNDghmoH2uXTXtiG1kpDU0FIzb0TNSVwWgwBUHnB2ppfpprAKZevZ5GvXulcmdE8B00DEJ06sMQ');
 
        const getProducts =  async () => {
            const  products  =   await stripe.products.list({
                limit: 3,
                expand: ['data.default_price']
              });
          
              console.log("nxbsdsdfsd",products)
        }    

        getProducts()
 
    },[]);


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
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
              <ul>
                <li className=''>
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
                </li>
                <li className='basic'>
                  <button type='button' className='rebtn'>Recommended</button>
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
                    <li className='active' > <img src={checkbox} alt='checkbox icon' /><span>User Dashboard</span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Post 3 Ads per week</span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Multiple images & videos </span> </li>
                    <li className='active'> <img src={checkbox} alt='checkbox icon' /><span>Featured ads</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Special ads badge</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Call to Action in Every Ads</span> </li>
                    <li className='disable'> <img src={checkbox} alt='checkbox icon' /><span>Max 12 team members</span> </li>

                  </ul>
                </li>

                <li className=''>
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
                </li>

              </ul>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
              <ul>
                <li> Hello </li>
                <li> Hello </li>
                <li> Hello </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Subscription
