import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './EmployeeLogin.css';
import Navbar from "./Navbar";
import axios from 'axios';
 
const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
 
  const handleLoginClick = (e) => {
    e.preventDefault();
 
    const postData = { email, password };
 
    axios.post(`http://127.0.0.1:8000/api/login/`, postData)
      .then((res) => {
        if (res.data.access && res.data.refresh) {
          Swal.fire({
            title: 'Success!',
            text: 'Login Successful!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
 
          localStorage.setItem('accessToken', res.data.access);
          localStorage.setItem('refreshToken', res.data.refresh);
          localStorage.setItem('role', res.data.role);
 
          setTimeout(() => navigate("/Dashboard"), 1500);
        } else {
          setErrorMessage("Invalid email or password. Please try again.");
          Swal.fire({
            title: 'Error!',
            text: 'Login Failed. Please check your credentials.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
          });
        }
      })
      .catch(() => {
        setErrorMessage("Login Failed. Please check your credentials.");
        Swal.fire({
          title: 'Error!',
          text: 'Login Failed. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      });
  };
 
  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Please enter your email address',
      inputPlaceholder: 'Email',
      confirmButtonText: 'Send Reset Link',
      showCancelButton: true,
      preConfirm: (inputEmail) => {
        if (!inputEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
          Swal.showValidationMessage('Please enter a valid email address');
          return false;
        } else {
          return axios.post(`http://127.0.0.1:8000/api/forgot_password/`, { email: inputEmail })
            .then(() => {
              Swal.fire({
                title: 'Success!',
                text: `Reset password link sent to ${inputEmail}. Please check your inbox.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
            })
            .catch(() => {
              Swal.fire({
                title: 'Error!',
                text: 'Failed to send reset link. Please try again later.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
              });
            });
        }
      }
    });
  };
 
  return (
    <div>
      <div className="container-fluid">
        <div className="row Profile_info_row mb-1"></div>
        <Navbar />
      </div>
      <div className="wrapper">
        <div className="auth-wrapper">
          <div className="auth-inner Employee-login-inner">
            <form>
              <h1>Employee Login</h1>
 
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
 
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
 
              <div className="mb-3" id="loginbtncenter">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  id="loginbtn"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
 
              <a href="#" className="loginlinks" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default EmployeeLogin;
 