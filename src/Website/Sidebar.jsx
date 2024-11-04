import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, // Profile icon for registration
  faHome,
  faClipboardList,
  faComments,
  faSignOutAlt,
  faCog,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Sidebarr.css';

const history = createBrowserHistory();

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const URL = "http://54.176.214.232:8000/";
  const token = localStorage.getItem("jwttoken");
  const role = localStorage.getItem("role");

  const logout = () => {
    axios
      .post(
        `${URL}auth/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("jwttoken");
        navigate("/Log");
      })
      .catch((reason) => {
        alert(reason);
        localStorage.removeItem("jwttoken");
        navigate("/Log");
      });
  };

  const toggleSideBar = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
    setOpen(!open);
  };

  return (
    <aside id="sidebar" className="collapsed">
      <div className="d-flex">
        <div className="sidebar-logo">
          <a href="#"></a>
        </div>
      </div>

      <ul className="sidebar-nav">
        <li className="sidebar-item" onClick={() => navigate("/Admin_Dash")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faDashboard} className="icon-black" />
              <span className="icon-text">Dashboard</span>
            </a>
            <p>Dashboard</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/HomePage")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} className="icon-black" />
              <span className="icon-text">Home</span>
            </a>
            <p>Home</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/Admin_attendance")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faClipboardList} className="icon-black" />
              <span className="icon-text">Admin Management</span>
            </a>
            <p>Checklist</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/A_feedback")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faComments} className="icon-black" />
              <span className="icon-text">Feedback And Review</span>
            </a>
            <p>Feedback</p>
          </div>
        </li>

        {/* Registration Item with Profile Icon */}
        <li className="sidebar-item" onClick={() => navigate("/Registraion")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="icon-black" /> {/* Profile icon for registration */}
              <span className="icon-text">Registration</span>
            </a>
            <p>Register</p>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
