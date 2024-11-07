
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoGoal } from "react-icons/go";
import { GiStairsGoal } from "react-icons/gi";
import {
  faUser,
  faSignOutAlt,
  faBook,
  faGauge,
  faCheckCircle,
  faTasks,
  faCommentDots ,
  faCalendarDays,
  faCircleQuestion,
  faSearchDollar,
  faUserPlus,
  
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import './Sidebarr.css'
import { FaComment } from "react-icons/fa";
 
 
const history = createBrowserHistory();
 
const Sidebarr = () => {
  const [open, setOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null); // State to track hovered item
 
  const navigate = useNavigate();
  const URL = "http://54.176.214.232:8000/";
  const token = localStorage.getItem("jwttoken");
 
  const role = localStorage.getItem("role");
 
  const toggleSideBar = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
    setOpen(!open);
  };
 
  const sidebarStyles = {
    hoverText: {
      display: "inline-block",
      marginLeft: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "5px",
      borderRadius: "3px",
    },
  };
 
  return (
    <aside id="sidebar_M" className="collapsed">
    <ul className="sidebar-nav_M">

      {/* Manager Login
      <Link to="/">
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoveredItem("ManagerLogin")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span className="icon-text"> Login</span>
          </a>
        </div>
      </Link> */}

      {/* Dashboard */}
      <Link to="/Manager_Dashboard">
        <div
          className="sidebar-item_M"
          onMouseEnter={() => setHoveredItem("Manager_Dashboard")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link_M">
            <FontAwesomeIcon icon={faGauge} className="icon_M" />
            <span className="icon-text_M">Dashboard</span>
          </a>
        </div>
      </Link>

      {/* <Link to="/CreateProfile">
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoveredItem("Profile")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link">
            <FontAwesomeIcon icon={faUserPlus} className="icon" />
            <span className="icon-text">Profile</span>
          </a>
        </div>
      </Link> */}

      {/* Task (Goal Management) */}
      <Link to="/GoalManagement">
        <div
          className="sidebar-item_M"
          onMouseEnter={() => setHoveredItem("GoalManagement")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link_M">
            <FontAwesomeIcon icon={faTasks} className="icon_M" />
            <span className="icon-text_M">Task</span>
          </a>
        </div>
      </Link>

      {/* Manager Evaluation */}
      <Link to="/manager-evaluation">
        <div
          className="sidebar-item_M"
          onMouseEnter={() => setHoveredItem("ManagerEvaluation")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link_M">
            <FontAwesomeIcon icon={faCheckCircle} className="icon_M" />
            <span className="icon-text_M"> Evaluation</span>
          </a>
        </div>
      </Link>

      {/* Training */}
      <Link to="/Training">
        <div
          className="sidebar-item_M"
          onMouseEnter={() => setHoveredItem("Training")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link_M">
            <FontAwesomeIcon icon={faBook} className="icon_M" />
            <span className="icon-text_M">Training</span>
          </a>
        </div>
      </Link>

      {/* Feedback */}
      <Link to="/FeedBackForm_M">
        <div
          className="sidebar-item_M"
          onMouseEnter={() => setHoveredItem("/FeedBackForm_M")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <a href="#" className="sidebar-link_M">
            <FontAwesomeIcon icon={faCommentDots } className="icon_M" />
            <span className="icon-text_M">Feedback</span>
          </a>
        </div>
      </Link>

    
    </ul>
  </aside>
  );
};
 
export default Sidebarr;


















