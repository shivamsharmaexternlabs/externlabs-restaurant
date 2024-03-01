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
import { reactLocalStorage } from 'reactjs-localstorage';
import { LoadingSpinner } from '../../../Redux/slices/sideBarToggle';
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner';
import defaultImage from "../../../images/defaultImage.png";
import { Helmet } from "react-helmet";
import { routes } from '../../../Utils/constants';

/**
 * DndCategories component for handling drag and drop functionality of menu categories.
 * @category Dashboard Component
 * @param {object} props - Component props.
 * @param {function} props.translaterFun - Function for translating text.
 * @returns {JSX.Element} DndCategories component.
 * 
 */

function DndCategories({ translaterFun }) {
    const dispatch = useDispatch();
    const { CATEGORIES} = routes
    const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dndPayload, setDndPayload] = useState()
    const [items, setItems] = useState([]);
    const [SaveActiveBtn, setSaveActiveBtn] = useState(false)

    const [LoadSpiner, setLoadSpiner] = useState(false)


    const resId = localStorage.getItem("RestaurantId");
    const BearerToken = reactLocalStorage.get("Token", false);
    let languageSet = reactLocalStorage.get("languageSet", false);

    const navigate = useNavigate();


    /**
  * Handles startDrag .
  * @function startDrag
  * @param {event} e - e is the event..
  * @param {object} item - item is the object.
  * @category DndCategories function
  * @subCategory Dashboard Component
  */
    const startDrag = (e, item) => {

        e.dataTransfer.setData('text/plain', ''); // required for Firefox to enable drag
        setDraggedItem(item);
    };

    /**
   * Handles  dragging  .
   * @function handleDragOver
  * @param {event} e - e is the event..
  * @param {object} item - item is the object.
   * @category DndCategories function
   * @subCategory Dashboard Component
   */

    const handleDragOver = (e, item) => {
        e.preventDefault();
        if (!draggedItem || draggedItem === item) {
            return;
        }
    };


    /**
     * Handles dropping of item.
     * @function handleDrop
     * @param {event} e - e is the event..
     * @param {object} item - item is the object.
     * @category DndCategories function
     * @subCategory Dashboard Component
     */
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
        setDndPayload(payload)
        // Dispatch an action to update the Redux store with the new order
        // dispatch(UpdateMenuCategoryAfterDragAndDrop(payload));
        // dispatch(GetMenuCategorySlice());
        setDraggedItem(null);
    };



    const handleDragEnd = () => {
        setDraggedItem(null);
    };


    /**
    * Handles Dnd Update.
    * @function handleDndUpdate 
    * @returns {void}
    * @category DndCategories function
    * @subCategory Dashboard Component
    */

    const handleDndUpdate = () => {

        setDndPayload(previousState => {
            previousState["BearerToken"] = BearerToken
            previousState["RestaurantId"] = resId
            return { ...previousState }
        });
        dispatch(UpdateMenuCategoryAfterDragAndDrop(dndPayload));

    };




    useEffect(() => {

        if (MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData?.status === 200) {
            setSaveActiveBtn(false)
            // Additional actions you want to perform when status is 200
            dispatch(GetMenuCategorySlice({
                RestaurantId: resId
            }
            ));
        }
        else {
        }


        // else if(MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData?.error === "Rejected") {
        //     toast.error("detail error");
        // }

    }, [MenuApiSelectorData?.UpdateMenuCategoryAfterDragAndDroprReducerData])


    useEffect(() => {
        const myFunc = async () => {

            dispatch(LoadingSpinner(true))
            try {
                await dispatch(GetMenuCategorySlice({
                    RestaurantId: resId
                }))
                dispatch(LoadingSpinner(false))
            } catch (error) {
                dispatch(LoadingSpinner(false))
            }
        }
        myFunc()
    }, [])



    useEffect(() => {
        if (MenuApiSelectorData?.GetMenuCategoryReducerData?.status == 200) {
            setItems(MenuApiSelectorData?.GetMenuCategoryReducerData?.data)
        }

    }, [MenuApiSelectorData?.GetMenuCategoryReducerData])




    return (
        <>
            <Helmet>
                <title>Arrange Menu Categories | Harbor Bites</title>
                <meta name="description" content="Easily customize the order of menu item categories. Tailor your menu organization effortlessly to suit your restaurant's needs." />
                {/* <link rel="icon" type="image/x-icon" href="./"/> */}
            </Helmet>
            <DashboardLayout>
                <div className="dasboardbody">
                    <DashboardSidebar />

                    <div className='contentpart d&dcategorypage'>
                        <div className="recorded-cat-div">
                            <h1 className='recorded-cat-head'>{translaterFun("reorder-categories")}</h1>
                            <div className=''>
                                {SaveActiveBtn && <button
                                    type="button "
                                    className="categorybtn btn2"
                                    onClick={handleDndUpdate}
                                // style={{ width: "100px", height: "43px" }}
                                >
                                    {translaterFun("save")}
                                </button>}
                                <button
                                    type="button"
                                    className="categorybtn btn2"
                                    onClick={(e) => {
                                        navigate(`/${resId}${CATEGORIES}`);
                                    }}
                                // style={{ width: "100px", height: "43px" }}
                                >
                                    {translaterFun("back")}
                                </button>
                            </div>
                        </div>
                        <div
                        // className="categorycontent"
                        >
                            <nav>
                                <div className="category-grid">
                                    {items?.map((item, index) => {

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
                                                    <span className='item-indx'>{index + 1}</span>
                                                </div>
                                                <figure className="drag-catg-img">
                                                    <img src={item?.category_image ? item?.category_image : defaultImage} alt="img" width="55.381px" height={"55.381px"} />
                                                </figure>
                                                <div className=""></div>
                                                <h3 className='itemCategory'>{languageSet == "en" ? item?.category_en : item?.category_native}</h3>

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
            <LodingSpiner loadspiner={LoadSpiner} />
        </>
    );
}

export default DndCategories;
