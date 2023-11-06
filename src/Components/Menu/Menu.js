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
import menu from '../../images/menu.svg'
import arrow from '../../images/arrow.svg'
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

  useEffect(() => {
    if (MenuApiSelectorData) {
      setActiveCategory(MenuApiSelectorData[0])
    }

  }, [MenuApiSelectorData]);


  const MenuCategoryFun = (e, itemsData) => {

    setActiveCategory(itemsData)

  }




  return (
    <>
      <div className='menupage'>
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
        {/* <div className='categorylist'>
          <h2>Categories</h2>
          <ul>
            {MenuApiSelectorData?.map((items, id) => {
              console.log("chhasas", items)
              return <li key={id} className={items === ActiveCategory ? "active" : ""} onClick={(e) => MenuCategoryFun(e, items)}>  {items?.category} </li>
            })}
          </ul>
        </div> */}
        <div className='itemmenu'>
          {/* <h2> <img src={pizza} alt=' pizza img' /> {ActiveCategory?.category} </h2> */}
          <ul className='itemlistbtn'>
            <li> <span> <img src={icon4} alt='img' /> </span> Veg </li>
            <li> <span> <img src={icon5} alt='img' /> </span> Non-Veg </li>
            <li> Bestseller </li>
            <li> Offer </li>
          </ul>


          <div className='menuitemtab'>
            <div className='menuitem-title'>
              <h2> farwew </h2> <span><img src={arrow} alt='img' /></span>
            </div>
            <ul className='menuitemlist'>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>
              <li >
                <div className='leftpart'>
                  <div className='spbtn'>
                    <img src={icon4} alt='img' />
                    <span style={{ background: '#42B856' }}>Bestseller</span>
                  </div>
                  <h3> demoi</h3>
                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                </div>
                <div className='rightpart'>
                  <span className='pricetext'> Rs.1212 </span>
                  <figure> <img src={item1} alt='img' /> </figure>
                </div>

              </li>

              {/* {ActiveCategory?.item_id?.map((items, id) => {

                 return <li key={id}>
                  <div className='leftpart'>
                    <div className='spbtn'>
                      <img src={items[4] === "VEG" ? icon4 : icon5} alt='img' />
                      <span style={{ background: '#42B856' }}>Bestseller</span>
                    </div>
                    <h3> {items[1]}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                    <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                  </div>
                  <div className='rightpart'>
                    <span className='pricetext'> Rs.{items[2]} </span>
                    <figure> <img src={item1} alt='img' /> </figure>
                  </div>

                </li>
              })} */}

            </ul>
          </div>

        </div>
        <div className='menulist'>
          <span> <img src={menu} alt='img' /> </span>
          <ul>
            <li>Pizza </li>
            <li>Pizza </li>
            <li>Pizza </li>
            <li>Pizza </li>
            <li>Pizza </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Menu