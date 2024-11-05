import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./ManagerEvaluation.css";
import "./Sidebarr.css";
import Sidebarr from "./Sidebarr";

import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Nav from "./Nav";

const ManagerEvaluation = () => {
  const employeeList = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 }
  ];

  const staticTask = "Complete Training Module";
  const staticSelfRating = 4.5; // Default self-rating

  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    employee: employeeList[0].id,  // Employee ID
    self_rating: staticSelfRating,  // Default self-rating
    task: staticTask,               // Task description
    manager_rating: 0,              // Manager rating input
    manager_feedback: "",           // Manager feedback input
    final_rating: 4.3,              // Final rating (can be dynamically set)
    status: "Draft",                // Default status
    goal: 8,                        // Goal ID (hardcoded or dynamically set)
  });

  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [feedbackError, setFeedbackError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [showTable, setShowTable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });

    if (name === "manager_rating") {
      setRatingError("");
    }
    if (name === "manager_feedback") {
      setFeedbackError("");
    }
  };

  const addOrUpdateEmployee = async (e) => {
    e.preventDefault();

    const managerRating = newEmployee.manager_rating;
    if (!/^[1-5]$/.test(managerRating)) {
      setRatingError("Manager Rating must be a number between 1 and 5.");
      return;
    } else {
      setRatingError("");
    }

    const employeeData = {
      employee: newEmployee.employee,            // Employee ID
      self_rating: newEmployee.self_rating,      // Self Rating
      task: newEmployee.task,                    // Task
      manager_rating: newEmployee.manager_rating, // Manager Rating
      manager_feedback: newEmployee.manager_feedback, // Feedback
      final_rating: newEmployee.final_rating,    // Final rating
      status: newEmployee.status,                // Status
      goal: newEmployee.goal,                    // Goal ID
    };

    console.log("Payload being sent:", employeeData);

    try {
      let response;
      if (editMode) {
        const evaluationId = employees[editIndex].id;
        response = await axios.put(`http://127.0.0.1:8000/api/performance/evaluations/6/`, employeeData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Update with a valid token
          },
        });
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/performance/evaluations/', employeeData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`, // Update with a valid token
          },
        });
      }

      // Update employees list
      const updatedEmployees = editMode
        ? employees.map((emp, i) => (i === editIndex ? response.data : emp))
        : [...employees, response.data];

      setEmployees(updatedEmployees);
      setShowTable(true);

      Swal.fire({
        icon: 'success',
        title: `Evaluation ${editMode ? 'updated' : 'added'} successfully!`,
        timer: 3000,
        showConfirmButton: false
      });
      resetForm();
    } catch (error) {
      console.error("Error adding or updating evaluation:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to ${editMode ? 'update' : 'add'} evaluation. Please try again. Details: ${error.response ? error.response.data : 'unknown error'}`,
      });
    }
  };

  const resetForm = () => {
    setNewEmployee({
      employee: employeeList[0].id,
      self_rating: staticSelfRating,
      task: staticTask,
      manager_rating: 0,
      manager_feedback: "",
      final_rating: 4.3,
      status: "Draft",
      goal: 8,
    });
    setEditIndex(null);
    setEditMode(false);
    setFeedbackError("");
    setRatingError("");
  };

  const handleEdit = (index) => {
    const employee = employees[index];
    setNewEmployee({
      employee: employee.employee,
      self_rating: employee.self_rating,
      task: employee.task,
      manager_rating: employee.manager_rating,
      manager_feedback: employee.manager_feedback,
      final_rating: employee.final_rating,
      status: employee.status,
      goal: employee.goal,
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
     <Nav/>

        <div>
          <div className="card-header">
            <h2>{editMode ? "Edit Evaluation" : "Add Evaluation"}</h2>
          </div>
          <div className="card">
            <form onSubmit={addOrUpdateEmployee}>
              <div className="form-row_m three-column">
                <div className="form-group_m">
                  <label>Employee ID:</label>
                  <select
                    name="employee"
                    value={newEmployee.employee}
                    onChange={handleInputChange}
                    className="input-field_m"
                  >
                    {employeeList.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group_m">
                  <label>Task:</label>
                  <input
                    type="text"
                    name="task"
                    value={newEmployee.task}
                    readOnly
                    className="input-field_m"
                  />
                </div>

                <div className="form-group_m">
                  <label>Self Rating:</label>
                  <input
                    type="number"
                    name="self_rating"
                    value={newEmployee.self_rating}
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
                  <option value="Draft">Draft</option>
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
