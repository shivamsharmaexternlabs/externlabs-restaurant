import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../Categories/categories.css";
import { UpdateMenuCategoryAfterDragAndDrop } from '../../../Redux/slices/menuSlice';
import arrow from "../../../images/Arrow - Right 3.svg";
import line from "../../../images/Vector 1.svg";

function DndCategories() {
    const dispatch = useDispatch();
    const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
    const [draggedItem, setDraggedItem] = useState(null);
     const [items, setItems] = useState(MenuApiSelectorData?.GetMenuCategoryReducerData?.data);
    // const [items, setItems] = useState([
    //     {
    //         "menu_id": "d17e8efb-7fa6-439b-a9d0-9ea2f7175cd0",
    //         "category": "paneer Pizza",
    //         "category_image": "https://restaurant-qr-staging.s3.ap-south-1.amazonaws.com/menu/download_GZuBy4B.png",
    //         "index": 0
    //     },
    //     {
    //         "menu_id": "d13a8cda-bc78-454d-815f-383773097c39",
    //         "category": "burger",
    //         "category_image": null,
    //         "index": 1
    //     },
    //     {
    //         "menu_id": "86bd1171-38c8-4311-99cd-7683c5903332",
    //         "category": "Pizza",
    //         "category_image": null,
    //         "index": 2
    //     },
    //     {
    //         "menu_id": "3f4dadfc-a085-48cd-864c-6edd92e47d1e",
    //         "category": "chicken lolipop",
    //         "category_image": null,
    //         "index": 3
    //     },
    //     {
    //         "menu_id": "0f533415-196b-4baa-9d3b-ce3c568a61c6",
    //         "category": "Paneer",
    //         "category_image": null,
    //         "index": 4
    //     },
    //     {
    //         "menu_id": "eaaf1d9a-dbbc-4dcd-903b-40922b179d61",
    //         "category": "chicken ",
    //         "category_image": null,
    //         "index": 5
    //     },
    //     {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 6
    //     },
    //     {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 7
    //     },
    //     {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 8
    //     }, {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 9
    //     }, {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 10
    //     },
    //     {
    //         "menu_id": "a2579b7d-1672-44dc-9754-02172141f2e1",
    //         "category": "fries",
    //         "category_image": null,
    //         "index": 11
    //     }
    // ]);
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

    // const handleDrop = (e, item) => {
    //     e.preventDefault();

    //     if (!draggedItem || draggedItem === item) {
    //         return;
    //     }
    //     const draggedIndex = items.indexOf(draggedItem);
    //     const targetIndex = items.indexOf(item);

    //     const newItems = [...items];
    //     newItems.splice(draggedIndex, 1); // Remove the dragged item
    //     newItems.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the new position

    //     setItems(newItems);
    //     console.log("newItems",newItems)
    //     // Dispatch an action to update the Redux store with the new order
    //     dispatch(UpdateMenuCategoryAfterDragAndDrop(newItems));

    //     setDraggedItem(null);
    // };

    //new

    const handleDrop = (e, item) => {
        e.preventDefault();

        if (!draggedItem || draggedItem === item) {
            return;
        }

        // Find the index of the dragged and target items
        const draggedIndex = items.findIndex((el) => el.menu_id === draggedItem.menu_id);
        const targetIndex = items.findIndex((el) => el.menu_id === item.menu_id);

        const updatedItems = [...items];
        // Swap the positions of the dragged and target items
        [updatedItems[draggedIndex], updatedItems[targetIndex]] = [updatedItems[targetIndex], updatedItems[draggedIndex]];

        // Update the index field for all items
        const finalItems = updatedItems.map((item, index) => ({ ...item, index }));

        // Extract only menu_id and index properties for the payload
        const payload = {
            data: finalItems.map(({ menu_id, index }) => ({ menu_id, index })),
        };

        setItems(finalItems);
        console.log("newItems", finalItems);
        console.log("payload", payload);

        // Dispatch an action to update the Redux store with the new order
        dispatch(UpdateMenuCategoryAfterDragAndDrop(payload));

        setDraggedItem(null);
    };



    // const handleDrop = (e, item) => {
    //     e.preventDefault();

    //     if (!draggedItem || draggedItem === item) {
    //         return;
    //     }

    //     const draggedIndex = items.indexOf(draggedItem);
    //     const targetIndex = items.indexOf(item);

    //     const newItems = [...items];
    //     newItems.splice(draggedIndex, 1); // Remove the dragged item
    //     newItems.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the new position

    //     // Update the index field for all items
    //     const updatedItems = newItems.map((item, index) => ({ ...item, index }));

    //     setItems(updatedItems);
    //     console.log("newItems", updatedItems);

    //     // Dispatch an action to update the Redux store with the new order
    //     dispatch(UpdateMenuCategoryAfterDragAndDrop(updatedItems));

    //     setDraggedItem(null);
    // };





    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column",backgroundColor: "FBF6F2",padding:"30px" }}>
            <h1 className='recorded-cat-head'>Reorder Categories</h1>
            <div
            // className="categorycontent"
            >
                <nav>
                    <div className="category-grid">
                        {items?.map((item, index) => (
                            <div
                                key={item.menu_id}
                                draggable
                                onDragStart={(e) => startDrag(e, item)}
                                onDragOver={(e) => handleDragOver(e, item)}
                                onDrop={(e) => handleDrop(e, item)}
                                onDragEnd={handleDragEnd}
                                className='dragCategory'
                            >
                                {/* <button
                                    className={`${ActiveCategory === item?.menu_id ? "active" : "No-active"} nav-link`}
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-dishes1"
                                    id="nav-dishes1-tab"
                                    // data-bs-toggle="tab"
                                    // data-bs-target="#nav-dishes1"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-dishes1"
                                    aria-selected="true"
                                    style={{ width: "18rem" }}
                                > */}
                                <div>
                                    <figure className="drag-catg-img">
                                        <img src={item?.category_image} alt="img"   width= "55.381px" height={"55.381px"}/>
                                    </figure>
                                    <div className=""></div>
                                    <h3 className='itemCategory'>{item?.category}</h3>
                                    
                                    <div className="button-arrow">
                                    <img src={line}/>
                                        <img src={arrow} height={"25px"} width={"25px"}/>
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="5"
                                            height="7"
                                            viewBox="0 0 5 7"
                                            fill="none"
                                        >
                                            <path
                                                d="M0.915527 1.23392L3.48241 3.8008L0.915527 6.36768"
                                                strokeWidth="1.10009"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg> */}
                                    </div>
                                </div>
                                {/* </button> */}
                            </div>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default DndCategories;
