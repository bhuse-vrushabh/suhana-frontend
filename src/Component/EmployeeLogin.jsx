
 


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import './EmployeeLogin.css';
// import Navbar from "./Navbar";
// import axios from 'axios';

// const EmployeeLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Added loading state
//   const navigate = useNavigate();

//   const handleLoginClick = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(" ");

//     const postData = { email, password };

//     axios.post(`http://127.0.0.1:8000/api/login/`, postData)
//       .then((res) => {
//         setLoading(false);
//         if (res.status===200 && res.data.access && res.data.refresh && res.data.role) {
//           const role = res.data.role; // Get user role

//           // Customize success message based on role
//           if (['admin', 'manager', 'employee'].includes(role)) {
//           const successMessage = `${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`;

//           Swal.fire({
//             title: 'Success!',
//             text: successMessage, // Use the customized message
//             icon: 'success',
//             timer: 1500,
//             showConfirmButton: false
//           });

//           // Store tokens and role in local storage
//           localStorage.setItem('accessToken', res.data.access);
//           localStorage.setItem('refreshToken', res.data.refresh);
//           localStorage.setItem('role', role);

//           // Role-based redirection
//           setTimeout(() => {
//             switch (role) {
//               case 'admin':
//                 navigate("/Admin_Dash");
//                 break;
//               case 'manager':
//                 navigate("/Manager_Dash");
//                 break;
//               case 'employee':
//                 navigate("/Dashboard");
//                 break;
//               default:
//                 setErrorMessage("Unknown role. Please contact support.");
//             }
//           }, 1500);
//         } else {
//           setErrorMessage("Invalid email or password. Please try again.");
//           Swal.fire({
//             title: 'Error!',
//             text: 'Login failed. Please check your credentials.',
//             icon: 'error',
//             timer: 1500,
//             showConfirmButton: false
//           });
//         } else{
//         setErrorMessage("Login failed.please try again.");
//       })
//       .catch((error) => {
//         setLoading(false);
//         if(error.response && error.response.status===401) {
//           setErrorMessage("Invalid email or password. Please try again.");
//         Swal.fire({
//           title: 'Error!',
//           text: 'Login Failed. Please try again.',
//           icon: 'error',
//           timer: 1500,
//           showConfirmButton: false
//         });
//         };

//   });
//   }

//   const handleForgotPassword = () => {
//     Swal.fire({
//       title: 'Forgot Password',
//       input: 'email',
//       inputLabel: 'Please enter your email address',
//       inputPlaceholder: 'Email',
//       confirmButtonText: 'Send Reset Link',
//       showCancelButton: true,
//       preConfirm: (inputEmail) => {
//         if (!inputEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
//           Swal.showValidationMessage('Please enter a valid email address');
//           return false;
//         } else {
//           return axios.post(`http://127.0.0.1:8000/api/forgot_password/`, { email: inputEmail })
//             .then(() => {
//               Swal.fire({
//                 title: 'Success!',
//                 text: `Reset password link sent to ${inputEmail}. Please check your inbox.`,
//                 icon: 'success',
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//             })
//             .catch(() => {
//               Swal.fire({
//                 title: 'Error!',
//                 text: 'Failed to send reset link. Please try again later.',
//                 icon: 'error',
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//             });
//         }
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row Profile_info_row mb-1"></div>
//         <Navbar />
//       </div>
//       <div className="wrapper">
//         <div className="auth-wrapper">
//           <div className="auth-inner Employee-login-inner">
//             <form>
//               <h1>Login</h1>

//               <div className="mb-3">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter Username"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3 password-input">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {errorMessage && <p className="text-danger">{errorMessage}</p>}

//               <div className="mb-3" id="loginbtncenter">
//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-block"
//                   id="loginbtn"
//                   onClick={handleLoginClick}
//                   disabled={loading} // Disable button while loading
//                 >
//                   {loading ? "Loading..." : "Login"}
//                 </button>
//               </div>
//               <a href="#" className="loginlinks" onClick={handleForgotPassword}>
//                 Forgot password?
//               </a>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeLogin;






// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import './EmployeeLogin.css';
// // import Navbar from "./Navbar";
// import axios from 'axios';
// import { AuthContext } from './AuthContext';

 
// const EmployeeLogin = () => {
//   const { setAuthData } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
 
//   const handleLoginClick = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Clear previous error messages
 
//     const postData = { email, password };
 
//     axios.post(`http://127.0.0.1:8000/api/login/`, postData)
//       .then((res) => {
//         setLoading(false);
//         if (res.status === 200 && res.data.access && res.data.refresh && res.data.role) {
//           const role = res.data.role;
 
//           if (['admin', 'manager', 'employee'].includes(role)) {
//             const successMessage = `${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`;
 
//             Swal.fire({
//               title: 'Success!',
//               text: successMessage,
//               icon: 'success',
//               timer: 1500,
//               showConfirmButton: false
//             });
 
//             localStorage.setItem('accessToken', res.data.access);
//             localStorage.setItem('refreshToken', res.data.refresh);
//             localStorage.setItem('role', role);
 
//             setTimeout(() => {
//               switch (role) {
//                 case 'admin':
//                   navigate("/Admin_Dash");
//                   break;
//                 case 'manager':
//                   navigate("/Manager_Dashboard");
//                   break;
//                 case 'employee':
//                   navigate("/Dashboard");
//                   break;
//                 default:
//                   setErrorMessage("Unknown role. Please contact support.");
//               }
//             }, 1500);
//           } else {
//             handleInvalidCredentials();
//           }
//         } else {
//           handleInvalidCredentials();
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         if (error.response && error.response.status === 401) {
//           handleInvalidCredentials();
//         } else {
//           setErrorMessage("Login Failed. Please try again.");
//           Swal.fire({
//             title: 'Error!',
//             text: 'Login Failed. Please try again later.',
//             icon: 'error',
//             timer: 1500,
//             showConfirmButton: false
//           });
//         }
//       });
//   };
 
//   const handleInvalidCredentials = () => {
//     setErrorMessage("Invalid email or password. Please try again.");
//     Swal.fire({
//       title: 'Error!',
//       text: 'Login failed. Please check your credentials.',
//       icon: 'error',
//       timer: 1500,
//       showConfirmButton: false
//     });
//   };
 
//   const handleForgotPassword = () => {
//     Swal.fire({
//       title: 'Forgot Password',
//       input: 'email',
//       inputLabel: 'Please enter your email address',
//       inputPlaceholder: 'Email',
//       confirmButtonText: 'Send Reset Link',
//       showCancelButton: true,
//       preConfirm: (inputEmail) => {
//         if (!inputEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
//           Swal.showValidationMessage('Please enter a valid email address');
//           return false;
//         } else {
//           return axios.post(`http://127.0.0.1:8000/api/forgot_password/`, { email: inputEmail })
//             // .then(() => {
//             //   Swal.fire({
//             //     title: 'Success!',
//             //     text: `Reset password link sent to ${inputEmail}. Please check your inbox.`,
//             //     icon: 'success',
//             //     timer: 2000,
//             //     showConfirmButton: false
//             //   })
//               .then(() => {
//                 handleOtpAndPasswordReset(inputEmail);
//               })
           
//             .catch(() => {
//               Swal.fire({
//                 title: 'Error!',
//                 text: 'Failed to send reset link. Please try again later.',
//                 icon: 'error',
//                 timer: 2000,
//                 showConfirmButton: false
//               });
//             });
//         }
//       }
//     });
//   };
 
//   const handleOtpAndPasswordReset = (inputEmail) => {
//     Swal.fire({
//       title: 'Enter OTP',
//       input: 'text',
//       inputLabel: 'Please enter the OTP sent to your email',
//       inputPlaceholder: 'OTP',
//       confirmButtonText: 'Verify OTP',
//       showCancelButton: true,
//       preConfirm: (otp) => {
//         if (!otp || otp.length !== 4) { // Example OTP length validation
//           Swal.showValidationMessage('Please enter a valid 6-digit OTP');
//           return false;
//         } else {
       
//           Swal.fire({
//             title: 'Reset Password',
//             html:
//               `<input type="password" id="newPassword" class="swal2-input" placeholder="New Password">` +
//               `<input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">`,
//             confirmButtonText: 'Reset Password',
//             preConfirm: () => {
//               const newPassword = Swal.getPopup().querySelector('#newPassword').value;
//               const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
 
//               if (!newPassword || !confirmPassword) {
//                 Swal.showValidationMessage('Please enter both password fields');
//               } else if (newPassword !== confirmPassword) {
//                 Swal.showValidationMessage('Passwords do not match');
//               } else {
//                 return axios.post(`http://127.0.0.1:8000/api/reset_password/`, {
                  
//                     email:email,
//                     new_password:newPassword,
//                     otp:otp
                
//                 })
                
//                 .then(() => {
//                   Swal.fire({
//                     title: 'Success!',
//                     text: 'Your password has been successfully changed!',
//                     icon: 'success',
//                     timer: 2000,
//                     showConfirmButton: false
//                   });
//                 })
//                   .catch(() => {
//                     Swal.fire({
//                       title: 'Error!',
//                       text: 'Failed to reset password. Please try again later.',
//                       icon: 'error',
//                       timer: 2000,
//                       showConfirmButton: false
//                     });
//                   });
//               }
//             }
//           });
//         }
//       }
//     });
    
//   };
 
//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row Profile_info_row mb-1"></div>
//               </div>
//       <div className="wrapper">
//         <div className="auth-wrapper">
//           <div className="auth-inner Employee-login-inner">
//             <form>
//               <h1>Login</h1>
 
//               <div className="mb-3">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter Username"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
 
//               <div className="mb-3 password-input">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
 
//               {errorMessage && <p className="text-danger">{errorMessage}</p>}
 
//               <div className="mb-3" id="loginbtncenter">
//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-block"
//                   id="loginbtn"
//                   onClick={handleLoginClick}
//                   disabled={loading}
//                 >
//                   {loading ? "Loading..." : "Login"}
//                 </button>
//               </div>
 
//               <a href="#" className="loginlinks" onClick={handleForgotPassword}>
//                 Forgot password?
//               </a>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default EmployeeLogin;
 
 






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
            // .then(() => {
            //   Swal.fire({
            //     title: 'Success!',
            //     text: `Reset password link sent to ${inputEmail}. Please check your inbox.`,
            //     icon: 'success',
            //     timer: 2000,
            //     showConfirmButton: false
            //   })
              .then(() => {
                handleOtpAndPasswordReset(inputEmail);
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
 
  const handleOtpAndPasswordReset = (inputEmail) => {
    Swal.fire({
      title: 'Enter OTP',
      input: 'text',
      inputLabel: 'Please enter the OTP sent to your email',
      inputPlaceholder: 'OTP',
      confirmButtonText: 'Verify OTP',
      showCancelButton: true,
      preConfirm: (otp) => {
        if (!otp || otp.length !== 4) { // Example OTP length validation
          Swal.showValidationMessage('Please enter a valid 6-digit OTP');
          return false;
        } else {
       
          Swal.fire({
            title: 'Reset Password',
            html:
              `<input type="password" id="newPassword" class="swal2-input" placeholder="New Password">` +
              `<input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">`,
            confirmButtonText: 'Reset Password',
            preConfirm: () => {
              const newPassword = Swal.getPopup().querySelector('#newPassword').value;
              const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
 
              if (!newPassword || !confirmPassword) {
                Swal.showValidationMessage('Please enter both password fields');
              } else if (newPassword !== confirmPassword) {
                Swal.showValidationMessage('Passwords do not match');
              } else {
                return axios.post(`http://127.0.0.1:8000/api/reset_password/`, {
                 
                    email:email,
                    new_password:newPassword,
                    otp:otp
               
                })
               
                .then(() => {
                  Swal.fire({
                    title: 'Success!',
                    text: 'Your password has been successfully changed!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                  });
                })
                  .catch(() => {
                    Swal.fire({
                      title: 'Error!',
                      text: 'Failed to reset password. Please try again later.',
                      icon: 'error',
                      timer: 2000,
                      showConfirmButton: false
                    });
                  });
              }
            }
          });
        }
      }
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
 
 






