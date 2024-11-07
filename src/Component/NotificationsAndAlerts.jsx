import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const NotificationsAndAlerts = () => {
  const [goalDeadlines, setGoalDeadlines] = useState([
    { id: 1, goal: 'Complete Q4 Sales Target', weightage: '50%', dueDate: '2024-10-15' },
    { id: 2, goal: 'Submit Budget Plan', weightage: '50%', dueDate: '2024-10-20' }
  ]);

  const [feedbackRequests, setFeedbackRequests] = useState([
    { id: 1, request: 'Provide Feedback for Marketing Strategy', requester: 'John Doe' },
    { id: 2, request: 'Feedback on Team Meeting', requester: 'Jane Smith' }
  ]);

  return (
    <div className="nav">
      <Navbar />
      <div style={containerStyle}>
        <Sidebar />
        <div style={contentStyle}>

          {/* Goal Deadlines Table */}
          <section>
            <h2 style={sectionTitleStyle}>Goal Deadlines</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Goal</th>
                  
                  <th style={thStyle}>Due Date</th>
                  <th style={thStyle}>Weightage</th>
                </tr>
              </thead>
              <tbody>
                {goalDeadlines.map((goal) => (
                  <tr key={goal.id}>
                    <td style={tdStyle}>{goal.goal}</td>
                    
                    <td style={tdStyle}>{goal.dueDate}</td>
                    <td style={tdStyle}>{goal.weightage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Feedback Requests Table */}
          {/* <section>
            <h2 style={sectionTitleStyle}>Feedback Requests</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Request</th>
                  <th style={thStyle}>Requester</th>
                </tr>
              </thead>
              <tbody>
                {feedbackRequests.map((request) => (
                  <tr key={request.id}>
                    <td style={tdStyle}>{request.request}</td>
                    <td style={tdStyle}>{request.requester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section> */}

        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  padding: '20px',
};

const contentStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const sectionTitleStyle = {
  color: '#ff4b4b',
  borderBottom: '2px solid #ff4b4b',
  paddingBottom: '10px',
  marginBottom: '20px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

export default NotificationsAndAlerts;
