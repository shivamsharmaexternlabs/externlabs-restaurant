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
import star from "../../../images/starb.png";
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
} from "../../../Redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { favoriteMenuItemSlice } from "../../../Redux/slices/favouriteSlice";
import { toast } from "react-toastify";
import DndCategories from "../DndCategories/DndCategories";

const Categories = () => {
  const dispatch = useDispatch();
  const [popUpHook, popUpHookFun] = usePopUpHook("");
  const [popUpEditHook, popUpEditHookFun] = usePopUpHook("");
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popUpcategoriesHook, popUpCategoriesHookFun] = usePopUpHook("");
  const [popUpEditcategoriesHook, popUpEditcategoriesHookFun] = usePopUpHook("");
  const [EditCategory, setEditCategory] = useState("");
  const [ActiveCategory, setActiveCategory] = useState(undefined);
  const [Description, setDescription] = useState("");
  const [EditDescription, setEditDescription] = useState("");
  const [uploadImage, setuploadImage] = useState("");
  const [caloriesunit, setCaloriesUnit] = useState("kcal");
  const [QrSampleImage, setQrSampleImage] = useState("");
  const [uploadCategoryImage, setuploadCategoryImage] = useState("");
  const [EditMenuData, setEditMenuData] = useState("");
  const [DeleteCategory, setDeleteCategory] = useState();
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggableSubcategory,setDraggableSubcategory]=useState(false)
  const[reorderCategory,setReorderCategory]=useState(false)
  // const[items,setItems]=useState(MenuApiSelectorData?.MenuSliceReducerData?.data[0])
  const MenuApiSelectorData = useSelector((state) => state.MenuApiData);
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

  console.log(
    "RestaurantIdLocalStorageData",
    MenuApiSelectorData?.DeleteMenucategoryReducerData
  );

  const PopUpToggleFun = () => {
    popUpHookFun((o) => !o);
  };
  let currencyData = [
    {
      country: "Afghanistan",
      currency_code: "AFN",
    },
    {
      country: "Albania",
      currency_code: "ALL",
    },
    {
      country: "Algeria",
      currency_code: "DZD",
    },
    {
      country: "American Samoa",
      currency_code: "USD",
    },
    {
      country: "Andorra",
      currency_code: "EUR",
    },
    {
      country: "Angola",
      currency_code: "AOA",
    },
    {
      country: "Anguilla",
      currency_code: "XCD",
    },
    {
      country: "Antarctica",
      currency_code: "XCD",
    },
    {
      country: "Antigua and Barbuda",
      currency_code: "XCD",
    },
    {
      country: "Argentina",
      currency_code: "ARS",
    },
    {
      country: "Armenia",
      currency_code: "AMD",
    },
    {
      country: "Aruba",
      currency_code: "AWG",
    },
    {
      country: "Australia",
      currency_code: "AUD",
    },
    {
      country: "Austria",
      currency_code: "EUR",
    },
    {
      country: "Azerbaijan",
      currency_code: "AZN",
    },
    {
      country: "Bahamas",
      currency_code: "BSD",
    },
    {
      country: "Bahrain",
      currency_code: "BHD",
    },
    {
      country: "Bangladesh",
      currency_code: "BDT",
    },
    {
      country: "Barbados",
      currency_code: "BBD",
    },
    {
      country: "Belarus",
      currency_code: "BYR",
    },
    {
      country: "Belgium",
      currency_code: "EUR",
    },
    {
      country: "Belize",
      currency_code: "BZD",
    },
    {
      country: "Benin",
      currency_code: "XOF",
    },
    {
      country: "Bermuda",
      currency_code: "BMD",
    },
    {
      country: "Bhutan",
      currency_code: "BTN",
    },
    {
      country: "Bolivia",
      currency_code: "BOB",
    },
    {
      country: "Bosnia and Herzegovina",
      currency_code: "BAM",
    },
    {
      country: "Botswana",
      currency_code: "BWP",
    },
    {
      country: "Bouvet Island",
      currency_code: "NOK",
    },
    {
      country: "Brazil",
      currency_code: "BRL",
    },
    {
      country: "British Indian Ocean Territory",
      currency_code: "USD",
    },
    {
      country: "Brunei",
      currency_code: "BND",
    },
    {
      country: "Bulgaria",
      currency_code: "BGN",
    },
    {
      country: "Burkina Faso",
      currency_code: "XOF",
    },
    {
      country: "Burundi",
      currency_code: "BIF",
    },
    {
      country: "Cambodia",
      currency_code: "KHR",
    },
    {
      country: "Cameroon",
      currency_code: "XAF",
    },
    {
      country: "Canada",
      currency_code: "CAD",
    },
    {
      country: "Cape Verde",
      currency_code: "CVE",
    },
    {
      country: "Cayman Islands",
      currency_code: "KYD",
    },
    {
      country: "Central African Republic",
      currency_code: "XAF",
    },
    {
      country: "Chad",
      currency_code: "XAF",
    },
    {
      country: "Chile",
      currency_code: "CLP",
    },
    {
      country: "China",
      currency_code: "CNY",
    },
    {
      country: "Christmas Island",
      currency_code: "AUD",
    },
    {
      country: "Cocos (Keeling) Islands",
      currency_code: "AUD",
    },
    {
      country: "Colombia",
      currency_code: "COP",
    },
    {
      country: "Comoros",
      currency_code: "KMF",
    },
    {
      country: "Congo",
      currency_code: "XAF",
    },
    {
      country: "Cook Islands",
      currency_code: "NZD",
    },
    {
      country: "Costa Rica",
      currency_code: "CRC",
    },
    {
      country: "Croatia",
      currency_code: "EUR",
    },
    {
      country: "Cuba",
      currency_code: "CUP",
    },
    {
      country: "Cyprus",
      currency_code: "EUR",
    },
    {
      country: "Czech Republic",
      currency_code: "CZK",
    },
    {
      country: "Denmark",
      currency_code: "DKK",
    },
    {
      country: "Djibouti",
      currency_code: "DJF",
    },
    {
      country: "Dominica",
      currency_code: "XCD",
    },
    {
      country: "Dominican Republic",
      currency_code: "DOP",
    },
    {
      country: "East Timor",
      currency_code: "USD",
    },
    {
      country: "Ecuador",
      currency_code: "ECS",
    },
    {
      country: "Egypt",
      currency_code: "EGP",
    },
    {
      country: "El Salvador",
      currency_code: "SVC",
    },
    {
      country: "England",
      currency_code: "GBP",
    },
    {
      country: "Equatorial Guinea",
      currency_code: "XAF",
    },
    {
      country: "Eritrea",
      currency_code: "ERN",
    },
    {
      country: "Estonia",
      currency_code: "EUR",
    },
    {
      country: "Ethiopia",
      currency_code: "ETB",
    },
    {
      country: "Falkland Islands",
      currency_code: "FKP",
    },
    {
      country: "Faroe Islands",
      currency_code: "DKK",
    },
    {
      country: "Fiji Islands",
      currency_code: "FJD",
    },
    {
      country: "Finland",
      currency_code: "EUR",
    },
    {
      country: "France",
      currency_code: "EUR",
    },
    {
      country: "French Guiana",
      currency_code: "EUR",
    },
    {
      country: "French Polynesia",
      currency_code: "XPF",
    },
    {
      country: "French Southern territories",
      currency_code: "EUR",
    },
    {
      country: "Gabon",
      currency_code: "XAF",
    },
    {
      country: "Gambia",
      currency_code: "GMD",
    },
    {
      country: "Georgia",
      currency_code: "GEL",
    },
    {
      country: "Germany",
      currency_code: "EUR",
    },
    {
      country: "Ghana",
      currency_code: "GHS",
    },
    {
      country: "Gibraltar",
      currency_code: "GIP",
    },
    {
      country: "Greece",
      currency_code: "EUR",
    },
    {
      country: "Greenland",
      currency_code: "DKK",
    },
    {
      country: "Grenada",
      currency_code: "XCD",
    },
    {
      country: "Guadeloupe",
      currency_code: "EUR",
    },
    {
      country: "Guam",
      currency_code: "USD",
    },
    {
      country: "Guatemala",
      currency_code: "QTQ",
    },
    {
      country: "Guinea",
      currency_code: "GNF",
    },
    {
      country: "Guinea-Bissau",
      currency_code: "CFA",
    },
    {
      country: "Guyana",
      currency_code: "GYD",
    },
    {
      country: "Haiti",
      currency_code: "HTG",
    },
    {
      country: "Heard Island and McDonald Islands",
      currency_code: "AUD",
    },
    {
      country: "Holy See (Vatican City State)",
      currency_code: "EUR",
    },
    {
      country: "Honduras",
      currency_code: "HNL",
    },
    {
      country: "Hong Kong",
      currency_code: "HKD",
    },
    {
      country: "Hungary",
      currency_code: "HUF",
    },
    {
      country: "Iceland",
      currency_code: "ISK",
    },
    {
      country: "India",
      currency_code: "INR",
    },
    {
      country: "Indonesia",
      currency_code: "IDR",
    },
    {
      country: "Iran",
      currency_code: "IRR",
    },
    {
      country: "Iraq",
      currency_code: "IQD",
    },
    {
      country: "Ireland",
      currency_code: "EUR",
    },
    {
      country: "Israel",
      currency_code: "ILS",
    },
    {
      country: "Italy",
      currency_code: "EUR",
    },
    {
      country: "Ivory Coast",
      currency_code: "XOF",
    },
    {
      country: "Jamaica",
      currency_code: "JMD",
    },
    {
      country: "Japan",
      currency_code: "JPY",
    },
    {
      country: "Jordan",
      currency_code: "JOD",
    },
    {
      country: "Kazakhstan",
      currency_code: "KZT",
    },
    {
      country: "Kenya",
      currency_code: "KES",
    },
    {
      country: "Kiribati",
      currency_code: "AUD",
    },
    {
      country: "Kuwait",
      currency_code: "KWD",
    },
    {
      country: "Kyrgyzstan",
      currency_code: "KGS",
    },
    {
      country: "Laos",
      currency_code: "LAK",
    },
    {
      country: "Latvia",
      currency_code: "EUR",
    },
    {
      country: "Lebanon",
      currency_code: "LBP",
    },
    {
      country: "Lesotho",
      currency_code: "LSL",
    },
    {
      country: "Liberia",
      currency_code: "LRD",
    },
    {
      country: "Libyan Arab Jamahiriya",
      currency_code: "LYD",
    },
    {
      country: "Liechtenstein",
      currency_code: "CHF",
    },
    {
      country: "Lithuania",
      currency_code: "EUR",
    },
    {
      country: "Luxembourg",
      currency_code: "EUR",
    },
    {
      country: "Macau",
      currency_code: "MOP",
    },
    {
      country: "North Macedonia",
      currency_code: "MKD",
    },
    {
      country: "Madagascar",
      currency_code: "MGF",
    },
    {
      country: "Malawi",
      currency_code: "MWK",
    },
    {
      country: "Malaysia",
      currency_code: "MYR",
    },
    {
      country: "Maldives",
      currency_code: "MVR",
    },
    {
      country: "Mali",
      currency_code: "XOF",
    },
    {
      country: "Malta",
      currency_code: "EUR",
    },
    {
      country: "Marshall Islands",
      currency_code: "USD",
    },
    {
      country: "Martinique",
      currency_code: "EUR",
    },
    {
      country: "Mauritania",
      currency_code: "MRO",
    },
    {
      country: "Mauritius",
      currency_code: "MUR",
    },
    {
      country: "Mayotte",
      currency_code: "EUR",
    },
    {
      country: "Mexico",
      currency_code: "MXN",
    },
    {
      country: "Micronesia, Federated States of",
      currency_code: "USD",
    },
    {
      country: "Moldova",
      currency_code: "MDL",
    },
    {
      country: "Monaco",
      currency_code: "EUR",
    },
    {
      country: "Mongolia",
      currency_code: "MNT",
    },
    {
      country: "Montserrat",
      currency_code: "XCD",
    },
    {
      country: "Morocco",
      currency_code: "MAD",
    },
    {
      country: "Mozambique",
      currency_code: "MZN",
    },
    {
      country: "Myanmar",
      currency_code: "MMR",
    },
    {
      country: "Namibia",
      currency_code: "NAD",
    },
    {
      country: "Nauru",
      currency_code: "AUD",
    },
    {
      country: "Nepal",
      currency_code: "NPR",
    },
    {
      country: "Netherlands",
      currency_code: "EUR",
    },
    {
      country: "Netherlands Antilles",
      currency_code: "ANG",
    },
    {
      country: "New Caledonia",
      currency_code: "XPF",
    },
    {
      country: "New Zealand",
      currency_code: "NZD",
    },
    {
      country: "Nicaragua",
      currency_code: "NIO",
    },
    {
      country: "Niger",
      currency_code: "XOF",
    },
    {
      country: "Nigeria",
      currency_code: "NGN",
    },
    {
      country: "Niue",
      currency_code: "NZD",
    },
    {
      country: "Norfolk Island",
      currency_code: "AUD",
    },
    {
      country: "North Korea",
      currency_code: "KPW",
    },
    {
      country: "Northern Ireland",
      currency_code: "GBP",
    },
    {
      country: "Northern Mariana Islands",
      currency_code: "USD",
    },
    {
      country: "Norway",
      currency_code: "NOK",
    },
    {
      country: "Oman",
      currency_code: "OMR",
    },
    {
      country: "Pakistan",
      currency_code: "PKR",
    },
    {
      country: "Palau",
      currency_code: "USD",
    },
    {
      country: "Palestine",
      currency_code: null,
    },
    {
      country: "Panama",
      currency_code: "PAB",
    },
    {
      country: "Papua New Guinea",
      currency_code: "PGK",
    },
    {
      country: "Paraguay",
      currency_code: "PYG",
    },
    {
      country: "Peru",
      currency_code: "PEN",
    },
    {
      country: "Philippines",
      currency_code: "PHP",
    },
    {
      country: "Pitcairn Islands",
      currency_code: "NZD",
    },
    {
      country: "Poland",
      currency_code: "PLN",
    },
    {
      country: "Portugal",
      currency_code: "EUR",
    },
    {
      country: "Puerto Rico",
      currency_code: "USD",
    },
    {
      country: "Qatar",
      currency_code: "QAR",
    },
    {
      country: "Reunion",
      currency_code: "EUR",
    },
    {
      country: "Romania",
      currency_code: "RON",
    },
    {
      country: "Russian Federation",
      currency_code: "RUB",
    },
    {
      country: "Rwanda",
      currency_code: "RWF",
    },
    {
      country: "Saint Helena",
      currency_code: "SHP",
    },
    {
      country: "Saint Kitts and Nevis",
      currency_code: "XCD",
    },
    {
      country: "Saint Lucia",
      currency_code: "XCD",
    },
    {
      country: "Saint Pierre and Miquelon",
      currency_code: "EUR",
    },
    {
      country: "Saint Vincent and the Grenadines",
      currency_code: "XCD",
    },
    {
      country: "Samoa",
      currency_code: "WST",
    },
    {
      country: "San Marino",
      currency_code: "EUR",
    },
    {
      country: "Sao Tome and Principe",
      currency_code: "STD",
    },
    {
      country: "Saudi Arabia",
      currency_code: "SAR",
    },
    {
      country: "Scotland",
      currency_code: "GBP",
    },
    {
      country: "Senegal",
      currency_code: "XOF",
    },
    {
      country: "Serbia",
      currency_code: "RSD",
    },
    {
      country: "Seychelles",
      currency_code: "SCR",
    },
    {
      country: "Sierra Leone",
      currency_code: "SLL",
    },
    {
      country: "Singapore",
      currency_code: "SGD",
    },
    {
      country: "Slovakia",
      currency_code: "EUR",
    },
    {
      country: "Slovenia",
      currency_code: "EUR",
    },
    {
      country: "Solomon Islands",
      currency_code: "SBD",
    },
    {
      country: "Somalia",
      currency_code: "SOS",
    },
    {
      country: "South Africa",
      currency_code: "ZAR",
    },
    {
      country: "South Georgia and the South Sandwich Islands",
      currency_code: "GBP",
    },
    {
      country: "South Korea",
      currency_code: "KRW",
    },
    {
      country: "South Sudan",
      currency_code: "SSP",
    },
    {
      country: "Spain",
      currency_code: "EUR",
    },
    {
      country: "Sri Lanka",
      currency_code: "LKR",
    },
    {
      country: "Sudan",
      currency_code: "SDG",
    },
    {
      country: "Suriname",
      currency_code: "SRD",
    },
    {
      country: "Svalbard and Jan Mayen",
      currency_code: "NOK",
    },
    {
      country: "Swaziland",
      currency_code: "SZL",
    },
    {
      country: "Sweden",
      currency_code: "SEK",
    },
    {
      country: "Switzerland",
      currency_code: "CHF",
    },
    {
      country: "Syria",
      currency_code: "SYP",
    },
    {
      country: "Tajikistan",
      currency_code: "TJS",
    },
    {
      country: "Tanzania",
      currency_code: "TZS",
    },
    {
      country: "Thailand",
      currency_code: "THB",
    },
    {
      country: "The Democratic Republic of Congo",
      currency_code: "CDF",
    },
    {
      country: "Togo",
      currency_code: "XOF",
    },
    {
      country: "Tokelau",
      currency_code: "NZD",
    },
    {
      country: "Tonga",
      currency_code: "TOP",
    },
    {
      country: "Trinidad and Tobago",
      currency_code: "TTD",
    },
    {
      country: "Tunisia",
      currency_code: "TND",
    },
    {
      country: "Turkey",
      currency_code: "TRY",
    },
    {
      country: "Turkmenistan",
      currency_code: "TMT",
    },
    {
      country: "Turks and Caicos Islands",
      currency_code: "USD",
    },
    {
      country: "Tuvalu",
      currency_code: "AUD",
    },
    {
      country: "Uganda",
      currency_code: "UGX",
    },
    {
      country: "Ukraine",
      currency_code: "UAH",
    },
    {
      country: "United Arab Emirates",
      currency_code: "AED",
    },
    {
      country: "United Kingdom",
      currency_code: "GBP",
    },
    {
      country: "United States",
      currency_code: "USD",
    },
    {
      country: "United States Minor Outlying Islands",
      currency_code: "USD",
    },
    {
      country: "Uruguay",
      currency_code: "UYU",
    },
    {
      country: "Uzbekistan",
      currency_code: "UZS",
    },
    {
      country: "Vanuatu",
      currency_code: "VUV",
    },
    {
      country: "Venezuela",
      currency_code: "VEF",
    },
    {
      country: "Vietnam",
      currency_code: "VND",
    },
    {
      country: "Virgin Islands, British",
      currency_code: "USD",
    },
    {
      country: "Virgin Islands, U.S.",
      currency_code: "USD",
    },
    {
      country: "Wales",
      currency_code: "GBP",
    },
    {
      country: "Wallis and Futuna",
      currency_code: "XPF",
    },
    {
      country: "Western Sahara",
      currency_code: "MAD",
    },
    {
      country: "Yemen",
      currency_code: "YER",
    },
    {
      country: "Zambia",
      currency_code: "ZMW",
    },
    {
      country: "Zimbabwe",
      currency_code: "ZWD",
    },
  ];
  const PopUpCategoriesToggleFun = () => {
    popUpCategoriesHookFun((o) => !o);
  };
  const CancelBtnFun = () => {
    popUpHookFun(false);
  };
  const CancelCategoryBtnFun = () => {
    popUpCategoriesHookFun(false);
  };
  const UploadMenuFile = (e) => {
    console.log("hjgsdh", e?.target?.files[0]);
    const formData = new FormData();
    let payload = {
      file: e?.target?.files[0],
      restaurant_id: RestaurantIdLocalStorageData,
    };
    formData.append("file", payload?.file);
    formData.append("restaurant_id", payload?.restaurant_id);
    console.log("shgdah", payload, formData);
    dispatch(UploadMenuSlice(formData));
  };

  console.log("MenuApiSelectorData", MenuApiSelectorData);
  useEffect(() => {
    if (MenuApiSelectorData?.GetMenuCategoryReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.MenuSliceReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
    if (MenuApiSelectorData?.favoriteMenuSliceReducerData.status === 200) {
      setLoadSpiner(false);
    } else if (MenuApiSelectorData?.error == "Rejected") {
      setLoadSpiner(false);
    }
  }, [
    MenuApiSelectorData?.GetMenuCategoryReducerData,
    MenuApiSelectorData?.MenuSliceReducerData,
    MenuApiSelectorData?.favoriteMenuSliceReducerData,
  ]);

  useEffect(() => {
    let MenuSlicePayload = {
      RestaurantId: RestaurantIdLocalStorageData,
    };

    dispatch(GetMenuCategorySlice(MenuSlicePayload));
    dispatch(favoriteMenuSlice(MenuSlicePayload));
    dispatch(GetSampleUploadSlice());
  }, []);

  useEffect(() => {
    console.log(
      "hagsha",
      MenuApiSelectorData?.GetSampleUploadReducerData?.data
    );
    setQrSampleImage(MenuApiSelectorData?.GetSampleUploadReducerData?.data);
  }, [MenuApiSelectorData?.GetSampleUploadReducerData]);
  // console.log("nchgsddsdsd", MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0])
  console.log("ActiveCategory", ActiveCategory);

  useEffect(() => {
    setActiveCategory(
      MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id
    );

    let MenuSlicePayload = {
      searchValue: undefined,
      itemTypeValue: undefined,
      RestaurantId: RestaurantIdLocalStorageData,
      MenuId:
        MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.[0]?.menu_id,
    };

    dispatch(MenuSlice(MenuSlicePayload));
  }, [MenuApiSelectorData?.GetMenuCategoryReducerData]);

  const CategoryTabFun = (e, categoryItem) => {
    let MenuSlicePayload = {
      searchValue: "",
      itemTypeValue: "",
      RestaurantId: RestaurantIdLocalStorageData,
      MenuId: categoryItem?.menu_id,
    };

    dispatch(MenuSlice(MenuSlicePayload));
    setActiveCategory(categoryItem?.menu_id);
    console.log("hgvujvjvhjvvhv", ActiveCategory);
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
  console.log("sjgjah", defaultValue);
  const Validatemenu = yup.object({
    item_name: yup.string().required("Please Enter Item"),
    item_price: yup.string().required("Please Enter Price"),
    calories: yup.string().required("Please Enter Calories"),
    menu_id: yup.string().required("Please Enter Menu"),
    item_type: yup.string().required("Please Enter Item"),
    currency: yup.string().required("Please Enter Currency"),
  });
  const handleMenuSubmit = (values) => {
    const formData = new FormData();
    console.log("djsbdjk", values);
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
    console.log("ashd", formData);
    dispatch(CreateMenuSlice(formData));
    popUpHookFun(false);
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500)
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
  const handleCategorySubmit = (values) => {
    let handleCategoryPayload = {
      "restaurant_id": RestaurantIdLocalStorageData,
      "category_image": uploadCategoryImage,
      "category": values?.category,
      "token": TokenLocalStorageData
    }


    dispatch(CreateCategorySlice(handleCategoryPayload));

    popUpCategoriesHookFun(false);
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500);
  };
  const handleUploadCategoryImage = (e) => {
    console.log("hjgsdh", e?.target?.files[0]);
    setuploadCategoryImage(e?.target?.files[0]);
    // const formData = new FormData()
    // formData.append("file", payload?.file);
  };

  // edit menu items
  const PopUpToggleEditFun = (e, itemData) => {
    console.log("jhdfshfd", itemData);
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
  console.log("EditMensadfsdfuData", EditMenuData);

  useEffect(() => { }, [MenuApiSelectorData?.GetSampleUploadReducerData]);
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
  const handleEditMenuSubmit = (values) => {
    console.log("djsbdjk11", EditMenuData);
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
    };
    console.log("asgfdagh", payload);
    dispatch(EditMenuItemSlice(payload));
    popUpEditHookFun(false);
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
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

  // edit  Category Function

  const handleCategoryeditSubmit = (values) => {
    // console.log("jkaghjas", uploadCategoryImage);

    // console.log("ajghdjhas", image, EditCategory);

    // if (uploadCategoryImage !== null) {
    //   let image = uploadCategoryImage?.split(":");

    //   if (image[0] !== "https") {
    //     let payload = {
    //       menu_id: EditCategory?.menu_id,
    //       restaurant_id: RestaurantIdLocalStorageData,
    //       category: values?.category,
    //     };
    //     console.log("jnazgshs", payload);
    //   } else {
    //     let payload = {
    //       menu_id: EditCategory?.menu_id,
    //       restaurant_id: RestaurantIdLocalStorageData,
    //       category_image: uploadCategoryImage,
    //       category: values?.category,
    //     };
    //     console.log("jnazgshs1111", payload);
    //   }
    // } else {
    //   let payload = {
    //     menu_id: EditCategory?.menu_id,
    //     restaurant_id: RestaurantIdLocalStorageData,
    //     category: values?.category,
    //   };

    // }
    let payload = {
      menu_id: EditCategory?.menu_id,
      restaurant_id: RestaurantIdLocalStorageData,
      category_image: uploadCategoryImage,
      category: values?.category,
    };

    if (
      typeof payload.category_image === "string" ||
      payload.category_image === null
    ) {
      delete payload.category_image;
    }

    dispatch(EditCategorySlice(payload));
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500)
  };

  const CancelCategoryEditBtnFun = () => {
    popUpEditcategoriesHookFun(false);
  };

  const DeleteCategoryfun = (e, item) => {
    setDeleteCategory(item?.menu_id);
    dispatch(DeleteMenuCategorySlice(item?.menu_id));
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500);
    // window.location.reload(false)
    // let MenuSlicePayload = {
    //   RestaurantId: RestaurantIdLocalStorageData,
    // };
    // dispatch(GetMenuCategorySlice(MenuSlicePayload));
  };
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
    dispatch(DeleteMenuItemSlice(item?.item_id));
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500)
  };

  const FavoriteFun = (e, itemData) => {
    console.log("fgjhjjha", MenuApiSelectorData?.MenuSliceReducerData?.data[0]);
    dispatch(favoriteMenuItemSlice(itemData?.item_id));
    setTimeout(() => {
      let MenuSlicePayload = {
        RestaurantId: RestaurantIdLocalStorageData,
      };
      dispatch(GetMenuCategorySlice(MenuSlicePayload));
    }, 1500)
  };
  console.log("msabdfjhsdf", MenuItemFavouriteApiSelectorData?.data?.status)

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
  const handleDragEnd = () => {
    setDraggedItem(null);
  };
   const handleDrop = (e, item) => {
        e.preventDefault();

        if (!draggedItem || draggedItem === item) {
            return;
        }
        const draggedIndex = MenuApiSelectorData?.MenuSliceReducerData?.data[0]?.item_id?.indexOf(draggedItem);
        const targetIndex = MenuApiSelectorData?.MenuSliceReducerData?.data[0]?.item_id?.indexOf(item);

        const newItems = [...MenuApiSelectorData?.MenuSliceReducerData?.data[0]?.item_id];
        newItems.splice(draggedIndex, 1); // Remove the dragged item
        newItems.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the new position

        // setItems(newItems);
        console.log("newItems",newItems)
        // Dispatch an action to update the Redux store with the new order

        // dispatch(UpdateMenuCategoryAfterDragAndDrop(newItems));

        setDraggedItem(null);
    };

  return (
    <>
      <DashboardLayout>
        <div className="dasboardbody">
          <DashboardSidebar />
          {reorderCategory===true?<DndCategories/>:
          
          
          <div className="contentpart categorypage">
            <div className="title">
              <h2>
                Categories
              <img src={order}  className="sort-order"   onClick={(e) => setReorderCategory(true)}/>
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
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      {/* CATEGORY MANAGEMENT */}
                      <Swiper
                        slidesPerView={MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length > 4 ? 4 : Number(MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.length)}
                        // cssMode={true}
                        navigation={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Mousewheel, Keyboard]}
                        className="mySwiper"
                      >

                        {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                          (item, id, index) => {
                            console.log("aujfsadasd", item)
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
                                      {/* <img src={editw} alt="" className="edithover"/> */}
                                    </button>
                                    <button className="deletebtn ms-1">
                                      <img
                                        src={deleteicon}
                                        alt="deleteicon"
                                        className=" "
                                        onClick={(e) => DeleteCategoryfun(e, item)}
                                      />
                                      {/* <img src={editw} alt="" className="edithover"/> */}
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
                      <button
                        type="button"
                        className="categorybtn btn2"
                        onClick={(e) => setDraggableSubcategory(true)}
                      >
                        Sort categories
                      </button>

                      <ul>
                        {/* CATEGORY ITEMS DATA MANAGEMENT */}
                        {MenuApiSelectorData?.MenuSliceReducerData?.data &&
                          MenuApiSelectorData?.MenuSliceReducerData?.data[0]?.item_id?.map(
                            (items, ids) => {
                              console.log("jafhaja", items);
                              return (
                                <li
                                  key={ids}
                                  className="active"
                                  // key={item.menu_id}
                                  draggable={draggableSubcategory}
                                  onDragStart={(e) => startDrag(e, items)}
                                  onDragOver={(e) => handleDragOver(e, items)}
                                  onDrop={(e) => handleDrop(e, items)}
                                  onDragEnd={handleDragEnd}
                                >
                                  <div className="title">
                                    <div className="">
                                      <h4>
                                        {items?.item_name}{" "}
                                        <button
                                          type="button"
                                          onClick={(e) => FavoriteFun(e, items)}
                                        >
                                          {" "}
                                          <img
                                            src={
                                              items?.is_favorite === true
                                                ? starfill
                                                : star
                                            }
                                            alt="img"
                                            className="ms-1"
                                          />{" "}
                                          {/* <img src={star} alt="img" />{" "} */}
                                        </button>{" "}
                                      </h4>
                                    </div>
                                    <div className="btnbox">
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          PopUpToggleEditFun(e, items)
                                        }
                                        className="editbtn"
                                      >
                                        {" "}
                                        <img src={edit1} alt="img" />{" "}
                                      </button>

                                      <button className="deletbtn">
                                        <img
                                          src={deleteicon}
                                          alt="delete icon "
                                          // className="editactive "
                                          onClick={(e) =>
                                            DeleteItemfun(e, items)
                                          }
                                        />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="tabinfo">
                                    <div className="leftpart">
                                      <p>
                                        {items?.description}
                                      </p>
                                      <span className="price">{`$${items?.item_price}`}</span>
                                    </div>
                                    <div className="rightpart">
                                      <img src={items?.image} alt="img" />
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          )}
                      </ul>
                    </div>

                    {/* <div class="tab-pane fade" id="nav-dishes2" role="tabpanel" aria-labelledby="nav-dishes2-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <h4>Spaghetti</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Vegetable Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Mushroom Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>OTC Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                            </ul>
                                        </div> 

                                         <div class="tab-pane fade" id="nav-dishes3" role="tabpanel" aria-labelledby="nav-dishes3-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <h4>Spaghetti</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Vegetable Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>Mushroom Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                                <li>
                                                    <h4>OTC Pizza</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                                    <span className='price'>$7.29</span>
                                                </li>
                                            </ul>
                                        </div>  */}
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
                          console.log("hgjhdg", item);
                          return (
                            <li key={favoriteDishId}>
                              <div className="leftpart">
                                <img src={item?.image} alt="img" />
                              </div>
                              <div className="rightpart">
                                <h3>{item?.item_name}</h3>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur.
                                  Blandit sapien eget non vivamus leo tellus a.
                                  Accumsan euismod{" "}
                                </p>
                                <span className="price">
                                  {" "}
                                  {`$${item?.item_price}`}{" "}
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
}
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
                        className={`form-control `}
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
                      {MenuApiSelectorData?.GetMenuCategoryReducerData?.data?.map(
                        (item, id) => {
                          console.log("sjdhaj", item?.category);
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
                    <p className="text-danger small mb-0">
                      <ErrorMessage name="first_name" />
                    </p>
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
                        className={`form-control `}
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
