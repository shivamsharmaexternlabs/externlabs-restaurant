// Importing necessary dependencies and assets
import React from 'react';
import "./ManageOrder.js"
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

import LodingSpiner from '../../LoadingSpinner/LoadingSpinner';
import { Helmet } from "react-helmet";
import TableStatus from '../../../ReusableComponents/TableStatus/TableStatus.js';
import BookingTable from '../../../ReusableComponents/BookingTable/BookingTable.js';
import TableStatusData from "./TableStatusColor.js";

// Functional component for the ManageOrder page
const ManageOrder = ({ translaterFun }) => {
    console.log("TableStatusData", TableStatusData)

    // Hooks for managing state and navigation
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // Retrieving data from local storage
    // let BearerToken = reactLocalStorage.get("Token", false)
    // const RestaurantId = reactLocalStorage.get("RestaurantId", false);

    // Selecting data from Redux store
    // const MediaLibrarySelectorData = useSelector((state) => state?.MediaLibraryApiData);

    // JSX structure for the ManageOrder component
    return (
        <>
            <Helmet>
                <title>Manage Order | Harbor Bites</title>
                <meta name="description" content="Effortlessly manage your order in one place. " />
                {/* <link rel="icon" type="image/x-icon" href="./"/> */}
            </Helmet>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className="contentpart manageorderpage">
                        <div className='text-end mb-3'>
                            {/* <button type='button' className='btn2'> Bulk Upload  </button> */}

                            <div className="uploadbtn-wrapper btn2">
                                <button type="button" className=''>                                    
                                    {translaterFun("upload-menu")}
                                </button>
                                <input
                                    type="file"
                                    accept=".xlxs, .xlsx, .xls, .pdf"
                                    // ref={inputRef}
                                    // onChange={(e) => UploadMenuFile(e)}
                                />
                            </div>

                            <button type='button' className='btn2 me-0'>
                                <svg width="13" height="13" viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                                </svg>
                                Add Table
                            </button>

                        </div>
                        <div className='infotable'>
                            {
                                TableStatusData?.map((item, id) => {
                                    return (
                                        <div>
                                            <TableStatus
                                                statusName={item?.name}
                                                colorCode={item?.colorCode}

                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div>
                            <div className='actable'>
                                <h2>AC</h2>
                                <ul className='actablelist'>
                                    {TableStatusData?.map((item, id) => {
                                        return (
                                            <BookingTable
                                            translaterFun={translaterFun}
                                                statusName={item?.name}
                                                colorCode={item?.colorCode}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </DashboardLayout>
            <LodingSpiner />
        </>
    )
}

// Exporting the ManageOrder component
export default ManageOrder;
