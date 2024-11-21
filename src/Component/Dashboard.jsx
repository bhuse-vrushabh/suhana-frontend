 
import React, { useEffect, useState, useContext } from "react";
import './Dashboard.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import attendance from './Assets/attendence.svg';
import performance from './Assets/performance.svg';
import leave from './Assets/leave.svg';
import learning from './Assets/learning.svg';
import { AuthContext } from "../Component/AuthContext";
 
BellCurve(Highcharts);
 
const bellCurveOptions = (data, isPerformance = false) => ({
  title: {
    text: isPerformance ? 'Performance Score (Bell Curve with Bar)' : 'Bell Curve',
  },
  xAxis: [
    {
      title: { text: 'Data' },
      alignTicks: false,
    },
    {
      title: { text: 'Bell Curve' },
      alignTicks: false,
      opposite: true,
    },
  ],
  yAxis: [
    {
      title: { text: 'Data' },
    },
    {
      title: { text: 'Bell Curve' },
      opposite: true,
    },
  ],
  series: [
    {
      name: 'Bell Curve',
      type: 'bellcurve',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 1,
      zIndex: -1,
    },
    {
      name: 'Data',
      type: isPerformance ? 'bar' : 'scatter',
      data: data,
      accessibility: {
        exposeAsGroupOnly: true,
      },
      marker: {
        radius: 1.5,
      },
    },
  ],
});
 
const KpiCards = () => {
  const { authData, clearTokens } = useContext(AuthContext);
  console.log(authData);
  const [selectedCard, setSelectedCard] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learningProgress] = useState(75); // Static value for Learning Progress
 
  const fetchAttendanceData = async () => {
    const token = localStorage.getItem('accessToken');
    // if (!token) {
    //   console.error("No token found. Redirecting to login.");
    //   clearTokens();
    //   return;
    // }
 
    try {
      const response = await fetch('http://127.0.0.1:8000/api/annual_attendance_rate/2024/', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // if (response.status === 401) {
        //   console.log("Token expired. Redirecting to login...");
        //   clearTokens();
        // }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("This is the response data:", data);
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchAttendanceData();
  }, [authData.accessToken]);
 
  const leaveBalance = 8;
  const performanceScore = 85;
 
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };
 
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="kpi-cards-container">
          {/* KPI Cards */}
          <div
            className={`kpi-card ${selectedCard === 'attendance' ? 'selected' : ''}`}
            onClick={() => handleCardClick('attendance')}
          >
            <img src={attendance} alt="" />
            <h3>Attendance Record</h3>
            <p className="kpi-value">
              {attendanceData ? `${attendanceData.annual_attendance_rate}%` : 'Loading...'}
            </p>
            <p>You've attended 70% of the sessions this month. Great job!</p>
          </div>
 
          <div
            className={`kpi-card ${selectedCard === 'performance' ? 'selected' : ''}`}
            onClick={() => handleCardClick('performance')}
          >
            <img src={performance} alt="" />
            <h3>Performance Score</h3>
            <p className="kpi-value">{performanceScore}%</p>
            <p>Your performance is rated at 85% for this quarter.</p>
          </div>
 
          <div
            className={`kpi-card ${selectedCard === 'leaveBalance' ? 'selected' : ''}`}
            onClick={() => handleCardClick('leaveBalance')}
          >
            <img src={leave} alt="" />
            <h3>Leave Balance</h3>
            <p className="kpi-value">{leaveBalance} Days</p>
            <p>You have 8 leave days remaining. Plan your time off wisely!</p>
          </div>
 
          <div
            className={`kpi-card ${selectedCard === 'learning' ? 'selected' : ''}`}
            onClick={() => handleCardClick('learning')}
          >
            <img src={learning} alt="" />
            <h3>Learning & Development</h3>
            <p className="kpi-value">{learningProgress}%</p>
            <p>You have completed {learningProgress}% of your training modules.</p>
          </div>
        </div>
 
        {/* Conditionally Render the Chart */}
        <div className="chart-container-emp">
          {selectedCard === 'attendance' && (
            <div className="chart">
              <h3>Attendance Trend</h3>
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([88, 92, 94, 96])} />
            </div>
          )}
          {selectedCard === 'leaveBalance' && (
            <div className="chart">
              <h3>Leave Usage</h3>
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([30, 50, 20])} />
            </div>
          )}
          {selectedCard === 'performance' && (
            <div className="chart">
              <h3>Performance Overview</h3>
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([30, 50, 20])} />
            </div>
          )}
          {selectedCard === 'learning' && (
            <div className="chart">
              <h3>Learning Progress</h3>
              <div className="slider-container">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={learningProgress}
                  disabled // Make the slider static
                  className="slider-large"
                />
                <p className="slider-value">
                  Progress: <span>{learningProgress}%</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default KpiCards;
 
 
