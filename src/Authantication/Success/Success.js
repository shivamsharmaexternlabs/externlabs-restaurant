// Importing necessary dependencies and assets
import React from 'react';
import imgs from '../../images/imgicon.svg';
import './Success.css';
import { useNavigate } from 'react-router-dom';

// Functional component for the Success page
const Success = () => {
  // Hook for navigating between pages
  let navigate = useNavigate();

  // JSX structure for the Success component
  return (
    <>
      <div className='successpage'>
        <div className="loginpage">
          <div className='success-box'>
            {/* Image */}
            <figure>
              <img src={imgs} alt='imgs' />
            </figure>
            {/* Title */}
            <h2>Success !</h2>
            {/* Success message */}
            <p>A email has been send to your email@domain.com. Please check for an email from company and click on the included link to reset your password.</p>
            {/* Button to navigate back to home */}
            <button onClick={(e) => navigate("/success")} className='btn'>Back to home</button>
          </div>
        </div>
      </div>
    </>
  );
}

// Exporting the Success component
export default Success;
