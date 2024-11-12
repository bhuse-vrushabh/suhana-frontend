import React, { useState } from 'react';
import './Navbar.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import suhana from './Suhana1.png';
import navbell from './Assets/navbell.svg'
//import { Link } from 'react-router-dom';

function Nav() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle notification panel
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Logout function
  const handleLogout = () => {
    // Clear any stored authentication tokens, session data, etc.
    localStorage.removeItem('token'); // example for token
    // Redirect to login page
    navigate('/EmployeeLogin');
  };

  return (
    <nav className="navbar">
      <div className="nav_logo">
        <img src={suhana} alt="Logo" />
      </div>
      <div className="nav-icons">
        {/* Notification button */}
        <div className="notification-wrapper">
          <button className="notification-btn" onClick={toggleNotification}>
            {/* <FontAwesomeIcon icon={faBell} /> */}

            <img src={navbell} alt="" />
            {/* <span>Notifications</span> */}
          </button>
          {isNotificationOpen && (
            <div className="notification-panel">
              <h4>Notifications</h4>
              <ul>
                <li>Notification 1: Sample notification</li>
                <li>Notification 2: Another notification</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="dropdown-wrapper">
          <button className="user-btn" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} />
            <span>Employee</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
            <li>
                    <Link to ="/PersonalDetailsForm">
                    My Account
                    </Link>
                  </li>
                  <li>
                  <Link to="/EmployeeLogin" onClick={handleLogout} className="logout-btn">
                    Logout
                  </Link>
                </li>
                </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
