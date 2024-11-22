import React, { useEffect, useState, useContext } from "react";
import "./Admin_attendance.css";
import Sidebar from "./Sidebar_A"; // Assuming Sidebar component exists
import { AuthContext } from "../Component/AuthContext";

const AdminAttendance = () => {
    const { authData } = useContext(AuthContext);
    const [feedbackData, setFeedbackData] = useState({ managerFeedback: [], employeeFeedback: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const feedbackPerPage = 2; // Number of feedbacks to show per category per page

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/manager_employee_feedback/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authData.accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch feedback data");
                }

                const data = await response.json();
                const managerFeedback = data.manager_feedback_to_emp.map(item => ({
                    rating: item.rating,
                    feedback: item.feedback,
                    employee_name: item.employee_name,
                    manager_name: item.manager_name,
                }));

                const employeeFeedback = data.emp_to_manager_feedback.map(item => ({
                    feedback_text: item.feedback_text,
                    rating: item.rating,
                    employee_name: item.employee_name,
                    manager_name: item.manager_name,
                }));

                setFeedbackData({ managerFeedback, employeeFeedback });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackData();
    }, [authData]);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        const totalPages = Math.ceil(
            Math.max(feedbackData.managerFeedback.length, feedbackData.employeeFeedback.length) / feedbackPerPage
        );
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const paginateFeedback = (feedbackArray) => {
        const startIndex = (currentPage - 1) * feedbackPerPage;
        const endIndex = startIndex + feedbackPerPage;
        return feedbackArray.slice(startIndex, endIndex);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-container-fluid">
            <div className="admin-wrapper">
                <Sidebar />
                <div className="admin-head" id="Admin_attendance">
                    <h1 id="admin-management-title">Feedback Management</h1>

                    <div className="feedback-section">
                        <h3 style={{ color: "#F3741E" }} className="text-center">
                            Manager Feedback to Employees
                        </h3>

                        <div className="feedback-card-container">
                            {paginateFeedback(feedbackData.managerFeedback).map((item, index) => (
                                <div key={index} className="feedback-card">
                                    <p><strong>Manager:</strong> {item.manager_name}</p>
                                    <p><strong>Employee:</strong> {item.employee_name}</p>
                                    <p><strong>Feedback:</strong> {item.feedback}</p>
                                    <p className="rating-badge rating-5">
                                        <strong>Rating:</strong> {item.rating}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h3 style={{ color: "#F3741E" }} className="text-center">
                        Employees Feedback to Manager
                        </h3>

                        <div className="feedback-card-container">
                            {paginateFeedback(feedbackData.employeeFeedback).map((item, index) => (
                                <div key={index} className="feedback-card">
                                    <p><strong>Employee:</strong> {item.employee_name}</p>
                                    <p><strong>Manager:</strong> {item.manager_name}</p>
                                    <p><strong>Feedback:</strong> {item.feedback_text}</p>
                                    <p className="rating-badge rating-5">
                                        <strong>Rating:</strong> {item.rating}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pagination-controls">
                        <button className="custom-btn" onClick={handlePrevious} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span className="current-page">Page {currentPage}</span>
                        <button
                            className="custom-btn"
                            onClick={handleNext}
                            disabled={
                                currentPage >=
                                Math.ceil(
                                    Math.max(feedbackData.managerFeedback.length, feedbackData.employeeFeedback.length) /
                                    feedbackPerPage
                                )
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAttendance;
