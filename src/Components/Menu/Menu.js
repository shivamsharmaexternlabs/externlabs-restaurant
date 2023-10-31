import React from 'react'
import './menu.css'
import logo from '../../images/logo.svg'
import icon1 from '../../images/icon1.svg'
import icon2 from '../../images/icon2.svg'
import icon3 from '../../images/icon3.svg'
import item1 from '../../images/item1.png'
import pizza from '../../images/pizza.png'



const Menu = () => {
  return (
    <>
      <div className='hungerbox'>
        <div>
          <div className='headerbox'>
            <div className='logo'>
              <a href='#'> <img src={logo} className='' alt='logoimg' /> </a>
            </div>
            <ul className=''>
              <li> <a href='javascript:void()'> <img src={icon1} alt='img' /> </a> </li>
              <li> <a href='javascript:void()'> <img src={icon2} alt='img' /> </a> </li>
            </ul>
          </div>
          <div className='searchbox'>
            <input type="search" placeholder='Search a food.....' />
            <button className='' type='submit'> <img src={icon3} alt='img' />  </button>
          </div>
            <div className='categorylist'>
              <h2>Categories</h2>
                <ul> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 
                  <li> 
                    <img src={pizza} alt='' />
                    <h3>Pizza</h3>  
                  </li> 

                </ul>
            </div>
          <div className='menuspeciallist'>
            <h2>Chef Special</h2>
            <div className='menuspecialbox'>
              <figure>
                <img src={item1} alt='img' />
              </figure>
              <div className='prtitext'>
                <h3>Lorem Ipsum dolor</h3>
                <div className='price'> Rs.400 </div>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <div className='startext'> 
              <div className=''> 
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <path d="M9.75016 4.55508L7.73812 6.37752L8.34084 9.09081C8.37273 9.23265 8.36363 9.3811 8.31467 9.51761C8.26571 9.65411 8.17907 9.77261 8.06558 9.85828C7.95208 9.94396 7.81677 9.99301 7.67656 9.99931C7.53635 10.0056 7.39747 9.96886 7.27726 9.89368L4.9971 8.45832L2.72184 9.89368C2.60164 9.96886 2.46275 10.0056 2.32255 9.99931C2.18234 9.99301 2.04702 9.94396 1.93353 9.85828C1.82004 9.77261 1.73339 9.65411 1.68444 9.51761C1.63548 9.3811 1.62638 9.23265 1.65827 9.09081L2.2601 6.3803L0.247611 4.55508C0.141169 4.4598 0.0641999 4.33403 0.0263565 4.19353C-0.011487 4.05304 -0.00852021 3.90407 0.0348847 3.76532C0.0782896 3.62656 0.1602 3.5042 0.270345 3.41356C0.38049 3.32293 0.513966 3.26807 0.654035 3.25585L3.30672 3.0174L4.34218 0.454129C4.39626 0.319629 4.48746 0.204741 4.60432 0.123931C4.72118 0.04312 4.85846 0 4.99888 0C5.13931 0 5.27659 0.04312 5.39345 0.123931C5.51031 0.204741 5.60151 0.319629 5.65559 0.454129L6.69417 3.0174L9.34596 3.25585C9.48603 3.26807 9.61951 3.32293 9.72965 3.41356C9.8398 3.5042 9.92171 3.62656 9.96511 3.76532C10.0085 3.90407 10.0115 4.05304 9.97364 4.19353C9.9358 4.33403 9.85883 4.4598 9.75239 4.55508H9.75016Z" fill="#FFCA28" />
                </svg>  </span>  &nbsp; 4.5 (100+)
              </div>
               <button type='button'> ADD </button> </div>
            </div>
            <div className='menuspecialbox'>
              <figure>
                <img src={item1} alt='img' />
              </figure>
              <div className='prtitext'>
                <h3>Lorem Ipsum dolor</h3>
                <div className='price'> Rs.400 </div>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <div className='startext'> 
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M9.75016 4.55508L7.73812 6.37752L8.34084 9.09081C8.37273 9.23265 8.36363 9.3811 8.31467 9.51761C8.26571 9.65411 8.17907 9.77261 8.06558 9.85828C7.95208 9.94396 7.81677 9.99301 7.67656 9.99931C7.53635 10.0056 7.39747 9.96886 7.27726 9.89368L4.9971 8.45832L2.72184 9.89368C2.60164 9.96886 2.46275 10.0056 2.32255 9.99931C2.18234 9.99301 2.04702 9.94396 1.93353 9.85828C1.82004 9.77261 1.73339 9.65411 1.68444 9.51761C1.63548 9.3811 1.62638 9.23265 1.65827 9.09081L2.2601 6.3803L0.247611 4.55508C0.141169 4.4598 0.0641999 4.33403 0.0263565 4.19353C-0.011487 4.05304 -0.00852021 3.90407 0.0348847 3.76532C0.0782896 3.62656 0.1602 3.5042 0.270345 3.41356C0.38049 3.32293 0.513966 3.26807 0.654035 3.25585L3.30672 3.0174L4.34218 0.454129C4.39626 0.319629 4.48746 0.204741 4.60432 0.123931C4.72118 0.04312 4.85846 0 4.99888 0C5.13931 0 5.27659 0.04312 5.39345 0.123931C5.51031 0.204741 5.60151 0.319629 5.65559 0.454129L6.69417 3.0174L9.34596 3.25585C9.48603 3.26807 9.61951 3.32293 9.72965 3.41356C9.8398 3.5042 9.92171 3.62656 9.96511 3.76532C10.0085 3.90407 10.0115 4.05304 9.97364 4.19353C9.9358 4.33403 9.85883 4.4598 9.75239 4.55508H9.75016Z" fill="#FFCA28" />
                </svg>
              </span> 4.5 (100+) <button type='button'> ADD </button> </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Menu