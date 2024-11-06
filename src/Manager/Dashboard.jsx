import React from 'react';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';  // Import chart components
import HeatMap from 'react-heatmap-grid';
import Sidebarr from './Sidebarr';
import {
  Chart as ChartJS,
  CategoryScale, // Import the CategoryScale
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faChartLine, faUsers, faCheckCircle, faPercent } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Dashboard.css';
import './Sidebarr.css';

import Teamattendence from "./Teamattendence.png"
import Performance from "./Performance.png";
import Rating from "./Rating.png";
import Training from "./Training.png";
import Nav_M from './Nav_M';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function  Manager_Dashboard() {
  const [activeChart, setActiveChart] = useState('attendance');

  // KPI Data
  const attendance = 85;
  const avgPerformance = 4.3;
  const trainingCompletion = 76;

  // Heatmap Data for Attendance
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
  const yLabels = ['Raj', 'Shiv', 'Rohit', 'Ram'];
  const heatmapData = [
    [100, 90, 85, 70, 95],
    [95, 80, 75, 60, 85],
    [90, 85, 60, 95, 75],
    [85, 70, 80, 60, 65],
  ];

  const getColorForValue = (value) => {
    if (value >= 90) return '#4caf50'; // green
    if (value >= 75) return '#ffeb3b'; // yellow
    return '#f44336'; // red
  };

  // Performance Rating Data
  const performanceData = {
    labels: yLabels,
    datasets: [
      {
        label: 'Performance Rating',
        data: [4.5, 3.8, 4.2, 3.9],
        backgroundColor: '#B60B3D',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Employees' } },
      y: { beginAtZero: true, max: 5, title: { display: true, text: 'Performance Rating' } },
    },
  };

  // Training Compliance Data
  const complianceData = {
    labels: ["Raj", "Varad", "Rohit", "Shubham"],
    datasets: [
      {
        label: "Completed Courses",
        data: [8, 5, 7, 6],
        backgroundColor: "#1E8449",
      },
      {
        label: "Pending Courses",
        data: [2, 3, 1, 4],
        backgroundColor: "#E74C3C",
      },
    ],
  };

  const handleCardClick = (chart) => setActiveChart(chart);


  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M/>

        <div className="kpi-cards-M">
          <div className="kpi-card-M" onClick={() => handleCardClick("attendance")}>
            <img src={Teamattendence} alt="Attendance Icon" className="kpi-icon-M" />
            <div className="kpi-label-M">Total Attendance</div>
            <div className="kpi-value-M">{attendance}%</div>
          </div>
          <div className="kpi-card-M" onClick={() => handleCardClick("performance")}>
            <img src={Performance} alt="Performance Icon" className="kpi-icon-M" />
            <div className="kpi-label-M">Performance Score</div>
            <div className="kpi-value-M">{avgPerformance}/5</div>
          </div>
          <div className="kpi-card-M" onClick={() => handleCardClick("training")}>
            <img src={Training} alt="Training Icon" className="kpi-icon-M" />
            <div className="kpi-label-M">Training Completion</div>
            <div className="kpi-value-M">{trainingCompletion}%</div>
          </div>
        </div>

      <div>
          {activeChart === "attendance" && (
            <div className="heatmap-container-M">
              <h4>Team Attendance Heatmap</h4>
              <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                data={heatmapData}
                squares
                height={50}
                width={100}
                xLabelsLocation="top"
                yLabelTextAlign="right"
                cellStyle={(background, value, min, max) => ({
                  background: getColorForValue(value),
                  color: "#000",
                  border: "1px solid #fff",
                  textAlign: "center",
                  padding: "10px",
                  fontSize: "14px",
                })}
                cellRender={(value) => `${value}%`}
              />
            </div>
          )}
       </div>
       {activeChart !== "attendance" && (
          <div className="chart-section-M">
            {activeChart === "performance" && (
              <div className="bar-chart-container-M">
                <h4>Performance Rating Distribution</h4>
                <Bar data={performanceData} options={chartOptions} />
              </div>
            )}

            {activeChart === "training" && (
              <div className="bar-chart-container-M">
                <h4>Training Compliance Status</h4>
                <Bar data={complianceData} options={chartOptions} />
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    


  );
}

export default Manager_Dashboard; 