// import React from 'react';
// import { Bar, Chart } from 'react-chartjs-2';
// import { CategoryScale } from 'chart.js'; // Import CategoryScale
// import { Button } from '@mui/material';
// import jsPDF from 'jspdf';
// import * as XLSX from 'xlsx';
// import './Admin_Report.css';

// // Register the scale
// Chart.register(CategoryScale);

// const Admin_Report = () => {
//   const performanceData = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       // {
//         label: 'Performance Trend',
//         data: [65, 59, 80, 81, 56, 55],
//         backgroundColor: 'rgba(217, 6, 6, 0.6)',
//       },
//     ],
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Performance Trend Report', 20, 20);
//     doc.save('performance_trend_report.pdf');
//   };

//   const downloadExcel = () => {
//     const data = [
//       ['Month', 'Performance'],
//       ['January', 65],
//       ['February', 59],
//       ['March', 80],
//       ['April', 81],
//       ['May', 56],
//       ['June', 55],
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Performance');
//     XLSX.writeFile(workbook, 'performance_trend_report.xlsx');
//   };

//   return (
//     <div className="reports-page">
//       <h1>Reports and Analytics</h1>
//       <section className="analytics-section">
//         <h2>Performance Trend Analytics</h2>
//         <Bar data={performanceData} />
//       </section>
//       <div className="download-buttons">
//         <Button variant="contained" onClick={downloadPDF} color="secondary">
//           Download as PDF
//         </Button>
//         <Button variant="contained" onClick={downloadExcel} color="primary">
//           Download as Excel
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Admin_Report ;         

// this is report and Analytic

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import { Line, Bar, Doughnut } from 'react-chartjs-2'; // Import chart components
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../Website/Admin_Report.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const Admin_Report = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample statistics data
  const sampleStatsData = [
    { label: "Performance Trend Analytics", value: "View" },
    { label: "Employee Comparison Reports", value: "View" },
    { label: "Goal vs. Achievements", value: "View" },
    { label: "Download as PDF/Excel", value: "Download" },
  ];

  useEffect(() => {
    // Load your stats data here (if necessary)
    setStatsData(sampleStatsData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Data for Performance Trend (Line Chart)
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Performance Trend',
        data: [80, 82, 84, 90, 88, 86],
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Data for Employee Comparison (Bar Chart)
  const barData = {
    labels: ['Human Resources (HR)', 'Finance', 'Marketing'],
    datasets: [
      {
        label: 'Performance Score',
        data: [80, 70, 85],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Data for Goals vs Achievements (Doughnut Chart)
  const doughnutData = {
    labels: ['Goals Achieved', 'Goals Pending'],
    datasets: [
      {
        label: 'Goals vs Achievements',
        data: [70, 30],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  };

  // Download PDF function
  const downloadPDF = () => {
    const pdfData = "This is dummy PDF data.";
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dummy_data.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download Excel function
  const downloadExcel = () => {
    const excelData = [
      ["Employee", "Performance Score"],
      ["Employee A", 80],
      ["Employee B", 70],
      ["Employee C", 85]
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + excelData.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", "dummy_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="">
      <div className="container-fluid">
        <Nav />
      </div>
      <div className="wrapper">
        <Sidebar />
        <div className="main p-3" id="satyam">
          <div className="text-Admin_Report">
            <h1 className="Reports_text">Reports and Analytics</h1>
            <div className="button-container">
              <button onClick={downloadPDF} className="btn ">Download as PDF</button>
              <button onClick={downloadExcel} className="btn ">Download as Excel</button>
            </div>
          </div>

          <div className="row p-2">
            {statsData.map((data, index) => (
              <div key={index} className="col-md-3 mb-4">
                {/* <div className="card hover-card">
                  <div className="card-body text-center">
                    <h4>{data.value}</h4>
                    <h6>{data.label}</h6>
                  </div>
                </div> */}
              </div>
            ))}
          </div>

          {/* Add the Analytical Graphs */}
          <div className="container graphs-container_c">
            <div className="graph_c">
              <h3>Performance Trend</h3>
              <Line data={lineData} />
            </div>

            <div className="graph_c">
              <h3>Employee Comparison</h3>
              <Bar data={barData} />
            </div>

            <div className="graph_c">
              <h3>Goals vs Achievements</h3>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Report;
  