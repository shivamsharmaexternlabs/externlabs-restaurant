import React, { useEffect, useState } from "react";
 import './menucategories.css'
import DashboardLayout from "../../DashboardComponents/DashboardLayout/DashboardLayout";
import DashboardSidebar from "../../DashboardComponents/DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
 import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage"; 
import user from '../../../images/user.png' 
import ReactPaginate from 'react-paginate'; 
import { LeadsRestaurantSlice } from "../../../Redux/slices/leadsRestaurantSlice";
 import { useNavigate } from "react-router-dom";
 import "react-phone-input-2/lib/style.css";
import CreateLeadOnBoardPopUpComponent from "../../../ReusableComponents/CreateLeadOnBoardPopUpComponent/CreateLeadOnBoardPopUpComponent";



const LeadsRestaurant = () => {
   const itemsPerPage = 5;

  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpHook, popUpHookFun] = usePopUpHook("")
   
  let BearerToken = reactLocalStorage.get("Token", false);
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [CurrentPage, setCurrentPage] = useState(0); 

  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
   const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.togglenewleads);

  console.log("jhgfdszfxghjadf", ToggleBarSelectorData);

  
  useEffect(() => {

    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: 1,
    };
    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));

  }, []);


 
 
  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.
    let LeadsRestaurantSlicePayload = {
      Token: BearerToken,
      RestaurantId: RestaurantId,
      pagination: page,
    };

    dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
    setCurrentPage(page - 1);
  } 
  const RestaurantsDetailsFun = (e, items, AllData) => {
    console.log("rfgjhrfjwhr", items)
    navigate(`/admin/restaurantdetail/${items?.restaurant_id}`, {
      state: {
        page: "MenuCategory",
        currentData: items,
      }
    })
  }
 
  return (
    <>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart leadpage">
            <div className="title">
              <h2>Restaurants</h2> 
            </div> 
            <div className='managertable'>
              <table>
                <tr>
                  <th></th>
                  <th>Restaurant Name </th>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Generated Link</th>
                  <th>Action</th>
                </tr>



                {LeadsRestaurantSelectorData?.LeadsRestaurantReducerData?.data?.results?.map((items, id) => {
                  console.log("jsvsh")
                  return <tr key={id}>
                    <td> <img src={user} alt='img' /> </td>
                    <td>{items?.restaurant_name}</td>
                    <td>{`${items?.owner?.first_name} `}</td>
                    <td>{items?.owner?.email}</td>
                    <td>{items?.owner?.phone_number}</td>
                    <td> {items?.url} </td>
                    <td>
                      <button type="button" className="asbtn" onClick={(e) => RestaurantsDetailsFun(e, items)}> View </button>
                      {/* <button className='asbtn'> Transfer </button> */}
                      {/* <button className='asbtn' onClick={(e) => handleDelete(e, items)}> Delete </button> */}
                    </td>
                    {/* <td>
                      <button className='asbtn' onClick={(e) => handleDelete(e, items)}> Delete </button>
                    </td>  */}
                  </tr>
                })}

              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(LeadsRestaurantSelectorData?.LeadsRestaurantReducerData?.data?.count / itemsPerPage)}
                onPageChange={handlePageClick}
                forcePage={CurrentPage}
                disabledClassName={"disabled"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>


          </div>
        </div>
      </DashboardLayout>

      
      {ToggleBarSelectorData && <CreateLeadOnBoardPopUpComponent />}
 

 

      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};

export default LeadsRestaurant;
