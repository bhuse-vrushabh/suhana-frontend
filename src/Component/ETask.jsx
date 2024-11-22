import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "../Component/ETask.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Component/AuthContext';

const ETask = () => {
  const { authData } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalsResponse = await axios.get('http://127.0.0.1:8000/api/goals/', {  
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const goalsData = goalsResponse.data;

        const enrichedGoals = goalsData.map((goal) => {
          const employee = employees.find(
            (emp) => String(emp.employee_id) === String(goal.employee_id)
          );
          return {
            ...goal,
            employeeName: employee ? employee.name : 'Unknown Employee',
          };
        });

        setGoals(enrichedGoals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authData, employees]);

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
  };

  const totalPages = Math.ceil(goals.length / itemsPerPage);
  const paginatedGoals = goals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="Emain-wrapper">
        <Sidebar />
        <div className="main-wrapper_E">
          <Navbar />
          <div className="goals-table-section-E">
            <h5>Tasks List</h5>
            {goals.length > 0 ? (
              <table className="goals-table-E">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Weightage</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGoals.map((goal, index) => (
                    <tr key={goal.id}>
                      <td>{goal.id}</td>
                      <td>{goal.description}</td>
                      <td>{goal.weightage}</td>
                      <td>{goal.start_date}</td>
                      <td>{goal.end_date}</td>
                      <td>{goal.status}</td>
                      <td className="action-button-E">
                        <button onClick={() => handleEdit(index)} className="edit-btn-m">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Task set yet.</p>
            )}
            <div className="pagination-E">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn-E prev-next-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-btn-E ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn-E prev-next-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETask;
