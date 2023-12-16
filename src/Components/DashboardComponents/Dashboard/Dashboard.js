import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import { saveAs } from "file-saver";
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { ManagerSlice } from "../../../Redux/slices/managerSlice"
import { GetQrCodeSlice } from "../../../Redux/slices/qrCodeSlice"
// import defaultImage from '../../../images/defaultImage.png'
import defaultImage from '../../../images/defaultimg.svg'

import arrow2 from '../../../images/arrow2.svg'
import dish1 from '../../../images/dish1.png'
import dish2 from '../../../images/dish2.png'
import dish3 from '../../../images/dish3.png'
import user from '../../../images/user.png'
import item2 from '../../../images/item2.svg'
import qrimg from '../../../images/qr.png'
import menimg from '../../../images/men.png'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { MenuSlice, favoriteMenuSlice } from '../../../Redux/slices/menuSlice'
import { PaymentHistorySlice } from '../../../Redux/slices/paymentSlice';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import { useTranslation } from "react-i18next"
import { CurrencySymbol } from '../Categories/CurrencySymbol';
 

const Dashboard = ({ translaterFun }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [data, setData] = useState({ results: [] });
  const [QrImage, setQrImage] = useState("")
  const [LoadSpiner, setLoadSpiner] = useState(false)

  const [ActiveCategory, setActiveCategory] = useState({});
  const [WellWishes, setWellWishes] = useState("")


  const ManagerApiSelectorData = useSelector((state) => state.ManagerApiData?.data);
  const QrApiSelectorData = useSelector((state) => state.QrCodeApiData?.data)
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
  const PaymentSelectorData = useSelector((state) => state.PaymentApiData);

  let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false);
  let FirstName = reactLocalStorage.get("FirstName", false);
  let BearerToken = reactLocalStorage.get("Token", false);
  let languageSet = reactLocalStorage.get("languageSet", false);


 
  useEffect(() => {
    setData(ManagerApiSelectorData?.data)
    setQrImage(QrApiSelectorData?.data?.results[0]?.qrcode)
  }, [ManagerApiSelectorData, QrApiSelectorData]);

  useEffect(() => {


    const GetApiCallFun = async () => {

      if (BearerToken !== false) {
        dispatch(LoadingSpinner(true))

        try {
          let ManagerSlicePayload = {
            Token: BearerToken,
            pageination: 1
          }
          await dispatch(ManagerSlice(ManagerSlicePayload))
          await dispatch(PaymentHistorySlice(BearerToken));

          // we don't need token for these api's

          await dispatch(GetQrCodeSlice(RestaurantIdLocalData))
          await dispatch(MenuSlice({ "RestaurantId": RestaurantIdLocalData }));

          dispatch(LoadingSpinner(false))

        } catch (error) {
          dispatch(LoadingSpinner(false))
        }
      }
    }
    GetApiCallFun()

  }, [BearerToken])



  const QrCodeDownloadFun = () => {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(QrImage, "QrDownload.jpg");
  }



  // for favorite top dishes don't delete this comment
  // useEffect(() => {

  //   setActiveFavoriteCategory(MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.[0])
  // }, [MenuApiSelectorData?.favoriteMenuSliceReducerData])


  useEffect(() => {
    setActiveCategory(MenuApiSelectorData?.MenuSliceReducerData?.data?.[0])
  }, [MenuApiSelectorData?.MenuSliceReducerData])

  // for favorite top dishes  don't delete this comment
  // const FavoriteCategoryTabFun = (e, categoryItem) => {
  //   setActiveFavoriteCategory(categoryItem);
  // }

  const CategoryTabFun = (e, categoryItem) => {
    setActiveCategory(categoryItem);
  }





  useEffect(() => {

    const time = new Date().getHours();
    if (time < 12) {
      setWellWishes(translaterFun("good-morning"))
    } else if (time < 16) {
      setWellWishes(translaterFun("good-afternoon"))
    } else {
      setWellWishes(translaterFun("good-evening"))
    }

  }, [])
  i18n.on("languageChanged", () => {
    const time = new Date().getHours();
    if (time < 12) {
      setWellWishes(translaterFun("good-morning"))
    } else if (time < 16) {
      setWellWishes(translaterFun("good-afternoon"))
    } else {
      setWellWishes(translaterFun("good-evening"))
    }
  })

  let filterdata

  return (
    <>
      <DashboardLayout  >
        <div className='dasboardbody'>
          <DashboardSidebar />
          <div className='contentpart dashboardpage'>
            <div className='bannerbox'>
              <h2> {WellWishes}</h2>
              <h3> {FirstName}</h3>
            </div>

            <div className='viewall-part'>
              <div className='leftpart'>
                <div className='topdishespart'>
                  <div className='title'>
                    <h2>{translaterFun("menu-items")}
                      {/* Menu Items */}
                    </h2> <button type='button' onClick={() => { navigate(`/${RestaurantIdLocalData}/admin/categories`) }}> {translaterFun("view-all")}<img src={arrow2} alt='img' /> </button>
                  </div>

                  <div className='topdishestabpart'>
                    <nav>
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">

                        {/* MENU DISHES MANAGEMENT */}
                        {
                          MenuApiSelectorData?.MenuSliceReducerData?.data?.slice(0, 7)?.map((items, Id) => {
                            return <button key={Id} onClick={(e) => CategoryTabFun(e, items)} class={`nav-link ${items?.menu_id == ActiveCategory?.menu_id ? "active" : ""}`} id="nav-dishes1-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes1" type="button" role="tab" aria-controls="nav-dishes1" aria-selected="true">
                              <div>
                                <figure>
                                  <img src={items?.category_image === null ? defaultImage : items?.category_image} alt="img" className="catg-img" />
                                </figure>
                                <h3>{languageSet == "en" ? items?.category_en : items?.category_native}</h3>

                                {/* <div className='buttonbox'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                    <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                </div> */}

                              </div>
                            </button>

                          })
                        }


                        {/* FAVORITE DISHES MANAGEMENT
                        {
                          MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.map((items, favoriteId) => {
                            return <button key={favoriteId} onClick={(e) => FavoriteCategoryTabFun(e, items)} class={`nav-link ${items?.menu_id == ActiveFavoriteCategory?.menu_id ? "active" : ""}`} id="nav-dishes1-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes1" type="button" role="tab" aria-controls="nav-dishes1" aria-selected="true">
                              <div>
                                <figure>
                                  <img src={items?.category_image === null ? defaultImage : items?.category_image} alt="img" className="catg-img" />
                                </figure>
                                <h3>{items?.category}</h3>
                                <div className='buttonbox'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
                                    <path d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768" stroke-width="1.10009" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                </div>
                              </div>
                            </button>

                          })
                        } */}

                        {/* <button class="nav-link active" id="nav-dishes1-tab" data-bs-toggle="tab" data-bs-target="#nav-dishes1" type="button" role="tab" aria-controls="nav-dishes1" aria-selected="true">
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
                        </button> */}

                      </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane fade show active" id="nav-dishes1" role="tabpanel" aria-labelledby="nav-dishes1-tab" tabindex="0">
                        <ul>
                          {
                            ActiveCategory?.item_id?.slice(0, 4).map((Item, DishesId) => {
                              return <li>
                                <h4>{languageSet === "en" ? Item?.item_name_en : Item?.item_name_native}</h4>
                                <h5 className='mt-1'> {Item?.calories} {Item?.calories_unit}</h5>
                                <div className='tabinfo'>
                                  <div className='leftpart'>
                                    <p>
                                      {
                                        (languageSet == "en") ?
                                          <>

                                            {Item?.description_en?.length > 45 ? Item?.description_en.slice(0, 45) + "..." : Item?.description_en}
                                            <span>{Item?.description_en?.length > 45 ? <b>{translaterFun("more")} <div className=''>{Item?.description_en} </div> </b> : ""}  </span>
                                          </>
                                          :
                                          <>
                                            {Item?.description_native?.length > 45 ? Item?.description_native.slice(0, 45) + "..." : Item?.description_native}
                                            <span>{Item?.description_native?.length > 45 ? <b>{translaterFun("more")} <div className=''>{Item?.description_native} </div> </b> : ""}  </span>
                                          </>
                                      }
                                      {/* {Item?.description?.length > 45 ? Item?.description.slice(0, 45) + "..." : Item?.description}
                                      <span>{Item?.description?.length > 45 ? <b>{translaterFun("more")}<div className=''>{Item?.description} </div> </b> : ""}  </span> */}
                                    </p>
                                    {/* {Item?.description}
                                      {Item?.description?.length} */}
                                       
                                    <span className='price'>{`${CurrencySymbol[0][Item?.currency]} ${Item?.item_price}`}</span>
                                  </div>
                                  <div className='rightpart'>
                                    <img src={Item?.image === null ? defaultImage : Item?.image} alt='img' />
                                  </div>
                                </div>
                              </li>

                            })
                          }

                          {/* <li>
                            <h4>Spaghetti</h4>
                            <div className='tabinfo'>
                              <div className='leftpart'>
                                <p>Lorem ipsum dolor sit amet consectetur.</p>
                                <span className='price'>$7.287789</span>
                              </div>
                              <div className='rightpart'>
                                <img src={dish3} alt='img' />
                              </div>
                            </div>
                          </li> */}


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
                    <h2>{translaterFun("managers")}</h2>
                    <button type='button' onClick={(e) => navigate(`/${RestaurantIdLocalData}/admin/manager`)}>
                      {translaterFun("view-all")} <img src={arrow2} alt='img' /> </button>
                  </div>
                  <div class="managerstable">
                    <table className='table'>
                      <tr className=''>
                        <th> </th>
                        <th> {translaterFun("user-name")} </th>
                        <th> {translaterFun("e-mail")} </th>
                        <th>{translaterFun("mobile-no")}</th>
                        {/* <th> User Name </th>
                        <th> E-mail </th>
                        <th> Assigned to </th> */}
                      </tr>
                      {data?.results?.slice(0, 2)?.map((items, id) => {
                        console.log("zjdcghdcvsd", items)
                        return <tr>
                          <td> <img src={user} alt='img' /> </td>
                          <td>{`${items?.first_name}`}</td>
                          <td>{items?.email}</td>
                          <td>{items?.phone_number}</td>                        </tr>
                      })}

                    </table>
                  </div>
                </div>
              </div>

              <div className='rightpart'>

                <div className='subplanbox'>
                  <div className='title'>
                    <h3> {translaterFun("subscription-plan")} </h3>
                    <button type='button' onClick={() => navigate(`/${RestaurantIdLocalData}/admin/paymenthistory`)}> {translaterFun("view-all")} <img src={arrow2} alt='arrow img' />  </button>
                  </div>
                  {console.log("xchjvhgcvc", PaymentSelectorData)}
                  <div className='info'>
                    <div className='leftpart'>
                      <p>{PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]?.price_id?.plan_id
                        ?.name} {translaterFun("plan")} </p>
                      <p>{translaterFun("start-date")} :  {PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]?.created_at.split("T")[0]}</p>
                      <p>{translaterFun("end-date")} : {PaymentSelectorData?.PaymentHistoryReducerData?.data?.[0]?.expiry_date}</p>
                    </div>
                    <div className='rightpart'>
                      <img src={item2} alt='img' />
                    </div>
                  </div>

                </div>
                <div className='qrbox'>
                  <div className='menbox'>
                    <img src={QrImage} alt='uploadmenu' className='qrimg' />
                    <img src={menimg} alt='img' className='qrmenimg' />

                  </div>
                  <div className='info'>
                    {/* <span></span> */}
                    <button type='button'
                      onClick={(e) => QrCodeDownloadFun()}
                    >
                      {/* <a href={QrImage} download="my-file.png">Download </a> */}
                      {/* Download Now */}
                      {translaterFun("download-now")}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </DashboardLayout>
      <LodingSpiner loadspiner={LoadSpiner} />


    </>
  )
}

export default Dashboard
