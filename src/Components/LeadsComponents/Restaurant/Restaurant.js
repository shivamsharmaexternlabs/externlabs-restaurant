import React, { useEffect, useState } from "react";
import './Restaurant.css'
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
import { LoadingSpinner } from "../../../Redux/slices/sideBarToggle";
import { Helmet } from "react-helmet";


/**
 * Leads Restaurant Component - Displays a list of leads with pagination functionality.
 * @category Dashboard Component
 * @param {Object} props - Component props.
 * @param {Function} props.translaterFun - A function for translating text.
 * @returns {JSX.Element} - JSX Element representing the Leads component.
 */
const LeadsRestaurant = ({ translaterFun }) => {
  const itemsPerPage = 5;

  const [LoadSpiner, setLoadSpiner] = useState(false)
  const [popUpHook, popUpHookFun] = usePopUpHook("")

  let BearerToken = reactLocalStorage.get("Token", false);
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [CurrentPage, setCurrentPage] = useState(0);

  const LeadsRestaurantSelectorData = useSelector((state) => state.LeadsRestaurantApiData);
  const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.togglenewleads);



  useEffect(() => {
    const myFunc = async () => {
      if (BearerToken !== false) {
        await dispatch(LoadingSpinner(true))
        try {
          let LeadsRestaurantSlicePayload = {
            Token: BearerToken,
            RestaurantId: RestaurantId,
            pagination: 1,
          };
          await dispatch(LeadsRestaurantSlice(LeadsRestaurantSlicePayload));
          await dispatch(LoadingSpinner(false))
        } catch (error) {
          await dispatch(LoadingSpinner(false))
        }
      }
    }
    myFunc();
  }, [BearerToken]);



/**
   * Handles page change event.
   * Fetches leads data for the selected page and updates the current page state.
   * @function handlePageClick
   * @category LeadsResturant Functions
   * @param {Object} selectedPage - Selected page object.
   * @returns {void}
   */
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


  /**
   * Navigates to lead details page.
   * @function RestaurantsDetailsFun
   * @category LeadsResturant Functions
   * @param {Event} e - Click event.
   * @param {Object} items - Lead item details.
   * @returns {void}
   */
  const RestaurantsDetailsFun = (e, items, AllData) => {
    navigate(`/admin/restaurantdetail/${items?.restaurant_id}`, {
      state: {
        page: "restaurant",
        currentData: items,
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>On-boarded Restaurants | Harbor Bites</title>
        <meta name="description" content="Manage your onboarded restaurants within our network." />
        {/* <link rel="icon" type="image/x-icon" href="./"/> */}
      </Helmet>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          <div className="contentpart leadpage">
            <div className="title">
              <h2>{translaterFun("restaurants")}</h2>
            </div>
            <div className='managertable'>
              <table>
                <tr>
                  <th></th>
                  <th>{translaterFun("restaurant-name")}</th>
                  <th>{translaterFun("name")}</th>
                  <th>{translaterFun("email")}</th>
                  <th>{translaterFun("mobile-no")}</th>
                  <th>{translaterFun("generated-link")}</th>
                  <th>{translaterFun("action")}</th>
                </tr>

                {LeadsRestaurantSelectorData?.LeadsRestaurantReducerData?.data?.results?.map((items, id) => {
                  return <tr key={id}>
                    <td> <img src={user} alt='img' /> </td>
                    <td>{items?.restaurant_name}</td>
                    <td>{`${items?.owner?.first_name} `}</td>
                    <td>{items?.owner?.email}</td>
                    <td>{items?.owner?.phone_number}</td>
                    <td> {items?.url} </td>
                    <td>
                      <button type="button" className="asbtn" onClick={(e) => RestaurantsDetailsFun(e, items)}>
                        {translaterFun("view-all")}</button>
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
                previousLabel={translaterFun("previous")}
                nextLabel={translaterFun("next")}
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
        {ToggleBarSelectorData && <CreateLeadOnBoardPopUpComponent translaterFun={translaterFun} />}

      </DashboardLayout>






      <LodingSpiner loadspiner={LoadSpiner} />
    </>
  );
};

export default LeadsRestaurant;
