import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios
import "./ManagerEvaluation.css";
import "./Sidebarr.css";
import Sidebarr from "./Sidebarr";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Nav_M from "./Nav_M";
import { AuthContext } from "../Component/AuthContext";

const ManagerEvaluation = () => {
  const { authData } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    employee: "",
    goal: "",
    goalDescription: "",
    self_rating: "",
    manager_rating: "",
    manager_feedback: "",
    final_rating: "",

    manager_id: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch employees data from API on component load
  // Fetch employees data with ID and name from API on component load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
          headers: { Authorization: `Bearer ${authData.accessToken}` },
        });
        console.log("Fetched Employees:", response.data); // Debug log
        setEmployees(response.data); // Ensure response data includes { id, name } for each employee
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [authData]);




  const handleEmployeeChange = async (e) => {
    const selectedEmployeeId = e.target.value;
    setNewEmployee((prev) => ({ ...prev, employee: selectedEmployeeId }));

    try {
      // Fetch goal data for selected employee
      const goalResponse = await axios.get(`http://127.0.0.1:8000/api/goals/`, {
        headers: { Authorization: `Bearer ${authData.accessToken}` },
      });

      const goalData = goalResponse.data.find(goal => goal.employee === parseInt(selectedEmployeeId));

      if (goalData) {
        setNewEmployee((prev) => ({
          ...prev,
          goal: goalData.description,  // Set the goal description
        }));

        // Fetch self-rating data for the selected employee
        const selfRatingResponse = await axios.get(`http://127.0.0.1:8000/api/evaluation/`, {
          headers: { Authorization: `Bearer ${authData.accessToken}` },
        });

        const selfRatingData = selfRatingResponse.data.find(rating => rating.employee === parseInt(selectedEmployeeId));

        if (selfRatingData) {
          console.log("Self-rating found:", selfRatingData.self_rating); // Confirm correct field
          setNewEmployee((prev) => ({
            ...prev,
            self_rating: selfRatingData.self_rating,  // Use self_rating field
          }));
        } else {
          console.log("Self-rating not found for employee ID:", selectedEmployeeId);
          setNewEmployee((prev) => ({ ...prev, self_rating: "" }));
        }
      } else {
        console.log("Goal not found for employee ID:", selectedEmployeeId);
      }
    } catch (error) {
      console.error("Error fetching goal or self-rating data:", error);
      Swal.fire("Error", "Failed to fetch goal or self-rating data. Please try again.", "error");
    }
  };


  // Handle input change
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => {
      const updatedEmployee = { ...prev, [name]: value };

      // Calculate the average for final_rating if both ratings are available
      if (updatedEmployee.self_rating && updatedEmployee.manager_rating) {
        updatedEmployee.final_rating = (
          (parseFloat(updatedEmployee.self_rating) + parseFloat(updatedEmployee.manager_rating)) / 2
        ).toFixed(2);
      }

      return updatedEmployee;
    });
  };
  const handleManagerRatingClick = (value) => {
    console.log("Star clicked:", value);  // Add a log to check if the function is triggered
    setNewEmployee((prev) => ({
      ...prev,
      manager_rating: value, // Set the manager rating to the clicked value
    }));
  };








  // Add or update employee evaluation
  const updateEmployeeEvaluation = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        manager_rating: newEmployee.manager_rating,
        manager_feedback: newEmployee.manager_feedback,
        final_rating: newEmployee.final_rating,  // Include final_rating in the payload
        status: newEmployee.status,
      };

      await axios.patch(`http://127.0.0.1:8000/api/evaluation/1/`, employeeData, {
        headers: { Authorization: `Bearer ${authData.accessToken}` },
      });

      Swal.fire("Updated!", "Evaluation has been updated successfully!", "success");
      resetForm();
    } catch (error) {
      console.error("Error saving evaluation:", error);
      Swal.fire("Error", "Failed to save evaluation. Please try again.", "error");
    }
  };

  // Reset form
  const resetForm = () => {
    setNewEmployee({
      id: null,
      employee: "",
      goal: "",
      goalDescription: "",
      self_rating: "",
      manager_rating: "",
      manager_feedback: "",
      final_rating: "",

      manager_id: "",
    });
    setEditMode(false);
  };





  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M />

        <div>
          <div className="card-header">
            <h2>{editMode ? "Edit Evaluation" : " Evaluation"}</h2>
          </div>
          <div className="card-M">
            <form onSubmit={updateEmployeeEvaluation}>
              <div className="form-row_m three-column">

                <div className="form-group_m">
                  <label>Employee Name:</label>
                  <select name="employee" value={newEmployee.employee} onChange={handleEmployeeChange} required className="input-field_m">
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {emp.employee_id} - {emp.full_name} {/* Display employee ID with full name */}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="form-group_m">

                  <label>Goal Description:</label>
                  <input
                    type="text"
                    name="goal"
                    value={newEmployee.goal}
                    readOnly
                    className="input-field_m"
                    required
                  />

                </div>

                <div className="form-group_m">
                  <label>Self Rating:</label>
                  <input
                    type="text"
                    name="self_rating"
                    value={newEmployee.self_rating}
                    readOnly
                    className="input-field_m"
                    required
                  />


                </div>
              </div>

              {/* Second row: Manager Rating, Manager Feedback, Final Rating */}
              <div className="form-row_m three-column">
                <div className="form-group_m">
                  <label>Manager Rating:</label>

                  <div className="m_star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleManagerRatingClick(star)}
                        className={star <= newEmployee.manager_rating ? "m_star filled" : "m_star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>

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

              {/* <div className="form-group_m">
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
              </div> */}

              <div className="button-container_m">
                <button type="submit" className="manager-submit-button_m">
                  {editMode ? "Update Evaluation" : "Submit"}
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
                    <th>Manager Rating</th>
                    <th>Manager Feedback</th>
                    <th>Final Rating</th>
                    <th>Status</th>
                    <th>Goal Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>{employee.employee}</td>
                      <td>{employee.self_rating}</td>
                      <td>{employee.manager_rating}</td>
                      <td>{employee.manager_feedback}</td>
                      <td>{employee.final_rating}</td>
                      <td>{employee.status}</td>
                      <td>{employee.goal}</td>
                      <td>

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
