import React from 'react'
import './menu.css'
import logo from '../../images/logo.svg'
import icon1 from '../../images/icon1.svg'
import icon2 from '../../images/icon2.svg'
import icon3 from '../../images/icon3.svg'
import item1 from '../../images/item1.png'
import pizza from '../../images/pizza.png'
import icon4 from '../../images/icon4.svg'
import icon5 from '../../images/icon5.svg'
import star from '../../images/star.svg'



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
              <li className='active'> <span>X</span> Pizza </li>
              <li > <span>X</span> Rolls </li>
              <li > <span>X</span> South Indian </li>
              <li> <span>X</span> Cakes </li>
              <li> <span>X</span> Juices </li>
              <li> <span>X</span> North Indian </li>
              <li> <span>X</span> Burgers </li>
              <li> <span>X</span> Pasta </li>
            </ul>
          </div>


          <div className='itemmenu'>
            <h2> <img src={pizza} alt=' pizza img' /> Pizza </h2>
            <ul className='itemlistbtn'>
              <li> <span> <img src={icon4} alt='img' /> </span> Veg </li>
              <li> <span> <img src={icon5} alt='img' /> </span> Non-Veg </li>
              <li> Bestseller </li>
              <li> Offer </li>
            </ul>

            <ul className='menuitemlist'>
              <li>
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> Lorem Ipsum dolor </h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.400 </span> 
                </div>

              </li>
              <li>
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon5} alt='img' />
                    <span style={{ background: '#EC4646' }}>Bestseller</span>
                  </div>
                  <h3> Lorem Ipsum dolor </h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.400 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li>
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> Lorem Ipsum dolor </h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.400 </span>
                </div>

              </li>
              <li>
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon5} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> Lorem Ipsum dolor </h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.400 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              
            </ul>

          </div>




        </div>
      </div>
    </>
  )
}
export default Menu