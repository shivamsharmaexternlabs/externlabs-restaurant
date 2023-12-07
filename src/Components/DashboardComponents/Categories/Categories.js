import React, { useEffect, useState } from "react";
import "./categories.css";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import dish1 from "../../../images/dish1.png";
import dish2 from "../../../images/dish2.png";
import dish3 from "../../../images/dish3.png";
import category from "../../../images/category.png";
import edit1 from "../../../images/edit.svg";
import starfill from "../../../images/star.svg";
import defaultImage from '../../../images/defaultImage.png'
import dot from '../../../images/dot.svg'
import star from "../../../images/starb.svg";
import editw from "../../../images/editw.svg";
import order from "../../../images/order.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { saveAs } from "file-saver";
import PopUpComponent from "../../../ReusableComponents/PopUpComponent/PopUpComponent";
import manager from "../../../images/manager.png";
import deleteicon from "../../../images/delete.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import deleteimg from '../../../images/delete.png'

import { UploadMenuSlice } from "../../../Redux/slices/uploadMenuSlice";
import {
  GetMenuCategorySlice,
  MenuSlice,
  favoriteMenuSlice,
  CreateMenuSlice,
  CreateCategorySlice,
  GetSampleUploadSlice,
  EditMenuItemSlice,
  EditCategorySlice,
  DeleteMenuItemSlice,
  DeleteMenuCategorySlice,
  UpdateMenuItemsAfterDragAndDrop,
} from "../../../Redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { favoriteMenuItemSlice } from "../../../Redux/slices/favouriteSlice";
import { toast } from "react-toastify";
import DndCategories from "../DndCategories/DndCategories";
import { currencyData } from "./currencyData"
import { LoadingSpinner } from "../../../Redux/slices/sideBarToggle";

