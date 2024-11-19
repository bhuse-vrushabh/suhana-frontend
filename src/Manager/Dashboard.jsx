import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2'; // Chart.js component
import HeatMap from 'react-heatmap-grid';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import Sidebarr from './Sidebarr';
import { faChartLine, faUsers, faCheckCircle, faPercent } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './Dashboard.css';
import './Sidebarr.css';

import Teamattendence from "./Teamattendence.png";
import Performance from "./Performance.png";
import Training from "./Training.png";
import Nav_M from './Nav_M';
import { AuthContext } from '../Component/AuthContext';
// Initialize BellCurve module
BellCurve(Highcharts);

function Manager_Dashboard() {
  const { authData } = useContext(AuthContext); // Use authData from context
  const [activeChart, setActiveChart] = useState('attendance');
  const [attendance, setAttendance] = useState(0); // Update attendance state
  useEffect(() => {
    // Fetch annual attendance from API
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/annual_attendance_rate/2024/', {
          headers: {
            'Authorization': `Bearer ${authData.accessToken}`, // Use token from context
            'Content-Type': 'application/json',
          },
        });

        console.log('API Response:', response.data); // Log the full response

        if (response.status === 200 && response.data.annual_attendance_rate != null) {
          setAttendance(response.data.annual_attendance_rate); // Update to match the response structure

        }
      } catch (error) {
        console.error('Error fetching annual attendance:', error);
      }
    };

    if (authData.accessToken) {
      fetchAttendance(); // Call the function if the token is available
    }
  }, [authData.accessToken]); // Effect depends on authData.accessToken
  // KPI Data

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

// Bell Curve Highchart Options for Performance
const performanceBellCurveOptions = {
  title: {
    text: 'Performance Bell Curve'
  },
  xAxis: [{
    title: { text: 'Performance Score' },
    alignTicks: false
  }, {
    title: { text: 'Bell Curve' },
    alignTicks: false,
    opposite: true
  }],
  yAxis: [{
    title: { text: 'Frequency' }
  }],
  series: [
    {
      name: 'Bell Curve',
      type: 'bellcurve',
      xAxis: 1,
      yAxis: 0,
      baseSeries: 's1',
      zIndex: -2,
      color: '#7cb5ec', // Customize the color
    },
    {
      name: 'Data', // Still required to calculate the bell curve
      type: 'scatter',
      data: [4.5, 3.8, 4.2, 3.9, 4.1, 4.0], // Sample performance scores
      id: 's1',
      marker: {
        enabled: false // Disable markers to hide the data visually
      },
      visible: false // Ensure this series is hidden
    }
  ]
};


  // Bell Curve Highchart Options for Training
  const trainingBellCurveOptions = {
    title: {
      text: 'Training Bell Curve'
    },
    xAxis: [{
      title: { text: 'Courses Completed' },
      alignTicks: false
    }, {
      title: { text: 'Bell Curve' },
      alignTicks: false,
      opposite: true
    }],
    yAxis: [{
      title: { text: 'Frequency' }
    }],
    series: [
      {
        name: 'Bell Curve',
        type: 'bellcurve',
        xAxis: 1,
        yAxis: 0,
        baseSeries: 's2',
        zIndex: -2,
        color: '#90ed7d', // Customize the color
      },
      {
        name: 'Data',
        type: 'scatter',
        data: [8, 5, 7, 6, 7.5, 6.5], // Sample training completion scores
        id: 's2',
        marker: {
          enabled: false // Disable markers to hide the data visually
        },
        visible: false // Ensure this series is hidden
      }
    ]
  };
  

  const handleCardClick = (chart) => setActiveChart(chart);

  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M />

        <div className="kpi-cards-M">


          <div className="kpi-card-M" onClick={() => handleCardClick("attendance")}>
            <img src={Teamattendence} alt="Attendance Icon" className="kpi-icon-M" />
            <div className="kpi-label-M">Total Attendance</div>
             <div className="kpi-value-M">
              {attendance !== null ? (
                <p>{attendance}%</p> 
              ) : (
                <p>Loading...</p> 
              )}
            </div>
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
          <div >
            {activeChart === "performance" && (
              <div className="bar-chart-container-M">
               
                <HighchartsReact highcharts={Highcharts} options={performanceBellCurveOptions} />
              </div>
            )}

            {activeChart === "training" && (
              <div className="bar-chart-container-M">
                
                <HighchartsReact highcharts={Highcharts} options={trainingBellCurveOptions} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Manager_Dashboard;
