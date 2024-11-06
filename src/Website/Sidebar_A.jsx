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
import './Sidebarr_A.css';

const history = createBrowserHistory();

const Sidebar_A= () => {
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
    <aside id="sidebar_A" className="collapsed">
      <div className="d-flex">
        <div className="sidebar-logo">
          <a href="#"></a>
        </div>
      </div>

      <ul className="sidebar-nav_A">
        <li className="sidebar-item_A" onClick={() => navigate("/Admin_Dash")}>
          <div>
            <a href="#" className="sidebar-link_A">
              <FontAwesomeIcon icon={faDashboard} className="icon-black" />
              <span className="icon-text-A">Dashboard</span>
            </a>
            {/* <p>Dashboard</p> */}
          </div>
        </li>

        <li className="sidebar-item_A" onClick={() => navigate("/HomePage")}>
          <div>
            <a href="#" className="sidebar-link_A">
              <FontAwesomeIcon icon={faHome} className="icon-black" />
              <span className="icon-text-A">Home</span>
            </a>
            {/* <p>Home</p> */}
          </div>
        </li>

        <li className="sidebar-item_A" onClick={() => navigate("/Admin_attendance")}>
          <div>
            <a href="#" className="sidebar-link_A">
              <FontAwesomeIcon icon={faClipboardList} className="icon-black" />
              <span className="icon-text-A">Checklist</span>
            </a>
            {/* <p>Checklist</p> */}
          </div>
        </li>

        <li className="sidebar-item_A" onClick={() => navigate("/A_feedback")}>
          <div>
            <a href="#" className="sidebar-link_A">
              <FontAwesomeIcon icon={faComments} className="icon-black" />
              <span className="icon-text-A">Feedback</span>
            </a>
            {/* <p>Feedback</p> */}
          </div>
        </li>

        {/* Registration Item with Profile Icon */}
        <li className="sidebar-item_A" onClick={() => navigate("/Registraion")}>
          <div>
            <a href="#" className="sidebar-link_A">
              <FontAwesomeIcon icon={faUser} className="icon-black" /> {/* Profile icon for registration */}
              <span className="icon-text-A">Registration</span>
            </a>
            {/* <p>Register</p> */}
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar_A;

