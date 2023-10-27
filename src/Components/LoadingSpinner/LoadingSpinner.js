import React from 'react'
import Popup from "reactjs-popup";
import {ColorRing } from 'react-loader-spinner' 
import "./loadingSpinner.css"


const LodingSpiner = ({ loadspiner }) => {
    return (
        
        <div className=" ">
            <Popup open={loadspiner} position="" model className="loader">
                <div className="loader">
                    <div className='loader-sec'>
                        <div className="justify-content-center d-flex">
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={["#00ff00","#00ff00","#00ff00","#00ff00","#00ff00"
                                ]}
                            />      
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default LodingSpiner