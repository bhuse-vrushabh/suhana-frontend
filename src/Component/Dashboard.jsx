import React, { useState } from 'react';
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

BellCurve(Highcharts);


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

// Bell curve chart configuration
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
      type: isPerformance ? 'bar' : 'scatter', // Use 'bar' for performance and 'scatter' for others
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
  const [selectedCard, setSelectedCard] = useState(null);

  const attendanceRate = 92;
  const leaveBalance = 8;
  const performanceScore = 85;
  const learningProgress = 75;

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
            <p className="kpi-value">{attendanceRate}%</p>
            <p>You've attended 92% of the sessions this month. Great job!</p>
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
            <p>You have completed 75% of your training modules.</p>
          </div>
        </div>

        {/* Conditionally Render the Chart */}
        <div className="chart-container-emp">
          {selectedCard === 'attendance' && (
            <div className="chart">
              <h3>Attendance Trend </h3>
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([88, 92, 94, 96])} />
            </div>
          )}
          {selectedCard === 'leaveBalance' && (
            <div className="chart">
              <h3>Leave Usage </h3>
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([30, 50, 20])} />
            </div>
          )}
          {selectedCard === 'performance' && (
            <div className="chart">
              <h3>Performance Overview </h3>
              {/* <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([80, 85], true)} /> */}
              <HighchartsReact highcharts={Highcharts} options={bellCurveOptions([30, 50, 20])} />

            </div>
          )}
           {selectedCard === 'learning' && (
            <div className="chart">
              <h3>Learning Progress: 75%</h3>
              

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiCards;
