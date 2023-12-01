import React, { useEffect, useState } from "react";
import './leads.css'
import DashboardLayout from "../../DashboardComponents/DashboardLayout/DashboardLayout";
import DashboardSidebar from "../../DashboardComponents/DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import user from '../../../images/user.png'
import ReactPaginate from 'react-paginate';
import { LeadsSlice } from "../../../Redux/slices/leadsSlice";
import { useNavigate } from "react-router-dom";
import CreateLeadOnBoardPopUpComponent from "../../../ReusableComponents/CreateLeadOnBoardPopUpComponent/CreateLeadOnBoardPopUpComponent";
import { LoadingSpinner } from "../../../Redux/slices/sideBarToggle";



const Leads = () => {

  const itemsPerPage = 5;

  const [popUpHook, popUpHookFun] = usePopUpHook("")
  const [LoadSpiner, setLoadSpiner] = useState(false)


  let BearerToken = reactLocalStorage.get("Token", false);
  let RestaurantId = reactLocalStorage.get("RestaurantId", false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [CurrentPage, setCurrentPage] = useState(0);
  const LeadsSelectorData = useSelector((state) => state.LeadsApiData);
  const ToggleBarSelectorData = useSelector((state) => state?.ToggleBarData?.togglenewleads);


  useEffect(() => {
    if (LeadsSelectorData?.data?.status === 201) {
      setLoadSpiner(false);
      popUpHookFun(false);

      let LeadsSlicePayload = {
        Token: BearerToken,
        pagination: 1,
      };
      dispatch(LeadsSlice(LeadsSlicePayload));
    } else if (LeadsSelectorData?.error === "Rejected") {
      setLoadSpiner(false);
      popUpHookFun(true);
    }
  }, [LeadsSelectorData]);


  useEffect(() => {

    const myFunc = async () => {
      if (BearerToken !== false) {

        await dispatch(LoadingSpinner(true));

        try {
          let LeadsSlicePayload = {
            Token: BearerToken,
            pagination: 1,
          };

          await dispatch(LeadsSlice(LeadsSlicePayload));
          await dispatch(LoadingSpinner(false))

        } catch (error) {
          await dispatch(LoadingSpinner(false))
        }

      }
    }
    myFunc();
  }, [BearerToken]);



  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1; // React-paginate uses 0-based indexing.

    let LeadsSlicePayload = {
      Token: BearerToken,
      pagination: page
    }
    dispatch(LeadsSlice(LeadsSlicePayload));
    setCurrentPage(page - 1);
  }



  const LeadsDetailsFun = (e, items, AllData) => {

    navigate(`/admin/restaurantdetail/${items?.lead_id}`, {
      state: {
        page: "lead",
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
              <h2>Leads</h2>
            </div>



            <div className='managertable'>
              <table>
                <tr>
                  <th></th>
                  <th>Restaurant Name </th>
                  <th>Name</th>
                  <th>Mobile No.</th>
                  <th>E-mail </th>
                  <th>Action </th>

                </tr>



                {LeadsSelectorData?.LeadReducerData?.data?.results?.map((lead, id) => {
                  return <tr key={id}>
                    <td> <img src={user} alt='img' /> </td>
                    <td>{`${lead?.restaurant_name}`}</td>
                    <td>{lead?.contact_name}</td>
                    <td>{lead?.phone}</td>
                    <td>{lead?.email}</td>
                    <td>

                      <button className="asbtn" onClick={(e) => LeadsDetailsFun(e, lead)}>
                        view
                      </button>
                    </td>

                  </tr>
                })}

              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(LeadsSelectorData?.LeadReducerData?.data?.count / itemsPerPage)}
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


      <LodingSpiner loadspiner={LoadSpiner} />
    </>
  );
};

export default Leads;
