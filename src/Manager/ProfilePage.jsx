import React, { useState, useEffect } from "react";
import './ProfilePage.css'; // Import CSS for styling

import Sidebarr from "./Sidebarr";
import './Sidebarr.css';


const ProfilePage = () => {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated static data for the manager
    const fetchManagerData = () => {
      const data = {
        name: "John Doe",
        department: "Sales",
        position: "Sales Manager",
        performanceHistory: [
          { year: 2021, rating: "Excellent", kpiMet: "Yes" },
          { year: 2022, rating: "Good", kpiMet: "Yes" },
          { year: 2023, rating: "Satisfactory", kpiMet: "No" }
        ],
        skillDevelopment: [
          { skill: "Cybersecurity Training", completedOn: "2023-01-15" },
          { skill: "Sales Techniques", completedOn: "2022-06-20" }
        ],
        certifications: [
          { name: "Certified Sales Professional", issuedBy: "Sales Institute", date: "2021-05-10" },
          { name: "Leadership Certificate", issuedBy: "Leadership Academy", date: "2023-02-25" }
        ],
        tasks: [
          { task: "Complete Q1 Sales Report", status: "Completed", dueDate: "2024-03-31" },
          { task: "Prepare Presentation for Sales Meeting", status: "In Progress", dueDate: "2024-02-15" }
        ],
        leaves: [
          { date: "2024-01-10", type: "Sick Leave", duration: "2 days" },
          { date: "2024-05-15", type: "Annual Leave", duration: "5 days" }
        ],
        team: [
          { name: "Alice Smith", performance: "Excellent" },
          { name: "Bob Johnson", performance: "Good" }
        ]
      };
      setManagerData(data);
      setLoading(false);
    };

    fetchManagerData();
  }, []);

  // Loading, error, and data handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!managerData) return <div>No manager data available.</div>;

  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
    
    <div className="manager-profile">
      <h2>Manager Profile</h2>

      {/* Personal Details */}
      <section className="section personal-details">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {managerData.name}</p>
        <p><strong>Department:</strong> {managerData.department}</p>
        <p><strong>Position:</strong> {managerData.position}</p>
      </section>

      {/* Performance History */}
      <section className="section performance-history">
        <h3>Performance History</h3>
        <ul>
          {managerData.performanceHistory.map((record, index) => (
            <li key={index}>
              <p><strong>Year:</strong> {record.year}</p>
              <p><strong>Rating:</strong> {record.rating}</p>
              <p><strong>KPI Met:</strong> {record.kpiMet}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Skill Development Records */}
      <section className="section skill-development">
        <h3>Skill Development Records</h3>
        <ul>
          {managerData.skillDevelopment.map((skill, index) => (
            <li key={index}>
              <p><strong>Skill:</strong> {skill.skill}</p>
              <p><strong>Completed On:</strong> {skill.completedOn}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      {/* <section className="section certifications">
        <h3>Certifications</h3>
        <ul>
          {managerData.certifications.map((cert, index) => (
            <li key={index}>
              <p><strong>Certification:</strong> {cert.name}</p>
              <p><strong>Issued By:</strong> {cert.issuedBy}</p>
              <p><strong>Date:</strong> {cert.date}</p>
            </li>
          ))}
        </ul>
      </section> */}

      {/* Task Management */}
      {/* <section className="section tasks">
        <h3>Tasks</h3>
        <ul>
          {managerData.tasks.map((task, index) => (
            <li key={index}>
              <p><strong>Task:</strong> {task.task}</p>
              <p className={`status ${task.status.toLowerCase()}`}>{task.status}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
            </li>
          ))}
        </ul>
      </section> */}

      {/* Leave Records */}
      {/* <section className="section leaves">
        <h3>Leave Records</h3>
        <ul>
          {managerData.leaves.map((leave, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {leave.date}</p>
              <p><strong>Type:</strong> {leave.type}</p>
              <p><strong>Duration:</strong> {leave.duration}</p>
            </li>
          ))}
        </ul>
      </section> */}

      {/* Team Overview */}
      {/* <section className="section team">
        <h3>Team Overview</h3>
        <ul>
          {managerData.team.map((member, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Performance:</strong> {member.performance}</p>
            </li>
          ))}
        </ul>
      </section> */}
    </div>
    </div></div>
  );
};

export default ProfilePage;
