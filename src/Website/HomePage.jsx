import React, { useState } from 'react';
import './HomePage.css';
import Sidebar from "./Sidebar";
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import total_employee from './homelog/totalemp.svg'
import active_employee from './homelog/activeemp.svg'
import noleave_employee from './homelog/onleave.svg'

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Card data with distinct colors
  const cardData = [
    {
      title: "Total Employees",
      value: "150",
      icon: <img src={total_employee} alt="" />,
      color: "#edd36b", // yellow
      backColor: "#f5c505", //Darker yellow
      description: "Includes all active and inactive employees in the company."
    },
    {
      title: "Active Employees",
      value: "140",
      icon: <img src={active_employee} alt="" />,
      color: "#1ba877", // Green
      backColor: "#218838", // Darker Green
      description: "Employees currently working and available for tasks."
    },
    {
      title: "On Leave",
      value: "10",
      icon: <img src={noleave_employee} alt="" />,
      color: "#f05665", // Red
      backColor: "#c82333", // Darker Red
      description: "Employees who have taken official leave for personal reasons."
    },
  ];

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="container-fluid">
        {/* Optional dark mode toggle button */}
        {/* <button className="toggle-button" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
      <div className="wrapper">
        <Sidebar />
        <div className="home-page">
          <header className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to the Employee Management System</h1>
              <p className="hero-description">Manage employee data, view reports, and optimize team performance seamlessly.</p>
            </div>
          </header>

          <section className="marquee">
            <div className="marquee-content">
              <span>🚀 New Feature Alert: Performance Reports Updated!</span>
              <span>📢 Don’t forget to check out the latest attendance reports!</span>
              <span>✨ Employee Management made easier with new analytics tools.</span>
            </div>
          </section>

          <main className="main-content">
            <section className="stats">
              <h2>Employee Statistics</h2>
              <div className="stat-cards">
                {cardData.map((card, index) => (
                  <div className="card_Home flip-card" key={index} style={{ backgroundColor: card.color }}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        {card.icon}
                        <h3>{card.title}</h3>
                        <p>{card.value}</p>
                      </div>
                      <div className="flip-card-back" style={{ backgroundColor: card.backColor }}>
                        <p>{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="recent-activity">
              <h2>Recent Activity</h2>
              <ul>
                <li>Rahul Verma marked as present on 2024-10-09</li>
                <li>Priya Sharma requested leave on 2024-10-10</li>
                <li>Rohan Mehta joined the company on 2024-10-11</li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