const Categories = () => {
  const dispatch = useDispatch();
  const [popUpHook, popUpHookFun] = usePopUpHook("");
  const [popUpEditHook, popUpEditHookFun] = usePopUpHook("");
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
  const [popUpEditcategoriesHook, popUpEditcategoriesHookFun] = usePopUpHook("");
  const [deletePopup, deletePopUpFun] = usePopUpHook("")
  const [deleteCategoryPopup, deleteCategoryPopupFun] = usePopUpHook("")

  const [EditCategory, setEditCategory] = useState("");
  // const [ActiveCategory, setActiveCategory] = useState(undefined);
  const [ActiveCategory, setActiveCategory] = useState({
    toggle: false,
    data: undefined
  });
  const [Description, setDescription] = useState("");
  const [EditDescription, setEditDescription] = useState("");
  const [uploadImage, setuploadImage] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [MenuItemId, setMenuItemId] = useState("");
  const [caloriesunit, setCaloriesUnit] = useState("kcal");
  const [QrSampleImage, setQrSampleImage] = useState("");
  const [uploadCategoryImage, setuploadCategoryImage] = useState("");
  const [EditMenuData, setEditMenuData] = useState("");
  const [DeleteCategory, setDeleteCategory] = useState();
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggableSubcategory, setDraggableSubcategory] = useState(false)
  const [OpenMenuActionToggle, setOpenMenuActionToggle] = useState(null)
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
  const [DragAndDropItems, setDragAndDropItems] = useState([])
  const [dndPayload, setDndPayload] = useState({})
  const [SaveActiveBtn, setSaveActiveBtn] = useState(false)
  const [FavoriteValueStoreData, setFavoriteValueStoreData] = useState({
    toggle: false,
    data: ""
  })

  let BearerToken = reactLocalStorage.get("Token", false);

  const CreateApiSelectorData = useSelector(
    (state) => state.CreateApiSelectorData
  );
  const MenuItemFavouriteApiSelectorData = useSelector(
    (state) => state.MenuItemFavouriteApiData
  );
  const navigate = useNavigate()
  const RestaurantIdLocalStorageData = reactLocalStorage.get(
    "RestaurantId",
    false
  );

  const TokenLocalStorageData = reactLocalStorage.get(
    "Token",
    false
  );

  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };


  const PopUpCategoriesToggleFun = () => {
    popUpCategoriesHookFun((o) => !o);
  };
  const CancelBtnFun = () => {
    popUpHookFun(false);
  };
  const CancelCategoryBtnFun = () => {
    popUpCategoriesHookFun(false);
  };


  const UploadMenuFile = async (e) => {
    await dispatch(LoadingSpinner(true))
    const formData = new FormData();
    let payload = {
      file: e?.target?.files[0],
      restaurant_id: RestaurantIdLocalStorageData,
    };
    formData.append("file", payload?.file);
    formData.append("restaurant_id", payload?.restaurant_id);
    // formData.append("BearerToken", BearerToken);
    const UploadPayload = {
      formData,
      BearerToken
    }

    try {
      await dispatch(UploadMenuSlice(UploadPayload));
      await dispatch(LoadingSpinner(false))
    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }

  };


  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }

    // if (MenuApiSelectorData?.MenuSliceReducerData.status === 200
    //   && FavoriteValueStoreData.toggle == false  
    // ) { 
    //   setDragAndDropItems(MenuApiSelectorData?.MenuSliceReducerData?.data?.[0]?.item_id)
    //   setLoadSpiner(false);
    // }   
    // else if (MenuApiSelectorData?.error == "Rejected") {
    //   setLoadSpiner(false);
    // }

    // if (MenuApiSelectorData?.favoriteMenuSliceReducerData.status === 200) {
    //   setLoadSpiner(false);
    // } else if (MenuApiSelectorData?.error == "Rejected") {
    //   setLoadSpiner(false);
    // }

    // if(ActiveCategory?.toggle==true){
    //   console.log("mnbhjjkghfhdjhg")
    // }

  }, [
    MenuApiSelectorData?.GetMenuCategoryReducerData,
    // MenuApiSelectorData?.MenuSliceReducerData,
    // MenuApiSelectorData?.favoriteMenuSliceReducerData,
  ]);



  // after Click on category it will give perticular category's data 
  useEffect(() => {
    if (MenuApiSelectorData?.MenuSliceReducerData.status === 200
      && FavoriteValueStoreData.toggle == false
    ) {
      setDragAndDropItems(MenuApiSelectorData?.MenuSliceReducerData?.data?.[0]?.item_id)
      setLoadSpiner(false);
    }
    else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }

  }, [MenuApiSelectorData?.MenuSliceReducerData,])



  useEffect(() => {

    if (MenuApiSelectorData?.favoriteMenuSliceReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }

  }, [MenuApiSelectorData?.favoriteMenuSliceReducerData,
  ])



  useEffect(() => {
    const MyFunc = async () => {

      if (BearerToken !== false) {
        dispatch(LoadingSpinner(true))
        try {
          let MenuSlicePayload = {
            RestaurantId: RestaurantIdLocalStorageData,
          };

          await dispatch(GetMenuCategorySlice(MenuSlicePayload));
          await dispatch(favoriteMenuSlice(MenuSlicePayload));
          await dispatch(GetSampleUploadSlice());

          dispatch(LoadingSpinner(false))
        } catch (error) {
          dispatch(LoadingSpinner(false))
        }
      }
    }
    MyFunc();
  }, [BearerToken]);

  useEffect(() => {
    setQrSampleImage(MenuApiSelectorData?.GetSampleUploadReducerData?.data);
  }, [MenuApiSelectorData?.GetSampleUploadReducerData]);



  useEffect(() => {

    let MenuSlicePayload = {
      searchValue: undefined,
      itemTypeValue: undefined,
      RestaurantId: RestaurantIdLocalStorageData,
      MenuId:
        MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id,
    };


    // This if will run only for first time but when you take any type of action on category or menu this will not run

    if (ActiveCategory?.toggle == false) {
      setActiveCategory({
        toggle: false,
        data: MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id
      })
      dispatch(MenuSlice(MenuSlicePayload));
    }


  }, [MenuApiSelectorData?.GetMenuCategoryReducerData]);

  const CategoryTabFun = async (e, categoryItem, toggleAction) => {
    // fromImage
    if (toggleAction != "3dots") {
      setOpenMenuActionToggle(null)
    }
    // setOpenMenuActionToggle(null);
    console.log("mshhjasasd1", categoryItem)


    setFavoriteValueStoreData({
      toggle: false,
      data: ''
    })

    dispatch(LoadingSpinner(true))

    let MenuSlicePayload = {
      searchValue: "",
      itemTypeValue: "",
      RestaurantId: RestaurantIdLocalStorageData,
      MenuId: categoryItem?.menu_id,
    };

    try {
      await dispatch(MenuSlice(MenuSlicePayload));
      await dispatch(LoadingSpinner(false))
    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }

    setActiveCategory({
      toggle: true,
      data: categoryItem?.menu_id
    })
    // setActiveCategory(categoryItem?.menu_id);
  };


  const defaultValue = {
    restaurant_id: "",
    description: "",
    image: "",
    item_name: "",
    item_price: "",
    calories: "",
    menu_id: "",
    item_type: "",
    currency: "INR",
    calories_unit: "",
  };
  const Validatemenu = yup.object({
    item_name: yup.string().required("Please Enter Item Name"),
    item_price: yup.string().required("Please Enter Price"),
    calories: yup.string().required("Please Enter Calories"),
    menu_id: yup.string().required("Please Enter Menu"),
    item_type: yup.string().required("Please Enter Item Type"),
    currency: yup.string().required("Please Enter Currency"),
  });
  const handleMenuSubmit = async (values) => {
    await dispatch(LoadingSpinner(true));

    const formData = new FormData();
    formData.append("restaurant_id", RestaurantIdLocalStorageData);
    formData.append("description", Description);
    formData.append("image", uploadImage);
    formData.append("item_name", values?.item_name);
    formData.append("item_price", values?.item_price);
    formData.append("calories", values?.calories);
    formData.append("menu_id", values?.menu_id);
    formData.append("item_type", values?.item_type);
    formData.append("currency", values?.currency);
    formData.append("calories_unit", caloriesunit);

    let MenuSubmitPayload = {
      formData,
      BearerToken
    }
    try {

    let resposeData=  await dispatch(CreateMenuSlice(MenuSubmitPayload));
      await dispatch(LoadingSpinner(false))

      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId:   values?.menu_id,
      }; 



      // this condition will hold the menu on the category , it will not switch on the first category 
      
      if(resposeData?.payload?.status==201){ 
      let responseDataMenu=  dispatch(MenuSlice(MenuSlicePayload)); 
      setActiveCategory({
        toggle: true,
        data: values?.menu_id
      });
      }

     } catch (error) {
      await dispatch(LoadingSpinner(false))
    }



    setDescription("");
    popUpHookFun(false);
    // setTimeout(() => {
    //   let MenuSlicePayload = {
    //     RestaurantId: RestaurantIdLocalStorageData,
    //   };
    //   dispatch(GetMenuCategorySlice(MenuSlicePayload));
    // }, 1500)
  };

  const handleUploadImage = (e) => {
    setuploadImage(e?.target?.files[0]);
    // const formData = new FormData()
    // formData.append("file", payload?.file);
  };

  const defaultValueCategory = {
    category: "",
  };


  const ValidateCategory = yup.object({
    category: yup.string().required("Please Create Category"),
  });


  const handleCategorySubmit = async (values) => {

    await dispatch(LoadingSpinner(true))

    let handleCategoryPayload = {
      "restaurant_id": RestaurantIdLocalStorageData,
      "category_image": uploadCategoryImage,
      "category": values?.category,
      "token": TokenLocalStorageData
    }
    try {
      await dispatch(CreateCategorySlice(handleCategoryPayload));

      popUpCategoriesHookFun(false);

      setTimeout(async () => {

        let MenuSlicePayload = {
          RestaurantId: RestaurantIdLocalStorageData,
        };
        await dispatch(GetMenuCategorySlice(MenuSlicePayload));

      }, 1500);

      await dispatch(LoadingSpinner(false))
    }
    catch (error) {
      await dispatch(LoadingSpinner(false))
    }
  };

  const handleUploadCategoryImage = (e) => {
    setuploadCategoryImage(e?.target?.files[0]);
    // const formData = new FormData()
    // formData.append("file", payload?.file);
  };

  // edit menu items
  const PopUpToggleEditFun = (e, itemData) => {
    setEditMenuData(itemData);
    setuploadImage(itemData?.image);
    popUpEditHookFun((o) => !o);
  };

  const CancelEditBtnFun = () => {
    popUpEditHookFun(false);
  };
  const QrCodeSampleDownloadFun = () => {
    let url = QrSampleImage;
    saveAs(url, "Twitter-logo");
  };


  const defaultEditValue = {
    restaurant_id: EditMenuData?.restaurant_id,
    description: EditMenuData?.description,
    image: uploadImage,
    item_name: EditMenuData?.item_name,
    item_price: EditMenuData?.item_price,
    calories: EditMenuData?.calories,
    menu_id: EditMenuData?.menu_id,
    item_type: EditMenuData?.item_type,
    currency: EditMenuData?.currency,
    calories_unit: EditMenuData?.calories_unit,
  };

  const Validateditemenu = yup.object({
    item_name: yup.string().required("Please Enter Item"),
    item_price: yup.string().required("Please Enter Price"),
    calories: yup.string().required("Please Enter Calories"),
    menu_id: yup.string().required("Please Enter Menu"),
    item_type: yup.string().required("Please Enter Item"),
    currency: yup.string().required("Please Enter Currency"),
    description: yup.string().required("Please Enter Description"),
  });

  const handleEditMenuSubmit = async (values) => {
    let payload = {
      item_id: EditMenuData?.item_id,
      restaurant_id: values?.restaurant_id,
      description: values?.description,
      image: uploadImage,
      item_name: values?.item_name,
      item_price: values?.item_price,
      calories: values?.calories,
      menu_id: values?.menu_id,
      item_type: values?.item_type,
      currency: values?.currency,
      calories_unit: EditMenuData?.calories_unit,
      BearerToken
    };

    dispatch(LoadingSpinner(true))
    try {
      let responseData = await dispatch(EditMenuItemSlice(payload));
      popUpEditHookFun(false);



      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId:  ActiveCategory?.data,
      }; 

      // this condition will hold the menu on the category , it will not switch on the first category 
      if (responseData?.payload?.status == 200) { 
        dispatch(MenuSlice(MenuSlicePayload));
      } 


    } catch (error) {
      popUpEditHookFun(true);
    }

    setTimeout(async () => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      try {
        await dispatch(GetMenuCategorySlice(MenuSlicePayload));
        dispatch(LoadingSpinner(false))
      } catch (error) {
        dispatch(LoadingSpinner(false))
      }
    }, 1500);
  };




  const PopUpEditCategoriesToggleFun = (e, itemdata) => {
    setEditCategory(itemdata);
    setuploadCategoryImage(itemdata?.category_image);
    popUpEditcategoriesHookFun((o) => !o);
  };

  const ValidateEditCategory = yup.object({
    category: yup.string().required("Please Create Category"),
  });

  const defaultValueEditCategory = {
    category: EditCategory?.category,
  };

  const handleUploadEditCategoryImage = (e) => {
    setuploadCategoryImage(e?.target?.files[0]);
  };

  const handleCategoryeditSubmit = async (values) => {
    dispatch(LoadingSpinner(true))

    let payload = {
      menu_id: EditCategory?.menu_id,
      restaurant_id: RestaurantIdLocalStorageData,
      category_image: uploadCategoryImage,
      category: values?.category,
      BearerToken
    };

    if (
      typeof payload.category_image === "string" ||
      payload.category_image === null
    ) {
      delete payload.category_image;
    }

    try {
      await dispatch(EditCategorySlice(payload));
      popUpEditcategoriesHookFun((o) => !o);

      // await dispatch(LoadingSpinner(false))
    }
    catch (error) {
      // await dispatch(LoadingSpinner(false))
    }


    setTimeout(async () => {

      try {

        let MenuSlicePayload = {
          RestaurantId: RestaurantIdLocalStorageData,
        };
        await dispatch(GetMenuCategorySlice(MenuSlicePayload));
        await dispatch(LoadingSpinner(false))
      } catch (error) {
        await dispatch(LoadingSpinner(false))
      }

    }, 1500)
  };

  const CancelCategoryEditBtnFun = () => {
    popUpEditcategoriesHookFun(false);
  };

  const DeleteCategoryfun = (e, item) => {
    setCategoryId(item?.menu_id)
    deletePopUpFun(true)
  };

  const confirmDelete = (e, item) => {
    dispatch(LoadingSpinner(true))

    try {
      dispatch(DeleteMenuCategorySlice({ menu_id: item, BearerToken }));
      deletePopUpFun(false)
      // dispatch(LoadingSpinner(false))
    } catch (error) {
      // dispatch(LoadingSpinner(false))
    }

    setTimeout(() => {
      // dispatch(LoadingSpinner(true))
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      try {
        dispatch(GetMenuCategorySlice(MenuSlicePayload));
        dispatch(LoadingSpinner(false))
      } catch (error) {
        dispatch(LoadingSpinner(false))
      }

    }, 1500);

    // dispatch(ManagerDeleteSlice({item, BearerToken}))
    //     deletePopUpFun(false)
    //     setCurrentPage(0);
    //     let ManagerSlicePayload = {
    //         Token: BearerToken,
    //         pageination: 1
    //     }
    //     dispatch(ManagerSlice(ManagerSlicePayload));
  }



  useEffect(() => {
    if (MenuApiSelectorData?.DeleteMenucategoryReducerData?.status === 204) {
      toast.success("Delete Successfully");
    }
  }, [MenuApiSelectorData?.DeleteMenucategoryReducerData]);

  useEffect(() => {
    if (MenuItemFavouriteApiSelectorData?.data?.status === 200) {

      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };

      dispatch(favoriteMenuSlice(MenuSlicePayload));

    }

  }, [MenuItemFavouriteApiSelectorData])

  const DeleteItemfun = (e, item) => {
    console.log("kjhgfhgjgjkh")

    setMenuItemId(item?.item_id)
    deleteCategoryPopupFun(true)
  };

  const ConfirmDeleteItemFun = async (e, menuItemId) => {
    dispatch(LoadingSpinner(true))
    try {
      await dispatch(DeleteMenuItemSlice({ item_id: menuItemId, BearerToken }));
      deleteCategoryPopupFun(false)

    } catch (error) {
      deleteCategoryPopupFun(true)

    }
    setTimeout(async () => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };

      try {
        await dispatch(GetMenuCategorySlice(MenuSlicePayload));
        dispatch(LoadingSpinner(false))
      } catch (error) {
        dispatch(LoadingSpinner(false))
      }
    }, 1500)
  }

  const FavoriteFun = async (e, itemData) => {



    setFavoriteValueStoreData({
      toggle: true,
      data: itemData
    })

    await dispatch(LoadingSpinner(true))
    try {

      let responseData = await dispatch(favoriteMenuItemSlice({ item_id: itemData?.item_id, BearerToken }));

      // setTimeout(async () => {
      //   let MenuSlicePayload = {
      //     RestaurantId: RestaurantIdLocalStorageData,
      //   };
      //   await dispatch(GetMenuCategorySlice(MenuSlicePayload));
      // }, 1500)

      console.log("jkxgksgjahs", responseData?.payload?.status)

      setTimeout(async () => {
        CategoryTabFun("s", itemData)
        // let MenuSlicePayload = {
        //   RestaurantId: RestaurantIdLocalStorageData,
        // };
        // await dispatch(GetMenuCategorySlice(MenuSlicePayload));
      }, 1500)

      await dispatch(LoadingSpinner(false))

    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }
  };




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
    // setSaveActiveBtn(true)


    const draggedIndex = DragAndDropItems?.findIndex((el) => el.item_id === draggedItem.item_id);
    const targetIndex = DragAndDropItems?.findIndex((el) => el.item_id === item.item_id);

    const updatedItems = [...DragAndDropItems];
    const draggedItemCopy = { ...draggedItem, index: targetIndex + 1 };

    // Remove the dragged item from its original position
    updatedItems.splice(draggedIndex, 1);

    // Insert the dragged item at the target position
    updatedItems.splice(targetIndex, 0, draggedItemCopy);

    // Reindex the remaining items
    const newItems = updatedItems.map((item, index) => ({ ...item, index: index + 1 }));

    setDragAndDropItems(newItems);

    const payload = {
      data: newItems.map(({ item_id, menu_id, index }) => ({ menu_id, item_id, index })),
    };
    setDndPayload(payload)
    setDraggedItem(null);
  };


  const handleDndUpdate = () => {
    if (dndPayload) {
      setDndPayload(previousState => {
        previousState["BearerToken"] = BearerToken
        return { ...previousState }
      });

      dispatch(UpdateMenuItemsAfterDragAndDrop(dndPayload));
    }
  };


  useEffect(() => {

    if (MenuApiSelectorData?.UpdateMenuItemsAfterDragAndDropReducerData?.status === 200) {
      setSaveActiveBtn(false)
      setDraggableSubcategory(false)

      // Additional actions you want to perform when status is 200
      // dispatch(GetMenuCategorySlice({
      //     RestaurantId: resId  
      // }
      // ));
    }
    else {
    }


    // else if(MenuApiSelectorData?.UpdateMenuItemsAfterDragAndDropReducerData?.error === "Rejected") {
    //     toast.error("detail error");
    // }

  }, [MenuApiSelectorData?.UpdateMenuItemsAfterDragAndDropReducerData])

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const reorderSubmit = (e) => {
    navigate(`/${RestaurantIdLocalStorageData}/admin/categories/reorder/`);
  }


  const OpenActionToggleFun = (e, items) => {
    console.log("jhglkjh", items)
    if (OpenMenuActionToggle === items?.item_id) {
      setOpenMenuActionToggle(null);
    } else {
      setOpenMenuActionToggle(items?.item_id);
    }

    // setOpenMenuActionToggle(true)
  }

  const OpenActionToggleMenuFun = (e, items) => {

    if (OpenMenuActionToggle === items?.menu_id) {
      setOpenMenuActionToggle(null);
    } else {
      setOpenMenuActionToggle(items?.menu_id);
    }

    // setOpenMenuActionToggle(true)
  }


  return (
    <>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          {/* {reorderCategory === true ? <DndCategories /> : */}


          <div className="contentpart categorypage">
            <div className="title">
              <h2>
                Menu Categories
                {/* <img src={order}  className="sort-order"   onClick={(e) => setReorderCategory(true)}/> */}
              </h2>
              <div className="btnbox">
                <div className="btn1 uploadbtn-wrapper">
                  <button type="button">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z" />
                    </svg>{" "}
                    Upload Menu{" "}
                  </button>
                  <input
                    type="file"
                    accept="xlxs"
                    onChange={(e) => UploadMenuFile(e)}
                  />
                </div>

                <button
                  type="button"
                  className="menubtn btn2"
                  onClick={(e) => PopUpToggleFun()}
                >
                  {" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                  </svg>
                  Add Menu
                </button>
                <button
                  type="button"
                  className="categorybtn btn2"
                  onClick={(e) => PopUpCategoriesToggleFun()}
                >
                  {" "}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 5.83488H5.8443V0H7.1557V5.83488H13V7.16512H7.1557V13H5.8443V7.16512H0V5.83488Z" />
                  </svg>
                  Add Categories
                </button>

                <button
                  type="button"
                  className="categorybtn btn2"
                  onClick={(e) => QrCodeSampleDownloadFun()}
                >
                  Download Sample
                </button>

                {/* <div className="btn1 uploadbtn-wrapper">
                <img src={QrSampleImage} alt='img' />
                  <div className='info'>
                    <button type='button' onClick={(e) => QrCodeSampleDownloadFun()}>Download Sample</button>
                  </div>
                  <img src={QrSampleImage} alt='img'/>
                  <button type="button" onClick={(e) => QrCodeSampleDownloadFun(e)}>
                    Download Sample{" "}
                  </button>
                  <input
                    type="file"
                    accept=""
                    onClick={(e) => QrCodeSampleDownloadFun(e)}
                  />
                </div> */}
              </div>
            </div>

            <div className="categorycontent">
              <div className="leftpart">
                <div className="topdishestabpart">
                  <div className="reorder-icon-div"  >
                    <div onClick={(e) => reorderSubmit(e)} 
                    type="button">

 
                    <img src={order} className="sort-order" />
                    <span className="reorder-head"> Reorder</span>
                    </div>
                  </div>
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      {/* CATEGORY MANAGEMENT */}
                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length < 8 ? MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                        (item, id) => {
                          return (
                            <button

                              className={`${ActiveCategory?.data === item?.menu_id ? "active sadfs" : "No-active sadfs"
                                } nav-link`}
                              key={id}
                            // id="nav-dishes1-tab"
                            // data-bs-toggle="tab"
                            // data-bs-target="#nav-dishes1"
                            // type="button"
                            // role="tab"
                            // aria-controls="nav-dishes1"
                            // aria-selected="true"
                            >

                              <div className="editinfobtnbox" onClick={(e) => { OpenActionToggleMenuFun(e, item); CategoryTabFun(e, item, "3dots") }}
                              >
                                <button type="button">
                                  <img src={dot} alt="dot img" />
                                </button>



                                {item?.menu_id == OpenMenuActionToggle && <div className="btnbox">

                                  <button type="button" className="editbtn"
                                    onClick={(e) =>
                                      PopUpEditCategoriesToggleFun(e, item)
                                    }
                                  >
                                    <img src={edit1} alt="img" />{" "} Edit
                                  </button >

                                  <button className="deletbtn"
                                    onClick={(e) => DeleteCategoryfun(e, item)}>
                                    <img src={deleteicon} alt="delete icon " /> Delete
                                  </button>

                                </div>}


                              </div>


                              <div>
                                <figure className="curserer" >
                                  <img
                                    onClick={(e) => CategoryTabFun(e, item, "fromImage")}
                                    src={item?.category_image===null?defaultImage:item?.category_image}
                                    alt="img"
                                    className="catg-img"
                                  />
                                </figure>
                                <h3>{item?.category}</h3>
                              </div>
                            </button>
                          );
                        }
                      ) :
                        // MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length > 7 ? 7 : Number(MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length)
                        <Swiper
                          slidesPerView={7}
                          navigation={true}
                          mousewheel={true}
                          keyboard={true}
                          modules={[Navigation, Mousewheel, Keyboard]}
                          className="mySwiper"
                        >
                          {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                            (item, id, index) => {
                              return (
                                <SwiperSlide>
                                  <button
                                    onClick={(e) => CategoryTabFun(e, item)}
                                    className={`${ActiveCategory === item?.menu_id ? "active" : "No-active"
                                      } nav-link`}
                                    key={id}
                                    id="nav-dishes1-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-dishes1"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-dishes1"
                                    aria-selected="true"
                                  >

                                    <div>
                                      <figure>
                                        <img
                                          src={item?.category_image===null?defaultImage:item?.category_image}
                                          alt="img"
                                          className="catg-img"
                                        />
                                      </figure>
                                      <div className=""></div>

                                      <h3>{item?.category}</h3>



                                      <button className="editbtn">
                                        <img
                                          src={edit1}
                                          alt="editbtn"
                                          className="editactive "
                                          onClick={(e) =>
                                            PopUpEditCategoriesToggleFun(e, item)
                                          }
                                        />
                                      </button>

                                      <button className="deletebtn ms-1">
                                        <img
                                          src={deleteicon}
                                          alt="deleteicon"
                                          className=" "
                                          onClick={(e) => DeleteCategoryfun(e, item)}
                                        />
                                      </button>
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
                                </SwiperSlide>
                              );
                            }
                          )}
                        </Swiper>
                      }

                      {/* <Swiper
                        slidesPerView={MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length > 7 ? 7 : Number(MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length)}
                         navigation={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Mousewheel, Keyboard]}
                        className="mySwiper"
                      >
                        {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                          (item, id, index) => {
                            return (
                              <SwiperSlide>
                                <button
                                  onClick={(e) => CategoryTabFun(e, item)}
                                  className={`${ActiveCategory === item?.menu_id ? "active" : "No-active"
                                    } nav-link`}
                                  key={id}
                                  id="nav-dishes1-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-dishes1"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-dishes1"
                                  aria-selected="true"
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

                                    <button className="editbtn">
                                      <img
                                        src={edit1}
                                        alt="editbtn"
                                        className="editactive "
                                        onClick={(e) =>
                                          PopUpEditCategoriesToggleFun(e, item)
                                        }
                                      />
                                     </button>
                                    <button className="deletebtn ms-1">
                                      <img
                                        src={deleteicon}
                                        alt="deleteicon"
                                        className=" "
                                        onClick={(e) => DeleteCategoryfun(e, item)}
                                      />
                                     </button>
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
                              </SwiperSlide>
                            );
                          }
                        )}
                      </Swiper> */}
                    </div>
                  </nav>

                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="nav-dishes1"
                      role="tabpanel"
                      aria-labelledby="nav-dishes1-tab"
                      tabindex="0"
                    >
                      {/* <button
                          type="button"
                          className="categorybtn btn2"
                          onClick={(e) => setDraggableSubcategory(true)}
                        >
                          Sort categories
                        </button> */}
                      <div className="item-head">
                        <h2>Items</h2>


                        <div className="reorder-icon-div" onClick={(e) => setDraggableSubcategory(o=>!o)}>
                          {!SaveActiveBtn &&
                            <>
                              <img src={order} className="sort-order" />
                              <span className="reorder-head"> Reorder</span>

                            </>}
                          {SaveActiveBtn && <button
                            type="button "
                            className="categorybtn btn2 me-3"
                            onClick={handleDndUpdate}
                            style={{ width: "100px", height: "43px" }}
                          >
                            Save
                          </button>}
                        </div>


                        {/* <div   className="ReorderCurese">
                          <img src={order} className="sort-item-order me-3"  /> Reorder
                          
                        </div> */}
                      </div>

                      <ul>
                        {/* CATEGORY ITEMS DATA MANAGEMENT */}


                        {
                          // dragItem.length == 0 ? MenuApiSelectorData?.MenuSliceReducerData?.data &&

                          DragAndDropItems?.map(
                            (items, ids) => {
                              console.log("SDASFGH", items)
                              return (
                                <li
                                  key={ids}
                                  className={draggableSubcategory === true ? "drag-active " : "active"}
                                  // key={item.menu_id}
                                  draggable={draggableSubcategory}
                                  onDragStart={(e) => draggableSubcategory && startDrag(e, items)}
                                  onDragOver={(e) => draggableSubcategory && handleDragOver(e, items)}
                                  onDrop={(e) => draggableSubcategory && handleDrop(e, items)}
                                  onDragEnd={handleDragEnd}

                                >
                                  {<div className="title">
                                    {draggableSubcategory && <div className='indx-div'>
                                      <span className='item-indx'>{ids + 1}</span>
                                    </div>}
                                    <div className="">
                                      <h4>
                                        {items?.item_name}{" "}

                                      </h4>
                                    </div>
                                    <div className="editinfostar">
                                      <button type="button" className="starbtn" onClick={(e) => FavoriteFun(e, items)} >
                                        <img src={items?.is_favorite === true ? starfill : star} alt="img" />
                                      </button>

                                      <div className="editinfobtn" onClick={(e) => OpenActionToggleFun(e, items)}>
                                        <button type="button" >

                                          <img src={dot} alt="dot img" />



                                        </button>

                                        {items?.item_id == OpenMenuActionToggle && <div className="btnbox">
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              PopUpToggleEditFun(e, items)
                                            }
                                            className="editbtn">
                                            {" "}
                                            <img src={edit1} alt="img" />{" "} Edit
                                          </button>

                                          <button className="deletbtn"
                                            onClick={(e) =>
                                              DeleteItemfun(e, items)
                                            }
                                          >
                                            <img
                                              src={deleteicon}
                                              alt="delete icon "
                                            // className="editactive "
                                            /> Delete
                                          </button>
                                        </div>}

                                      </div>

                                    </div>
                                  </div>
                                  }

                                  <div className="tabinfo">
                                    <div className="leftpart">
                                      <p>
                                        {items?.description}
                                      </p>
                                      <span className="price">{`${items?.currency} ${items?.item_price}`}</span>
                                    </div>
                                    <div className="rightpart">
                                      <img src={items?.image==null?defaultImage:items?.image} alt="img" />
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          )

                          // :


                          // dragItem && dragItem?.map(
                          //   (items, ids) => {
                          //     return (
                          //       <li
                          //         key={ids}
                          //         className={draggableSubcategory === true ? "drag-active" : "active"} 
                          //         draggable={draggableSubcategory}
                          //         onDragStart={(e) => startDrag(e, items)}
                          //         onDragOver={(e) => handleDragOver(e, items)}
                          //         onDrop={(e) => handleDrop(e, items)}
                          //         onDragEnd={handleDragEnd}
                          //       >
                          //         {<div className="title">
                          //           <div className="">
                          //             <h4>
                          //               {items?.item_name}{" "}
                          //               <button
                          //                 type="button"
                          //                 onClick={(e) => FavoriteFun(e, items)}
                          //               >
                          //                 {" "}
                          //                 <img
                          //                   src={
                          //                     items?.is_favorite === true
                          //                       ? starfill
                          //                       : star
                          //                   }
                          //                   alt="img"
                          //                   className="ms-1"
                          //                 />{" "} 
                          //               </button>{" "}
                          //             </h4>
                          //           </div>
                          //           <div className="btnbox">
                          //             <button
                          //               type="button"
                          //               onClick={(e) =>
                          //                 PopUpToggleEditFun(e, items)
                          //               }
                          //               className="editbtn"
                          //             >
                          //               {" "}
                          //               <img src={edit1} alt="img" />{" "}
                          //             </button>

                          //             <button className="deletbtn">
                          //               <img
                          //                 src={deleteicon}
                          //                 alt="delete icon " 
                          //                 onClick={(e) =>
                          //                   DeleteItemfun(e, items)
                          //                 }
                          //               />
                          //             </button>
                          //           </div>
                          //         </div>}

                          //         <div className="tabinfo">
                          //           <div className="leftpart">
                          //             <p>
                          //               {items?.description}
                          //             </p>
                          //             <span className="price">{`$${items?.item_price}`}</span>
                          //           </div>
                          //           <div className="rightpart">
                          //             <img src={items?.image} alt="img" />
                          //           </div>
                          //         </div>
                          //       </li>
                          //     );
                          //   }
                          // )


                        }


                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightpart">
                <div className="bestsellerpart">
                  <h2>Bestseller</h2>
                  <ul>
                    {/* FAVORITE DISHES MANAGEMENT */}
                    {MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.map(

                      (items, favoriteId) => {
                        return items?.item_id?.map((item, favoriteDishId) => {//no need this map every time it's 0'th index
                          return (
                            <li key={favoriteDishId}>
                              <div className="leftpart">
                                <img src={item?.image==null?defaultImage:item?.image} alt="img" />
                              </div>
                              <div className="rightpart">
                                <h3>{item?.item_name}</h3>
                                <p>
                                  {item?.description}
                                </p>
                                <span className="price">
                                  {" "}
                                  {`${item?.currency} ${item?.item_price}`}{" "}
                                </span>
                              </div>
                            </li>
                          );
                        });
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* } */}
        </div>
      </DashboardLayout>
      {popUpHook && (
        <PopUpComponent
          classNameValue={"addmenupopup d-block"}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun}
        >
          {/* children part start */}
          <div className="popuptitle">
            <h2>Add Menu Item</h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultValue}
              validationSchema={Validatemenu}
              onSubmit={handleMenuSubmit}
            >
              <Form className="row">
                <div className="col-12 mb-3">
                  <div className="formbox ">
                    <label>Name </label>
                    <Field
                      name="item_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Item Name"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_name" />
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label>Item Price </label>
                    <div className="sarbox d-flex">
                      <Field
                        name="item_price"
                        type="number"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter the amount"
                      />
                      <Field
                        as="select"
                        name="currency"

                      >
                        {currencyData?.map((item, id) => {
                          return (
                            <option value={item.currency_code}>
                              {item.currency_code}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_price" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8 mb-3">
                  <div className="formbox ">
                    <label>Calories </label>
                    <div className="caloriesbox">
                      <Field
                        name="calories"
                        type="text"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Type Here"
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="calories" />
                    </p>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="formbox">
                    <label>Category </label>
                    <Field
                      as="select"
                      name="menu_id"
                      className={`form-control `}
                    >
                      <option value="select">
                        Please Select Category.....
                      </option>
                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                        (item, id) => {
                          return (
                            <option value={item?.menu_id}>
                              {item?.category}
                            </option>
                          );
                        }
                      )}
                      {/* <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option> */}
                    </Field>
                    {/* <label>Category </label>
                    <select className={`form-control `}>
                      <option> Item Type 1 </option>
                      <option> Item Type 2 </option>
                      <option> Item Type 3 </option>
                      <option> Item Type 4 </option>
                    </select> */}
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="menu_id" />
                    </p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="formbox">
                    <label>Item Type </label>
                    <Field
                      as="select"
                      name="item_type"
                      className={`form-control `}
                    >
                      <option value="select">
                        Please Select Item Type .....
                      </option>
                      <option value="VEG">Veg</option>
                      <option value="NON_VEG">Non Veg</option>
                    </Field>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_type" />
                    </p>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label>Description (Optional) </label>
                    <textarea
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Type Here"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {/* <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p> */}
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label className="d-block">Upload Image (Optional) </label>
                    <div className=" uploadwrapper ">
                      <button type="button">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z"
                            fill="#8D8D8D"
                          />
                        </svg>{" "}
                        Upload{" "}
                      </button>
                      <input
                        type="file"
                        accept=".png"
                        onChange={(e) => handleUploadImage(e)}
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn3"
                    onClick={(e) => CancelBtnFun(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button type="submit" className="btn2 submit mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}

      {
        deletePopup &&
        <PopUpComponent
          classNameValue={"popup wantmanager "}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun}
        >
          {/* children part start */}

          <div className='popupinner'>
            <div className='popupbody'>
              <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
              <h2>Do you want to Delete this Category?</h2>
              <div className='text-center'>
                <button type="button" onClick={(e) => deletePopUpFun(false)}>Cancel </button>
                <button type="button" className='ms-4' onClick={(e) => confirmDelete(e, CategoryId)}>Yes, I’m Sure</button>
              </div>
            </div>
          </div>

          {/* children part end */}

        </PopUpComponent>
      }



      {
        deleteCategoryPopup &&
        <PopUpComponent
          classNameValue={"popup wantmanager "}
          PopUpToggleFun={PopUpToggleFun}
          popUpHookFun={popUpHookFun}
        >
          {/* children part start */}

          <div className='popupinner'>
            <div className='popupbody'>
              <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
              <h2>Do you want to Delete this Menu Item?</h2>
              <div className='text-center'>
                <button type="button" onClick={(e) => deleteCategoryPopupFun(false)}>Cancel </button>
                <button type="button" className='ms-4' onClick={(e) => ConfirmDeleteItemFun(e, MenuItemId)}>Yes, I’m Sure</button>
              </div>
            </div>
          </div>

          {/* children part end */}

        </PopUpComponent>
      }
      {popUpcategoriesHook && (
        <PopUpComponent
          classNameValue={"addcategorypopup"}
          PopUpToggleFun={PopUpCategoriesToggleFun}
          popUpHookFun={popUpCategoriesHookFun}
        >
          {/* children part start */}

          <div className="popuptitle mb-5">
            <h2>Add Category </h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultValueCategory}
              validationSchema={ValidateCategory}
              onSubmit={handleCategorySubmit}
            >
              <Form className="row">
                <img src={category} alt="manager img" class="categoryimg" />
                <div className="formbox mb-3">
                  <label>Category Name </label>
                  <Field
                    name="category"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Enter your Name"
                  />
                  <p className="text-danger small mb-0">
                    <ErrorMessage name="category" />
                  </p>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label className="d-block">Upload Image (Optional) </label>
                    <div className=" uploadwrapper ">
                      <button type="button">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z"
                            fill="#8D8D8D"
                          />
                        </svg>{" "}
                        Upload{" "}
                      </button>
                      <input
                        type="file"
                        accept=".png"
                        onChange={(e) => handleUploadCategoryImage(e)}
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12 text-end mt-3">
                  <button
                    type="button"
                    className="btn3"
                    onClick={(e) => CancelCategoryBtnFun(e)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit btn2 mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      {popUpcategoriesHook && (
        <PopUpComponent
          classNameValue={"addmanagerpopup d-none"}
          PopUpToggleFun={PopUpCategoriesToggleFun}
          popUpHookFun={popUpCategoriesHookFun}
        >
          {/* children part start */}

          <div className="popuptitle">
            <h2>Add Menu Items </h2>
          </div>
          <div className="popupbody">
            <Formik
            // initialValues={defaultValue}
            // validationSchema={Validate}
            // onSubmit={handleSubmit}
            >
              <Form>
                <img src={manager} alt="manager img" />
                <div className="formbox mb-3">
                  <label>Onboarding </label>
                  <Field
                    name="first_name"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Enter your First Name"
                  />

                  <p className="text-danger small">
                    <ErrorMessage name="first_name" />
                  </p>
                </div>

                <div className="formbox mb-3">
                  <label>Last Name </label>
                  <Field
                    name="last_name"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Enter your Last Name"
                  />

                  <p className="text-danger small">
                    <ErrorMessage name="last_name" />
                  </p>
                </div>
                <div className="formbox mb-3">
                  <label>Email </label>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Email"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>

                <div className="formbox mb-3">
                  <label>Mobile Number </label>
                  <Field
                    name="phone_number"
                    type="number"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Enter your mobile number"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="phone_number" />
                  </p>
                </div>

                <div className="formbox mb-3">
                  <label>Password </label>
                  <Field
                    name="password"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="************"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="password" />
                  </p>
                </div>

                <div className="formbox mb-3">
                  <label>Confirm Password </label>
                  <Field
                    name="confirm_password"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="************"
                  />
                  <p className="text-danger">
                    <ErrorMessage name="confirm_password" />
                  </p>
                </div>

                <div className="formbox">
                  <label>Assign to Restaurant (optional) </label>
                  <select className={`form-control `}>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                    <option> Assign to Restaurant (optional) </option>
                  </select>

                  <p className="text-danger">
                    <ErrorMessage name="email" />
                  </p>
                </div>

                <div className="text-end mt-5">
                  <button
                    type="btn"
                    className="cancelbtn"
                    onClick={(e) => CancelCategoryBtnFun(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button type="submit" className="submit mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      {popUpEditHook && (
        <PopUpComponent
          classNameValue={"addmenupopup d-block"}
          PopUpToggleFun={PopUpToggleEditFun}
          popUpHookFun={popUpEditHookFun}
        >
          {/* children part start */}
          <div className="popuptitle">
            <h2>Edit Menu Item</h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultEditValue}
              validationSchema={Validateditemenu}
              onSubmit={handleEditMenuSubmit}
            >
              <Form className="row">
                <div className="col-12 mb-3">
                  <div className="formbox ">
                    <label>Name </label>
                    <Field
                      name="item_name"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Item Name"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_name" />
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="formbox ">
                    <label>Item Price </label>
                    <div className="sarbox d-flex">
                      <Field
                        name="item_price"
                        type="number"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Enter the amount"
                      />
                      <Field
                        as="select"
                        name="currency"
                      >
                        {currencyData?.map((item, id) => {
                          return (
                            <option value={item.currency_code}>
                              {item.currency_code}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_price" />
                    </p>
                  </div>
                </div>

                <div className="col-md-8 mb-3">
                  <div className="formbox ">
                    <label>Calories </label>
                    <div className="caloriesbox">
                      <Field
                        name="calories"
                        type="text"
                        className={`form-control `}
                        autoComplete="off"
                        placeholder="Type Here"
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="calories" />
                    </p>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="formbox">
                    <label>Category </label>
                    <Field
                      as="select"
                      name="menu_id"
                      className={`form-control `}
                    >
                      <option
                      // selected={ EditMenuData?.menu_id ? "selected" : "select category"}
                      >
                        {EditMenuData?.category}
                      </option>

                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                        (item, id) => {
                          return (
                            <option
                              // name="menu_id"
                              // selected={item?.menu_id ==  EditMenuData?.menu_id ? "selected" : ""}
                              value={item?.menu_id}
                            >
                              {item?.category}
                            </option>
                          );
                        }
                      )}
                    </Field>

                    <p className="text-danger small mb-0">
                      <ErrorMessage name="menu_id" />
                    </p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="formbox">
                    <label>Item Type </label>
                    <Field
                      as="select"
                      name="item_type"
                      className={`form-control `}
                    >
                      <option value="select">
                        Please Select Item Type .....
                      </option>
                      <option value="VEG">Veg</option>
                      <option value="NON_VEG">Non Veg</option>
                    </Field>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="item_type" />
                    </p>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label>Description (Optional) </label>
                    <Field
                      name="description"
                      type="text"
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Enter your Description"
                    />
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="description" />
                    </p>
                    {/* <textarea
                      className={`form-control `}
                      autoComplete="off"
                      placeholder="Type Here"
                      value={EditDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    ></textarea>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p> */}
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label className="d-block">Upload Image (Optional) </label>
                    <div className=" uploadwrapper ">
                      <button type="button">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z"
                            fill="#8D8D8D"
                          />
                        </svg>{" "}
                        Upload{" "}
                      </button>
                      <input
                        type="file"
                        accept=".png"
                        onChange={(e) => handleUploadImage(e)}
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button
                    type="button"
                    className="btn3"
                    onClick={(e) => CancelEditBtnFun(e)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button type="submit" className="btn2 submit mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      {popUpEditcategoriesHook && (
        <PopUpComponent
          classNameValue={"addcategorypopup"}
          PopUpToggleFun={PopUpEditCategoriesToggleFun}
          popUpHookFun={popUpEditcategoriesHookFun}
        >
          {/* children part start */}

          <div className="popuptitle mb-5">
            <h2>Edit Category </h2>
          </div>
          <div className="popupbody">
            <Formik
              initialValues={defaultValueEditCategory}
              validationSchema={ValidateEditCategory}
              onSubmit={handleCategoryeditSubmit}
            >
              <Form className="row">
                <img src={category} alt="manager img" class="categoryimg" />
                <div className="formbox mb-3">
                  <label>Category Name </label>
                  <Field
                    name="category"
                    type="text"
                    className={`form-control `}
                    autoComplete="off"
                    placeholder="Enter your Name"
                  />
                  <p className="text-danger small mb-0">
                    <ErrorMessage name="category" />
                  </p>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="formbox ">
                    <label className="d-block">Upload Image (Optional) </label>
                    <div className=" uploadwrapper ">
                      <button type="button">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M6.5 10.577V1.927L4.17 4.257L3.462 3.538L7 0L10.538 3.538L9.831 4.258L7.5 1.927V10.577H6.5ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V9.962H1V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13H12.385C12.5383 13 12.6793 12.936 12.808 12.808C12.936 12.6793 13 12.5383 13 12.385V9.962H14V12.385C14 12.845 13.846 13.229 13.538 13.537C13.2293 13.8457 12.845 14 12.385 14H1.615Z"
                            fill="#8D8D8D"
                          />
                        </svg>{" "}
                        Upload{" "}
                      </button>
                      <input
                        type="file"
                        accept=".png"
                        onChange={(e) => handleUploadEditCategoryImage(e)}
                      />
                    </div>
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="category_image" />
                    </p>
                  </div>
                </div>

                <div className="col-12 text-end mt-3">
                  <button
                    type="button"
                    className="btn3"
                    onClick={(e) => CancelCategoryEditBtnFun(e)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit btn2 mx-3">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>

          {/* children part end */}
        </PopUpComponent>
      )}
      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};

export default Categories;
