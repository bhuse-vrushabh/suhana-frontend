import React, { useEffect, useState } from "react";
import './Admin_attendance.css';
import Sidebar from "./Sidebar_A";
import Nav from "./Nav";

const Admin_attendance = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Show 4 items per page

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/feedback/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTc0MTk2LCJpYXQiOjE3Mjk1ODIxOTYsImp0aSI6IjQ5YjEwNzdkZTI3MjRhZjViMjMyNjZjMWQ3NzVlNjAzIiwidXNlcl9pZCI6NX0.qVAJOCBhYdiHLIU0i4S5RXegi3XEf24xpjCqoP_laQM'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setFeedbackData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackData();
    }, []);

    // Pagination calculations
    const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = feedbackData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-container-fluid">
            <div className="admin-profile-info-row mb-1"></div>
            <div className="admin-wrapper">
                <Sidebar />
                <div className="admin-head mt-4" id="Admin_attendance">
                    <div className="Admin_attendance">
                        <h2 id="admin-management-title" className="text-center text-primary">Feedback</h2>

                        <div className="admin-feedback-section mt-4">
                            <h3 className="text-center mb-4 text-secondary">Feedback Details</h3>
                            <div className="admin-table-container">
                                <div className="feedback-card-container">
                                    {currentPageData.map((feedback, index) => (
                                        <div className="feedback-card shadow-sm p-4 mb-4 bg-white rounded" key={index}>
                                            <h4 className="text-info mb-3">{feedback.title}</h4>
                                            <div className="table">
                                                <div className="table-row">
                                                    <div className="table-header">Feedback</div>
                                                    <div className="table-data">{feedback.feedback_text}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-header">Feedback Type</div>
                                                    <div className="table-data">{feedback.feedback_type}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-header">Rating</div>
                                                    <div className="table-data">
                                                        <span>{feedback.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-header">Department</div>
                                                    <div className="table-data">{feedback.department}</div>
                                                </div>
                                                <div className="table-row">
                                                    <div className="table-header">Status</div>
                                                    <div className="table-data">{feedback.feedback_status}</div>
                                                </div>
                                                {feedback.response && (
                                                    <div className="table-row">
                                                        <div className="table-header">Response</div>
                                                        <div className="table-data">{feedback.response}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="admin-record-count mt-4 text-sm text-center text-muted">
                            Showing {currentPageData.length} of {feedbackData.length} records
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-controls mt-3 text-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="custom-btn"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`custom-btn ${currentPage === i + 1 ? 'active-page' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="custom-btn"
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

export default Admin_attendance;
