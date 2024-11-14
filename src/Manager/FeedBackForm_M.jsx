import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import "../Manager/FeedBackForm_M.css";
import Sidebarr from "./Sidebarr";
import Nav_M from "./Nav_M";
import axios from "axios";
import { AuthContext } from "../Component/AuthContext";
function FeedBackForm_M() {
  const { authData } = useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setEmployees(response.data); // Assuming the response is an array of employees
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);
  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the following data:", { emp_id: employeeId, rating, emp_feedback: feedback });
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/manager_feedback/',
        {
          emp_id: employeeId,
          rating: parseInt(rating), // convert rating to integer if needed
          emp_feedback: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Feedback submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset form fields after successful submission
        setEmployeeId("");
        setRating("");
        setFeedback("");
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error submitting feedback. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <div className="main-wrapper">
        <Sidebarr />
        <div className="main-wrapper_n">
          <Nav_M />
          <div className="manager-rating-container-Mger">
            <h3>Manager Feedback</h3>
            <form className="manager-rating-form-Mger" onSubmit={handleSubmit}>

              <div className="form-group-Mger">
                <label htmlFor="employeeName">Employee Name:</label>
                <select
                  id="employeeName"
                  value={employeeName}
                  onChange={(e) => {
                    const selectedEmployee = e.target.value;
                    const selectedEmployeeData = employees.find(
                      (emp) => emp.full_name === selectedEmployee
                    );
                    setEmployeeName(selectedEmployee);
                    setEmployeeId(selectedEmployeeData ? selectedEmployeeData.employee_id : "");
                  }}
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map((employee) => (
                    <option key={employee.employee_id} value={employee.full_name}>
                      {employee.full_name} (ID: {employee.employee_id})
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="form-group-Mger">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div> */}

              <div className="form-group-Mger">
                <label htmlFor="rating">Rating:</label>
                <div className="Mger-star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className={star <= rating ? 'Mger-star-filled' : 'Mger-star'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group-Mger">
                <label htmlFor="feedback">Feedback:</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback here"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button-Mger">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBackForm_M;
