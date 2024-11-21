import React, { useState, useEffect, useContext } from 'react';
import Sidebarr from './Sidebarr';

import "./Sidebarr";
import "./Training.css";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios from 'axios';
import Nav_M from './Nav_M';
import { AuthContext } from "../Component/AuthContext";

function TrainingDevelopmentPage() {
    const { authData } = useContext(AuthContext);
    console.log("this is the data passed through context", authData)
    const [programs] = useState([
        { id: 1, name: 'Leadership Training', duration: '5 days', description: 'Developing leadership skills', trainer: 'Niranjan Navale', startDate: '2024-10-15', endDate: '2024-10-19' },
        { id: 2, name: 'Team Management', duration: '3 days', description: 'Effective team management strategies', trainer: 'Rohan Joshi', startDate: '2024-11-01', endDate: '2024-11-03' },
        { id: 3, name: 'Communication Skills Workshop', duration: '2 days', description: 'Improving communication techniques', trainer: 'Priya Mehta', startDate: '2024-11-10', endDate: '2024-11-12' },
        { id: 4, name: 'Time Management', duration: '1 day', description: 'Maximizing productivity and efficiency', trainer: 'Amit Kumar', startDate: '2024-11-20', endDate: '2024-11-20' },
        { id: 5, name: 'Conflict Resolution Strategies', duration: '3 days', description: 'Techniques to resolve workplace conflicts', trainer: 'Sanjay Sharma', startDate: '2024-11-25', endDate: '2024-11-27' },
        { id: 6, name: 'Project Management Essentials', duration: '4 days', description: 'Fundamentals of project management', trainer: 'Simran Kaur', startDate: '2024-12-01', endDate: '2024-12-04' },
        { id: 7, name: 'Agile Methodologies Training', duration: '2 days', description: 'Mastering Agile techniques', trainer: 'Arjun Patel', startDate: '2024-12-05', endDate: '2024-12-06' },
        { id: 8, name: 'Customer Service Excellence', duration: '1 day', description: 'Improving customer interactions', trainer: 'Meera Singh', startDate: '2024-12-10', endDate: '2024-12-10' },
        { id: 9, name: 'Digital Marketing Bootcamp', duration: '6 days', description: 'Digital marketing strategies and tools', trainer: 'Ravi Gupta', startDate: '2024-12-12', endDate: '2024-12-17' },
        { id: 10, name: 'Financial Literacy for Employees', duration: '3 days', description: 'Understanding personal and business finance', trainer: 'Ayesha Khan', startDate: '2024-12-18', endDate: '2024-12-20' },
    ]);




    const [employees, setEmployees] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [formData, setFormData] = useState({
        selectedEmployee: '',
        selectedProgram: '',
        selectedStartDate: '',
        selectedEndDate: '',
        description: '',
        status: '',
        editingIndex: null,
    });
    const [dateError, setDateError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10; // Show 10 entries per page
    // Fetch employee data from the API

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
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/training/', {
                    headers: {
                        Authorization: `Bearer ${authData.accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    setAssignments(response.data);
                }
            } catch (error) {
                console.error('Error fetching training assignments:', error);
            }
        };

        fetchEmployees();
        fetchAssignments();
    }, [authData]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'selectedStartDate' || name === 'selectedEndDate') {
            setDateError('');
        }
    };

    const handleAssignProgram = async (e) => {
        e.preventDefault();
        const { selectedEmployee, selectedProgram, selectedStartDate, selectedEndDate, description, status, editingIndex } = formData;

        const today = new Date();
        const startDate = new Date(selectedStartDate);
        const endDate = new Date(selectedEndDate);

        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (startDate < today) {
            setDateError("Start Date must be today or later.");
            return;
        }

        if (endDate < today) {
            setDateError("End Date must be today or later.");
            return;
        }

        if (startDate > endDate) {
            setDateError("End Date must be after Start Date.");
            return;
        }

        if (selectedEmployee && selectedProgram && selectedStartDate && selectedEndDate && description) {
            const program = programs.find(prog => prog.id === parseInt(selectedProgram));


            const assignmentPayload = {
                selectedEmployee, // This should be the employee `id`
                name: program.name,
                description,
                start_date: selectedStartDate,
                end_date: selectedEndDate,
                status,
            };

            try {
                let response;
                if (editingIndex !== null) {
                    // Update existing assignment with PUT request
                    const assignmentId = assignments[editingIndex].id; // Assuming `id` is stored in `assignments`
                    response = await axios.put(`http://127.0.0.1:8000/api/training/2/`, assignmentPayload, {
                        headers: {
                            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
                            "Content-Type": "application/json",
                        }
                    });
                } else {
                    // Create new assignment with POST request
                    response = await axios.post('http://127.0.0.1:8000/api/training/', assignmentPayload, {
                        headers: {
                            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
                            "Content-Type": "application/json",
                        }


                    });
                }

                if (response.status === 200 || response.status === 201) {
                    // Success response
                    Swal.fire({
                        icon: 'success',
                        title: 'Program assigned successfully!',
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    const updatedAssignments = [...assignments];
                    if (editingIndex !== null) {
                        updatedAssignments[editingIndex] = response.data; // Update assignment
                    } else {
                        updatedAssignments.push(response.data); // Add new assignment
                    }
                    setAssignments(updatedAssignments);

                    resetForm();
                }

            } catch (error) {
                handleApiError(error);
            }
        }
    };

    const handleEditAssignment = (index) => {
        const assignmentToEdit = assignments[index];
        setFormData({
            selectedEmployee: employees.find(emp => emp.name === assignmentToEdit.employee)?.id,
            selectedProgram: programs.find(prog => prog.name === assignmentToEdit.program)?.id,
            selectedStartDate: assignmentToEdit.start_date,
            selectedEndDate: assignmentToEdit.end_date,
            description: assignmentToEdit.description,
            status: assignmentToEdit.status,
            editingIndex: index,
        });
    };

    const handleDeleteAssignment = async (index) => {
        const assignmentToDelete = assignments[index];

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this program assignment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://127.0.0.1:8000/api/training/5/`, {
                        headers: {
                            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
                            "Content-Type": "application/json",
                        }
                    });

                    if (response.status === 204) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Program deleted successfully!',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        const updatedAssignments = assignments.filter((_, i) => i !== index);
                        setAssignments(updatedAssignments);
                    }

                } catch (error) {
                    handleApiError(error);
                }
            }
        });
    };

    const resetForm = () => {
        setFormData({
            selectedEmployee: '',
            selectedProgram: '',
            selectedStartDate: '',
            selectedEndDate: '',
            description: '',
            status: '',
            editingIndex: null,
        });
        setDateError('');
    };

    const handleApiError = (error) => {
        if (error.response) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Server responded with: ${error.response.status} - ${error.response.data.detail || error.response.data}`,
            });
        } else if (error.request) {
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'No response from the server. Please check your internet connection.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    };

    const totalPages = Math.ceil(assignments.length / entriesPerPage);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentAssignments = assignments.slice(indexOfFirstEntry, indexOfLastEntry);

  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="main-wrapper">
                <Sidebarr />
                <div className="main-wrapper_n">
                    <Nav_M />
                    <div>
                        <section id="assign">
                            <h4>Training</h4>
                            <form className="goal-form-M" onSubmit={handleAssignProgram}>
                                <div className="form-group-M-inline">
                                    {/* Employee Name and Program Name */}
                                    <div className="form-group-M">
                                        <label>Employee Name:</label>
                                        <select name="selectedEmployee" value={formData.selectedEmployee} onChange={handleInputChange} required>
                                            <option value="">Select Employee</option>
                                            {employees.map(employee => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.full_name} (ID: {employee.employee_id})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group-M">
                                        <label>Program Name:</label>
                                        <select name="selectedProgram" value={formData.selectedProgram} onChange={handleInputChange} required>
                                            <option value="">Select Program</option>
                                            {programs.map(program => (
                                                <option key={program.id} value={program.id}>{program.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group-M">
                                        <label>Description:</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="form-group-M-inline">
                                    {/* Start Date, End Date, Description, and Status */}
                                    <div className="form-group-M">
                                        <label>Start Date:</label>
                                        <input type="date" name="selectedStartDate" value={formData.selectedStartDate} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group-M">
                                        <label>End Date:</label>
                                        <input type="date" name="selectedEndDate" value={formData.selectedEndDate} onChange={handleInputChange} required />
                                    </div>

                                    <div className="form-group-M">
                                        <label>Status:</label>
                                        <select name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="Completed">Completed</option>
                                            <option value="In Progress">In Progess</option>

                                        </select>
                                    </div>
                                </div>

                                {dateError && <p className="error-message">{dateError}</p>}

                                <div className="tranining-button-container-M">
                                    <button type="submit" className="training-submit-btn-M">
                                        {formData.editingIndex !== null ? 'Update Program' : 'Assign Program'}
                                    </button>
                                </div>
                            </form>

                        </section>


                        <section id="assigned-training">
                            {assignments.length > 0 ? (
                                <table className="assigned-programs-table-M">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                    <th>Program Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                  
      
        {currentAssignments.map((assignment, index) => {
            const employee = employees.find(
                emp => emp.id === parseInt(assignment.selectedEmployee, 10)
            );
        return (
            <tr key={index}>
                <td>{assignment.id}</td> {/* ID */}
                            <td>{assignment.name}</td> {/* Name */}
                            <td>{assignment.description}</td> {/* Description */}
                            <td>{assignment.start_date}</td> {/* Start Date */}
                            <td>{assignment.end_date}</td> {/* End Date */}
                            <td>{assignment.status}</td> {/* Status */}
                <td className="action-buttons-M">
                    <button onClick={() => handleEditAssignment(index)} className="edit-button-M">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteAssignment(index)} className="delete-button-M">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        );
    })}
</tbody>

                                </table>
                            ) : (
                                <p>No programs assigned yet.</p>
                            )}
                        </section>
                        <div className="pagination-controls-M">
    <button
        className="pagination-button-M prev-next-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
    >
        Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index}
            className={`pagination-button-M ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
        >
            {index + 1}
        </button>
    ))}

    <button
        className="pagination-button-M prev-next-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
    >
        Next
    </button>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingDevelopmentPage;
