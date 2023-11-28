import React from 'react'

import imgs from '../../images/imgicon.svg'
import './Success.css'
import { useNavigate } from 'react-router-dom';
 
const Success = () => {
    let navigate = useNavigate();
    return (
        <>
            <div className='successpage'>
                <div className="loginpage">
                    <div className='success-box'>
                        <figure> <img src={imgs} alt='imgs' /> </figure>
                        <h2>Success !</h2>
                        <p>A email has been send to your email@domain.com. Please check for an email from company and click on the included link to reset your password.</p>
                        <button onClick = {(e)=>navigate("/success")} className='btn'>Back to home</button>
                    </div>  

                </div>
            </div>
        </>
    )
}

export default Success