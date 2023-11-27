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

import star from '../../images/star.svg'
import { GetMenuCategorySlice, MenuSlice } from '../../Redux/slices/menuSlice'
import menu from '../../images/menu.svg'
import arrow from '../../images/arrow.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom' 
import { reactLocalStorage } from 'reactjs-localstorage'
import LodingSpiner from '../LoadingSpinner/LoadingSpinner'

const Menu = () => {
  const [ActiveCategory, setActiveCategory] = useState("")
  const [MenuToggleBookData, setMenuToggleBookData] = useState(false)
  const [CategoryTabToggleData, setCategoryTabToggleData] = useState(false)
  const [MenuItemTypeToggleData, setMenuItemTypeToggleData] = useState(null) 
  const [MenuItemTypeValue, setMenuItemTypeValue] = useState("")
  const [MenuItemSearchValue, setMenuItemSearchValue] = useState("")
  const [loadspiner, setLoadSpiner] = useState(false);


  const  params = useLocation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);

  console.log("MenuApiSelec22torData", MenuApiSelectorData);

  let splitdata =params?.pathname.split("/")[1] 
  reactLocalStorage.set("RestaurantId",splitdata); 

  useEffect(() => { 
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);
      
    }
   else if(MenuApiSelectorData?.error == "Rejected"){
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.MenuSliceReducerData.status === 200) {
      setLoadSpiner(false);
       
    }
   else if(MenuApiSelectorData?.error == "Rejected"){
      setLoadSpiner(false);
    }
  }, [MenuApiSelectorData?.GetMenuCategoryReducerData,MenuApiSelectorData?.MenuSliceReducerData]);

  useEffect(() => {
    if(params?.pathname){ 
      setLoadSpiner(true); 
        
         

        let MenuSlicePayload = {
          "searchValue": undefined,
          "itemTypeValue": undefined,
          "RestaurantId":splitdata
    
        } 

        dispatch(MenuSlice(MenuSlicePayload));  
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }
}, [params])

 
   
  // useEffect(() => {
  //   if(CategoryTabToggleData==false){
  //     setMenuItemTypeToggleData(null)
  //     // setCategoryTabToggleData(o=>!o)
  //   }
    

  // }, [ MenuItemTypeToggleData]);


  // const MenuCategoryFun = (e, itemsData) => {

  //   setActiveCategory(itemsData?.menu_id)

  // }

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
      "RestaurantId":splitdata

    }
    dispatch(MenuSlice(MenuSlicePayload));
  }

  const MenuItemTypeToggleFun = (e, itemType, indexId) => {
    setMenuItemTypeToggleData(indexId)
    setMenuItemTypeValue(itemType?.type_value)
    let MenuSlicePayload = {
      "searchValue": MenuItemSearchValue,
      "itemTypeValue": itemType?.type_value, 
      "RestaurantId":splitdata

    }
    dispatch(MenuSlice(MenuSlicePayload));

  }

  const toggleOffFun =()=>{
    setMenuItemTypeToggleData("")
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
        <div className='hadertopbar'>
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
        </div>
        <div className='specialbox'></div>


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
                                {CategoryItem?.item_type==="NON_VEG" ? <img src={icon5} alt='img' /> : <img src={icon4} alt='img' />}
                                {/* {CategoryItem?.item_type==="NON_VEG" ? <img src={icon5} alt='img' /> : <img src={icon4} alt='img' />} */}
                                {CategoryItem?.is_favorite === true && <span className={`bestcallerBackgroun`}>Bestseller</span>}
                              </div>
                              <h3> {CategoryItem?.item_name}</h3>
                              <p>{CategoryItem?.description}</p>
                              {/* <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div> */}
                              <div className='startxt'> <img src={calorie} alt="img" /> {CategoryItem?.calories + " " + CategoryItem?.calories_unit}</div>
                            </div>
                            <div className='rightpart'>
                              <span className='pricetext'>{CategoryItem?.currency} {CategoryItem?.item_price} </span>
                             {CategoryItem?.image !=null&& <figure> <img src={CategoryItem?.image} alt='img' /> </figure>}

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
          {MenuItemSearchValue ==="" &&<span onClick={(e) => MenuToggleBookFun(e)}> <img src={menu} alt='img' /> </span>}
          {MenuItemSearchValue ==="" && MenuToggleBookData &&<ul>
            {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map((item, id) => {
                console.log("jgafasa", item)
                return  <li li key={id} onClick={(e) => MenuCategoryIteamFun(e, item, id)}>  
              <a href={`#${item?.menu_id}`} className={`${item?.menu_id === ActiveCategory ? 'active' : ""} ,${item?.menu_id ? 'active' : ""} ` }>    
               {item?.category}
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



// import React, { useEffect, useState } from 'react'
// import './menu.css'
// import logo from '../../images/logo.svg'
// import icon1 from '../../images/icon1.svg'
// import icon2 from '../../images/icon2.svg'
// import icon3 from '../../images/icon3.svg'
// import item1 from '../../images/item1.png'
// import pizza from '../../images/pizza.png'
// import icon4 from '../../images/icon4.svg'
// import icon5 from '../../images/icon5.svg'
// import star from '../../images/star.svg'
// import { GetMenuCategorySlice, MenuSlice } from '../../Redux/slices/menuSlice'
// import menu from '../../images/menu.svg'
// import arrow from '../../images/arrow.svg'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import AnchorLink from "react-anchor-link-smooth-scroll";


// const Menu = () => {

//   const [CurrentActiveCategory, setCurrentActiveCategory] = useState("");
//   const [CategoryToggleArray, setCategoryToggleArray] = useState({});


//   const [ActiveCategory, setActiveCategory] = useState("");
//   const [MenuToggleBookData, setMenuToggleBookData] = useState(false);
//   const [CategoryTabToggleData, setCategoryTabToggleData] = useState("");
//   const [MenuItemTypeToggleData, setMenuItemTypeToggleData] = useState(null);
//   const [MenuItemTypeValue, setMenuItemTypeValue] = useState("");
//   const [MenuItemSearchValue, setMenuItemSearchValue] = useState("");



//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const MenuApiSelectorData = useSelector((state) => state.MenuApiData);

//   // console.log("MenuApiSelectorData===", MenuApiSelectorData);


//   useEffect(() => {
//     let CategoryArrayOfObj = {};
//     MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map((category, id) => {

//       CategoryArrayOfObj[category?.menu_id] = true;
//       // let menuIdkey = category?.menu_id;
//       // return CategoryArrayOfObj.push({
//       //   menuIdkey: true
//       // })
//     })
//     setCategoryToggleArray(CategoryArrayOfObj)

//     // console.log("==========CategoryArrayOfObj=======", CategoryArrayOfObj)

//   }, [MenuApiSelectorData?.GetMenuCategoryReducerData])

//   // setCategoryToggleArray(CategoryArrayOfObj);


//   // console.log("==========CategoryToggleArray=======", CategoryToggleArray)
//   useEffect(() => {

//     dispatch(MenuSlice());
//     dispatch(GetMenuCategorySlice());
    

//   }, []);

//   useEffect(() => {
//     if (MenuApiSelectorData?.GetMenuCategoryReducerData?.data) {

//       // MenuApiSelectorData?.MenuSliceReducerData?.data?.results?.map((item,)=>{


//       // })
//       console.log("hgsfhafgss");
//       // setActiveCategory(MenuApiSelectorData?.MenuSliceReducerData?.data[0].menu_id)
//     }
//     console.log("CategoryTabToggleFun CategoryToggleArray", CategoryToggleArray)

//   }, [MenuApiSelectorData]);


//   // const MenuCategoryFun = (e, itemsData) => {

//   //   setActiveCategory(itemsData?.menu_id)

//   // }

//   const MenuToggleBookFun = () => {
//     setMenuToggleBookData(o => !o)
//   }

//   const MenuCategoryIteamFun = (e, itemsData, indexId) => {
//     setMenuToggleBookData(o => !o) // After select the category off the book
//     setActiveCategory(itemsData?.menu_id)
//   }


//   const CategoryTabToggleFun = (e, itemData) => {

//     let menuId = itemData?.menu_id;
    
//     setCategoryToggleArray(previousState => {
      
//       previousState[menuId] = !previousState[menuId];
//       return previousState
//     })


//   }

//     console.log("==========CategoryToggleArray=======", CategoryToggleArray)


//   const MenuSearchFun = (e) => {
//     setMenuItemSearchValue(e.target.value)
//     let MenuSlicePayload = {
//       "searchValue": e.target.value,
//       "itemTypeValue": MenuItemTypeValue

//     }
//     dispatch(MenuSlice(MenuSlicePayload));
//   }

//   const MenuItemTypeToggleFun = (e, itemType, indexId) => {
//     setMenuItemTypeToggleData(indexId)
//     setMenuItemTypeValue(itemType?.type_value)
//     let MenuSlicePayload = {
//       "searchValue": MenuItemSearchValue,
//       "itemTypeValue": itemType?.type_value

//     }
//     dispatch(MenuSlice(MenuSlicePayload));

//   }

//   const toggleOffFun = () => {
//     setMenuItemTypeToggleData("")
//   }

//   const MenuItemType = [
//     {
//       type_name: "Veg",
//       type_value: "VEG",
//       type_img: <img src={icon4} alt='img' />
//     }
//     ,
//     {
//       type_name: "Non-Veg",
//       type_value: "NON_VEG",
//       type_img: <img src={icon5} alt='img' />
//     },
//     {
//       type_name: "Bestseller",
//       type_value: "BESTSELLER",
//       type_img: ""
//     },
//     {
//       type_name: "Offer",
//       type_value: "OFFER",
//       type_img: ""
//     }
//   ]






//   return (
//     <>
//       <div className='menupage'>
//         <div className='hadertopbar'>
//           <div className='headerbox'>
//             <div className='logo'>
//               <a href='#'> <img src={logo} className='' alt='logoimg' /> </a>
//             </div>
//             <ul className=''>
//               <li> <a href='javascript:void()'> <img src={icon1} alt='img' /> </a> </li>
//               <li> <a href='javascript:void()'> <img src={icon2} alt='img' /> </a> </li>
//             </ul>
//           </div>


//           {/* SEARCH BOX MANAGEMENT */}

//           <div className='searchbox'>
//             <input type="search" placeholder='Search a food.....' onChange={(e) => MenuSearchFun(e)} />
//             <button className='' type='submit'> <img src={icon3} alt='img' />  </button>
//           </div>
//           <ul className='itemlistbtn'>
//             {MenuItemType?.map((itemType, id) => {
//               return <li key={id} onClick={(e) => MenuItemTypeToggleFun(e, itemType, id)}
//                 className={`${id === MenuItemTypeToggleData ? 'MenuItemActive' : ""}`}
//               >
//                 <span className='icon'>  {itemType?.type_img} </span>

//                 {itemType?.type_name}

//                 {/* <span className='crossbtn' onClick={()=>toggleOffFun()} >  x</span> */}
//               </li>
//             })}
//           </ul>
//         </div>
//         <div className='specialbox'></div>


//         {/* ITEM TYPE MANAGEMENT */}

//         {/* <li> <span> <img src={icon4} alt='img' /> </span> Veg </li>
//             <li> <span> <img src={icon5} alt='img' /> </span> Non-Veg </li>
//             <li> Bestseller </li>
//             <li> Offer </li> */}


//         {/* CATEGORY COMPONENT */}
//         <div className='menuitemtabsection  '>
//           <div className="accordion menuitemtab" id="accordionPanelsStayOpenExample">

//             {
//               MenuApiSelectorData?.MenuSliceReducerData?.data?.map((items, id) => {
//                 // console.log("single category item data", items);
//                 return <div id={items?.menu_id} key={id} className='accordion-item' >
//                   <div className="accordion-header">
//                     <button className="accordion-button" type="button" data-bs-toggle="collapse"
//                       data-bs-target={`#toggle${id}`} aria-expanded="true" aria-controls={`toggle${id}`}>
//                       <div className='menuitem-title' >
//                         <h2> {items?.category} </h2>
//                         <span onClick={(e) => CategoryTabToggleFun(e, items)}><img src={arrow} alt='img' /></span>

//                       </div>
//                     </button>
//                   </div>
// {/* ${CategoryToggleArray?.includes(items?.menu_id)==items?.menu_id?"d-none":""} */}
//                   {/* SINGLE ITEM COMPONENT UNDER SPECIFIC CATEGORY */}
//                   <div id={`toggle${id}`} className={`accordion-collapse collapse show`}>
//                     <div className="accordion-body">
//                       <ul className='menuitemlist'   >
//                         {items?.item_id?.map((CategoryItem, ids) => {

//                           return <li key={ids} >
//                             <div className='leftpart'>
//                               <div className='spbtn'>
//                                 <img src={icon4} alt='img' />
//                                 <span style={{ background: '#42B856' }}>Bestseller</span>
//                               </div>
//                               <h3> {CategoryItem?.item_name}</h3>
//                               <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. </p>
//                               <div className='startxt'> <img src={star} alt="img" />  4.5 (100+) </div>
//                             </div>
//                             <div className='rightpart'>
//                               <span className='pricetext'> Rs.1212 </span>
//                               <figure> <img src={item1} alt='img' /> </figure>
//                             </div>

//                           </li>
//                         })}
//                       </ul>
//                     </div>
//                   </div>


//                 </div>
//               })
//             }

//           </div>


//         </div>
//         <div className='menulist'>
//           {MenuItemSearchValue === "" && <span onClick={(e) => MenuToggleBookFun(e)}> <img src={menu} alt='img' /> </span>}
//           {MenuItemSearchValue === "" && MenuToggleBookData && <ul>
//             {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map((item, id) => {
//               console.log("jgafasa", item)
//               return <li li key={id} onClick={(e) => MenuCategoryIteamFun(e, item, id)}>
//                 <a href={`#${item?.menu_id}`} className={`${item?.menu_id === ActiveCategory ? 'active' : ""} ,${item?.menu_id ? 'active' : ""} `}>
//                   {item?.category}
//                 </a>
//               </li>

//               {/* <li  > 
            
//               <a href={`#2`}  >   shvam2
//               </a>

//             </li>
//             <li    >
 
//               <a href={`#3`}  >   shvam3
//               </a>

//             </li>
//             <li    >


 

//               <a href={`#4`}  >   shvam4
//               </a>

//             </li>
//             <li    >
 
//               <a href={`#5`}  >   shvam5
//               </a>

//             </li>
//             <li >
 
//               <a href={`#6`}  >   shvam6
//               </a>

//             </li>
//             <li    >
 
//               <a href={`#7`}  >   shvam7
//               </a>

//             </li> */}

//             })}

//           </ul>}
//         </div>

//       </div>
//     </>
//   )
// }
// export default Menu