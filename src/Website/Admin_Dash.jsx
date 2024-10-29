// import React, { useEffect, useState } from "react";
// import { createBrowserHistory } from "history";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import axios from 'axios';
// import Sidebar from "./Sidebar";
// import Nav from "./Nav";
// import { useNavigate } from "react-router-dom";


// const history = createBrowserHistory();

// const Admin_Dash= () => {
//   const URL = "http://54.176.214.232:8000/";

//   const handleNavigation = (path) => {
//     history.push(path);
//   };

//   const navigate = useNavigate();

//   const [statsData, setStatsData] = useState([{ label: '', value: 0 }])

//   useEffect(() => {
//     const token = localStorage.getItem("jwttoken");

//     if (!token) {
//       navigate("/");
//     }

//     axios
//       .get(`${URL}lms/dashboard`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         const stats = response.data.metrics;

//         setStatsData([...stats]);
//       })
//       .catch((reason) => {
//         console.log(reason);
//       });
//   }, []);


//   const data = [
//     { name: "Emp1", uv: 4000, pv: 2400, amt: 2400 },
//     { name: "Emp2", uv: 3000, pv: 1398, amt: 2210 },
//     { name: "Emp3", uv: 2000, pv: 9800, amt: 2290 },
//     { name: "Emp4", uv: 2780, pv: 3908, amt: 2000 },
//     { name: "Emp5", uv: 1890, pv: 4800, amt: 2181 },
//     { name: "Emp6", uv: 2390, pv: 3800, amt: 2500 },
//     { name: "Emp7", uv: 3490, pv: 4300, amt: 2100 },
//   ];

//   return (

//       <div className=" mt-4">
//       <div className="container-fluid">
//         <div className="row Profile_info_row mb-1"></div> 
//         <Nav/>
//       </div>
//       <div className="wrapper">
//       <Sidebar />
//         <div className="main p-3">
//           <div className="text-center">
//             <h1> Welcome to Admin Dashboard</h1>
//           </div>
//           {/* Your dashboard content goes here */}
//           <div className="row p-1 ">
//             <div className="col">
//             <div className="row">
// <div className="col-12 col-md-4 p-2 d-flex">
// <button type="button" className="btn btn-custom-primary w-100">
//       GradesA+
// </button>
// </div>
// <div className="col-12 col-md-4 p-2 d-flex">
// <button type="button" className="btn btn-custom-secondary w-100">
//       Achievement
// </button>
// </div>
// <div className="col-12 col-md-4 p-2 d-flex">
// <button type="button" className="btn btn-custom-success w-100">
//       Basic
// </button>
// </div>
// </div>
//             </div>
//           </div>

//           <div className="row p-2">
//             {statsData.map((data, index) => (
//               <div key={index} className="col-md-4 mb-4">
//                 <div className="card hover-card">
//                   <div className="card-body text-center">
//                     <div className="pie-chart-container">
//                       <h4>{data.value}</h4>
//                     </div>
//                     <div className="card-info mt-3">
//                       <h6>{data.label}</h6>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="row p-2">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart width={500} height={300} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="pv"
//                   stroke="#8884d8"
//                   activeDot={{ r: 8 }}
//                 />
//                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin_Dash;
import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./Sidebar"; // Your sidebar component
import { FaUsers, FaUserClock, FaUserCheck, FaPercent } from 'react-icons/fa'; // Import icons
import './Admin_Dash.css'; // Your custom CSS
import att from './Assets/attendance_overviewdash.svg'
import Attrition from './Assets/attrition.svg'
import Traning_hours from './Assets/traning_hours.svg'
import Complaints_rate from './Assets/complaints_rate.svg'

