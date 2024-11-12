import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./ManagerEvaluation.css";
import "./Sidebarr.css";
import Sidebarr from "./Sidebarr";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Nav_M from "./Nav_M";


const ManagerEvaluation = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    employee_id: "",
    employee_name: "",
    task_id: "",
    self_rating_id: "",
    manager_rating: 0,
    manager_feedback: "",
    final_rating: 0,
    status: " ",
    goal: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [ratingError, setRatingError] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [feedbackError, setFeedbackError] = useState(""); 
  const [selectedId, setSelectedId] = useState('');
  

  // Fetch employee evaluations on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/evaluation/', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNjM3MDMzLCJpYXQiOjE3MzEwNDUwMzMsImp0aSI6IjA3NzVjMTNhYjVkMzQ3ZjliZTA4NTQxYWIzZTI1YjlhIiwidXNlcl9pZCI6MjB9.BmW1THMSbg6KcBK86Ov9y5u1OKAsRBNmz7DKCH1lJ58`,
          },
        });
        if (response.status === 200) {
          setEmployees(response.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const calculateFinalRating = (managerRating, selfRating) => {
    return (managerRating + selfRating) / 2;
  };

  // Handle input changes, and fetch task and self-rating on employee selection
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });

      // Validate feedback input
  const validateFeedback = (feedback) => {
    if (!feedback || feedback.trim().length < 5) {
      setFeedbackError("Feedback should be at least 5 characters long.");
    } else {
      setFeedbackError(""); // Clear the error if valid
    }
  };

    // Fetch employee details based on selected employee_id
    if (name === "employee_id" && value) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/evaluation/`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNjM3MDMzLCJpYXQiOjE3MzEwNDUwMzMsImp0aSI6IjA3NzVjMTNhYjVkMzQ3ZjliZTA4NTQxYWIzZTI1YjlhIiwidXNlcl9pZCI6MjB9.BmW1THMSbg6KcBK86Ov9y5u1OKAsRBNmz7DKCH1lJ58`,
          },
        });
        if (response.status === 200) {
          const selectedEmployee = response.data;
          setNewEmployee((prev) => ({
            ...prev,
            employee_name: selectedEmployee.name,  // Assuming employee has name field
            task_id: selectedEmployee.task_id,
            self_rating_id: selectedEmployee.self_rating_id,
            goal: selectedEmployee.goal,
            manager_rating: selectedEmployee.manager_rating,
            manager_feedback: selectedEmployee.manager_feedback,
            status: selectedEmployee.status,
          }));

          // Fetch task details based on task_id if needed
          const taskResponse = await axios.get(`http://127.0.0.1:8000/api/evaluation/`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNjM3MDMzLCJpYXQiOjE3MzEwNDUwMzMsImp0aSI6IjA3NzVjMTNhYjVkMzQ3ZjliZTA4NTQxYWIzZTI1YjlhIiwidXNlcl9pZCI6MjB9.BmW1THMSbg6KcBK86Ov9y5u1OKAsRBNmz7DKCH1lJ58`,
            },
          });
          if (taskResponse.status === 200) {
            setTasks(taskResponse.data); // Task data
          }
        }
      } catch (error) {
        console.error("Error fetching task and self-rating:", error);
      }
    }
  };

  // Add or update employee evaluation
  const addOrUpdateEmployee = async (e) => {
    e.preventDefault();

    // Validation for manager_rating
    if (!/^[1-5]$/.test(newEmployee.manager_rating)) {
      setRatingError("Manager Rating must be a number between 1 and 5.");
      return;
    } else setRatingError("");

    const employeeData = {
      manager_rating: newEmployee.manager_rating,
      manager_feedback: newEmployee.manager_feedback,
      status: newEmployee.status,
    };

    try {
      let response;
      if (editMode) {
        response = await axios.patch(`http://127.0.0.1:8000/api/evaluation/2/`, employeeData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNjM3MDMzLCJpYXQiOjE3MzEwNDUwMzMsImp0aSI6IjA3NzVjMTNhYjVkMzQ3ZjliZTA4NTQxYWIzZTI1YjlhIiwidXNlcl9pZCI6MjB9.BmW1THMSbg6KcBK86Ov9y5u1OKAsRBNmz7DKCH1lJ58`,
          },
        });
      } 
      

      const updatedEmployees = editMode
        ? employees.map((emp) => (emp.id === newEmployee.employee_id ? response.data : emp))
        : [...employees, response.data];

      setEmployees(updatedEmployees);
      setShowTable(true);

      Swal.fire({
        icon: 'success',
        title: `Evaluation ${editMode ? 'updated' : 'added'} successfully!`,
        timer: 3000,
        showConfirmButton: false,
      });
      resetForm();
    } catch (error) {
      console.error("Error adding or updating evaluation:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to ${editMode ? 'update' : 'add'} evaluation. Please try again.`,
      });
    }
  };

  // Reset form state
  const resetForm = () => {
    setNewEmployee({
      employee_id: "",
      employee_name: "",
      task_id: "",
      self_rating_id: "",
      manager_rating: 0,
      manager_feedback: "",
      final_rating: "",
      status: " ",
      goal: "",
    });
    setEditIndex(null);
    setEditMode(false);
    setRatingError("");
  };
  const handleEdit = (index) => {
    const employee = employees[index];
    setNewEmployee({
      ...employee,
      final_rating: calculateFinalRating(employee.self_rating, employee.manager_rating),
    });
    setEditMode(true);
    setEditIndex(index);
  };
 
 
  const handleDelete = async (index) => {
    const evaluationId = employees[index].id;
 
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request
          await axios.delete(`http://127.0.0.1:8000/api/performance/evaluations/2/`, {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Add token to Authorization header
            },
          });
 
          const updatedEmployees = employees.filter((_, i) => i !== index);
          setEmployees(updatedEmployees);
          if (updatedEmployees.length === 0) {
            setShowTable(false);
          }
 
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Evaluation has been deleted.',
            timer: 3000,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete evaluation. Please try again.',
          });
        }
      }
    });
  };
  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M />

        <div>
          <div className="card-header">
            <h2>{editMode ? "Edit Evaluation" : "Add Evaluation"}</h2>
          </div>
          <div className="card-M">
            <form onSubmit={addOrUpdateEmployee}>
              <div className="form-row_m three-column">
                <div className="form-group_m">
                  <label>Employee:</label>
                  <select
                    name="employee_id"
                    value={newEmployee.employee_id}
                    onChange={handleInputChange}
                    className="input-field_m"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        ID: {employee.id} 
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group_m">
                  <label>Employee Name:</label>
                  <input
                    type="text"
                    name="employee_name"
                    value={newEmployee.employee_name}
                    readOnly
                    className="input-field_m"
                  />
                </div>
                <div className="form-group_m">
                  <label>Task:</label>
                  <select
                    name="task_id"
                    value={newEmployee.task_id}
                    onChange={handleInputChange}
                    className="input-field_m"
                  >
                    <option value="">Select Task</option>
                    {tasks && tasks.length > 0 ? (  // Check if tasks is defined and has length
                      tasks.map((goal) => (
                        <option key={goal.id} value={goal.id}>
                          {goal.description} {/* Assuming each task has a description */}
                        </option>
                      ))
                    ) : (
                      <option value="">No tasks available</option>
                    )}
                  </select>

                </div>

                <div className="form-group_m">
                  <label>Self Rating:</label>
                  <input
                    type="number"
                    name="self_rating"
                    value={newEmployee.self_rating_id ? `Self Rating ID: ${newEmployee.self_rating_id}` : ""}
                    readOnly
                    className="input-field_m"
                  />
                </div>
              </div>

              {/* Second row: Manager Rating, Manager Feedback, Final Rating */}
              <div className="form-row_m three-column">
                <div className="form-group_m">
                  <label>Manager Rating:</label>
                  <input
                    type="number"
                    name="manager_rating"
                    value={newEmployee.manager_rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="input-field_m"
                    required
                  />
                  {ratingError && <div className="error-message">{ratingError}</div>}
                </div>

                <div className="form-group_m">
                  <label>Manager Feedback:</label>
                  <input
                    type="text"
                    name="manager_feedback"
                    value={newEmployee.manager_feedback}
                    onChange={handleInputChange}
                    className="input-field_m"
                  />
                  {feedbackError && <div className="error-message">{feedbackError}</div>}
                </div>

                <div className="form-group_m">
                  <label>Final Rating:</label>
                  <input
                    type="number"
                    name="final_rating"
                    value={newEmployee.final_rating}
                    readOnly
                    className="input-field_m"
                  />
                </div>
              </div>

              <div className="form-group_m">
                <label>Status:</label>
                <select
                  name="status"
                  value={newEmployee.status}
                  onChange={handleInputChange}
                  className="input-field_m"
                >
                  <option value="pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="button-container_m">
                <button type="submit" className="manager-submit-button_m">
                  {editMode ? "Update Evaluation" : "Add Evaluation"}
                </button>

              </div>
            </form>
          </div>

          {showTable && (
            <div>
              <h2>Goal Evaluations</h2>
              <table className="evaluation-table_m">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Employee ID</th>
                    <th>Self Rating</th>
                    <th>Task</th>
                    <th>Manager Rating</th>
                    <th>Manager Feedback</th>
                    <th>Final Rating</th>
                    <th>Status</th>
                    <th>Goal ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.employee}</td> {/* Employee ID */}
                      <td>{employee.self_rating}</td>
                      <td>{employee.task}</td>
                      <td>{employee.manager_rating}</td>
                      <td>{employee.manager_feedback}</td>
                      <td>{employee.final_rating}</td>
                      <td>{employee.status}</td>
                      <td>{employee.goal}</td>
                      <td className="actions-cell_m">
                        <button className="edit-btn_m" onClick={() => handleEdit(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="delete-btn_m" onClick={() => handleDelete(index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerEvaluation;
