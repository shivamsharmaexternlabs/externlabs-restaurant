import React,{useEffect, useState} from 'react' 
import './dashboard.css'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import arrow2 from '../../../images/arrow2.svg'
import dish1 from '../../../images/dish1.png'
import dish2 from '../../../images/dish2.png'
import dish3 from '../../../images/dish3.png'
import user from '../../../images/user.png'
 

const Dashboard = () => {

 
 

    
 
  return (
    <>
      <DashboardLayout  >
        <div className='dasboardbody'>
          <DashboardSidebar   />
          <div className='contentpart dashboardpage'>
            <div className='bannerbox'>
              <h2> Good Morning</h2>
              <h3> Austine Robertson</h3>
              <div className='text-end'>
                <button type='button' className='btn me-3'>Add Manager </button>
                <button type='button' className='btn'>Add Menu </button>
              </div>
            </div>

            <div className='viewall-part'>
              <div className='leftpart'>
                <div className='topdishespart'>
                  <div className='title'>
                    <h2> Top Dishes </h2> <button type='button'> View All <img src={arrow2} alt='img' /> </button>
                  </div>

                  <div className='topdishestabpart'>
                    <nav>
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-dishes1-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes1" type="button" role="tab" aria-controls="nav-dishes1" aria-selected="true">
                          <div>
                            <figure>
                              <img src={dish1} alt="img" />
                            </figure>
                            <h3>Pizza</h3>
                            <div className='buttonbox'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        <button class="nav-link " id="nav-dishes2-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes2" type="button" role="tab" aria-controls="nav-dishes2" aria-selected="true">
                          <div>
                            <figure>
                              <img src={dish2} alt="img" />
                            </figure>
                            <h3>Pizza</h3>
                            <div className='buttonbox'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </button>



                        <button class="nav-link " id="nav-dishes3-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes3" type="button" role="tab" aria-controls="nav-dishes3" aria-selected="true">
                          <div>
                            <figure>
                              <img src={dish2} alt="img" />
                            </figure>
                            <h3>Pizza</h3>
                            <div className='buttonbox'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </button>

                      </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane fade show active" id="nav-dishes1" role="tabpanel" aria-labelledby="nav-dishes1-tab" tabindex="0">
                        <ul>
                          <li>
                            <h4>Spaghetti</h4>
                            <div className='tabinfo'>
                              <div className='leftpart'>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <span className='price'>$7.29</span>
                              </div>
                              <div className='rightpart'>
                                <img src={dish3} alt='img' />
                              </div>
                            </div>
                          </li>
                          <li>
                            <h4>Spaghetti</h4>
                            <div className='tabinfo'>
                              <div className='leftpart'>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <span className='price'>$7.29</span>
                              </div>
                              <div className='rightpart'>
                                {/*    <img src={dish3} alt='img' /> */}
                              </div>
                            </div>
                          </li>
                          <li>
                            <h4>Spaghetti</h4>
                            <div className='tabinfo'>
                              <div className='leftpart'>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <span className='price'>$7.29</span>
                              </div>
                              <div className='rightpart'>
                                <img src={dish3} alt='img' />
                              </div>
                            </div>
                          </li>
                          <li>
                            <h4>Spaghetti</h4>
                            <div className='tabinfo'>
                              <div className='leftpart'>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <span className='price'>$7.29</span>
                              </div>
                              <div className='rightpart'>
                                {/* <img src={dish3} alt='img' /> */}
                              </div>
                            </div>
                          </li>

                        </ul>
                      </div>

                      <div class="tab-pane fade" id="nav-dishes2" role="tabpanel" aria-labelledby="nav-dishes2-tab" tabindex="0">
                        <ul>
                          <li>
                            <h4>Spaghetti</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>Vegetable Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>Mushroom Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>OTC Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                        </ul>
                      </div>

                      <div class="tab-pane fade" id="nav-dishes3" role="tabpanel" aria-labelledby="nav-dishes3-tab" tabindex="0">
                        <ul>
                          <li>
                            <h4>Spaghetti</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>Vegetable Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>Mushroom Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                          <li>
                            <h4>OTC Pizza</h4>
                            <p>Lorem ipsum dolor sit amet consectetur.</p>
                            <span className='price'>$7.29</span>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>

                <div className='managerstablepart'>
                  <div className='title'>
                    <h2>Managers</h2>
                    <button type='button'> View All <img src={arrow2} alt='img' /> </button>
                  </div>
                  <div class="managerstable">
                    <table className='table'>
                      <tr className=''>
                        <th> </th>
                        <th> User Name </th>
                        <th> E-mail </th>
                        <th> Assigned to </th>
                      </tr>
                      <tr>
                        <td> <img src={user} alt='img' /> </td>
                        <td> Landon Kirby </td>
                        <td> Landonkirby@gmail.com </td>
                        <td> Lorem ipsum dolor sit amet consetur dign.... </td>
                      </tr>
                      <tr>
                        <td> <img src={user} alt='img' /> </td>
                        <td> Landon Kirby </td>
                        <td> Landonkirby@gmail.com </td>
                        <td> Lorem ipsum dolor sit amet consetur dign.... </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className='rightpart'>

              </div>
            </div>

          </div>
        </div>


      </DashboardLayout>


    </>
  )
}

export default Dashboard