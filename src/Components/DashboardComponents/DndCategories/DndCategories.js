import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../Categories/categories.css";
import { UpdateMenuCategoryAfterDragAndDrop, GetMenuCategorySlice } from '../../../Redux/slices/menuSlice';
import arrow from "../../../images/Arrow - Right 3.svg";
import line from "../../../images/Vector 1.svg";
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DndCategories() {
    const dispatch = useDispatch();
    const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dndPayload, setDndPayload] = useState()
    const [items, setItems] = useState([]); 
    const [SaveActiveBtn, setSaveActiveBtn] = useState(false)




    const resId = localStorage.getItem("RestaurantId");
    const navigate = useNavigate();


    const startDrag = (e, item) => {

        e.dataTransfer.setData('text/plain', ''); // required for Firefox to enable drag
        setDraggedItem(item);
    };

    const handleDragOver = (e, item) => {
        e.preventDefault();
        if (!draggedItem || draggedItem === item) {
            return;
        }
    };



    const handleDrop = (e, item) => {

        e.preventDefault(); 
         // if(draggedItem !==item){
            setSaveActiveBtn(true)
        // }  please do not remove this if condition , after test we will remove this condtion // developer jinda bad

         
 
        if (!draggedItem || draggedItem === item) {

            
            return;
        }


        

        const draggedIndex = items.findIndex((el) => el.menu_id === draggedItem.menu_id);
        const targetIndex = items.findIndex((el) => el.menu_id === item.menu_id);

        const updatedItems = [...items];
        const draggedItemCopy = { ...draggedItem, index: targetIndex + 1 };

        // Remove the dragged item from its original position
        updatedItems.splice(draggedIndex, 1);

        // Insert the dragged item at the target position
        updatedItems.splice(targetIndex, 0, draggedItemCopy);

        // Reindex the remaining items
        const newItems = updatedItems.map((item, index) => ({ ...item, index: index + 1 }));

        setItems(newItems);
 
        const payload = {
            data: newItems.map(({ menu_id, index }) => ({ menu_id, index })),
        };
        console.log("payload", payload);
        setDndPayload(payload)
        // Dispatch an action to update the Redux store with the new order
        // dispatch(UpdateMenuCategoryAfterDragAndDrop(payload));
        // dispatch(GetMenuCategorySlice());
        setDraggedItem(null);
    };




    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDndUpdate = () => {
        dispatch(UpdateMenuCategoryAfterDragAndDrop(dndPayload));

    };

    // console.log("fbdfbfghjhgvgghh1", MenuApiSelectorData);


    console.log("fbdfbfghjhqwgvgghh1", MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData);

    useEffect(() => {
 
        if (MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData?.status === 200) {
            console.log("UpdateMenuCategoryAfterDragAndDroprReducerData is 200 status");
            setSaveActiveBtn(false)
            // Additional actions you want to perform when status is 200
            dispatch(GetMenuCategorySlice({
                RestaurantId: resId  
            }
            ));
        } 
        else{
            console.log("UpdateMenuCategoryAfterDragAndDroprReducerData is error", MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData)
        }


        // else if(MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData?.error === "Rejected") {
        //     toast.error("detail error");
        // }

    }, [MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData])


    useEffect(()=>{
        dispatch(GetMenuCategorySlice({
            RestaurantId: resId  
        }))
    },[])

 

     useEffect(()=>{
        if(MenuApiSelectorData?.GetMenuCategoryReducerData?.status==200){
            setItems(MenuApiSelectorData?.GetMenuCategoryReducerData?.data)
        }

    },[MenuApiSelectorData?.GetMenuCategoryReducerData])


     

    return (
        <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />

        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "FBF6F2", padding: "30px" }}>
            <div className="recorded-cat-div">
                <h1 className='recorded-cat-head'>Reorder Categories</h1>
                <div className='me-3 pe-2'> 
               {SaveActiveBtn && <button
                    type="button "
                    className="categorybtn btn2 me-3"
                    onClick={handleDndUpdate}
                    style={{ width: "100px", height: "43px" }}
                >
                    Save
                </button>}
                <button
                    type="button"
                    className="categorybtn btn2"
                    onClick={(e) => {
                        navigate(`/${resId}/admin/categories/`);
                    }}
                    style={{ width: "100px", height: "43px" }}
                >
                    Back
                </button>
                </div>
            </div>
            <div
            // className="categorycontent"
            >
                <nav>
                    <div className="category-grid">
                        {items?.map((item, index) => {

                            console.log("manbcvhah", item)
                            return <div
                                key={item.menu_id}
                                draggable
                                onDragStart={(e) => startDrag(e, item)}
                                onDragOver={(e) => handleDragOver(e, item)}
                                onDrop={(e) => handleDrop(e, item)}
                                onDragEnd={handleDragEnd}
                                className='dragCategory'
                            >

                                <div>
                                    <div className='indx-div'>
                                        <span className='item-indx'>{index+1}</span>
                                    </div>
                                    <figure className="drag-catg-img">
                                        <img src={item?.category_image} alt="img" width="55.381px" height={"55.381px"} />
                                    </figure>
                                    <div className=""></div>
                                    <h3 className='itemCategory'>{item?.category}</h3>

                                    <div className="button-arrow">
                                        <img src={line} />
                                        <img src={arrow} height={"25px"} width={"25px"} />

                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </nav>
            </div>
        </div>
        </div>



        </DashboardLayout>
    );
}

export default DndCategories;
