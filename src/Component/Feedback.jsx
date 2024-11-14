import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';
import swal from 'sweetalert2';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
 
const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('employee');
  const [selectedManager, setSelectedManager] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [managers, setManagers] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
 
  // Fetch managers list on component mount
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list_managers/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setManagers(response.data.managers);
      } catch (error) {
        console.error("Error fetching managers:", error);
        swal.fire({
          icon: 'error',
          title: 'Failed to Load Managers',
          text: 'There was an error loading the managers list. Please try again later.',
        });
      }
    };
    fetchManagers();
  }, [accessToken]);
 
  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackContent || !overallRating) {
      swal.fire({
        icon: 'error',
        title: 'Incomplete Submission',
        text: 'Please complete all required fields.',
      });
      return;
    }
 
    const payload = {
      feedback_type: feedbackType === 'employee' ? 'Self Feedback' : 'Manager Feedback',
      feedback_text: feedbackContent,
      rating: parseInt(overallRating),
      ...(feedbackType === 'manager' && { to_user_id: selectedManager }),
    };
 
    try {
      await axios.post('http://127.0.0.1:8000/api/employeetomanager_feedback/', payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      swal.fire({
        icon: 'success',
        title: 'Feedback Submitted',
        text: 'Your feedback has been successfully submitted!',
        timer: 1500,
      });
      // Reset form on successful submission
      setFeedbackContent('');
      setOverallRating(0);
      setSelectedManager('');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your feedback. Please try again later.',
      });
    }
  };
 
  // Handle star rating click
  const handleStarClick = (rating) => {
    setOverallRating(rating);
  };
 
  return (
    <div className='feedback-page'>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="review-feedback-page">
          <h1 className="feedback-title">Feedback Form</h1>
          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Feedback Type Selection */}
            <div className="form-group">
              <label htmlFor="feedbackTypeSelect">Select Feedback Type:</label>
              <select
                id="feedbackTypeSelect"
                value={feedbackType}
                onChange={(e) => {
                  setFeedbackType(e.target.value);
                  setFeedbackContent('');
                  setOverallRating(0);
                  setSelectedManager('');
                }}
                required
                className="select"
              >
                <option value="employee">Self Feedback</option>
                <option value="manager">Manager Feedback</option>
              </select>
            </div>
 
            {/* Conditional Feedback Content for Employee Feedback */}
            {feedbackType === 'employee' && (
              <div className="form-group">
                <label htmlFor="feedbackContent">Feedback:</label>
                <textarea
                  id="feedbackContent"
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  placeholder="Provide your feedback..."
                  required
                  className="textarea"
                />
              </div>
            )}
 
            {/* Conditional Manager Selection and Feedback Content for Manager Feedback */}
            {feedbackType === 'manager' && (
              <>
                <div className="form-group">
                  <label htmlFor="managerSelect">Select Manager:</label>
                  <select
                    id="managerSelect"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    required
                    className="select"
                  >
                    <option value="" disabled>Select a manager</option>
                    {managers.map((manager) => (
                      <option key={manager.user_id} value={manager.user_id}>
                        {manager.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="feedbackContent">Feedback:</label>
                  <textarea
                    id="feedbackContent"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                    className="textarea"
                  />
                </div>
              </>
            )}
 
            {/* Star Rating Component */}
            <div className="form-group">
              <label>Overall Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={star <= overallRating ? 'star filled' : 'star'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
 
            {/* Submit Button */}
            <div className='button-container'>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default Feedback;
 
 
 
 