import React, { useState } from 'react';
import './LeaveManagement.css'; // Importing the CSS file
import './Sidebarr.css';
import Sidebarr from './Sidebarr';
import Nav from './Nav';
import './Nav';

function LeaveManagement() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ leaveType: '', startDate: '', endDate: '', reason: '', employeeName: '' });

    const handleSubmitRequest = () => {
        setLeaveRequests([...leaveRequests, { ...newRequest, id: leaveRequests.length + 1, status: 'Pending' }]);
        setNewRequest({ leaveType: '', startDate: '', endDate: '', reason: '', employeeName: '' });
    };

    return (
       <div >
       <div className="container-fluid">
        <div className="row profile_into_row mb-1"></div>
        <Nav/>
        <div/>
        <div className="wrapper">
            <Sidebarr/>
        
        <div className="leave-management-section">
            <h2>Leave Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.employeeName}</td> {/* Make sure employeeName is part of the request */}
                            <td>{request.leaveType}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.status}</td>
                            <td>{request.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Submit Leave Request</h3>
            <input 
                type="text" 
                placeholder="Employee Name" 
                value={newRequest.employeeName} 
                onChange={e => setNewRequest({ ...newRequest, employeeName: e.target.value })} 
            />
            <select value={newRequest.leaveType} onChange={e => setNewRequest({ ...newRequest, leaveType: e.target.value })}>
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Vacation">Vacation</option>
            </select>
            <input type="date" value={newRequest.startDate} onChange={e => setNewRequest({ ...newRequest, startDate: e.target.value })} />
            <input type="date" value={newRequest.endDate} onChange={e => setNewRequest({ ...newRequest, endDate: e.target.value })} />
            <textarea placeholder="Reason" value={newRequest.reason} onChange={e => setNewRequest({ ...newRequest, reason: e.target.value })} />
            <button onClick={handleSubmitRequest}>Submit Request</button>
        </div>
     </div>
</div>
</div>
    );
}

export default LeaveManagement;
