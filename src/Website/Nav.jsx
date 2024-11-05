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



import React, { useState, useEffect } from 'react';
import './Nav.css';
import axios from 'axios'; // Import axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import myImage from './Assets/suhanaui.png';
import bellIcon from './Assets/bell.svg';
import { useNavigate } from 'react-router-dom';

function Nav({ user }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // State for notifications
  const navigate = useNavigate();

  // Fetch notifications from the API with Axios and authentication
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/performance/notifications/', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Use token from localStorage
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Toggle notification panel
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fallback for user if not provided
  const userName = user?.name || 'Admin';
  const userRole = user?.role || 'Admin';

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

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/AdminLogin');
  };

  return (
    <nav className="A_navbar">
      <div className="nav-icons">
        <div className='nav_logo'>
          <img src={myImage} alt="Suhana logo" />
        </div>

        <div className='notification_user'>
          {/* Notification button */}
          <div className="notification-wrapper">
            <button className="A_notification-btn" onClick={toggleNotification}>
              <img src={bellIcon} alt="Notifications" />
            </button>
            {isNotificationOpen && (
              <div className="notification-panel">
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
          <div className="dropdown-wrapper">
            <button className="A_user-btn" onClick={toggleDropdown}>
              {getUserIcon(userRole)} {/* Display the user icon based on the role */}
              <div>{userName}</div> {/* Show user name */}
            </button>
            {isDropdownOpen && (
              <div className="A_dropdown-menu">
                <ul>
                  <li><a href="#/my-account">My Account</a></li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

