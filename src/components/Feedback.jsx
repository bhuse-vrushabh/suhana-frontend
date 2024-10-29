import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Feedback.css";
import Sidebarr from './Sidebarr';
import Nav from './Nav';

const A_feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk'; // replace with your actual token
        const response = await axios.get('http://127.0.0.1:8000/api/performance/employee-training/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("Feedback data received:", response.data); // Check the data received
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching data', error.response ? error.response.data : error.message);
        setError('Failed to fetch feedback data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  // Set itemsPerPage based on the currentPage
  const itemsPerPage = currentPage === 1 ? 1 : 2;
  const totalItems = feedbackData.length;
  const totalPages = Math.ceil((totalItems - 1) / itemsPerPage + 1);

  // Calculate items to display for the current page
  const getCurrentItems = () => {
    if (currentPage === 1) {
      return feedbackData.slice(0, 1);
    } else {
      const startIndex = 1 + (currentPage - 2) * itemsPerPage;
      return feedbackData.slice(startIndex, startIndex + itemsPerPage);
    }
  };

  const currentItems = getCurrentItems();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="main-wrapper">
        <Sidebarr />
        <div className="main-wrapper_n">
          <Nav />
          <div className="admin-head mt-4" id="Admin_attendance">
            <div className="Admin_attendance">
              <h2 className="admin-management-title">Feedback</h2>

              <div className="admin-feedback-section mt-4">
                <h3 className="text-center mb-4 text-secondary">Training Feedback Details</h3>
                <div className="admin-table-container">
                  {currentItems.length === 0 ? (
                    <p>No feedback data available</p>
                  ) : (
                    currentItems.map((feedback, index) => (
                      <div className="feedback-card shadow-sm p-4 mb-4 bg-white rounded" key={index}>
                        <h4 className="text-info mb-3">Training Feedback</h4>
                        <div className="table">
                          <div className="table-row">
                            <div className="table-header">Employee ID</div>
                            <div className="table-data">{feedback.employee}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-header">Training ID</div>
                            <div className="table-data">{feedback.training}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-header">Completion Status</div>
                            <div className="table-data">{feedback.completion_status}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-header">Feedback</div>
                            <div className="table-data">{feedback.feedback}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="pagination-controls mt-4 text-center">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>

              <div className="admin-record-count mt-4 text-sm text-center text-muted">
                Showing {currentItems.length} out of {feedbackData.length} training feedback entries.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A_feedback;
