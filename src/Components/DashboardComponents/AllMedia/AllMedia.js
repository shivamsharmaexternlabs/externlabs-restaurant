import React, { useEffect } from 'react'
import './allmedia.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import margerita from '../../../images/Margerita.png'
import upload from '../../../images/upload.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { GetMediaLibrarySlice, PostMediaLibrarySlice } from '../../../Redux/slices/mediaLibrarySlice'
import { toast } from "react-toastify";


const AllMedia = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RestaurantId = reactLocalStorage.get(
        "RestaurantId",
        false
    );

    const MediaLibrarySelectorData = useSelector((state) => state?.MediaLibraryApiData);

    useEffect(() => {
        // console.log("RestaurantId", RestaurantId)
        dispatch(GetMediaLibrarySlice({RestaurantId}))
    }, [])

    console.log("MediaLibrarySelectorData :", MediaLibrarySelectorData)

    const MultiUploadFun =(e)=>{
        const multiUploadPayload = {
            images : e.target.files,
            restaurant_id : RestaurantId
        }

        // console.log("bschgsdnd",e.target.files)

        dispatch(PostMediaLibrarySlice(multiUploadPayload));

    }

    useEffect(() => {
        console.log("gcfxdfcgvhbjvgcv", MediaLibrarySelectorData)
        if (MediaLibrarySelectorData?.PostMediaLibraryReducerData?.status === 200) {
            
            dispatch(GetMediaLibrarySlice({RestaurantId}))
        }
        else if (MediaLibrarySelectorData?.error === "Rejected") {
            toast.success("Internal Server Error");
        }
    }, [MediaLibrarySelectorData?.PostMediaLibraryReducerData]);

    return (
        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart mediapage'>
                        <div className='title'>
                            <h2>All Media</h2>
                            <button type='button' className='btn1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" />
                                </svg>
                                <input type='file' multiple onChange={(e) =>MultiUploadFun(e)}/>
                                Upload Images</button>
                        </div>

                        <ul className='medialist'>

                        {
                            MediaLibrarySelectorData?.GetMediaLibrarySliceReducerData?.data?.images?.map((items, id) => {
                            console.log("hdvfbjsfhvhsvh", items)
                            return <li key={id}>
                                <figure>
                                    <img src={items} alt='margerita - img' />
                                    <button type='button' className='btn'> <img src={upload} alt='upload' /> </button>
                                </figure>
                                <h4> {items.split("/")?.[4].split(".")?.[0]} </h4>
                            </li>

                          })
                        }
                        
                            
                            {/* <li>
                                <figure>
                                    <img src={margerita} alt='margerita - img' />
                                    <button type='button' className='btn'> <img src={upload} alt='upload' /> </button>
                                </figure>
                                <h4>Cheese Burst Pizza.jpeg</h4>
                            </li> */}

                        </ul>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default AllMedia