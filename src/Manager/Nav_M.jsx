// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'; 
// import Dropdown from 'react-bootstrap/Dropdown'; // Import Bootstrap Dropdown
// import './Nav.css'

// // function OffCanvasExample({ placement, ...props }) {
// //   const [show, setShow] = useState(false);

// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);

// //   return (

// //     <nav className="navbar navbar-light bg-light fixed-top shadow" style={{ padding: '20px' }}>

// //       <div className="container-fluid" style={{ padding: '0 20px', display: 'flex', justifyContent: 'flex-end' }}>

// //         <Button variant="danger" onClick={handleShow} className="me-2" aria-label="Notifications">
// //           <FontAwesomeIcon icon={faBell} />
// //         </Button>
// //         <Dropdown>
// //           <Dropdown.Toggle variant="secondary" id="dropdown-basic">
// //             <FontAwesomeIcon icon={faUser} />
// //           </Dropdown.Toggle>

// //           <Dropdown.Menu>
// //             <Dropdown.Item href="#/my-account">My Account</Dropdown.Item>
// //             <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
// //           </Dropdown.Menu>
// //         </Dropdown>
// //       </div>
// //       <Offcanvas show={show} onHide={handleClose} placement={placement} {...props}>
// //         <Offcanvas.Header closeButton>
// //           <Offcanvas.Title>Offcanvas</Offcanvas.Title>
// //         </Offcanvas.Header>
// //         <Offcanvas.Body>
// //           Some text as placeholder. In real life, you can have the elements you
// //           have chosen. Like text, images, lists, etc.
// //         </Offcanvas.Body>
// //       </Offcanvas>
// //     </nav>
// //   );
// // }

// // function Nav() {
// //   return (
// //     <OffCanvasExample placement="end" />
// //   );
// // }

// // export default Nav;



// // import * as React from 'react';
// // import AppBar from '@mui/material/AppBar';
// // import Box from '@mui/material/Box';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';

// // export default function ButtonAppBar() {
// //   return (
// //     <Box sx={{ flexGrow: 1,}}>
// //       <AppBar position="static"
// //        sx={{ backgroundColor: 'white', color: 'rgb(217,6,6)', 
// //        padding: '5px', alignContent:'space-between', width:'1560px'}}>
// //         <Toolbar>
// //           {/* <IconButton
// //             size="large"
// //             edge="start"
// //             color="white"
// //             aria-label="menu"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton> */}
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1
// //            }}>
// //             EPMS
// //           </Typography>
// //           <Button color="inherit" variant='contained'
// //            sx={{backgroundColor:'rgb(217,6,6)',color:'white', height:'40px',width:'130px'}}>
// //             Notification
// //             </Button>
// //           <Button  variant='contained'color="white" onClick={{backgroundColor:"white" ,color:'black'}}>
// //              Logout
// //             </Button>
// //         </Toolbar>
// //       </AppBar>
// //     </Box>
// //   );
// // }



// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import './Nav.css';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: 'white', color: 'rgb(217,6,6)' }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6" component="div">
//             EPMS
//           </Typography>
//           <div>
//             <Button 
//               color="inherit" 
//               variant='contained' 
//               startIcon={<NotificationsIcon />}
//               sx={{ backgroundColor: 'rgb(217,6,6)', color: 'white', marginRight: 2 }}
//             >
//               Notifications
//             </Button>
//             <Button 
//               variant='outlined' 
//               color="inherit" 
//               startIcon={<ExitToAppIcon />}
//               sx={{ color: 'rgb(217,6,6)', borderColor: 'rgb(217,6,6)' }}
//             >
//               Logout
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }



import React, { useState } from 'react';
import "./Nav_M.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faHome, faSignOutAlt, faCog ,faUserCircle} from '@fortawesome/free-solid-svg-icons';
import logo from "./logo.jpeg"// Ensure this path is correct
import bell from "../Manager/bell.svg";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav_M({ user }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Call the hook function


  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await axios.get(
        'http://127.0.0.1:8000/api/performance/notifications/',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) fetchNotifications();
  };
  

  // Toggle user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fallback for user if not provided
  const userName = user?.name || 'Manager';
  const userRole = user?.role || 'Manager';

  // Function to render user icon based on role
  const getUserIcon = (role) => {
    switch (role) {
      case 'Admin':
        return <FontAwesomeIcon icon={faUser} color="red" />;
      case 'Manager':
        return <FontAwesomeIcon icon={faUser} color="blue" />;
      case 'Employee':
        return <FontAwesomeIcon icon={faUser} color="green" />;
      default:
        return <FontAwesomeIcon icon={faUser} color="gray" />;
    }
  };

  // Logout function with SweetAlert and redirection
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out!', 'You have been logged out successfully.', 'success').then(() => {
          
          navigate('/');
        });
      }
    });
  };

  return (
    <nav className="navbar-M">
      <div className="nav-icons-M">
        <div className='nav_logo-M'>
          <img src={logo} alt="Suhana logo" />
        </div>

        <div className='notification_user-M'>
          {/* Notification button */}
          <div className="notification-wrapper-M">
            <button className="notification-btn-M" onClick={toggleNotification}>
              {/* <FontAwesomeIcon icon={faBell} /> */}
              <img src={bell} alt="" />
              {/* <span>Notifications</span> */}
            </button>
            {isNotificationOpen && (
              <div className="notification-panel-M">
                <h4>Notifications</h4>
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index}>{notification.message}</li>
                    ))
                  ) : (
                    <li>No notifications available</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="dropdown-wrapper-M">
          <button className="user-btn-M" onClick={toggleDropdown}>
              {getUserIcon(userRole)}
              <div>{userName}</div>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu-M">
                   <ul>
                  {userRole === 'Manager' && (
                    <li>
                   Welcome
                    </li>
                  )}
                  <li>
                    <Link to ="/createprofile">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" /> My Account
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav_M;

