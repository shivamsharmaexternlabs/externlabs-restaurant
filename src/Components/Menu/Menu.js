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
import calorie from '../../images/calorie.png'
import defaultImage from '../../images/defaultimg.png'

import globe from '../../images/Globe.svg'

import star from '../../images/star.svg'
import { GetMenuCategorySlice, MenuSlice } from '../../Redux/slices/menuSlice'
import menu from '../../images/menu.svg'
import arrow from '../../images/arrow.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import LodingSpiner from '../LoadingSpinner/LoadingSpinner'
import { LanguageChange } from '../../Redux/slices/sideBarToggle'

const Menu = ({ translaterFun }) => {
  const [ActiveCategory, setActiveCategory] = useState("")
  const [MenuToggleBookData, setMenuToggleBookData] = useState(false)
  const [languageToggleValue, setlanguageToggleValue] = useState("")
  const [MenuItemTypeToggleData, setMenuItemTypeToggleData] = useState(null)
  const [MenuItemTypeValue, setMenuItemTypeValue] = useState("")
  const [MenuItemSearchValue, setMenuItemSearchValue] = useState("")
  const [loadspiner, setLoadSpiner] = useState(false);


  const [languagesDataKey, setlanguagesDataKey] = useState("")
  const [languagesDataValue, setlanguagesDataValue] = useState("English")
const [SelectToggleValue,setSelectToggleSelectTogglealue] = useState(false)


  const params = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);


  let splitdata = params?.pathname.split("/")[1]
  reactLocalStorage.set("RestaurantId", splitdata);
  let languageSet = reactLocalStorage.get("languageSet", false);

  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);

    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.MenuSliceReducerData.status === 200) {
      setLoadSpiner(false);

    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [MenuApiSelectorData?.GetMenuCategoryReducerData, MenuApiSelectorData?.MenuSliceReducerData]);

  useEffect(() => {
    if (params?.pathname) {
      setLoadSpiner(true);



      let MenuSlicePayload = {
        "searchValue": undefined,
        "itemTypeValue": undefined,
        "RestaurantId": splitdata

      }

      dispatch(MenuSlice(MenuSlicePayload));
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }
  }, [params])


  const MenuToggleBookFun = () => {
    setMenuToggleBookData(o => !o)
  }

  const MenuCategoryIteamFun = (e, itemsData, indexId) => {
    setMenuToggleBookData(o => !o) // After select the category off the book
    setActiveCategory(itemsData?.menu_id)
  }


  const CategoryTabToggleFun = (e, itemData) => {

  }

  const MenuSearchFun = (e) => {
    setMenuItemSearchValue(e.target.value)
    let MenuSlicePayload = {
      "searchValue": e.target.value,
      "itemTypeValue": MenuItemTypeValue,
      "RestaurantId": splitdata

    }
    dispatch(MenuSlice(MenuSlicePayload));
  }

  const MenuItemTypeToggleFun = (e, itemType, indexId) => {
    setMenuItemTypeToggleData(indexId)
    setMenuItemTypeValue(itemType?.type_value)
    let MenuSlicePayload = {
      "searchValue": MenuItemSearchValue,
      "itemTypeValue": itemType?.type_value,
      "RestaurantId": splitdata

    }
    dispatch(MenuSlice(MenuSlicePayload));

  }

  const toggleOffFun = () => {
    setMenuItemTypeToggleData("")
  }

  const MenuItemType = [
    {
      type_name: translaterFun("veg"),
      type_value: "VEG",
      type_img: <img src={icon4} alt='img' />
    }
    ,
    {
      type_name: translaterFun("non-veg"),
      type_value: "NON_VEG",
      type_img: <img src={icon5} alt='img' />
    },
    {
      type_name: translaterFun("bestseller"),
      type_value: "BESTSELLER",
      type_img: ""
    },
    {
      type_name: translaterFun("offer"),
      type_value: "OFFER",
      type_img: ""
    }
  ]

  let languageDAta= reactLocalStorage.get("languageSet", false);

  const LanguageFun = (e) => {
    // i18n.changeLanguage(value)  
    dispatch(LanguageChange(e.target.value))
    setlanguageToggleValue(e.target.value)
    reactLocalStorage.set("languageSet", e.target.value);


  }
  let languageData = [
    { value: "en", key: "English" },
    { value: "ar", key: "عربي" }

  ]

  useEffect(()=>{
    if(languageDAta !==false ){
      setlanguageToggleValue(languageDAta)
      dispatch(LanguageChange(languageDAta))

    }

       


  },[languageDAta])


  

  const languageDataFun =(e,value,key)=>{
    setlanguagesDataValue(  value=="English"?"عربي":"English")
    setlanguagesDataKey(key)
    setSelectToggleSelectTogglealue(o=>!o)
    reactLocalStorage.set("languageSet", key);
  }

  const openSelectToggleFun=()=>{
    setSelectToggleSelectTogglealue(o=>!o)
  }
  


  return (
    <>
      <div className={`menupage ${languageDAta=="en"?"rotateEn rotate":"rotateAe rotate"} `}>
        <div className='hadertopbar'>
          <div className='headerbox'>
            <div className='logo'>
              <a href='#'> <img src={logo} className='' alt='logoimg' /> </a>
            </div>

            <div className='languagebox'>

            <div className='languaselist'>
            <img src={globe} alt='Language img' className='globeimg'/>
            <button className='' onClick={(e)=>openSelectToggleFun()}> {languagesDataValue} </button>
            {SelectToggleValue && <ul className=''  >
              {languageData?.map((items,id)=>{
               return  <li onClick={(e)=>languageDataFun(e,items?.key,items?.value)}> {items?.key}  </li> 
              })} 
            </ul>}
          </div>
              {/* <select className='form-select' onChange={(e) => LanguageFun(e)}> 
                {languageData?.map((items, id) => {
                  return <option selected={languageDAta==items?.value?"select":""} value={items?.value}>{items?.key}</option>
                })}

              </select> */}
              {/* <button type='button' className='' onClick={(e) => LanguageFun("en")}>
                  English
                </button>
                <button type='button' className='' onClick={(e) => LanguageFun("ar")}>
                  عربي
                </button> */}
            </div>


            {/* <ul className=''>
              <li> <a href='javascript:void()'> <img src={icon1} alt='img' /> </a> </li>
              <li> <a href='javascript:void()'> <img src={icon2} alt='img' /> </a> </li>
            </ul> */}

          </div>


          {/* SEARCH BOX MANAGEMENT */}

          <div className='searchbox'>
            <input type="search" placeholder={translaterFun("search-a-food")} onChange={(e) => MenuSearchFun(e)} />
            <button className='' type='submit'> <img src={icon3} alt='img' />  </button>
          </div>
          <div className='line'></div>
          <ul className='itemlistbtn'>
            {MenuItemType?.map((itemType, id) => {
              return <li key={id} onClick={(e) => MenuItemTypeToggleFun(e, itemType, id)}
                className={`${id === MenuItemTypeToggleData ? 'MenuItemActive' : ""}`}
              >
                <span className='icon'>  {itemType?.type_img}   </span>

                {itemType?.type_name}

                {/* {MenuItemTypeToggleData==id&& <span className='crossbtn' onClick={()=>toggleOffFun()} >  x</span>} */}
              </li>
            })}
          </ul>
          <div className='line'></div>
        </div>

        {/* <div className='specialbox'></div> */}


        {/* ITEM TYPE MANAGEMENT */}



        {/* <li> <span> <img src={icon4} alt='img' /> </span> Veg </li>
            <li> <span> <img src={icon5} alt='img' /> </span> Non-Veg </li>
            <li> Bestseller </li>
            <li> Offer </li> */}
        {/* {/* <div className='menuitemtabsection'> */}


        <div className='menuitemtabsection  '>
          <div className="accordion menuitemtab" id="accordionPanelsStayOpenExample">

            {
              MenuApiSelectorData?.MenuSliceReducerData?.data?.map((items, id) => {

                return <div id={items?.menu_id} key={id} className='accordion-item' >
                  <div className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target={`#toggle${id}`} aria-expanded="true" aria-controls={`toggle${id}`}>
                      <div className='menuitem-title' >
                        <h2> {languageSet == "en" ? items?.category_en : items?.category_native} </h2>
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
                                {CategoryItem?.is_non_veg ? <img src={icon5} alt='img' /> : <img src={icon4} alt='img' />}
                                
                                {CategoryItem?.is_favorite === true && <span className={`bestcallerBackgroun`}>{translaterFun("bestseller")}</span>}
                              </div>
                              <h3> {languageSet == "en" ? CategoryItem?.item_name_en : CategoryItem?.item_name_native} </h3>
                              <p> {languageSet == "en" ? CategoryItem?.description_en : CategoryItem?.description_native} </p>
                              {/* <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div> */}
                              <div className='startxt'> <img src={calorie} alt="img" /> {CategoryItem?.calories + " " + CategoryItem?.calories_unit}</div>
                            </div>
                            <div className='rightpart'>
                              <span className='pricetext'>{CategoryItem?.currency} {CategoryItem?.item_price} </span>
                               <figure> <img src={CategoryItem?.image === null ? defaultImage : CategoryItem?.image} alt='img' /> </figure>

                              {/* <figure> <img src={item1} alt='img' /> </figure> */}
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
        <div className='menulist'>
          {MenuItemSearchValue === "" && <span onClick={(e) => MenuToggleBookFun(e)}> <img src={menu} alt='img' /> </span>}
          {MenuItemSearchValue === "" && MenuToggleBookData && <ul>
            {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map((item, id) => {
              return <li li key={id} onClick={(e) => MenuCategoryIteamFun(e, item, id)}>
                <a href={`#${item?.menu_id}`} className={`${item?.menu_id === ActiveCategory ? 'active' : ""} ,${item?.menu_id ? 'active' : ""} `}>
                {languageSet == "en" ? item?.category_en : item?.category_native}
                </a>
              </li>
            })}

          </ul>}
        </div>

      </div>
      <LodingSpiner loadspiner={loadspiner} />
    </>
  )
}
export default Menu

