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
import { GetMenuCategorySlice, MenuSlice } from '../../Redux/slices/menuSlice'
import menu from '../../images/menu.svg'
import arrow from '../../images/arrow.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AnchorLink from "react-anchor-link-smooth-scroll";


const Menu = () => {


  const [ActiveCategory, setActiveCategory] = useState("")
  const [MenuToggleBookData, setMenuToggleBookData] = useState(false)
  const [CategoryTabToggleData, setCategoryTabToggleData] = useState("")
  const [MenuItemTypeToggleData, setMenuItemTypeToggleData] = useState(null)

  const [MenuItemTypeValue, setMenuItemTypeValue] = useState("")
  const [MenuItemSearchValue, setMenuItemSearchValue] = useState("")



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);

  console.log("MenuApiSelectorData===", MenuApiSelectorData);




  useEffect(() => {

    dispatch(MenuSlice());

    dispatch(GetMenuCategorySlice());


  }, []);

  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData?.data) {
      console.log("hgsfhafgss");
      // setActiveCategory(MenuApiSelectorData?.GetMenuCategoryReducerData?.data[0].menu_id)
    }


  }, [MenuApiSelectorData]);


  // const MenuCategoryFun = (e, itemsData) => {

  //   setActiveCategory(itemsData?.menu_id)

  // }

  const MenuToggleBookFun = () => {
    setMenuToggleBookData(o => !o)
  }

  const MenuCategoryIteamFun = (e, itemsData, indexId) => {
    setMenuToggleBookData(o => !o) // After select the category off the book
  }


  const CategoryTabToggleFun = (e, itemData) => {

  }

  const MenuSearchFun = (e) => {
    setMenuItemSearchValue(e.target.value)
    let MenuSlicePayload = {
      "searchValue": e.target.value,
      "itemTypeValue":MenuItemTypeValue

    }
    dispatch(MenuSlice(MenuSlicePayload));
  }

  const MenuItemTypeToggleFun = (e, itemType,indexId) => {
    setMenuItemTypeToggleData( indexId )
    setMenuItemTypeValue(itemType?.type_value)
    let MenuSlicePayload = {
      "searchValue": MenuItemSearchValue,
      "itemTypeValue":itemType?.type_value

    }
    dispatch(MenuSlice(MenuSlicePayload));

  }

  const MenuItemType = [
    {
      type_name: "Veg",
      type_value: "VEG",
      type_img: <img src={icon4} alt='img' />
    }
    ,
    {
      type_name: "Non-Veg",
      type_value: "NON_VEG",
      type_img: <img src={icon5} alt='img' />
    },
    {
      type_name: "Bestseller",
      type_value: "BESTSELLER",
      type_img: ""
    },
    {
      type_name: "Offer",
      type_value: "OFFER",
      type_img: ""
    }
  ]



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


        {/* SEARCH BOX MANAGEMENT */}
        <div className='searchbox'>
          <input type="search" placeholder='Search a food.....' onChange={(e) => MenuSearchFun(e)} />
          <button className='' type='submit'> <img src={icon3} alt='img' />  </button>
        </div>


        {/* ITEM TYPE MANAGEMENT */}
        <div className='itemmenu'>
          <ul className='itemlistbtn'>
            {MenuItemType?.map((itemType, id) => {
              return <li key={id} onClick={(e) => MenuItemTypeToggleFun(e, itemType ,id)}
                className={`${id === MenuItemTypeToggleData ? 'MenuItemActive' : ""} `}
              >
                <span> {itemType?.type_img} </span> {itemType?.type_name} </li>
            })}
          </ul>

          {/* <li> <span> <img src={icon4} alt='img' /> </span> Veg </li>
            <li> <span> <img src={icon5} alt='img' /> </span> Non-Veg </li>
            <li> Bestseller </li>
            <li> Offer </li> */}


          <div className=''>
            <div className="accordion menuitemtab" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                {
                  MenuApiSelectorData?.MenuSliceReducerData?.data?.map((items, id) => {

                    return <div id={items?.menu_id} key={id} >
                      <div className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target={`#toggle${id}`} aria-expanded="true" aria-controls={`toggle${id}`}>
                          <div className='menuitem-title' >
                            <h2> {items?.category} </h2>
                            <span onClick={(e) => CategoryTabToggleFun(e, items)}><img src={arrow} alt='img' /></span>

                          </div>
                        </button>
                      </div>

                      <div id={`toggle${id}`} className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <ul className='menuitemlist'   >
                            {items?.item_id?.map((CategoryItem, ids) => {

                              return <li key={ids} >
                                <div className='leftpart'>
                                  <div className='spbtn'>
                                    <img src={icon4} alt='img' />
                                    <span style={{ background: '#42B856' }}>Bestseller</span>
                                  </div>
                                  <h3> {CategoryItem?.item_name}</h3>
                                  <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                                  <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                                </div>
                                <div className='rightpart'>
                                  <span className='pricetext'> Rs.1212 </span>
                                  <figure> <img src={item1} alt='img' /> </figure>
                                </div>

                              </li>
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </div>

          {/* <div className='menuitemtab'>

            {
              MenuApiSelectorData?.MenuSliceReducerData?.data?.map((items, id) => {
                console.log("aschgasa", items.menu_id)
                return <div id={items?.menu_id} >
                  <div className='menuitem-title' key={id}  >
                    <h2> {items?.category} </h2>
                    <span onClick={(e) => CategoryTabToggleFun(e, items)}><img src={arrow} alt='img' /></span>

                  </div>

                 {CategoryTabToggleData==items.menu_id && <ul className='menuitemlist'   >
                    {items?.item_id?.map((CategoryItem, ids) => {

                      return <li key={ids} >
                        <div className='leftpart'>
                          <div className='spbtn'>
                            <img src={icon4} alt='img' />
                            <span style={{ background: '#42B856' }}>Bestseller</span>
                          </div>
                          <h3> {CategoryItem?.item_name}</h3>
                          <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
                          <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
                        </div>
                        <div className='rightpart'>
                          <span className='pricetext'> Rs.1212 </span>
                          <figure> <img src={item1} alt='img' /> </figure>
                        </div>

                      </li>
                    })}
                  </ul>}
                </div>

              })}
          </div>   */}

        </div>
        <div className='menulist'>
          <span onClick={(e) => MenuToggleBookFun(e)}> <img src={menu} alt='img' /> </span>
          {MenuToggleBookData && <ul>
            {MenuApiSelectorData?.GetMenuCategoryReducerData.data?.map((item, id) => {
              console.log("jgafasa", item)
              return <li key={id} onClick={(e) => MenuCategoryIteamFun(e, item, id)}>

                {/* <AnchorLink href={"#a6f08bd6-58e9-4a93-8d39-f640ae0ff01f"}> */}

                <a href={`#${item?.menu_id}`}>     {item?.category}
                </a>

                {/* </AnchorLink> */}

              </li>

            })}

          </ul>}
        </div>
      </div>
    </>
  )
}
export default Menu