// import React, { useState } from 'react';
// import A_FeedbackForm from './A_FeedbackForm';
// import ReviewList from './ReviewList';
// import Sidebar from "./Sidebar";
//  import Nav from "./Nav";

// const A_feedback = () => {
//   const [reviews, setReviews] = useState([]);

//   const addReview = (review) => {
//     setReviews((prevReviews) => [...prevReviews, review]);
//   };

//   return (
//     <div>

//             <div className="container-fluid">
//               <div className="row Profile_info_row mb-1"></div> 
//               <Nav/>
//        </div>
//        <div className="wrapper">
//       <Sidebar />
//     <div className="feedback-page">
//       <h1>Feedback and Reviews</h1>
//       <A_FeedbackForm addReview={addReview} />
//       <ReviewList reviews={reviews} />
//     </div>
//     </div></div>
//   );
// };

// export default A_feedback;

//----------------------i have remove or chages the colleagues to employee so consider as colleagues is a employee


import React, { useState, useEffect, useContext } from 'react';
import './FeedbackPage.css';
import Sidebar from "./Sidebar_A";
import Nav from "./Nav";
import axios from 'axios';
import { AuthContext } from "../Component/AuthContext";


const A_feedback = () => {
  const { authData } = useContext(AuthContext);
  console.log("this is the data passed through context", authData)
  const [role, setRole] = useState('colleagues'); // State to track the selected role
  const [colleagueFeedback, setColleagueFeedback] = useState('');
  const [managerFeedback, setManagerFeedback] = useState('');
  const [directReportsFeedback, setDirectReportsFeedback] = useState('');
  const [managerdirectReportsFeedback, setManagerDirectReportsFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [manageranonymous, setManagerAnonymous] = useState(false);
  const [overallReview, setOverallReview] = useState('');
  const [manageroverallReview, setManagerOverallReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const [selectedOptionEmp, setSelectedOptionEmp] = useState('');
  const handleChangeEMP = (event) => {
    setSelectedOptionEmp(event.target.value);
  };

  const [overallRatingEMP, setOverallRatingEMP] = useState(0);
  const handleStarClickEMP = (rating) => {
    setOverallRatingEMP(rating);
  };




  // this function used for selcting the manager option
  const [selectedOptionManager, setSelectedOptionManager] = useState('');
  const handleChangeManager = (event) => {
    setSelectedOptionManager(event.target.value);
  };
  // this function used for selcting the employee start rating
  const [overallRatingManager, setOverallRatingManager] = useState(0) // State for self-rating
  const handleStarClickManager = (rating) => {
    setOverallRatingManager(rating);
  };


  // this api is for empoyee list 
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
        console.log("API response for employees:", response.data); // Log the API respons
        if (response.status === 200) {
          setEmployees(response.data); // Assuming the response is an array of employees
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);



  // this api for manager get list

  const [manager, setManager] = useState([]);
  useEffect(() => {
    const fetchmanager = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/manager_profile/', {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
            "Content-Type": "application/json",
          },
        });
        console.log("API response for employees:", response.data); // Log the API respons
        if (response.status === 200) {
          setManager(response.data); // Assuming the response is an array of employees
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchmanager();
  }, []);


  return (
    <div className='feedback-page'>
      <div className="container-fluid">
        <div className="row Profile_info_row mb-1"></div>
      </div>
      <div className="wrapper">
        <Sidebar />

        <div className="A-review-feedback-page" id="unique-review-feedback-page">
          <h1 id="unique-feedback-title">Employee Feedback</h1>

          {/* Radio buttons to select role */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label>
              <input
                type="radio"
                name="role"
                value="colleagues"
                checked={role === 'colleagues'}
                onChange={() => setRole('colleagues')}
              />
              Employee
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="manager"
                checked={role === 'manager'}
                onChange={() => setRole('manager')}
              />
              Manager
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Conditionally render fields based on selected role */}
            {role === 'colleagues' && (
              <>
                <div className="form-group_A" id="unique-colleague-feedback">
                  <label htmlFor="colleagueFeedback">Feedback for Employee:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                    <div>
                      <select id="options"
                        value={selectedOptionEmp}
                        onChange={handleChangeEMP}
                        className="select_elp_A"
                      >
                        <option value="">Select an Employee</option>
                        {employees.map((employee) => (
                          <option key={employee.employee_id} value={employee.employee_id}>
                            {employee.employee_id} - {employee.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label>Rating:</label>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClickEMP(star)}
                          className={star <= overallRatingEMP ? 'star filled' : 'star'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <textarea
                    id="colleagueFeedback"
                    value={colleagueFeedback}
                    onChange={(e) => setColleagueFeedback(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                  />
                </div>

                <div className="form-group_A" id="unique-direct-reports-feedback">
                  <label htmlFor="directReportsFeedback">Feedback for Direct Reports:</label>
                  <textarea
                    id="directReportsFeedback"
                    value={directReportsFeedback}
                    onChange={(e) => setDirectReportsFeedback(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                  />
                </div>

                {/* <div className="form-group_A" id="unique-anonymous-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className='Acheckbox'
                    />
                    Submit anonymously
                  </label>
                </div> */}

                <div className="form-group_A" id="unique-overall-review">
                  <label htmlFor="overallReview">Overall Review:</label>
                  <textarea
                    id="overallReview"
                    value={overallReview}
                    onChange={(e) => setOverallReview(e.target.value)}
                    placeholder="Provide your overall review..."
                    required
                  />
                </div>
              </>
            )}

            {/* This field is displayed only for the "Manager" role */}
            {role === 'manager' && (
              <>
                <div className="form-group_A" id="unique-colleague-feedback">
                  <label htmlFor="colleagueFeedback">Feedback for Manager:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                    <div>
                    <select id="options"
                        value={selectedOptionManager}
                        onChange={handleChangeEMP}
                        className="select_elp_A"
                      >
                        <option value="">Select an manager</option>
                        {manager.map((manager) => (
                          <option key={manager.manager_id} value={manager.manager_id}>
                            {manager.manager_id} - {manager.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label>Rating:</label>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClickManager(star)}
                          className={star <= overallRatingManager ? 'star filled' : 'star'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <textarea
                    id="managerFeedback"
                    value={managerFeedback}
                    onChange={(e) => setManagerFeedback(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                  />
                </div>



                <div className="form-group_A" id="unique-direct-reports-feedback">
                  <label htmlFor="directReportsFeedback">Feedback for Direct Reports:</label>
                  <textarea
                    id="directReportsFeedback"
                    value={managerdirectReportsFeedback}
                    onChange={(e) => setManagerDirectReportsFeedback(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                  />
                </div>

                {/* <div className="form-group_A" id="unique-anonymous-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={manageranonymous}
                      onChange={(e) => setManagerAnonymous(e.target.checked)}
                      className='Acheckbox'
                    />
                    Submit anonymously
                  </label>
                </div> */}

                <div className="form-group_A" id="unique-overall-review">
                  <label htmlFor="overallReview">Overall Review:</label>
                  <textarea
                    id="overallReview"
                    value={manageroverallReview}
                    onChange={(e) => setManagerOverallReview(e.target.value)}
                    placeholder="Provide your overall review..."
                    required
                  />
                </div>
              </>
            )}

            <div className='feedBackbutton'>
              <button type="submit" id="unique-submit-button">Submit Review</button>
            </div>
          </form>

          {submitted && <p className="success-message" id="unique-success-message">Thank you for your feedback!</p>}
        </div>
      </div>
    </div>
  );
};

export default A_feedback;
