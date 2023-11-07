import React, { useState } from 'react'
import './categories.css'
import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import dish1 from '../../../images/dish1.png'
import dish2 from '../../../images/dish2.png'
import dish3 from '../../../images/dish3.png'

const Categories = () => { 
    const [popUpHook, popUpHookFun] = usePopUpHook("") 
    const [loadspiner, setLoadSpiner] = useState(false);
    const PopUpToggleFun = () => {
        popUpHookFun(o => !o)
    }
    return (
        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart categorypage'>
                        <div className='title'>
                            <h2>Categories</h2>
                            <div className='btnbox'>
                                <button type='button' className='uploadbtn btn1'> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" />
                                </svg>  Upload Menu</button>
                                <button type='button' className='menubtn btn2' > <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                                </svg>
                                    Add Menu</button>
                                <button type='button' className='categorybtn btn2'> <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                                </svg>
                                    Add Categories</button>
                            </div>
                        </div>

                        <div className='categorycontent'>
                            <div className='leftpart'>
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
                            <div className='rightpart'>
                                <div className='bestsellerpart'>
                                    <h2>Bestseller</h2>
                                    <ul>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='leftpart'> 
                                                <img src={dish1} alt='img' />
                                            </div>
                                            <div className='rightpart'>
                                                <h3>OTC Pizza</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur. Blandit sapien eget non vivamus leo tellus a. Accumsan euismod </p>
                                                <span className='price'> $7.29 </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
            <LodingSpiner loadspiner={loadspiner} />

        </>
    )
}

export default Categories