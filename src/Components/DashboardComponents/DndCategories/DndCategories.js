import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../Categories/categories.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { UpdateMenuCategoryAfterDragAndDrop } from '../../../Redux/slices/menuSlice';

function DndCategories() {
    const dispatch = useDispatch();
    const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
    const [draggedItem, setDraggedItem] = useState(null);
    const [items, setItems] = useState(MenuApiSelectorData?.GetMenuCategoryReducerData?.data);
    console.log("MenuApiSelectorData", MenuApiSelectorData?.GetMenuCategoryReducerData?.data)
    const [ActiveCategory, setActiveCategory] = useState(undefined);
    console.log("items", items)

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

        if (!draggedItem || draggedItem === item) {
            return;
        }
        const draggedIndex = items.indexOf(draggedItem);
        const targetIndex = items.indexOf(item);

        const newItems = [...items];
        newItems.splice(draggedIndex, 1); // Remove the dragged item
        newItems.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the new position

        setItems(newItems);

        // Dispatch an action to update the Redux store with the new order
        // dispatch({ type: 'UPDATE_ORDER', payload: { newItems } });

        dispatch(UpdateMenuCategoryAfterDragAndDrop({ body: JSON.stringify(newItems) })); 
        // **there we have to update value in api
        setDraggedItem(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    // const CategoryTabFun = (e, categoryItem) => {
    //     let MenuSlicePayload = {
    //       searchValue: "",
    //       itemTypeValue: "",
    //       RestaurantId: RestaurantIdLocalStorageData,
    //       MenuId: categoryItem?.menu_id,
    //     };

    //     dispatch(MenuSlice(MenuSlicePayload));
    //     setActiveCategory(categoryItem?.menu_id);
    //     console.log("hgvujvjvhjvvhv", ActiveCategory);
    //   };

    return (
        <div style={{width:"100%",height:"100vh" }}>
            List
            {/* <ul>
                {items?.map((item, id) => (
                    <li
                        key={id}
                        className="dragg"
                        draggable
                        onDragStart={(e) => startDrag(e, item)}
                        onDragOver={(e) => handleDragOver(e, item)}
                        onDrop={(e) => handleDrop(e, item)}
                        onDragEnd={handleDragEnd}
                    >
                        {item.category}
                    </li>
                ))}
            </ul> */}
            {/* <Swiper
                slidesPerView={MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length > 4 ? 4 : Number(MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length)}
                // cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {items?.map((item, id) => (
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            // onClick={(e) => CategoryTabFun(e, item)}
                            className={`${ActiveCategory === item?.menu_id ? "active" : "No-active"
                                } nav-link`}
                            // key={id}
                            id="nav-dishes1-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-dishes1"
                            type="button"
                            role="tab"
                            aria-controls="nav-dishes1"
                            aria-selected="true"
                            key={id}
                            // className="dragg"
                            draggable
                            onDragStart={(e) => startDrag(e, item)}
                            onDragOver={(e) => handleDragOver(e, item)}
                            onDrop={(e) => handleDrop(e, item)}
                            onDragEnd={handleDragEnd}
                        >

                            <div>
                                <figure>
                                    <img
                                        src={item?.category_image}
                                        alt="img"
                                        className="catg-img"
                                    />
                                </figure>
                                <div className=""></div>

                                <h3>{item?.category}</h3>

                               
                                <div className="buttonbox">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="5"
                                        height="7"
                                        viewBox="0 0 5 7"
                                        fill="none"
                                    >
                                        <path
                                            d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768"
                                            stroke-width="1.10009"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </Swiper> */}
            {items?.map((item, id) => (
                <div
                    className="card"
                    style={{ width: "18rem" }}
                    key={id}

                    draggable
                    onDragStart={(e) => startDrag(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragEnd={handleDragEnd}
                >
                    <img src={item?.category_image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">{item?.category}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DndCategories;
