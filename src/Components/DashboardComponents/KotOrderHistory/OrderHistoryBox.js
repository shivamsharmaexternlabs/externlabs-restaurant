import React, { useEffect, useState } from 'react'
import './orderHistory.css'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import user from '../../../images/user.png'
import dineIn from '../../../images/greendot.svg'
import takeAway from '../../../images/yellowdot.svg'
import { GetKdsSlice } from '../../../Redux/slices/KdsSlice';

function OrderHistoryBox({ translaterFun }) {
    const data = [
        {
            kds: [
                {
                    "kot_id": "fb5e8625-585f-4851-a80e-7bae3a05ae12",
                    "order_type": "dine_in",
                    "waiter": "Bobbyw-8726587236",
                    "status": "kot_generated",
                    "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                    "quantity": 10,
                    "date":"09/29/2024 07:58:12",
                    "item": {
                        "item_id": "18d17e94-c40c-4eb3-b17d-352bdf0666cf",
                        "description_en": "Tripe is the lining of beef, hog or sheep stomach although most sold is from beef. This part of the animal is tough and requires long cooking for tenderness.",
                        "description_native": "الكرشة هي بطانة معدة اللحم البقري أو الخنزير أو الأغنام على الرغم من أن معظمها يباع من لحم البقر. هذا الجزء من الحيوان صعب ويتطلب طهيا طويلا للحنان",
                        "image": null,
                        "calories_unit": "kcal",
                        "calories": 240.0,
                        "menu_id": "cea9d1da-1c91-4369-a5fe-5b227eabfad8",
                        "category_en": "Appetizer",
                        "category_native": "فاتح الشهيه",
                        "index": 5,
                        "variant": [],
                        "item_name_en": "Beef stripe salad",
                        "item_name_native": "سلطة لحم البقر المخططة",
                        "item_price": 66.0,
                        "is_veg": false,
                        "is_non_veg": true,
                        "is_favorite": false,
                        "currency": "SAR",
                        "created_at": "2024-03-06T08:48:00.838920Z",
                        "updated_at": "2024-03-06T08:48:00.840677Z",
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": "",
                        "amount": null,
                        "restaurant_id": ""
                    },
                    "restaurant_table": {
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                        "category": "Bean",
                        "table_number": "11",
                        "no_of_persons": null,
                        "status": "Running",
                        "table_id": "f03f9d8a-8d57-4bc4-a9f5-affaf60d0929",
                        "qrcode": "3a586215-084e-4143-b303-52be98861dec",
                        "is_active": true
                    }
                },
            ]
        },
        {
            kds: [
                {
                    "kot_id": "2a7d7c6d-9183-4cfa-831a-4a2881a7e692",
                    "order_type": "dine_in",
                    "waiter": "Bobbyw-8726587236",
                    "status": "kot_generated",
                    "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                    "quantity": 19,
                    "date":"10/29/2024 07:58:12",
                    "item": {
                        "item_id": "dc399aa1-4f98-49c3-ad72-a8b466043667",
                        "description_en": "It contains the back, rear legs, and tail of the sheep and is dipped and boiled in soup in a hotpot. The dip-boil mutton is served with seasoning made of sesame sauce, preserved bean curd, leek flower, sliced spring onion and ginger and shrimp oil",
                        "description_native": "يحتوي على ظهر الأرجل الخلفية وذيل الأغنام ويتم غمسه وغليه في الحساء في قدر ساخن. يتم تقديم لحم الضأن المغلي مع التوابل المصنوعة من صلصة السمسم وخثارة الفاصوليا المحفوظة وزهرة الكراث وشرائح البصل الأخضر والزنجبيل وزيت الروبيان",
                        "image": null,
                        "calories_unit": "kcal",
                        "calories": 816.0,
                        "menu_id": "f1f3c9d5-3d41-4529-b767-d26622f58d82",
                        "category_en": "Mutton",
                        "category_native": "لحم الضان",
                        "index": 5,
                        "variant": [],
                        "item_name_en": "Boiled mutton chinese style (spicy)",
                        "item_name_native": "لحم ضأن مسلوق على الطريقة الصينية (حار)",
                        "item_price": 75.0,
                        "is_veg": false,
                        "is_non_veg": true,
                        "is_favorite": false,
                        "currency": "SAR",
                        "created_at": "2024-03-06T08:48:00.990650Z",
                        "updated_at": "2024-03-06T08:48:00.992277Z",
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": "",
                        "amount": null,
                        "restaurant_id": ""
                    },
                    "restaurant_table": {
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                        "category": "Hony",
                        "table_number": "11",
                        "no_of_persons": null,
                        "status": "Running",
                        "table_id": "490e8462-1d87-44b7-8950-4302a8660bae",
                        "qrcode": "de2acfa5-1bc0-4e36-9b90-0aef5a691a32",
                        "is_active": true
                    }
                },
                {
                    "kot_id": "f24e3ca5-a5fc-4641-8968-56c7e975d2f2",
                    "order_type": "dine_in",
                    "waiter": "Bobbyw-8726587236",
                    "status": "kot_generated",
                    "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                    "quantity": 10,
                    "date":"11/29/2024 07:58:12",
                    "item": {
                        "item_id": "73c245f7-3267-46ff-84a2-72cb2c7509b2",
                        "description_en": "Freshest veggies waltz together in a crispy embrace, creating a dance of flavors that will leave your taste buds applauding for an encore",
                        "description_native": "تتجمع الخضار الطازجة معا في عناق مقرمش ، مما يخلق رقصة من النكهات التي ستترك براعم التذوق لديك تصفق للحصول على الظهور",
                        "image": null,
                        "calories_unit": "kcal",
                        "calories": 200.0,
                        "menu_id": "c0ea403d-ef29-470f-bc67-ecabacff62b8",
                        "category_en": "Vegetables",
                        "category_native": "خضروات",
                        "index": 2,
                        "variant": [],
                        "item_name_en": "Mix vegetables chopsuey",
                        "item_name_native": "خضروات مشكلة شوبسوي",
                        "item_price": 45.0,
                        "is_veg": true,
                        "is_non_veg": false,
                        "is_favorite": false,
                        "currency": "SAR",
                        "created_at": "2024-03-06T08:48:01.045504Z",
                        "updated_at": "2024-03-06T08:48:01.047242Z",
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": "",
                        "amount": null,
                        "restaurant_id": ""
                    },
                    "restaurant_table": {
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                        "category": "Hony",
                        "table_number": "11",
                        "no_of_persons": null,
                        "status": "Running",
                        "table_id": "490e8462-1d87-44b7-8950-4302a8660bae",
                        "qrcode": "de2acfa5-1bc0-4e36-9b90-0aef5a691a32",
                        "is_active": true
                    }
                },
                {
                    "kot_id": "54e349ac-d119-4725-b131-10859d515147",
                    "order_type": "dine_in",
                    "waiter": "Bobbyw-8726587236",
                    "status": "kot_generated",
                    "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                    "quantity": 1,
                    "date":"05/29/2024 07:58:12",
                    "item": {
                        "item_id": "f157a54c-35f7-4c6a-9bd3-fe3f2a9af997",
                        "description_en": "Elevate your taste buds with this dish where crisp bean sprouts waltz in a tantalizing stir-fry, harmonized by the sweet and tangy notes of our secret vinegar blend",
                        "description_native": "ارفع مستوى حاسة التذوق لديك مع هذا الطبق حيث تنبت براعم الفاصوليا المقرمشة في مقلاة مثيرة، تتناغم مع النكهات الحلوة والمنعشة لمزيج الخل السري الخاص بنا.",
                        "image": null,
                        "calories_unit": "kcal",
                        "calories": 265.0,
                        "menu_id": "c0ea403d-ef29-470f-bc67-ecabacff62b8",
                        "category_en": "Vegetables",
                        "category_native": "خضروات",
                        "index": 4,
                        "variant": [],
                        "item_name_en": "Bean sprout with vinegar (deep fry)",
                        "item_name_native": "براعم الفاصوليا مع الخل (مقلي عميق)",
                        "item_price": 47.0,
                        "is_veg": true,
                        "is_non_veg": false,
                        "is_favorite": false,
                        "currency": "SAR",
                        "created_at": "2024-03-06T08:48:01.096437Z",
                        "updated_at": "2024-03-06T08:48:01.098129Z",
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": "",
                        "amount": null,
                        "restaurant_id": ""
                    },
                    "restaurant_table": {
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                        "category": "Hony",
                        "table_number": "11",
                        "no_of_persons": null,
                        "status": "Running",
                        "table_id": "490e8462-1d87-44b7-8950-4302a8660bae",
                        "qrcode": "de2acfa5-1bc0-4e36-9b90-0aef5a691a32",
                        "is_active": true
                    }
                },
                {
                    "kot_id": "bb6c3a5c-17de-4d12-b49b-db733144c112",
                    "order_type": "take_away",
                    "waiter": "Bobbyw-8726587236",
                    "status": "kot_generated",
                    "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                    "quantity": 1,
                    "date":"01/29/2024 07:58:12",
                    "item": {
                        "item_id": "0367ff64-7426-41b8-892a-87643e78d03c",
                        "description_en": "Grilled chicken rolled with delicious red spicy Pakistani marinade",
                        "description_native": "دجاج مشوي ملفوف مع تتبيلة باكستانية حمراء حارة لذيذة",
                        "image": null,
                        "calories_unit": "kcal",
                        "calories": 280.0,
                        "menu_id": "c4f342ea-6bfb-4ccb-8a93-b5d1c94e2856",
                        "category_en": "Rolls",
                        "category_native": "لفات",
                        "index": 1,
                        "variant": [],
                        "item_name_en": "Chicken tikka roll",
                        "item_name_native": "دجاج تكا رول",
                        "item_price": 19.0,
                        "is_veg": false,
                        "is_non_veg": true,
                        "is_favorite": false,
                        "currency": "SAR",
                        "created_at": "2024-03-06T08:48:01.476330Z",
                        "updated_at": "2024-03-06T08:48:01.478063Z",
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6"
                    },
                    "variant": {
                        "variant_name_en": "",
                        "variant_name_native": "",
                        "amount": null,
                        "restaurant_id": ""
                    },
                    "restaurant_table": {
                        "restaurant_id": "d9112602-d9c9-4b8d-a781-068204398ad6",
                        "category": "Hony",
                        "table_number": "11",
                        "no_of_persons": null,
                        "status": "Running",
                        "table_id": "490e8462-1d87-44b7-8950-4302a8660bae",
                        "qrcode": "de2acfa5-1bc0-4e36-9b90-0aef5a691a32",
                        "is_active": true
                    }
                },
            ]
        },

    ]
    const language = localStorage.getItem('languageSet')
    const itemsPerPage = 10;
    const [CurrentPage, setCurrentPage] = useState(0)
    const dispatch = useDispatch()
    const token = localStorage.getItem("Token")
    const resturantId = localStorage.getItem("RestaurantId")
    // const { GetKdsReducerData } = useSelector((state) => state.KdsApiData);
    // console.log({GetKdsReducerData})
    const [selectedOrderType, setSelectedOrderType] = useState(''); // State to track the selected order type

    const handleOrderTypeChange = (event) => {
        setSelectedOrderType(event.target.value); // Update the selected order type
    };

    const filteredData = data.map(item => {
        if (selectedOrderType === 'dine_in') {
            return {
                ...item,
                kds: item.kds.filter(kdsItem => kdsItem.order_type === 'dine_in')
            };
        } else if((selectedOrderType === 'take_away') ){
            return {
                ...item,
                kds: item.kds.filter(kdsItem => kdsItem.order_type === 'take_away')
            };
        }else{
            return item
        }
    });

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage); // Set the current page directly without adjusting the index
    }
    return (
        <div className='contentpart managerpage'>
            <div className='ordertitle'>
                <h2>
                    {translaterFun("orders-history")}
                </h2>
                {/* ADD Manager button... */}
                <select onChange={handleOrderTypeChange} value={selectedOrderType}>
                    <option value="">All Orders</option>
                    <option value="dine_in">{translaterFun("dine-in")}</option>
                    <option value="take_away">{translaterFun("take-away")}</option>
                </select>
            </div>
            <div className='ordertable'>
                <table>
                    <tr>
                        <th></th>
                        <th>{translaterFun("waiter-name")}</th>
                        <th>{translaterFun("order")}</th>
                        <th>{translaterFun("order-type")}</th>
                        <th>{translaterFun("total-amount")}</th>
                        <th>{translaterFun("table-no")}</th>
                    </tr>

                    {filteredData?.map((item, id) => {
                        return item.kds.map((kdsItem, kdsId) => {
                            return (
                                <tr key={kdsItem.kot_id}>
                                    <td> <img src={user} alt='img' /> </td>
                                    <td>{kdsItem.waiter}</td>
                                    <td>{kdsItem.quantity} x {language === 'en' ? kdsItem.item.item_name_en : kdsItem.item.item_name_native} </td>
                                    <td>
                                        {kdsItem.order_type === 'take_away' ? (
                                            <>
                                                <img src={takeAway} alt='takeaway' className='order-type-dot' />
                                                {translaterFun("take-away")}
                                            </>
                                        ) : (
                                            <>
                                                <img src={dineIn} alt='dinein' className='order-type-dot' />
                                                {translaterFun("dine-in")}
                                            </>
                                        )}
                                    </td>

                                    <td>{kdsItem.item.item_price}</td>
                                    <td>{kdsItem.restaurant_table.table_number}</td>
                                </tr>
                            );
                        });
                    })}
                </table>

                {filteredData?.length !== 0 && <ReactPaginate
                    // previousLabel={"Previous"}
                    previousLabel={translaterFun("previous")}
                    i18nIsDynamicList={true}
                    // nextLabel={"Next"}
                    nextLabel={translaterFun("next")}
                    pageCount={data ? Math.ceil(data.reduce((total, currentItem) => total + currentItem.kds.length, 0) / itemsPerPage) : 0}
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
                />}
            </div>
        </div>
    )
}

export default OrderHistoryBox