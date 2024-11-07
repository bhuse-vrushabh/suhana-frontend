import React, { useState } from "react";
import Swal from "sweetalert2";
import "../Manager/FeedBackForm_M.css";
import Sidebarr from "./Sidebarr";
import Nav_M from "./Nav_M";

function FeedBackForm_M() {
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const employees = [
    { id: 1, name: "Raj" },
    { id: 2, name: "Varad" },
    { id: 3, name: "Rohit" },
    { id: 4, name: "Shubham" }
  ];

  const departments = ["HR", "Finance", "Engineering", "Sales"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ employeeName, department, rating, feedback });
    
    Swal.fire({
      title: 'Success',
      text: 'Feedback submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    setEmployeeName("");
    setDepartment("");
    setRating("");
    setFeedback("");
  };

  return (
    <div>
    <div className="main-wrapper">
      <Sidebarr/>
      <div className="main-wrapper_n">
        <Nav_M/>
        <div className="manager-rating-container-Mger">
          <h3>Manager Feedback</h3>
          <form className="manager-rating-form-Mger" onSubmit={handleSubmit}>
            <div className="form-group-Mger">
              <label htmlFor="employeeName">Employee Name:</label>
              <select
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="">Select employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-Mger">
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
            </div>

            <div className="form-group-Mger">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
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
