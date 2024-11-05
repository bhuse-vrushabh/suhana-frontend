import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import './AdminLogin.css';
import Sidebar from "./Sidebar_A";
import Nav from "./Nav";
import axios from 'axios';  // Make sure to import axios

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate to different routes after successful login

  const handleLoginClick = (e) => {
    e.preventDefault();

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
            navigate("/Admin_Dash"); // Navigate to the admin dashboard
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
    <div>
      <div className="container-fluid">
        <div className="row Profile_info_row mb-1"></div>
        {/* <Nav /> */}
      </div>
      <div className="wrapper">
        {/* <Sidebar /> */}
        <div className="auth-wrapper">
          <div className="auth-inner admin-login-inner">
            {/* Your login form */}
            <form>
              <h1>Admin Login</h1>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 password-input">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Show error message if login fails */}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <div className="mb-3" id="loginbtncenter">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  id="loginbtn"
                  onClick={handleLoginClick} // Call handleLoginClick when clicked
                >
                  Login
                </button>
              </div>

              <a href="#" className="loginlinks">
                Forgot password?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
