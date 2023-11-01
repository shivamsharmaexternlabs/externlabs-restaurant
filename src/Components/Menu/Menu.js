import React, { useEffect, useState } from 'react'
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
import { MenuSlice } from '../../Redux/slices/menuSlice'
import { useDispatch, useSelector } from 'react-redux'


const Menu = () => {


  const [ActiveCategory, setActiveCategory] = useState(null)

  const dispatch = useDispatch();
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData?.data[0]?.data?.results);

  console.log("MenuApiSelectorData===", MenuApiSelectorData);




  useEffect(() => {

    dispatch(MenuSlice());


  }, []);


  const MenuCategoryFun = (e, itemsData) => {

    setActiveCategory(itemsData?.menu_id)


  }




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
              {MenuApiSelectorData?.map((items, id) => {
                console.log("chhasas", items)
                return <li key={id} className={ActiveCategory == null ? id === 0 ? "active" : "" : items?.menu_id === ActiveCategory ? 'active' : ""} onClick={(e) => MenuCategoryFun(e, items)}>  {items?.category} </li>
              })}
              {/* <li className='active'> <span>X</span> Pizza </li> */}
              {/* <li className='active'>  Pizza </li>
              <li > <span>X</span> Rolls </li>
              <li > <span>X</span> South Indian </li>
              <li> <span>X</span> Cakes </li>
              <li> <span>X</span> Juices </li>
              <li> <span>X</span> North Indian </li>
              <li> <span>X</span> Burgers </li>
              <li> <span>X</span> Pasta </li> */}
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
              {/* {MenuApiSelectorData?.map((items, id) => {
                console.log("chhasas", items)
                // return <li key={id} className={ActiveCategory ==null? id===0 ?"active": "": items?.menu_id === ActiveCategory?'active':"" } onClick={(e)=>MenuCategoryFun(e,items)}>  {items?.category} </li> 
                return <li>
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
              })} */}

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