const Admin_Dash = () => {
  const [activeChart, setActiveChart] = useState(null); // State to track selected KPI

  const kpiData = [
    {
      label: "Attendance Overview",
      value: "85%",
      icon: <img src={att} alt="" />,
      chart: "attendance",
      cardback:
        "Attendance Overview tracks employee presence and engagement, ensuring productivity.",
      backgroundColor: "linear-gradient(180deg, #D3345D 48.4%, #E99191 100%)", // Gradient for the first card
      className: "attendance-card",
    },
    {
      label: "Attrition Rate",
      value: "8%",
      icon: <img src={Attrition} alt="" />,
      chart: "attrition",
      cardback:
        "Attrition Rate measures employee turnover, indicating retention and satisfaction.",
      backgroundColor: "linear-gradient(180deg, #138FA7 0%, #74B8C5 100%)", // Gradient for the second card
      className: "attrition-card",
    },
    {
      label: "Avg Training Hours",
      value: "12 hours",
      icon: <img src={Traning_hours} alt="" />,
      chart: "trainingCurve",
      cardback:
        "Average training hours reflect employee development and skill enhancement efforts.",
      backgroundColor: "linear-gradient(180deg, #14814D 0%, #6AB08F 100%)", // Gradient for the third card
      className: "training-card",
    },
    {
      label: "Compliance Rate",
      value: "92%",
      icon: <img src={Complaints_rate} alt="" />,
      chart: "compliance",
      cardback:
        "Compliance rate measures adherence to HR policies and regulations effectively.",
      backgroundColor: "linear-gradient(180deg, #FEDB1A 0%, #CAC087 100%)", // Gradient for the fourth card
      className: "compliance-card",
    },
  ];

  // Chart data
  const attendanceTrendData = [
    { month: "January", attendance: 90 },
    { month: "February", attendance: 85 },
    { month: "March", attendance: 92 },
    { month: "April", attendance: 87 },
    { month: "May", attendance: 80 },
    { month: "June", attendance: 88 },
    { month: "July", attendance: 84 },
    { month: "August", attendance: 89 },
    { month: "September", attendance: 91 },
    { month: "October", attendance: 86 },
    { month: "November", attendance: 88 },
    { month: "December", attendance: 83 },
  ];

  const attritionRateData = [
    { department: "HR", attrition: 5 },
    { department: "Sales", attrition: 10 },
    { department: "Engineering", attrition: 8 },
    { department: "Marketing", attrition: 6 },
  ];

  const trainingBellCurveData = [
    { range: "0-4 hours", employees: 5 },
    { range: "5-8 hours", employees: 30 },
    { range: "9-12 hours", employees: 50 },
    { range: "13-16 hours", employees: 30 },
    { range: "17-20 hours", employees: 10 },
    { range: "21-24 hours", employees: 5 },
  ];

  const complianceRateData = [
    { department: "HR", compliance: 95 },
    { department: "Sales", compliance: 90 },
    { department: "Engineering", compliance: 85 },
    { department: "Marketing", compliance: 88 },
  ];

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
    const excelData = [["Employee", "Performance Score"]];
    
    // Generate 100 dummy employees
    for (let i = 1; i <= 100; i++) {
      const employeeName = `Employee ${i}`;
      const performanceScore = Math.floor(Math.random() * 101); // Random score between 0 and 100
      excelData.push([employeeName, performanceScore]);
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + excelData.map(e => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", "employee_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Render charts based on the selected KPI card
  const renderChart = () => {
    switch (activeChart) {
      case "attendance":
        return (
          <div>
            <h3>Organization Attendance Trend (Monthly)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case "attrition":
        return (
          <div>
            <h3>Attrition Rate (Department Comparison)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attritionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attrition" fill="#D5661A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "trainingCurve":
        return (
          <div>
            <h3>Training Hours Bell Curve (Organization-Wide)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trainingBellCurveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="employees" fill="#F58C42" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "compliance":
        return (
          <div>
            <h3>Compliance Rate (HR Policies)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliance" fill="#FA9D63" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return <p>Select a KPI card to display the chart</p>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">
        <Sidebar />
        <div className="admin-content p-3">
          <div className="text-center">
            <h1 className="dashboard-title">Admin Dashboard</h1>
          </div>

          {/* KPI Cards */}
          <div className="kpi-cards-container"> {/* Use CSS grid to align cards in one row */}
            {kpiData.map((data, index) => (
              <div key={index} className={`kpi-card-item ${data.className}`}> {/* Unique class name for card */}
                <div
                  className={`kpi-card ${data.className}`}
                  onClick={() => setActiveChart(data.chart)} // Click handler to set active chart
                  style={{ background: data.backgroundColor }} // Use linear gradient background
                >
                  <div className="card-content">
                    {data.icon}
                    <h3>{data.label}</h3>
                    <p>{data.value}</p>
                    <p>{data.cardback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button Container */}
          <div className="button-container text-center mb-3">
            <button onClick={downloadPDF} className="btn-download">Download as PDF</button>
            <button onClick={downloadExcel} className="btn-download">Download as Excel</button>
          </div>

          {/* Chart Display */}
          <div className="chart-container row p-2">
            <div className="col-md-12">
              {renderChart()} {/* Render chart based on active KPI */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dash;
