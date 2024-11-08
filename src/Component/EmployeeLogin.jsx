
// EmployeeLogin.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './EmployeeLogin.css';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Access the AuthContext
  const { setAuthData } = useContext(AuthContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const postData = { email, password };

    axios.post(`http://127.0.0.1:8000/api/login/`, postData)
      .then((res) => {
        setLoading(false);
        if (res.status === 200 && res.data.access && res.data.refresh && res.data.role) {
          const { access, refresh, role } = res.data;

          // Save tokens and role in context
          setAuthData({ accessToken: access, refreshToken: refresh, role });

          Swal.fire({
            title: 'Success!',
            text: `${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });

          setTimeout(() => {
            switch (role) {
              case 'admin':
                navigate("/Admin_Dash");
                break;
              case 'manager':
                navigate("/Manager_Dashboard");
                break;
              case 'employee':
                navigate("/Dashboard");
                break;
              default:
                setErrorMessage("Unknown role. Please contact support.");
            }
          }, 1500);
        } else {
          handleInvalidCredentials();
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          handleInvalidCredentials();
        } else {
          setErrorMessage("Login Failed. Please try again.");
          Swal.fire({
            title: 'Error!',
            text: 'Login Failed. Please try again later.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
  };

  const handleInvalidCredentials = () => {
    setErrorMessage("Invalid email or password. Please try again.");
    Swal.fire({
      title: 'Error!',
      text: 'Login failed. Please check your credentials.',
      icon: 'error',
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row Profile_info_row mb-1"></div>
      </div>
      <div className="wrapper">
        <div className="auth-wrapper">
          <div className="auth-inner Employee-login-inner">
            <form>
              <h1>Login</h1>

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
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
