import React, { useState } from 'react';
import './Dashboard.css';
import { FaUserCheck } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2'; // Example using react-chartjs-2 for charts
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import attendance from './Assets/attendence.svg'
import performance from './Assets/performance.svg'
import leave from './Assets/leave.svg'
import learning from './Assets/learning.svg'

// Sample chart data for illustration purposes
const sampleChartData = {
  attendance: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance (%)',
        data: [88, 92, 94, 96],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  },
  leaveUsage: {
    labels: ['Sick Leave', 'Vacation', 'Personal'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  performance: {
    labels: ['Previous Quarter', 'Current Quarter'],
    datasets: [
      {
        label: 'Performance Score (%)',
        data: [80, 85],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  },
};

const KpiCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Sample data for each KPI card
  const attendanceRate = 92; // Attendance record as a percentage
  const leaveBalance = 8; // Remaining leave days
  const performanceScore = 85; // Current quarter performance score
  const learningProgress = 75; // Percentage of training completed

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="kpi-cards-container">
          {/* Attendance Record Card */}
          <div className="kpi-card" style={{ background: '#FFFFFF' }}>
            <div className="kpi-card-front" onClick={() => handleCardClick('attendance')}>
            <img src={attendance} alt="" />
              <h3>Attendance Record</h3>
              
              <p className="kpi-value">{attendanceRate}%</p>
              <p>Monthly Attendance Overview You've attended 92% of the sessions this month. Great job!</p>
            </div>
          </div>

         

          {/* Performance Score Card */}
          <div className="kpi-card" style={{ background: '#FFFFFF' }}>
            <div className="kpi-card-front" onClick={() => handleCardClick('performance')}>
              <img src={performance} alt="" />
              <h3>Performance Score</h3>
              <p className="kpi-value">{performanceScore}%</p>
              <p>Current Quarter Your performance is rated at 85% for this quarter.</p>
            </div>
          </div>

           {/* Leave Balance Card */}
           <div className="kpi-card" style={{ background: '#F6EBC9' }}>
            <div className="kpi-card-front" onClick={() => handleCardClick('leaveBalance')}>
            <img src={leave} alt="" />
              <h3>Leave Balance</h3>
              <p className="kpi-value">{leaveBalance} Days</p>
              <p>You have 8 leave days remaining. Plan your time off wisely!</p>
            </div>
          </div>

          {/* Learning & Development Progress Card */}
          <div className="kpi-card" style={{ background: '#FFFFFF' }}>
            <div className="kpi-card-front" onClick={() => handleCardClick('learning')}>
            <img src={learning} alt="" />
              <h3>Learning & Development</h3>
              <p className="kpi-value">{learningProgress}%</p>
              <p>You have completed 75% of your training modules.</p>
            </div>
          </div>
        </div>

        {/* Conditionally Render the Chart */}
        <div className="chart-container-emp">
          {selectedCard === 'attendance' && (
            <div className="chart">
              <h3>Attendance Trend</h3>
              <Line data={sampleChartData.attendance} />
            </div>
          )}

          {selectedCard === 'leaveBalance' && (
            <div className="chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h3>Leave Usage</h3>
            <div style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Pie 
                data={sampleChartData.leaveUsage} 
                style={{ height: '100%', width: '100%' }} // Ensure chart uses the full size
              />
            </div>
          </div>
          )}

          {selectedCard === 'performance' && (
            <div className="chart">
              <h3>Performance Overview</h3>
              <Bar data={sampleChartData.performance} />
            </div>
          )}

          {selectedCard === 'learning' && (
            <div className="chart">
              <h3>Learning Progress</h3>
              <p>Progress: {learningProgress}%</p>
              {/* Add a chart if needed */}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default KpiCards;
