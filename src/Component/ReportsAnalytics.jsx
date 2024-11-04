import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'chart.js/auto'; // Ensure charts load correctly
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const ReportsAnalytics = () => {
  // Example data for charts
  const performanceData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Performance Trend',
        data: [65, 59, 80, 81, 56],
        borderColor: '#D5661A',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
    ],
  };

  const employeeComparisonData = {
    labels: ['Employee 1 ', 'Employee 2 '],
    datasets: [
      {
        label: 'Employee Comparison',
        data: [70, 85],
        backgroundColor: ['#B60B3D', '#E5C02C'],
      },
    ],
  };

  const goalVsAchievementData = {
    labels: ['Goal 1', 'Goal 2'],
    datasets: [
      {
        label: 'Goal vs Achievements',
        data: [90, 75],
        backgroundColor: ['#B60B3D', '#E5C02C'],
      },
    ],
  };

  // Export PDF function
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Reports and Analytics', 20, 10);
    doc.save('report.pdf');
  };

  // Export Excel function
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { 'Report Type': 'Performance Trend', 'Score': '65' },
      { 'Report Type': 'Employee Comparison', 'Score': '70' },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'report.xlsx');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', // Ensure sidebar and content are side by side
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: 1, // Makes the content take the rest of the space
    padding: '20px',
    backgroundColor: '#FEFAEE',
  };

  // Updated style for charts container to align charts horizontally
  const chartsWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Spread charts out horizontally
    gap: '20px', // Optional gap between charts
    marginTop: '20px',
  };

  const chartContainerStyle = {
    width: '30%', // Set chart container to take one-third of the row
    backgroundColor: '#fff',
    padding: '10px', // Add some padding
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Reduce box shadow
  };

  const headingStyle = {
    fontSize: '20px', // Smaller font size
    color: '#ff0000',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor:  '#D5661A',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  };

  const mainDivStyle = {
    maxWidth: '80%',
    margin: '20px auto',
    marginTop: '50px', // Add margin-top here
    padding: '10px',
    backgroundColor: '#FEFAEE',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  // Options for smaller charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow adjusting height/width
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={mainDivStyle}>
      <Navbar />

      <div style={containerStyle}>
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div style={contentStyle}>
          <h1 style={headingStyle}></h1>

          {/* Charts Wrapper */}
          <div style={chartsWrapperStyle}>
            {/* Performance Trend Analytics */}
            <div style={chartContainerStyle}>
              <h2 style={headingStyle}>Performance Trend Analytics</h2>
              <div style={{ height: '350px' }}>
                {/* Increase height */}
                <Line data={performanceData} options={chartOptions} />
              </div>
            </div>

            {/* Employee Comparison Reports */}
            <div style={chartContainerStyle}>
              <h2 style={headingStyle}>Comparison Reports</h2>
              <div style={{ height: '350px' }}>
                {/* Increase height */}
                <Bar data={employeeComparisonData} options={chartOptions} />
                
              </div>
            </div>

            {/* Goal vs. Achievements */}
            <div style={chartContainerStyle}>
              <h2 style={headingStyle}>Goal vs Achievements</h2>
              <div style={{ height: '350px' }}>
                {/* Increase height */}
                <Bar data={goalVsAchievementData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div style={{ textAlign: 'center' }}>
            <button style={buttonStyle} onClick={exportPDF}>
              Download as PDF
            </button>
            <button style={buttonStyle} onClick={exportExcel}>
              Download as Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
