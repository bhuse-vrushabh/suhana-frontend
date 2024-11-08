import React, { useState } from 'react';
import './GoalManagement.css';
import './Sidebarr.css';
import Sidebarr from './Sidebarr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import Nav_M from './Nav_M';

const GoalManagement = () => {
  const [formData, setFormData] = useState({
    employee: '', // Store the employee ID
    description: '', // Task description
    weightage: '', // Weightage of the task
    startDate: '',
    endDate: '',
    status: 'Pending' // Default status
  });

  const [goals, setGoals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  // List of employees, but you will only be using their IDs
  const employees = [
    { id: 1, name: "Raj" },
    { id: 2, name: "Varad" },
    { id: 3, name: "Rohit" },
    { id: 4, name: "Shubham" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "employee" ? Number(value) : value, // Convert employee ID to a number
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today to compare dates accurately
  
    // Validate weightage
    if (isNaN(formData.weightage) || formData.weightage <= 0 || formData.weightage > 10) {
      setError("Weightage must be a number between 1 and 10.");
      return;
    }
  
    // Validate start date to be today or later
    if (formData.startDate) {
      const start = new Date(formData.startDate);
      if (start < today) {
        setError("Start Date cannot be in the past.");
        return;
      }
    }
  
    // Validate that end date is after start date
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        setError("End Date should be later than Start Date.");
        return;
      }
    }
  
    setError(""); // Clear errors if all validations pass
  

    const formattedData = {
      employee: formData.employee,
      description: formData.description,
      weightage: Number(formData.weightage),
      start_date: formData.startDate, // Use snake_case to match API requirements
      end_date: formData.endDate,
      status: formData.status,
    };
  
    // Format the dates correctly
    if (formattedData.start_date) {
      formattedData.start_date = new Date(formattedData.start_date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    if (formattedData.end_date) {
      formattedData.end_date = new Date(formattedData.end_date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
  
    console.log('Submitting Goal Data:', formattedData); // Log the data being sent
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/performance/goals/', formattedData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Replace with your actual token
        },
      });
  
      if (response.status === 201 || response.status === 200) {
        const responseData = response.data;
        console.log('Response data:', responseData);
  
        if (isEditing) {
          const updatedGoals = [...goals];
          updatedGoals[editIndex] = responseData;
          setGoals(updatedGoals);
          setIsEditing(false);
          setEditIndex(null);
          Swal.fire('Success', 'Task updated successfully!', 'success');
        } else {
          setGoals([...goals, responseData]);
          Swal.fire('Success', 'Task added successfully!', 'success');
        }
  
        // Reset the form
        setFormData({ employee: '', description: '', weightage: '', startDate: '', endDate: '', status: 'Pending' });
      }
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        const errorDetails = error.response.data;
        const errorMessage = Object.values(errorDetails).flat().join(', ');
        Swal.fire('Error', errorMessage || 'There was an issue saving the task. Please try again.', 'error');
      } else {
        console.error("Error message:", error.message);
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
      }
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(goals[index]);
  };

  const handleDelete = (index) => {
    const goalId = goals[index].id; // Get the ID of the goal to delete
  
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/performance/goals/23/`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Replace with your actual token
            },
          });
  
          // Remove the deleted goal from the state
          const updatedGoals = goals.filter((_, i) => i !== index);
          setGoals(updatedGoals);
  
          Swal.fire('Deleted!', 'Task has been deleted.', 'success');
        } catch (error) {
          console.error("Error deleting the task:", error.response ? error.response.data : error.message);
          Swal.fire('Error', 'Failed to delete the task. Please try again.', 'error');
        }
      }
    });
  };
  
  return (
    <div>
      <div className="main-wrapper">
        <Sidebarr />
        <div className="main-wrapper_n">
          <Nav_M/>
          <div>
            <h2 className="form-title">{isEditing ? 'Edit Employee Task' : 'Employee Task'}</h2>
            <form className="goal-form-m" onSubmit={handleSubmit}>
              <div className="form-row-m">
                <div className="form-group-m">
                  <label>Employee ID:</label>
                  <select
                    name="employee"
                    value={formData.employee}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an employee ID</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-m">
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                     className="input-feild-Man"
                    required
                  />
                </div>

                <div className="form-group-m">
                  <label>Weightage:</label>
                  <input
                    type="number"
                    name="weightage"
                    value={formData.weightage}
                    onChange={handleInputChange}
                     className="input-feild-Man"
                    required
                  />
                </div>
              </div>

              <div className="form-row-m">
                <div className="form-group-m">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                     className="input-feild-Man"
                    required
                  />
                </div>

                <div className="form-group-m">
                  <label>End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                     className="input-feild-Man"
                    required
                  />
                  {error && <div className="error-message">{error}</div>}
                </div>

                <div className="form-group-m">
                  <label>Status:</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                     className="input-feild-Man"
                    required
                  >
                    <option value="Pending">Pending</option>
                    
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="button-group-m">
                <button type="submit" className="goal-submit-btn-m">
                  {isEditing ? 'Update Task' : 'Add Employee Task'}
                </button>
              </div>
            </form>
          </div>

          <div className="goals-table-section-m">
            <h2 className="form-title">Tasks List</h2>
            {goals.length > 0 ? (
              <table className="goals-table-m">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Description</th>
                    <th>Weightage</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.map((goal, index) => (
                    <tr key={index}>
                      <td>{goal.employee}</td>
                      <td>{goal.description}</td>
                      <td>{goal.weightage}</td>
                      <td>{goal.start_date}</td>
                      <td>{goal.end_date}</td>
                      <td>{goal.status}</td>
                      <td className="actions-cell-m">
                        <button className="edit-btn-m" onClick={() => handleEdit(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="delete-btn-m" onClick={() => handleDelete(index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Task set yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalManagement;
