import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
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
import './Sidebar.css';

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
        {/* <li className="sidebar-item" onClick={() => navigate("/EmployeeLogin")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="icon-black login-logo" />
              <span className="icon-text">Login</span>
            </a>
            <p>Login</p>
          </div>
        </li> */}


        <li className="sidebar-item" onClick={() => navigate("/Dashboard")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faDashboard} className="icon-black" />
              <span className="icon-text">Dashboard</span>
            </a>
            <p>Dashboard</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/EmployeeSelfEvaluation")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} className="icon-black" />
              <span className="icon-text">Evaluation</span>
            </a>
            <p>Evaluation</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/TrainingAndDevelopment")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faClipboardList} className="icon-black" />
              <span className="icon-text">Training</span>
            </a>
            <p>Training</p>
          </div>
        </li>
        <li className="sidebar-item" onClick={() => navigate("/ReportsAnalytics")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faClipboardList} className="icon-black" />
              <span className="icon-text">Analytics</span>
            </a>
            <p>Analytics</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/Feedback")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faComments} className="icon-black" />
              <span className="icon-text">Feedback And Review</span>
            </a>
            <p>Feedback</p>
          </div>
        </li>

        <li className="sidebar-item" onClick={() => navigate("/EmployeeProfile")}>
          <div>
            <a href="#" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="icon-black login-logo" />
              <span className="icon-text">Profile</span>
            </a>
            <p>Profile</p>
          </div>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
