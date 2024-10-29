import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import "./ManagerLogin.css";
import { useNavigate } from "react-router-dom";  
import Swal from "sweetalert2"; 
import axios from "axios";

const ManagerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const postData = {
      email: email,
      password: password,
    };
 
    // Make a POST request using Axios
    axios
      .post(`http://127.0.0.1:8000/api/login/`, postData)
      .then((res) => {
        console.log('Response:', res);          // Log the full response object
        console.log('Response Data:', res.data); // Log the response data (typically the JSON payload)
 
        // Assuming the response contains the access and refresh tokens
        if (res.data.access && res.data.refresh) {
          Swal.fire({
            title: 'Success!',
            text: 'Login Successful!',
            icon: 'success',
            timer: 1500,               // Set timer for 1.5 seconds
            showConfirmButton: false    // Hide confirm button while the timer runs
          });
 
          // Store JWT tokens in localStorage
          localStorage.setItem('accessToken', res.data.access);
          localStorage.setItem('refreshToken', res.data.refresh);
          localStorage.setItem('role', res.data.role);
 
          setTimeout(() => {
            navigate("/Dashboard"); // Navigate to the admin dashboard
          }, 1500); // Wait for the alert to disappear before redirecting
        } else {
          // If tokens are missing, trigger error
          setErrorMessage("Invalid email or password. Please try again.");
          Swal.fire({
            title: 'Error!',
            text: 'Login Failed. Please check your credentials.',
            icon: 'error',
            timer: 1500,               // Set timer for 1.5 seconds
            showConfirmButton: false    // Hide confirm button while the timer runs
          });
        }
      })
      .catch((err) => {
        console.error('Error:', err);           // Log any errors
 
        Swal.fire({
          title: 'Error!',
          text: 'Login Failed. Please check your credentials.',
          icon: 'error',
          timer: 1500,               // Set timer for 1.5 seconds
          showConfirmButton: false    // Hide confirm button while the timer runs
        });
      });
 
    // Log email and password to the console
    console.log('This is email:', email);
    console.log('This is password:', password);
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Manager Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <div className="password-container">
              <input
                type="email"
                id="email"
                className="login-input-field"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "40px" }}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="login-input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "40px" }}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
