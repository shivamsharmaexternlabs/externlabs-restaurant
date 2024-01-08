import React, { useEffect, useState } from "react";
import "./categories.css";
import usePopUpHook from "../../../CustomHooks/usePopUpHook/usePopUpHook";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import LodingSpiner from "../../LoadingSpinner/LoadingSpinner";
import dish1 from "../../../images/dish1.png";
import dish2 from "../../../images/dish2.png";
import icon19 from '../../../images/icon19.svg';
import dish3 from "../../../images/dish3.png";
import category from "../../../images/category.png";
import edit1 from "../../../images/edit.svg";
import starfill from "../../../images/star.svg";
import defaultImage from '../../../images/defaultimg.png'
import dot from '../../../images/dot.svg'
import star from "../../../images/starb.svg";
import editw from "../../../images/editw.svg";
import icon4 from '../../../images/icon4.svg'
import icon5 from '../../../images/icon5.svg'
import order from "../../../images/order.svg";
import icon16 from "../../../images/icon16.svg";
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
import { CurrencySymbol } from "./CurrencySymbol"
import { Helmet } from "react-helmet";


const Categories = ({ translaterFun }) => {
  const dispatch = useDispatch();
  const [popUpHook, popUpHookFun] = usePopUpHook("");
  const [confirmMenuUploadFilePopUp, confirmMenuUploadFilePopUpFun] = usePopUpHook("");
  const [popUpEditHook, popUpEditHookFun] = usePopUpHook("");
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
  const [popUpEditcategoriesHook, popUpEditcategoriesHookFun] = usePopUpHook("");
  const [deletePopup, deletePopUpFun] = usePopUpHook("")
  const [deleteCategoryPopup, deleteCategoryPopupFun] = usePopUpHook("")

  const [EditCategory, setEditCategory] = useState("");
  const [ActiveCategory, setActiveCategory] = useState({
    toggle: false,
    data: undefined
  });
  const [DescriptionEn, setDescriptionEn] = useState("");
  const [DescriptionNative, setDescriptionNative] = useState("");

  const [uploadImage, setuploadImage] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [MenuItemId, setMenuItemId] = useState("");
  const [MenuItemHoverClassName, setMenuItemHoverClassName] = useState("");
  const [caloriesunit, setCaloriesUnit] = useState("kcal");
  const [QrSampleImage, setQrSampleImage] = useState("");
  const [UploadMenuFileState, setUploadMenuFileState] = useState("");
  const [uploadCategoryImage, setuploadCategoryImage] = useState("");
  const [EditMenuData, setEditMenuData] = useState("");//get category item data after click 
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
  const [inputs, setInputs] = useState([]);
  const [editInputs, seteditInputs] = useState([]);


  // -----------add variant  start-------------- 




  const handleAddInput = () => {
    setInputs([...inputs, { variant_name_en: "", amount: "", variant_name_native: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };


  // -----------add variant end ----------------


  // -----------edit variant  start-------------- 




  const handleEditInput = () => {
    seteditInputs([...editInputs, {variant_id: "" , variant_name_en: "", amount: "", variant_name_native: "" }]);
  };

  const handleEditChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...editInputs];
    onChangeValue[index][name] = value;
    seteditInputs(onChangeValue);
  };

  const handleEditDeleteInput = (index) => {
    const newArray = [...editInputs];
    newArray.splice(index, 1);
    seteditInputs(newArray);
  };

  console.log("dsvjvdsd", editInputs)
  // -----------edit variant end ----------------

  let BearerToken = reactLocalStorage.get("Token", false);
  let languageSet = reactLocalStorage.get("languageSet", false);

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

    setInputs([])
    setDescriptionEn("")
    setDescriptionNative("")
    popUpHookFun(false);
  };
  const CancelCategoryBtnFun = () => {
    popUpCategoriesHookFun(false);
  };


  useEffect(() => {

  }, [])


  const UploadMenuFile = async (e) => {
    setUploadMenuFileState(e?.target?.files);

    if (MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length === 0) {
      await dispatch(LoadingSpinner(true))
      const formData = new FormData();
      let payload = {
        file: e?.target?.files?.[0],
        restaurant_id: RestaurantIdLocalStorageData,
      };
      formData.append("file", payload?.file);
      formData.append("restaurant_id", payload?.restaurant_id);
      const UploadPayload = {
        formData,
        BearerToken
      }

      try {
        let response = await dispatch(UploadMenuSlice(UploadPayload));


        console.log("response", response)

        if (response?.payload?.status === 200) {
          // await dispatch(LoadingSpinner(true))

          setTimeout(async () => {

            await dispatch(GetMenuCategorySlice({
              RestaurantId: RestaurantIdLocalStorageData,
            }));
            await dispatch(LoadingSpinner(false))
          }, 1500);


        }
        // setUploadMenuFileState("");
        confirmMenuUploadFilePopUpFun(o => !o);

        await dispatch(LoadingSpinner(false))
      } catch (error) {
        await dispatch(LoadingSpinner(false))
      }

    }
    confirmMenuUploadFilePopUpFun(o => !o);

  };

  const confirmMenuUploadFile = async () => {
    await dispatch(LoadingSpinner(true))
    const formData = new FormData();
    let payload = {
      file: UploadMenuFileState?.[0],
      restaurant_id: RestaurantIdLocalStorageData,
    };
    formData.append("file", payload?.file);
    formData.append("restaurant_id", payload?.restaurant_id);
    const UploadPayload = {
      formData,
      BearerToken
    }

    try {
      let response = await dispatch(UploadMenuSlice(UploadPayload));
      setUploadMenuFileState("");
      confirmMenuUploadFilePopUpFun(o => !o);
      console.log("response", response)

      if (response?.payload?.status === 200) {
        // await dispatch(LoadingSpinner(true))

        setTimeout(async () => {

          await dispatch(GetMenuCategorySlice({
            RestaurantId: RestaurantIdLocalStorageData,
          }));
          await dispatch(LoadingSpinner(false))
        }, 1500);


      }

      await dispatch(LoadingSpinner(false))
    } catch (error) {
      await dispatch(LoadingSpinner(false))
    }
  }


  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }

  }, [
    MenuApiSelectorData?.GetMenuCategoryReducerData,
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
    // description: "",
    image: "",
    item_name_en: "",
    item_name_native: "",
    item_price: "",
    calories: "",
    menu_id: "",
    item_type: "",
    currency: "INR",
    calories_unit: "",
  };

  const Validatemenu = yup.object({
    // item_name_en: yup.string().required("Please Enter Item Name"),
    // item_name_native: yup.string().required("الرجاء إدخال اسم الصنف"),
    item_price: yup.string().required(translaterFun("please-enter-price")),
    calories: yup.string().matches(/^[0-9]+$/, translaterFun("calories-must-be-digit")).required(translaterFun("please-enter-calories")),
    menu_id: yup.string().required(translaterFun("please-enter-item-name")),
    item_type: yup.string().required(translaterFun("please-enter-item-type")),
    currency: yup.string().required(translaterFun("please-enter-currency")),
  }).shape({
    item_name_en: yup.string().when('item_name_native',
      (item_name_native_value) => {
        console.log("add_menu_item_item_name_native_value", item_name_native_value)
        if (item_name_native_value?.[0]) {
          return yup.string()
        } else {
          return yup.string().required("Provide Item Name in English, Arabic, or both")
        }
      }),
    item_name_native: yup.string().when('item_name_en',
      (item_name_en_value) => {
        if (item_name_en_value?.[0]) {
          return yup.string()
        } else {
          return yup.string().required("قم بتوفير اسم العنصر باللغة الإنجليزية أو العربية أو كليهما")
        }
      }),
  }, ['item_name_en', 'item_name_native']);

  const handleMenuSubmit = async (values) => {
    await dispatch(LoadingSpinner(true));

    const formData = new FormData();
    formData.append("restaurant_id", RestaurantIdLocalStorageData);
    formData.append("description_en", DescriptionEn);
    formData.append("description_native", DescriptionNative);
    formData.append("image", uploadImage);
    formData.append("item_name_en", values?.item_name_en);
    formData.append("item_name_native", values?.item_name_native);
    formData.append("item_price", values?.item_price);
    formData.append("calories", values?.calories);
    formData.append("menu_id", values?.menu_id);
    formData.append("is_veg", (values?.item_type === "VEG"));
    formData.append("is_non_veg", (values?.item_type === "NON_VEG"));
    formData.append("currency", values?.currency);
    formData.append("calories_unit", caloriesunit);


    inputs?.map((items, id) => {
      // formData.append(`variant[${id}][variant_id]`, items?.variant_id);
      formData.append(`variant[${id}][variant_name_en]`, items?.variant_name_en);
      formData.append(`variant[${id}][variant_name_native]`, items?.variant_name_native);
      formData.append(`variant[${id}][amount]`, items?.amount);
    })

    let MenuSubmitPayload = {
      formData,
      BearerToken
    }
    try {

      let resposeData = await dispatch(CreateMenuSlice(MenuSubmitPayload));
      await dispatch(LoadingSpinner(false))

      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId: values?.menu_id,
      };



      // this condition will hold the menu on the category , it will not switch on the first category

      if (resposeData?.payload?.status == 201) {

        let responseDataMenu = dispatch(MenuSlice(MenuSlicePayload));
        setActiveCategory({
          toggle: true,
          data: values?.menu_id
        });

        setInputs([]);
        setDescriptionEn("");
        setDescriptionNative("");

        popUpHookFun(false);
      }



    } catch (error) {
      setInputs([]);
      await dispatch(LoadingSpinner(false))
    }



    // setDescriptionEn("");
    // setDescriptionNative("");

    // popUpHookFun(false);
    // setTimeout(() => {
    //   let MenuSlicePayload = {
    //     RestaurantId: RestaurantIdLocalStorageData,
    //   };
    //   dispatch(GetMenuCategorySlice(MenuSlicePayload));
    // }, 1500)
  };





  const handleUploadImage = (e) => {
    setuploadImage(e?.target?.files?.[0] ? e?.target?.files?.[0] : "");
    // const formData = new FormData()
    // formData.append("file", payload?.file);
  };

  const defaultValueCategory = {
    category_en: "",
    category_native: ""
  };



  const ValidateCategory = yup.object().shape({
    category_en: yup.string().when('category_native',
      (category_native_value) => {
        if (category_native_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("Provide Category in English, Arabic, or both")
        }
      }),
    category_native: yup.string().when('category_en',
      (category_en_value) => {
        if (category_en_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("قم بتوفير الفئة باللغة الإنجليزية أو العربية أو كليهما")
        }
      }),
  }, ['category_en', 'category_native']);

  const handleCategorySubmit = async (values) => {

    await dispatch(LoadingSpinner(true))

    let handleCategoryPayload = {
      "restaurant_id": RestaurantIdLocalStorageData,
      "category_image": uploadCategoryImage ? uploadCategoryImage : "",
      "category_en": values?.category_en,
      "category_native": values?.category_native,
      "token": TokenLocalStorageData
    }
    try {
      await dispatch(CreateCategorySlice(handleCategoryPayload));
      setuploadCategoryImage("");
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
    console.log("bhgvfcdx", e.target?.files)
    setuploadCategoryImage(e?.target?.files[0]);

  };

  // edit menu items
  const PopUpToggleEditFun = (e, itemData) => {
    setEditMenuData(itemData);
    setuploadImage(itemData?.image ? itemData?.image : "");

    // console.log("itemDataedit", itemData)

    let newayy = []
    itemData?.variant?.map((items, id) => {
      newayy.push({
        "variant_id": items?.variant_id,
        "variant_name_en": items?.variant_name_en,
        "variant_name_native": items?.variant_name_native,
        "amount": items?.amount
      })

    })
    console.log("itemDataedit", itemData)
    seteditInputs(newayy)

    setDescriptionEn(itemData?.description_en)
    setDescriptionNative(itemData?.description_native)

    popUpEditHookFun((o) => !o);
  };

  const CancelEditBtnFun = () => {
    setDescriptionEn("")
    setDescriptionNative("")
    popUpEditHookFun(false);
  };
  const QrCodeSampleDownloadFun = () => {
    let url = QrSampleImage;
    saveAs(url, "Sample-Menu");
  };


  const defaultEditValue = {
    restaurant_id: EditMenuData?.restaurant_id,
    description_en: DescriptionEn,
    description_native: DescriptionNative,
    image: uploadImage,
    item_name_en: EditMenuData?.item_name_en === null ? "" : EditMenuData?.item_name_en,
    item_name_native: EditMenuData?.item_name_native === null ? "" : EditMenuData?.item_name_native,
    item_price: EditMenuData?.item_price,
    calories: EditMenuData?.calories,
    menu_id: EditMenuData?.menu_id,
    item_type: (EditMenuData?.is_veg === true ? "VEG" : "NON_VEG"),
    currency: EditMenuData?.currency,
    calories_unit: EditMenuData?.calories_unit,
  };

  const Validateditemenu = yup.object({
    // item_name_en: yup.string().required("Please Enter Item Name"),
    // item_name_native: yup.string().required("الرجاء إدخال اسم الصنف"),
    item_price: yup.string().required(translaterFun("please-enter-price")),
    calories: yup.string().matches(/^[0-9]+$/, translaterFun("calories-must-be-digit")).required(translaterFun("please-enter-menu")),
    menu_id: yup.string().required(translaterFun("please-enter-menu")),
    item_type: yup.string().required(translaterFun("please-enter-item-type")),
    currency: yup.string().required(translaterFun("please-enter-currency")),
    // description: yup.string().required(translaterFun("please-enter-description")),
  }).shape({
    item_name_en: yup.string().when('item_name_native',
      (item_name_native_value) => {
        console.log("add_menu_item_item_name_native_value editedit", item_name_native_value)
        if (item_name_native_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("Provide Item Name in English, Arabic, or both")
        }
      }),
    item_name_native: yup.string().when('item_name_en',
      (item_name_en_value) => {
        if (item_name_en_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("قم بتوفير اسم العنصر باللغة الإنجليزية أو العربية أو كليهما")
        }
      }),
  }, ['item_name_en', 'item_name_native']);



  const handleEditMenuSubmit = async (values) => {

    dispatch(LoadingSpinner(true))
    try {

      console.log("paylefrgbfvdoad", values)

      // let payload = {
      //   item_id: EditMenuData?.item_id,
      //   restaurant_id: values?.restaurant_id,
      //   description_en: DescriptionEn === null ? "" : DescriptionEn,
      //   description_native: DescriptionNative === null ? "" : DescriptionNative,
      //   image: uploadImage,
      //   item_name_en: values?.item_name_en,
      //   item_name_native: values?.item_name_native,
      //   item_price: values?.item_price,
      //   calories: values?.calories,
      //   menu_id: values?.menu_id,
      //   item_type: values?.item_type,
      //   currency: values?.currency,
      //   calories_unit: EditMenuData?.calories_unit,
      //   BearerToken
      // };

      

      const formData = new FormData();

      if (typeof uploadImage === "string" || uploadImage === null) {
 
      } else {
        formData.append("image", uploadImage);
      }
      
      formData.append("item_id", EditMenuData?.item_id);
      formData.append("restaurant_id", values?.restaurant_id);
      formData.append("description_en", DescriptionEn === null ? "" : DescriptionEn);
      formData.append("description_native", DescriptionNative === null ? "" : DescriptionNative);
      // formData.append("image", uploadImage);
      formData.append("item_name_en", values?.item_name_en);
      formData.append("item_name_native", values?.item_name_native);
      formData.append("item_price", values?.item_price);
      formData.append("calories", values?.calories);
      formData.append("menu_id", values?.menu_id);
      formData.append("is_veg", (values?.item_type === "VEG"));
      formData.append("is_non_veg", (values?.item_type === "NON_VEG"));
      formData.append("currency", values?.currency);
      formData.append("calories_unit", EditMenuData?.calories_unit);

      
      editInputs?.map((items, id) => {
        formData.append(`variant[${id}][variant_id]`, items?.variant_id);
        formData.append(`variant[${id}][variant_name_en]`, items?.variant_name_en);
        formData.append(`variant[${id}][variant_name_native]`, items?.variant_name_native);
        formData.append(`variant[${id}][amount]`, items?.amount);
      })

      let payload = {
        formData,
        BearerToken,
        item_id : EditMenuData?.item_id
      }

      let responseData = await dispatch(EditMenuItemSlice(payload));

      setDescriptionEn("");
      setDescriptionNative("");

      console.log("paylefrgbfvdoad", editInputs)

      setuploadImage("");
      popUpEditHookFun(false);



      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId: ActiveCategory?.data,
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


  const ValidateEditCategory = yup.object().shape({
    category_en: yup.string().when('category_native',
      (category_native_value) => {
        if (category_native_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("Provide Category in English, Arabic, or both")
        }
      }),
    category_native: yup.string().when('category_en',
      (category_en_value) => {
        if (category_en_value[0]) {
          return yup.string()
        } else {
          return yup.string().required("قم بتوفير الفئة باللغة الإنجليزية أو العربية أو كليهما")
        }
      }),
  }, ['category_en', 'category_native']);

  const defaultValueEditCategory = {
    category_en: EditCategory?.category_en ? EditCategory?.category_en : "",
    category_native: EditCategory?.category_native ? EditCategory?.category_native : "",

  };

  const handleUploadEditCategoryImage = (e) => {
    setuploadCategoryImage(e?.target?.files[0]);
  };

  const handleCategoryeditSubmit = async (values) => {
    dispatch(LoadingSpinner(true))

    let payload = {
      menu_id: EditCategory?.menu_id,
      restaurant_id: RestaurantIdLocalStorageData,
      category_image: uploadCategoryImage ? uploadCategoryImage : "",
      category_en: values?.category_en,
      category_native: values?.category_native,
      BearerToken
    };

    if (
      typeof payload?.category_image === "string" ||
      payload?.category_image === null
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

  const confirmDelete = async (e, item) => {
    dispatch(LoadingSpinner(true))

    try {


      let responseData = await dispatch(DeleteMenuCategorySlice({ menu_id: item, BearerToken }));
      deletePopUpFun(false)


      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId: item?.menu_id,
      };

      await dispatch(MenuSlice(MenuSlicePayload));

      setActiveCategory({
        toggle: false,
        data: undefined
      });


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
  }

  useEffect(() => {
    if (MenuItemFavouriteApiSelectorData?.data?.status === 200) {

      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };

      dispatch(favoriteMenuSlice(MenuSlicePayload));

    }

  }, [MenuItemFavouriteApiSelectorData])

  const DeleteItemfun = (e, item) => {
    console.log("kjhgfhgjgjkh", item)

    setMenuItemId(item)
    deleteCategoryPopupFun(true)
  };

  const ConfirmDeleteItemFun = async (e, menuItemId) => {
    dispatch(LoadingSpinner(true))
    try {
      let responseData = await dispatch(DeleteMenuItemSlice({ item_id: menuItemId?.item_id, BearerToken }));
      deleteCategoryPopupFun(false)



      console.log("jkgydgsham", responseData)

      let MenuSlicePayload = {
        searchValue: undefined,
        itemTypeValue: undefined,
        RestaurantId: RestaurantIdLocalStorageData,
        MenuId: menuItemId?.menu_id,
      };

      if (responseData?.payload?.status == 204) {
        dispatch(MenuSlice(MenuSlicePayload));
      }


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
      }, 500)

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

  }

  const OpenActionToggleMenuFun = (e, items) => {

    if (OpenMenuActionToggle === items?.menu_id) {
      setOpenMenuActionToggle(null);
    } else {
      setOpenMenuActionToggle(items?.menu_id);
    }

  }


  return (
    <>
      <Helmet>
        <title>Manage and Customize Your Digital Menu | Harbor Bites</title>
        <meta name="description" content="Modify your restaurant menu effortlessly. Explore customization options to showcase your offerings uniquely" />
        {/* <link rel="icon" type="image/x-icon" href="./"/> */}
      </Helmet>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />


          <div className="contentpart categorypage">
            <div className="title">
              <h2>
                {translaterFun("menu-categories")}

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
                    {translaterFun("upload-menu")}{" "}
                  </button>
                  <input
                    type="file"
                    accept=".xlxs, .xlsx, .xls, .pdf"
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
                  {translaterFun("add-menu")}
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
                  {translaterFun("add-categories")}
                </button>

                <button
                  type="button"
                  className="categorybtn btn2"
                  onClick={(e) => QrCodeSampleDownloadFun()}
                >
                  {translaterFun("download-sample")}
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
                    <button onClick={(e) => reorderSubmit(e)}
                      type="button">
                      <img src={order} className="sort-order" />
                      <span className="reorder-head"> {translaterFun("reorder")}</span>
                    </button>
                  </div>
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      {/* CATEGORY MANAGEMENT */}
                      {/* ================================================================== */}

                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length <= 7 ?
                        MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                          (item, id) => {
                            return (
                              <button key={id}
                                className={`${ActiveCategory?.data === item?.menu_id ? "active sadfs" : "No-active sadfs"
                                  } nav-link`}

                              // id="nav-dishes1-tab"
                              // data-bs-toggle="tab"
                              // data-bs-target="#nav-dishes1"
                              // type="button"
                              // role="tab"
                              // aria-controls="nav-dishes1"
                              // aria-selected="true"
                              >
                                <div className="editinfobtnbox" onClick={(e) => {
                                  OpenActionToggleMenuFun(e, item);
                                  CategoryTabFun(e, item, "3dots");
                                }}
                                >
                                  <button type="button">
                                    <img src={dot} alt="img" />
                                  </button>
                                  {item?.menu_id === OpenMenuActionToggle && <div className="btnbox">
                                    <button type="button" className="editbtn"
                                      onClick={(e) =>
                                        PopUpEditCategoriesToggleFun(e, item)
                                      }
                                    >
                                      <img src={edit1} alt="img" />{" "} {translaterFun("edit")}
                                    </button>
                                    <button className="deletbtn" onClick={(e) => DeleteCategoryfun(e, item)}>
                                      <img src={deleteicon} alt="delete icon " /> {translaterFun("delete")}
                                    </button>
                                  </div>}
                                </div>
                                <div>
                                  <figure className="curserer" >
                                    <img
                                      onClick={(e) => CategoryTabFun(e, item, "fromImage")}
                                      src={item?.category_image === null ? defaultImage : item?.category_image}
                                      alt="img"
                                      className="catg-img"
                                    />
                                  </figure>
                                  <h3>{languageSet == "en" ? item?.category_en : item?.category_native}</h3>
                                </div>
                              </button>
                            );
                          }
                        ) :
                        <Swiper
                          slidesPerView={7}
                          navigation={true}
                          mousewheel={true}
                          keyboard={true}
                          modules={[Navigation, Mousewheel, Keyboard]}
                          className="mySwiper"
                        >
                          {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                            (item, id) => {
                              return <SwiperSlide>
                                <button key={id}
                                  className={`${ActiveCategory?.data === item?.menu_id ? "active sadfs" : "No-active sadfs"
                                    } nav-link`}

                                // id="nav-dishes1-tab"
                                // data-bs-toggle="tab"
                                // data-bs-target="#nav-dishes1"
                                // type="button"
                                // role="tab"
                                // aria-controls="nav-dishes1"
                                // aria-selected="true"
                                >

                                  <div className="editinfobtnbox" onClick={(e) => {
                                    OpenActionToggleMenuFun(e, item);
                                    CategoryTabFun(e, item, "3dots");
                                  }}
                                  >
                                    <button type="button">
                                      <img src={dot} alt="img" />
                                    </button>
                                    {item?.menu_id == OpenMenuActionToggle && <div className="btnbox">
                                      <button type="button" className="editbtn"
                                        onClick={(e) =>
                                          PopUpEditCategoriesToggleFun(e, item)
                                        }
                                      >
                                        <img src={edit1} alt="img" />{" "} {translaterFun("edit")}
                                      </button>

                                      <button className="deletbtn"
                                        onClick={(e) => DeleteCategoryfun(e, item)}>
                                        <img src={deleteicon} alt="delete icon " /> {translaterFun("delete")}
                                      </button>

                                    </div>}


                                  </div>


                                  <div>
                                    <figure className="curserer" >
                                      <img
                                        onClick={(e) => CategoryTabFun(e, item, "fromImage")}
                                        src={item?.category_image === null ? defaultImage : item?.category_image}
                                        alt="img"
                                        className="catg-img"
                                      />
                                    </figure>
                                    <h3>{languageSet == "en" ? item?.category_en : item?.category_native}</h3>
                                  </div>
                                </button>
                              </SwiperSlide>

                            }
                          )}
                        </Swiper>


                      }


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

                      <div className="item-head">
                        <h2>{translaterFun("items")}</h2>
                        <div className="reorder-icon-div" onClick={(e) => setDraggableSubcategory(o => !o)}>
                          {!SaveActiveBtn &&
                            <>
                              <img src={order} className="sort-order" />
                              <span className="reorder-head"> {translaterFun("reorder")}</span>

                            </>}
                          {SaveActiveBtn && <button
                            type="button "
                            className="btn1"
                            onClick={handleDndUpdate}
                          >
                            {translaterFun("save")}
                          </button>}
                        </div>



                      </div>

                      <ul>
                        {/* CATEGORY ITEMS DATA MANAGEMENT */}
                        {
                          DragAndDropItems?.map(
                            (items, ids) => {
                              {/* console.log("SDASFGH", items) */ }
                              return (
                                <li
                                  key={ids}
                                  className={` ${draggableSubcategory === true ? "drag-active " : "active"} ${MenuItemHoverClassName === items?.item_id ? "variantboxshow deactive" : ""}`}
                                  // key={item.menu_id}
                                  draggable={draggableSubcategory}
                                  onDragStart={(e) => draggableSubcategory && startDrag(e, items)}
                                  onDragOver={(e) => draggableSubcategory && handleDragOver(e, items)}
                                  onDrop={(e) => draggableSubcategory && handleDrop(e, items)}
                                  onDragEnd={handleDragEnd}

                                >
                                  {<div className="title">
                                    {draggableSubcategory ?
                                      <div className="">
                                        <h4>
                                          <div className='indx-div'>
                                            <span className='item-indx'>{ids + 1}</span>
                                          </div>
                                          {languageSet === "en" ? items?.item_name_en : items?.item_name_native}{" "}
                                        </h4>
                                      </div> :
                                      <div className="">
                                        <h4>

                                          {languageSet === "en" ? items?.item_name_en : items?.item_name_native}{" "}

                                        </h4>
                                      </div>
                                    }

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
                                            <img src={edit1} alt="img" />{" "} {translaterFun("edit")}
                                          </button>

                                          <button className="deletbtn"
                                            onClick={(e) =>
                                              DeleteItemfun(e, items)
                                            }
                                          >
                                            <img
                                              src={deleteicon}
                                              alt="delete icon "
                                            /> {translaterFun("delete")}
                                          </button>
                                        </div>}

                                      </div>

                                    </div>
                                  </div>
                                  }

                                  <h5 className='mt-1'>

                                    {items?.is_veg == true ? <img src={icon4} alt='img' className='me-1' /> : <img src={icon5} alt='img' className='me-1' />}  {items?.calories} {items?.calories_unit}</h5>

                                  <div className="tabinfo">
                                    <div className="leftpart">
                                      <p>
                                        {
                                          (languageSet == "en") ?
                                            <>

                                              {items?.description_en?.length > 45 ? items?.description_en.slice(0, 45) + "..." : items?.description_en}
                                              <span>{items?.description_en?.length > 45 ? <b>{translaterFun("more")} <div className=''>{items?.description_en} </div> </b> : ""}  </span>
                                            </>
                                            :
                                            <>
                                              {items?.description_native?.length > 45 ? items?.description_native.slice(0, 45) + "..." : items?.description_native}
                                              <span>{items?.description_native?.length > 45 ? <b>{translaterFun("more")} <div className=''>{items?.description_native} </div> </b> : ""}  </span>
                                            </>
                                        }

                                      </p>
                                      <div className="" >

                                        <span className="price">{`${CurrencySymbol?.[0]?.[items?.currency]} ${items?.item_price}`}</span>
                                        {items?.variant?.length > 0 && <div className='variantbox'>
                                          <span className='variant'
                                            onMouseEnter={() => setMenuItemHoverClassName(items?.item_id)}
                                            onMouseLeave={() => setMenuItemHoverClassName("")}
                                          >
                                            {`${items?.variant?.length} ${translaterFun("variants")}`}
                                            <img src={icon19} alt="img" />
                                          </span>


                                        </div>

                                        }
                                      </div>
                                    </div>
                                    <div className="rightpart">
                                      <img src={items?.image == null ? defaultImage : items?.image} alt="img" />
                                    </div>

                                    <ul className="variantlist">

                                      {items?.variant?.map(
                                        (variant, variantId) => {
                                          return <li><b>{(languageSet == "en") ? variant?.variant_name_en : variant?.variant_name_native}</b> <span>{CurrencySymbol?.[0]?.[items?.currency]}  {variant?.amount}</span></li>
                                        })
                                      }
                                    </ul>
                                  </div>
                                </li>
                              );
                            }
                          )


                        }


                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rightpart">
                <div className="bestsellerpart">
                  <h2>{translaterFun("bestseller")}</h2>
                  <ul>
                    {/* FAVORITE DISHES MANAGEMENT */}
                    {MenuApiSelectorData?.favoriteMenuSliceReducerData?.data?.map(
                      (items, favoriteId) => {
                        return items?.item_id?.map((item, favoriteDishId) => {//no need this map every time it's 0'th index
                          return (
                            <li key={favoriteDishId}>
                              <div className="leftpart">
                                <img src={item?.image == null ? defaultImage : item?.image} alt="img" />
                              </div>
                              <div className="rightpart">
                                <h3 className="bestseller-veg-non-veg">

                                  {item?.is_veg == true ? <img src={icon4} alt='img' className='me-2  ' /> : <img src={icon5} alt='img' className='me-2' />}

                                  {languageSet === "en" ? item?.item_name_en : item?.item_name_native} </h3>

                                <p>
                                  {
                                    (languageSet == "en") ?
                                      <>

                                        {item?.description_en?.length > 45 ? item?.description_en.slice(0, 45) + "..." : item?.description_en}
                                        <span className="moreHover">{item?.description_en?.length > 45 ? <b>  {translaterFun("more")}  <div className=''>{item?.description_en.slice(45, item?.description_en?.length)} </div> </b> : ""}  </span>
                                      </>
                                      :
                                      <>
                                        {item?.description_native?.length > 45 ? item?.description_native.slice(0, 45) + "..." : item?.description_native}
                                        <span>{item?.description_native?.length > 45 ? <b>{translaterFun("more")} <div className=''>{item?.description_native} </div> </b> : ""}  </span>
                                      </>
                                  }
                                  {/* {languageSet === "en" ? item?.description_en : item?.description_native} */}
                                </p>
                                <span className="price">
                                  {" "}
                                  {`${CurrencySymbol[0][item?.currency]} ${item?.item_price}`}{" "}
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

            {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length > 0 &&
              confirmMenuUploadFilePopUp &&
              <PopUpComponent
                classNameValue={"popup wantmanager "}
                PopUpToggleFun={PopUpToggleFun}
                popUpHookFun={popUpHookFun}
              >

                <div className='popupinner'>
                  <div className='popupbody'>
                    <figure className='mb-0'> <img src={deleteimg} alt='deleteimg' /> </figure>
                    <h2>{translaterFun("confirm-upload")}</h2>
                    <div className='text-center'>
                      <button type="button" onClick={(e) => confirmMenuUploadFilePopUpFun(false)}>{translaterFun("cancel")} </button>
                      <button type="button" className='ms-4' onClick={(e) => confirmMenuUploadFile(e)}>{translaterFun("confirm-delete-button")}</button>
                    </div>
                  </div>
                </div>

              </PopUpComponent>
            }


            {popUpHook && (
              <PopUpComponent
                classNameValue={"addmenupopup"}
                PopUpToggleFun={PopUpToggleFun}
                popUpHookFun={popUpHookFun}
              >
                {/* children part start */}
                <div className="popuptitle">
                  <h2>{translaterFun("add-menu-item")}</h2>
                </div>
                <div className="popupbody">
                  <Formik
                    initialValues={defaultValue}
                    validationSchema={Validatemenu}
                    onSubmit={handleMenuSubmit}
                  >
                    <Form className="row mx-0">
                      <div className="col-md-6 mb-3">
                        <div className="formbox ">
                          <label>Name </label>
                          <Field
                            name="item_name_en"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Enter Your Item Name"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_name_en" />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="formbox " dir="rtl" >
                          <label >اسم </label>
                          <Field
                            name="item_name_native"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="أدخل اسم الصنف الخاص بك"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_name_native" />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="formbox ">
                          <label>{translaterFun("item-price")}  </label>
                          <div className="sarbox d-flex">
                            <Field
                              name="item_price"
                              type="number"
                              className={`form-control `}
                              autoComplete="off"
                              placeholder={translaterFun("enter-the-amount")}
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

                      <div className="col-md-6 mb-3">
                        <div className="formbox ">
                          <label>{translaterFun("calories")} </label>
                          <div className="caloriesbox">
                            <Field
                              name="calories"
                              type="text"
                              className={`form-control `}
                              autoComplete="off"
                              placeholder={translaterFun("type-here")}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="calories" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="formbox">
                          <label>{translaterFun("category")} </label>
                          <Field
                            as="select"
                            name="menu_id"
                            className={`form-control `}
                          >
                            <option value="select">
                              {translaterFun("please-select-category")}
                            </option>
                            {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                              (item, id) => {
                                return (
                                  <option value={item?.menu_id}>
                                    {languageSet == "en" ? item?.category_en : item?.category_native}
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




                      <div className="col-md-6 mb-3">
                        <div className="formbox">
                          <label>{translaterFun("item-type")} </label>
                          <Field
                            as="select"
                            name="item_type"
                            className={`form-control`}
                          >
                            <option value="select">
                              {translaterFun("please-select-item-type")}
                            </option>
                            <option value="VEG">{translaterFun("veg")}</option>
                            <option value="NON_VEG">{translaterFun("non-veg")}</option>
                          </Field>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_type" />
                          </p>
                        </div>
                      </div>

                      <div className="varientbox">


                        <div className="text-end mb-2  ">
                          <button className="btn   addvarentbtn" onClick={() => handleAddInput()}>
                            <label  >{translaterFun("add-variant")} </label>
                          </button>
                        </div>

                        {inputs?.map((item, index) => {
                          return <div className="row varientinnerbox mb-3">


                            <div className="col-md-6 mb-3" dir="ltr">
                              <div className="formbox ">
                                <label>Name of Variant</label>
                                <input

                                  name="variant_name_en"
                                  type="text"
                                  className={`form-control `}
                                  placeholder="Enter Variant Name"
                                  // value={item?.variant_name_en}
                                  onChange={(event) => handleChange(event, index)} />

                              </div>
                            </div>
                            <div className="col-md-6 mb-3" dir="rtl">
                              <div className="formbox ">
                                <label>اسم البديل</label>
                                <input
                                  name="variant_name_native"
                                  type="text"
                                  className={`form-control `}
                                  placeholder="أدخل اسم الصنف الخاص بك"
                                  // value={item?.variant_name_native}
                                  onChange={(event) => handleChange(event, index)}
                                />

                              </div>
                            </div>
                            <div className="col-md-12 mb-1" dir="ltr">

                              <label>{translaterFun("item-price")} </label>
                            </div>
                            <div className="col-md-6" dir="ltr">
                              <div className="formbox ">
                                <div className="itembox">
                                  <input
                                    name="amount"
                                    type="text"
                                    className={`form-control `}
                                    placeholder={translaterFun("item-price")}
                                    // value={item?.amount}
                                    onChange={(event) => handleChange(event, index)}
                                  />
                                  {/* <span className="itemsarbox"> sar </span> */}

                                </div>
                                <p className="text-danger small mb-0">
                                  <ErrorMessage name="calories" />
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 mt-2">
                              <div className="itemcheckbox">
                                {/* {inputs.length > 1 && ( */}
                                <button type="button" onClick={() => handleDeleteInput(index)}>
                                  <img src={deleteicon} alt="deleteicon" />  {translaterFun("delete")}
                                </button>
                                {/* )} */}


                              </div>
                            </div>
                          </div>
                        })}
                      </div>

                      <div className="col-md-12 mb-3" dir="ltr">
                        <div className="formbox ">
                          <label>Description (Optional)</label>
                          <textarea
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Type Here..."
                            value={DescriptionEn}
                            onChange={(e) => setDescriptionEn(e.target.value)}
                          ></textarea>

                        </div>
                      </div>

                      <div className="col-md-12 mb-3" dir="rtl">
                        <div className="formbox ">
                          <label>الوصف (اختياري) </label>
                          <textarea
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="أكتب هنا..."
                            value={DescriptionNative}
                            onChange={(e) => setDescriptionNative(e.target.value)}
                          ></textarea>

                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="formbox ">
                          <label className="d-block">{translaterFun("upload-image")} </label>
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
                              {translaterFun("upload")}{" "}
                            </button>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg"

                              onChange={(e) => handleUploadImage(e)}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className="col-12  addmenusubmitbtnbox">
                        <button
                          type="button"
                          className="btn3"
                          onClick={(e) => CancelBtnFun(e)}
                        >
                          {" "}
                          {translaterFun("cancel")}{" "}
                        </button>
                        <button type="submit" className="btn2 submit mx-3">
                          {" "}
                          {translaterFun("submit")}{" "}
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
                    <h2>{translaterFun("delete-category-confirmation-message")}</h2>
                    <div className='text-center'>
                      <button type="button" onClick={(e) => deletePopUpFun(false)}>{translaterFun("cancel")} </button>
                      <button type="button" className='ms-4' onClick={(e) => confirmDelete(e, CategoryId)}>{translaterFun("confirm-delete-button")}</button>
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
                    <h2>{translaterFun("delete-menu-item-confirmation-message")}</h2>
                    <div className='text-center'>
                      <button type="button" onClick={(e) => deleteCategoryPopupFun(false)}>{translaterFun("cancel")} </button>
                      <button type="button" className='ms-4' onClick={(e) => ConfirmDeleteItemFun(e, MenuItemId)}>{translaterFun("confirm-delete-button")}</button>
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

                <div className="popuptitle">
                  <h2>{translaterFun("add-category")} </h2>
                </div>
                <div className="popupbody">
                  <Formik
                    initialValues={defaultValueCategory}
                    validationSchema={ValidateCategory}
                    onSubmit={handleCategorySubmit}
                  >
                    <Form className="row">
                      <img src={category} alt="manager img" class="categoryimg" />
                      <div className="formbox mb-3" dir='ltr'>
                        <label>Category Name</label>
                        <Field
                          name="category_en"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          placeholder="Enter Your Name"
                        />
                        <p className="text-danger small mb-0">
                          <ErrorMessage name="category_en" />
                        </p>
                      </div>
                      <div className="formbox mb-3" dir='rtl'>
                        <label>  اسم التصنيف </label>
                        <Field
                          name="category_native"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          placeholder="أدخل أسمك"
                        />
                        <p className="text-danger small mb-0">
                          <ErrorMessage name="category_native" />
                        </p>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="formbox ">
                          <label className="d-block">{translaterFun("upload-image")} </label>
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
                              {translaterFun("upload")}{" "}
                            </button>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              // value
                              onChange={(e) => handleUploadCategoryImage(e)}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className="col-12  submitcategorybox mt-3">
                        <button
                          type="button"
                          className="btn3"
                          onClick={(e) => CancelCategoryBtnFun(e)}
                        >
                          {translaterFun("cancel")}
                        </button>
                        <button type="submit" className="submit btn2 mx-3">
                          {" "}
                          {translaterFun("submit")}{" "}
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
                classNameValue={"editmenupopup"}
                PopUpToggleFun={PopUpToggleEditFun}
                popUpHookFun={popUpEditHookFun}
              >
                {/* children part start */}
                <div className="popuptitle">
                  <h2>{translaterFun("edit-menu-item")}</h2>
                </div>
                <div className="popupbody">
                  <Formik
                    initialValues={defaultEditValue}
                    validationSchema={Validateditemenu}
                    onSubmit={handleEditMenuSubmit}
                  >
                    <Form className="row mx-0">

                      <div className="col-md-6 mb-3" dir='ltr'>
                        <div className="formbox ">
                          <label>Name </label>
                          <Field
                            name="item_name_en"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Enter Your Item Name"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_name_en" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3" dir='rtl'>
                        <div className="formbox ">
                          <label>الاسم </label>
                          <Field
                            name="item_name_native"
                            type="text"
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="أدخل اسم الصنف الخاص بك"
                          />
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_name_native" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="formbox ">
                          <label>{translaterFun("item-price")} </label>
                          <div className="sarbox d-flex">
                            <Field
                              name="item_price"
                              type="number"
                              className={`form-control `}
                              autoComplete="off"
                              placeholder={translaterFun("enter-the-amount")}
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

                      <div className="col-md-6 mb-3">
                        <div className="formbox ">
                          <label> {translaterFun("calories")} </label>
                          <div className="caloriesbox">
                            <Field
                              name="calories"
                              type="text"
                              className={`form-control `}
                              autoComplete="off"
                              placeholder={translaterFun("type-here")}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="calories" />
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className="formbox">
                          <label> {translaterFun("category")} </label>
                          <Field
                            as="select"
                            name="menu_id"
                            className={`form-control `}
                          >
                            <option
                            // selected={ EditMenuData?.menu_id ? "selected" : "select category"}
                            >
                              {/* {EditMenuData?.category} */}
                              {languageSet == "en" ? EditMenuData?.category_en : EditMenuData?.category_native}
                            </option>

                            {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                              (item, id) => {
                                return (
                                  <option
                                    // name="menu_id"
                                    // selected={item?.menu_id ==  EditMenuData?.menu_id ? "selected" : ""}
                                    value={item?.menu_id}
                                  >
                                    {languageSet == "en" ? item?.category_en : item?.category_native}
                                    {/* {item?.category} */}
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



                      <div className="col-md-6 mb-3">
                        <div className="formbox">
                          <label>{translaterFun("item-type")} </label>
                          <Field
                            as="select"
                            name="item_type"
                            className={`form-control `}
                          >
                            <option value="select">
                              {translaterFun("please-select-item-type")}
                            </option>
                            <option value="VEG">{translaterFun("veg")}</option>
                            <option value="NON_VEG">{translaterFun("non-veg")}</option>
                          </Field>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="item_type" />
                          </p>
                        </div>
                      </div>

                      {/*----------------- edit variant start -------------------------*/}



                      <div className="varientbox">


                        <div className="text-end mb-2  ">
                          <button className="btn   addvarentbtn" onClick={() => handleEditInput()}>
                            <label  >{translaterFun("add-variant")}</label>
                          </button>
                        </div>

                        {editInputs?.map((item, index) => {
                          return <div className="row varientinnerbox mb-3">


                            <div className="col-md-6 mb-3" dir="ltr">
                              <div className="formbox ">
                                <label>Name of Variant</label>
                                <input

                                  name="variant_name_en"
                                  type="text"
                                  className={`form-control `}
                                  placeholder="Enter Variant Name"
                                  value={item?.variant_name_en}
                                  onChange={(event) => handleEditChange(event, index)} />

                              </div>
                            </div>
                            <div className="col-md-6 mb-3" dir="rtl">
                              <div className="formbox ">
                                <label>اسم البديل</label>
                                <input
                                  name="variant_name_native"
                                  type="text"
                                  className={`form-control `}
                                  placeholder="أدخل اسم الصنف الخاص بك"
                                  value={item?.variant_name_native}
                                  onChange={(event) => handleEditChange(event, index)}
                                />

                              </div>
                            </div>
                            <div className="col-md-12 mb-1" dir="ltr">

                              <label>{translaterFun("item-price")} </label>
                            </div>
                            <div className="col-md-6" dir="ltr">
                              <div className="formbox ">
                                <div className="itembox">
                                  <input
                                    name="amount"
                                    type="text"
                                    className={`form-control `}
                                    placeholder={translaterFun("item-price")}
                                    value={item?.amount}
                                    onChange={(event) => handleEditChange(event, index)}
                                  />
                                  {/* <span className="itemsarbox"> sar </span> */}

                                </div>
                                {/* <p className="text-danger small mb-0">
                                  <ErrorMessage name="calories" />
                                </p> */}
                              </div>
                            </div>
                            <div className="col-md-6 mt-2">
                              <div className="itemcheckbox">
                                {/* {inputs.length > 1 && ( */}
                                <button type="button" onClick={() => handleEditDeleteInput(index)}>
                                  <img src={deleteicon} alt="deleteicon" />  {translaterFun("delete")}
                                </button>
                                {/* )} */}


                              </div>
                            </div>
                          </div>
                        })}
                      </div>


                      {/*----------------- edit variant end -------------------------*/}



                      <div className="col-md-12 mb-3" dir="ltr">
                        <div className="formbox ">
                          <label>Description (Optional)</label>
                          <textarea
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="Type Here..."
                            value={DescriptionEn}
                            onChange={(e) => setDescriptionEn(e.target.value)}
                          ></textarea>

                        </div>
                      </div>

                      <div className="col-md-12 mb-3" dir="rtl">
                        <div className="formbox ">
                          <label>الوصف (اختياري) </label>
                          <textarea
                            className={`form-control `}
                            autoComplete="off"
                            placeholder="أكتب هنا..."
                            value={DescriptionNative}
                            onChange={(e) => setDescriptionNative(e.target.value)}
                          ></textarea>

                        </div>
                      </div>


                      <div className="col-md-12 mb-3">
                        <div className="formbox ">
                          <label className="d-block">{translaterFun("upload-image")} </label>
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
                              {translaterFun("upload")}{" "}
                            </button>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => handleUploadImage(e)}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="first_name" />
                          </p>
                        </div>
                      </div>

                      <div className="col-12 submiteditbox">
                        <button
                          type="button"
                          className="btn3"
                          onClick={(e) => CancelEditBtnFun(e)}
                        >
                          {" "}
                          {translaterFun("cancel")}{" "}
                        </button>
                        <button type="submit" className="btn2 submit mx-3">
                          {" "}
                          {translaterFun("submit")}{" "}
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
                classNameValue={"addcategorypopup rrsefgesfseefsf"}
                PopUpToggleFun={PopUpEditCategoriesToggleFun}
                popUpHookFun={popUpEditcategoriesHookFun}
              >
                {/* children part start */}

                <div className="popuptitle">
                  <h2>{translaterFun("edit-category")}</h2>
                </div>
                <div className="popupbody">
                  <Formik
                    initialValues={defaultValueEditCategory}
                    validationSchema={ValidateEditCategory}
                    onSubmit={handleCategoryeditSubmit}
                  >
                    <Form className="row mx-0 ">
                      <img src={category} alt="manager img" class="categoryimg" />
                      <div className="formbox mb-3 px-0" dir='ltr' >
                        <label>Category Name </label>
                        <Field
                          name="category_en"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          placeholder="Enter Your Name"
                        />
                        <p className="text-danger small mb-0">
                          <ErrorMessage name="category_en" />
                        </p>
                      </div>
                      <div className="formbox mb-3 px-0 " dir='rtl'>
                        <label>اسم التصنيف </label>
                        <Field
                          name="category_native"
                          type="text"
                          className={`form-control `}
                          autoComplete="off"
                          placeholder="أدخل أسمك"
                        />
                        <p className="text-danger small mb-0">
                          <ErrorMessage name="category_native" />
                        </p>
                      </div>

                      <div className="col-md-12 mb-3 px-0">
                        <div className="formbox ">
                          <label className="d-block">{translaterFun("upload-image")} </label>
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
                              {translaterFun("upload")}{" "}
                            </button>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => handleUploadEditCategoryImage(e)}
                            />
                          </div>
                          <p className="text-danger small mb-0">
                            <ErrorMessage name="category_image" />
                          </p>
                        </div>
                      </div>

                      <div className="col-12 px-0 submitcategorybox mt-3">
                        <button
                          type="button"
                          className="btn3"
                          onClick={(e) => CancelCategoryEditBtnFun(e)}
                        >
                          {translaterFun("cancel")}
                        </button>
                        <button type="submit" className="submit btn2 mx-3">
                          {" "}
                          {translaterFun("submit")}{" "}
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>

                {/* children part end */}
              </PopUpComponent>
            )}


          </div>
          {/* } */}
        </div>
      </DashboardLayout>

      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};

export default Categories;
