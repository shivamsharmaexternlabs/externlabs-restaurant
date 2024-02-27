import React, { useEffect, useRef, useState } from 'react'

const SelectAndSearchComponent = ({ManageOrderTableSelectorDataProp,newFun,EditTableData}) => {


     
   
    // search functionality
    const [value, setValue] = useState("");
    const [popupvalue, setPopupValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [popupisOpen, setPopupIsOpen] = useState(false);
    const [CompanyName, setCompanyName] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [popupselectedIndex, setPopupSelectedIndex] = useState(-1);
    const [highlightedIndex, setHighlightedIndex] = useState(-1); 
    const [pageData, setPageData] = useState("");   
    const [CompanyFilterData, setCompanyFilterData] = useState([]);
    const [EnteredValue, setEnteredValue] = useState(""); 
    const [EnteredValueError, setEnteredValueError] = useState(false); 
    const dropdownRef = useRef(null);
   

    const onChange = (e) => {

        setEnteredValueError(false);
        setValue(e.target.value);
        setIsOpen(true);
        setCompanyName(null);
        setHighlightedIndex(-1);
        let array = [];

        console.log("mnvcdsdsdd",ManageOrderTableSelectorDataProp)

        ManageOrderTableSelectorDataProp?.filter((item) => {

          const searchTerm = e.target.value.toLowerCase();

        console.log("jhgdjsvdd",item)
        // const searchTerm = value.toLowerCase(); 
          const name = item.category.toLowerCase();
          return searchTerm && name.includes(searchTerm) }).map((items) => {

            console.log("mcghjsdsdd",items)
          array.push(items);
        });

        console.log("sbdvhsdsd",array,value)
        setCompanyFilterData(array);
      };


  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
      let EnteredValueFilterData = CompanyFilterData.filter(function (items) {
        return (
          items.category?.toString() == value?.toString() ||
          items?.category?.toString() == CompanyName?.toString()
        );
      });

      if (EnteredValueFilterData.length != 0) {
        setEnteredValueError(false);
      } else {
        setEnteredValueError(true);
      }

      setEnteredValue(value);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // prevent cursor from moving to start of input
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
      );
    }
  };
  const filteredData = ManageOrderTableSelectorDataProp?.filter((item) => {
    const searchTerm = value?.toLowerCase();
    const name = item.category?.toLowerCase();
    return searchTerm && name?.includes(searchTerm);
  });

  const filteredpopupData = ManageOrderTableSelectorDataProp?.filter((item) => {
    const searchTerm = popupvalue?.toLowerCase();
    const name = item?.category?.toLowerCase();
    return searchTerm && name?.includes(searchTerm);
  });

  useEffect(() => {
    if (selectedIndex !== -1) {
      setCompanyName(filteredData[selectedIndex]?.category || null);
      setHighlightedIndex(selectedIndex);
    }
    if (popupselectedIndex !== -1) {
      setCompanyName(
        filteredpopupData[popupselectedIndex]?.category || null
      );
      setHighlightedIndex(popupselectedIndex);
    }
  }, [selectedIndex, popupselectedIndex]);

  useEffect(() => {
    if (highlightedIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[highlightedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [highlightedIndex]);

   

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setIsOpen(false);
    // newFun

   
  };

  useEffect(() => {
     
    ManageOrderTableSelectorDataProp && setPageData(ManageOrderTableSelectorDataProp);
  }, [ManageOrderTableSelectorDataProp]);

  console.log("dfsdgdgd",ManageOrderTableSelectorDataProp)

  useEffect(()=>{

    if(value ||CompanyName){
        newFun(CompanyName ?? value)
    }

  },[CompanyName,value])

useEffect(()=>{

    // setCompanyName(EditTableData?.category)
    setValue(EditTableData?.category)
    // setCompanyFilterData([EditTableData])
     
},[EditTableData])

// console.log("dfsdfgsdfsd",EditTableData)

console.log("mnvcdsdsdd",ManageOrderTableSelectorDataProp)

    return (
        <div>

            <input
                className="form-control check-box"
                type="text"
                value={CompanyName ?? value}
                onChange={onChange}
                placeholder={"Search"}
                onKeyDown={onKeyDown}
              />
            {isOpen ? (
                <div
                    className={`dropdown companyDropDown`}
                    ref={dropdownRef}
                >
                    {CompanyFilterData.length > 0 ? (
                        CompanyFilterData?.map((item, index) => {
                            return (
                                <div
                                    className={`dropdown-row   ${(highlightedIndex === index
                                            ? " selected"
                                            : "",
                                            selectedIndex == -1
                                                ? index == 0
                                                    ? "bg-red"
                                                    : ""
                                                : selectedIndex == index
                                                    ? "bg-red"
                                                    : "")
                                        }`}
                                    onMouseEnter={() =>
                                        setHighlightedIndex(index)
                                    }
                                    onClick={() => {
                                        setCompanyName(item.category);
                                        onSearch(item.category);
                                    }}
                                    key={index}
                                >

                                    {item.category} 

                                </div>
                            );
                        })
                    ) : (
                        <div className="text-danger">
                            {/* This category is not available ! */}
                        </div>
                    )}

                    <div className="text-danger">
                        {" "}
                        {EnteredValueError == true
                            ? ""
                            // " This category is not available !"
                            : ""}
                    </div>
                </div>
            ) : (
                !isOpen &&
                EnteredValueError && (
                    <div className="text-danger">
                        {/* No Category Name is Available ! */}
                    </div>
                )
            )}



        </div>
    )
}

export default SelectAndSearchComponent