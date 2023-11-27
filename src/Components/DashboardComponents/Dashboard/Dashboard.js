import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './dashboard.css'
import { saveAs } from "file-saver";
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { ManagerSlice } from "../../../Redux/slices/managerSlice"
import { GetQrCodeSlice } from "../../../Redux/slices/qrCodeSlice"
import defaultImage from '../../../images/defaultImage.png'
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
import { favoriteMenuSlice } from '../../../Redux/slices/menuSlice'



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ results: [] });
  const [QrImage, setQrImage] = useState("")
  const [ActiveFavoriteCategory, setActiveFavoriteCategory] = useState({});
  const [WellWishes, setWellWishes] = useState("")


  const ManagerApiSelectorData = useSelector((state) => state.ManagerApiData?.data);
  const QrApiSelectorData = useSelector((state) => state.QrCodeApiData?.data)
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);

  let RestaurantIdLocalData = reactLocalStorage.get("RestaurantId", false); 
  let  FirstName=  reactLocalStorage.get("FirstName",false); 
  let BearerToken = reactLocalStorage.get("Token", false);

  console.log("MenuApiSelectorDatauuuuuuuu", MenuApiSelectorData)
  console.log("ActiveFavoriteCategory", ActiveFavoriteCategory)

  useEffect(() => {
    setData(ManagerApiSelectorData?.data)
    setQrImage(QrApiSelectorData?.data?.results[0]?.qrcode)
  }, [ManagerApiSelectorData, QrApiSelectorData]);

  useEffect(() => {

    let ManagerSlicePayload = {
      Token: BearerToken,
      pageination: 1
    }
    dispatch(ManagerSlice(ManagerSlicePayload))

  }, [BearerToken])


  const QrCodeDownloadFun = () => {
    let url = QrImage
    var FileSaver = require('file-saver');

    FileSaver.saveAs(QrImage, "image.jpg");

    // saveAs(url, "Twitter-logo");
  }

  useEffect(() => {

    let resturantid = RestaurantIdLocalData
    dispatch(GetQrCodeSlice(resturantid))
    dispatch(favoriteMenuSlice({ "RestaurantId": RestaurantIdLocalData }));

    // setActiveFavoriteCategory(MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.[0]?.menu_id)
  }, [])


  useEffect(() => {

    setActiveFavoriteCategory(MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.[0])
  }, [MenuApiSelectorData?.favoriteMenuSliceReducerData])


  const FavoriteCategoryTabFun = (e, categoryItem) => {
    setActiveFavoriteCategory(categoryItem);
  }



  function getGreeting(time) {

    console.log("jghadfgcds", time)
    if (time < 12) {
      return "Good morning!";
    } else if (time < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }

  // const greetingElement = document.querySelector(".greeting");
  // const time = new Date().getHours();
  // greetingElement.textContent = getGreeting(time);

  useEffect(() => {

    const time = new Date().getHours(); 
    if (time < 12) {
      setWellWishes("Good morning")
      console.log("kjbabjd", "Good morning"); 
    } else if (time < 16) {
      setWellWishes("Good afternoon")
      console.log("kjbabjd", "Good afternoon"); 
    } else {
      setWellWishes("Good evening")
      console.log("kjbabjd", "Good evening"); 
    } 

  }, [])

 

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
                    <h2> Top Dishes </h2> <button type='button'> View All <img src={arrow2} alt='img' /> </button>
                  </div>

                  <div className='topdishestabpart'>
                    <nav>
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        {/* FAVORITE DISHES MANAGEMENT */}
                        {
                          MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.map((items, favoriteId) => {
                            console.log("hdvfbjsfhvhsvh", items)
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
                        }

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
                            ActiveFavoriteCategory?.item_id?.map((favoriteItem, favoriteDishesId) => {
                              console.log("favoriteItem", favoriteItem)
                              return <li>
                                <h4>{favoriteItem?.item_name}</h4>
                                <div className='tabinfo'>
                                  <div className='leftpart'>
                                    <p>{favoriteItem?.description}</p>
                                    <span className='price'>{`$${favoriteItem?.item_price}`}</span>
                                  </div>
                                  <div className='rightpart'>
                                    <img src={favoriteItem?.image === null ? defaultImage : favoriteItem?.image} alt='img' />
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
                    <h2>Managers</h2>
                    <button type='button' onClick={(e) => navigate(`/${RestaurantIdLocalData}/admin/manager`)}> View All <img src={arrow2} alt='img' /> </button>
                  </div>
                  <div class="managerstable">
                    <table className='table'>
                      <tr className=''>
                        <th> </th>
                        <th> User Name </th>
                        <th> E-mail </th>
                        <th> Assigned to </th>
                      </tr>
                      {data?.results?.map((items, id) => {
                        console.log("dhgah", items)
                        return <tr>
                          <td> <img src={user} alt='img' /> </td>
                          <td>{`${items?.first_name}`}</td>
                          <td>{items?.email}</td>
                          <td>Lorem ipsum dolor sit amet consetur dign....</td>
                        </tr>
                      })}

                    </table>
                  </div>
                </div>
              </div>

              <div className='rightpart'>

                <div className='subplanbox'>
                  <div className='title'>
                    <h3>Subscription Plan</h3>
                    <button type='button'> View Details <img src={arrow2} alt='arrow img' />  </button>
                  </div>
                  <div className='info'>
                    <div className='leftpart'>
                      <p>Basic Plan</p>
                      <p>Start Date: 24/10/23</p>
                      <p>End Date: 24/10/23</p>
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
                    <span></span>
                    <button type='button' 
                    onClick={(e) => QrCodeDownloadFun()}
                    > 
                    {/* <a href={QrImage} download="my-file.png">Download </a> */}
                    Download
                    
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </DashboardLayout>


    </>
  )
}

export default Dashboard