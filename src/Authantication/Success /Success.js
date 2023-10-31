import React from 'react'
import imgs from '../../images/suce.svg'
import './Success.css'
 
const Success = () => {
    return (
        <>
            <div className='successpage'>
                <div className="loginpage">
                    <div className='success-box'>
                        <figure> <img src={imgs} alt='imgs' /> </figure>
                        <h2>Success !</h2>
                        <p>A email has been send to your email@domain.com. Please check for an email from company and click on the included link to reset your password.</p>
                        <button className='btn'>Back to home</button>
                    </div>  

                </div>
            </div>
        </>
    )
}

export default Success