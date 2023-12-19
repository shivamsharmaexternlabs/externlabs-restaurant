import React, { useEffect, useState } from 'react'
import copy from '../../images/copy.svg'
import share2 from '../../images/share2.svg' 
import { RWebShare } from "react-web-share"; 

import imgicon from '../../images/imgicon.svg'

import share from '../../images/share.svg'

const SucessRegisteredPopup = ({translaterFun,LeadsRestaurantSelectorData,BackToHomeFun}) => {


    const [CopyValueToggle, setCopyValueToggle] = useState(false)
    const [isShown, setIsShown] = useState(false);


    useEffect(()=>{

        if(isShown){
          setCopyValueToggle(false)
        }
    
      },[isShown])
      const CopyLinkFun = () => {
        console.log("bnvdhgsdvsd1")
        navigator.clipboard
          .writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url)
          .then(() => {
            setCopyValueToggle(true)
            setIsShown(false)
            // alert("successfully copied");
          })
          .catch(() => {
            setCopyValueToggle(false)
            // alert("something went wrong");
          });
        // navigator.clipboard.writeText(LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url);
      }
    
  return (
    <div className="popup successpopup ">
            <div className="innerpopup">
              <img src={imgicon} alt="img" />
              <h3> {translaterFun("success")} </h3>
              <p>{translaterFun("successfully-registered")}</p>
              <div className="sharebtnbox">
                <span> <img src={share} alt="img" /> {translaterFun("link")} </span>
                <input type="text" placeholder={translaterFun("link")} value={LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url} />
                {/* <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
                  Copied
                </button> */}

                <div className='copybtnbox'>
                  <div className='hoverCopyed'>
                    <button type="button" class="btn   copytooltip" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"  
                    >
                      Copy Url
                    </button>
                    {
                      CopyValueToggle && 
                       <button type="button" class="btn     copytooltip" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
                      Copied !
                    </button>
                    }
                  </div>
                  <button type="button" className="copybtn " 
                  onMouseLeave={() => setIsShown(true)}
                  // onMouseEnter={() => setIsShown(false)}
                  >
                    <img src={copy} alt="img" onClick={(e) => CopyLinkFun(e)} />
                  </button>
                </div>
                <button type="button" className="sharebtn">
                  <RWebShare data={{
                    // text: "Web Share - GFG",
                    url: LeadsRestaurantSelectorData?.RestaurantOnBoardReducerData?.data?.url,
                    // title: "Gfg"
                  }}
                    onClick={() => console.log("Shared successfully!")} >

                    <img src={share2} alt="img" />
                  </RWebShare>
                </button>

              </div>
              <button className="btn2" onClick={(e) => BackToHomeFun()}> Back to home </button>
            </div>
          </div>
  )
}

export default SucessRegisteredPopup