import React, { useState } from "react";
import {  Field  } from "formik";


const PasswordEye = () => {
  const [password, setPassword] = useState("");

  const [showpassword, setShowPassword] = useState(false);
  return (
    <div className="passwordbox">
      <Field
        name="password"
        type={showpassword ? "text" : "password"}
        className="form-control"
        placeholder="Password"
      />
      {/* <input
        maxLength={15}
        type={showpassword ? "text" : "password"}
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      {showpassword ? (
        <span
          className="password_eye"
          onClick={() => setShowPassword((o) => !o)}
        >
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868"
              stroke="#828282"
              stroke-width="1.4286"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      ) : (
        <span
          className="password_eye"
          onClick={() => setShowPassword((o) => !o)}
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706"
              stroke="#828282"
              stroke-width="1.4286"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="16.9229"
              y="0.598172"
              width="2.14538"
              height="22.1961"
              rx="1.07269"
              transform="rotate(43.9016 16.9229 0.598172)"
              fill="#828282"
              stroke="#F5F5F5"
              stroke-width="0.5"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default PasswordEye;
