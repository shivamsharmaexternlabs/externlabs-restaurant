import React from 'react'
import Popup from "reactjs-popup";
import {ColorRing } from 'react-loader-spinner' 
import "./loadingSpinner.css"
import { useSelector } from 'react-redux';
import loading from "../../images/loader.gif"

const LodingSpiner = ({ loadspiner }) => {


    const ToggleBarSelectorData = useSelector((state) => state.ToggleBarData);


    return (
        
        <div className=" ">
            <Popup open={ToggleBarSelectorData?.loadingspinner} position="" model className="loader">
                <div className="loader">
                    <div className='loader-sec'>
                        <div className="justify-content-center d-flex">
                            {/* <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={["#00ff00","#00ff00","#00ff00","#00ff00","#00ff00"
                                ]}
                            />       */}
                            <img src = {loading}/>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default LodingSpiner