import React, { useState, useEffect, useContext } from 'react';
import './GoalManagement.css';
import './Sidebarr.css';
import Sidebarr from './Sidebarr';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import Nav_M from './Nav_M';
import { AuthContext } from '../Component/AuthContext';
const GoalManagement = () => {
  const { authData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    employee_id: '', // Holds the selected employee ID
    description: '',
    weightage: '',
    startDate: '',
    endDate: '',
    status: '',
  });

  const [employees, setEmployees] = useState([]);
  const [goals, setGoals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch goals data
        const goalsResponse = await axios.get("http://127.0.0.1:8000/api/goals/", {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // Fetch employees data
        const employeesResponse = await axios.get(
          'http://127.0.0.1:8000/api/employees/',
          {
            headers: {
              Authorization: `Bearer ${authData.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const goalsData = goalsResponse.data;
        const employeesData = employeesResponse.data;

        console.log("Goals Data:", goalsData);
        console.log("Employees Data:", employeesData);

        console.log("Goals Data Before Mapping:", goalsData);

        const enrichedGoals = goalsData.map((goal) => {
          console.log("Processing Goal:", goal);
        
          const employeeId = goal.employee_id || "unknown";
          const employee = employeesData.find(
            (emp) => String(emp.employee_id) === String(employeeId)
          );
        
          if (!goal.employee_id) {
            console.warn(`Missing employee_id in goal:`, goal);
          }
        
          return {
            ...goal,
            employeeName: employee ? employee.name : "Unknown Employee",
          };
        });
        
        

        setGoals(enrichedGoals);
        setEmployees(employeesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authData]);
  // Create goal (POST API)
  const createGoal = async (formattedData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setgoals/", 
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setGoals((prevGoals) => [...prevGoals, response.data]);
        Swal.fire("Success", "Task added successfully!", "success");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Update goal (PATCH API)
  const updateGoal = async (goalId, formattedData) => {
    try {
      console.log("Goal ID:", goalId);
      console.log("Formatted Data:", formattedData);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/performance-goals/${formattedData.employee_id}/${goalId}/update/`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const updatedGoals = goals.map((goal) =>
          goal.id === goalId ? { ...goal, ...formattedData } : goal
        );
        setGoals(updatedGoals);
        Swal.fire("Success", "Task updated successfully!", "success");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Handle API error
  const handleApiError = (error) => {
    if (error.response) {
      const errorDetails = error.response.data;
      if (errorDetails.employee_id) {
        Swal.fire("Error", `Employee ID error: ${errorDetails.employee_id}`, "error");
      } else {
        const errorMessage = Object.values(errorDetails).flat().join(", ");
        Swal.fire("Error", errorMessage || "There was an issue saving the task. Please try again.", "error");
      }
    } else {
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validate weightage and date logic
    if (formData.startDate) {
      const start = new Date(formData.startDate);
      if (start < today) {
        setError("Start Date cannot be in the past.");
        return;
      }
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        setError("End Date should be later than Start Date.");
        return;
      }
    }

    setError(""); // Clear any previous error

    const formattedData = {
      employee_id: parseInt(formData.employee_id, 10),
      description: formData.description,
      weightage: Number(formData.weightage),
      start_date: formData.startDate,
      end_date: formData.endDate,
      status: formData.status,
    };

    if (formattedData.start_date) {
      formattedData.start_date = new Date(formattedData.start_date).toISOString().split("T")[0];
    }
    if (formattedData.end_date) {
      formattedData.end_date = new Date(formattedData.end_date).toISOString().split("T")[0];
    }

    try {
      if (isEditing) {
        const goalToEdit = goals[editIndex]; // Find the goal to edit based on the index
        await updateGoal(goalToEdit.id, formattedData); // Use PATCH API
        setIsEditing(false); // Reset edit mode
        setEditIndex(null); // Clear the edit index
      } else {
        await createGoal(formattedData); // Use POST API
      }

      // Reset the form after submission
      setFormData({
        employee_id: "",
        description: "",
        weightage: "",
        startDate: "",
        endDate: "",
        status: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleEdit = (index) => {
    const goal = goals[index];
    setFormData({
      employee_id: goal.employee_id,
      description: goal.description,
      weightage: goal.weightage,
      startDate: goal.start_date,
      endDate: goal.end_date,
      status: goal.status,
    });
    setIsEditing(true);
    setEditIndex(index);
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
          await axios.delete(`http://127.0.0.1:8000/api/performance-goals/${goals.id}/`, {
            headers: {
              Authorization: `Bearer ${authData.accessToken}`, // Use token from context
              "Content-Type": "application/json",
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
      <div className="main-wrapper">
        <Sidebarr />
        <div className="main-wrapper_n">
          <Nav_M />
          <div>
            <h5>{isEditing ? 'Edit Employee Task' : ' Task'}</h5>
            <form className="goal-form-m" onSubmit={handleSubmit}>
              <div className="form-row-m">
                <div className="form-group-m">
                  <label htmlFor="employee">Employee Name:</label>
                  <select
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an employee</option>
                    {employees.map((employee) => (
                      <option key={employee.employee_id} value={employee.employee_id}>
                        {employee.full_name} (ID: {employee.employee_id})
                      </option>
                    ))}
                  </select>





                </div>

                <div className="form-group-m">
                  <label>Task</label>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      // Check if value is within 1-10
                      if (value < 1 || value > 10) {
                        setError("Weightage must be between 1 and 10.");
                      } else {
                        setError(""); // Clear the error if within the range
                      }
                      handleInputChange(e); // Continue to update the formData
                    }}
                    min="1"
                    max="10"
                    className="input-feild-Man"
                    required
                  />
                  {error && <div className="error-message">{error}</div>}
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
                    <option value="Status">Status</option>
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
            <h5>Tasks List</h5>
            {goals.length > 0 ? (
              <table className="goals-table-m">
                <thead>
                  <tr>

                    <th>ID</th> {/* Display employee's ID */}
                   
                    <th>Description</th>
                    <th>Weightage</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Employee ID</th> {/* New Employee ID Column */} 
                    <th>Action</th> {/* Display employee's ID */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedGoals.map((goal, index) => {
                    // If employee_id is a number in one and string in the other, use == for comparison
                    const employee = employees.find(
                      (emp) => String(emp.employee_id) === String(goal.employee_id)
                    );
                    
                    return (
                      <tr key={goal.id}>

                        <td>{goal.id}</td>
                     
                        <td>{goal.description}</td>
                        <td>{goal.weightage}</td>
                        <td>{goal.start_date}</td>
                        <td>{goal.end_date}</td>
                        <td>{goal.status}</td>
                        <td>{goal.employee}</td> {/* Display Employee ID */}
                        <td className='action-button-m'>
                        <button onClick={() => handleEdit(index)} className="edit-btn-mm">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button onClick={() => handleDelete(index)} className="delete-btn-mm">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            ) : (
              <p>No Task set yet.</p>
            )}
           <div className="pagination-m">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1} // Disable Previous if already on the first page
    className="pagination-btn-m prev-next-btn"
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`pagination-btn-m ${currentPage === index + 1 ? 'active' : ''}`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages} // Disable Next if on the last page
    className="pagination-btn-m prev-next-btn"
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

export default GoalManagement;
