import React, { useState } from 'react';
import Sidebarr from './Sidebarr';

import "./Sidebarr";
import "./Training.css";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios from 'axios';
import Nav_M from './Nav_M';

function TrainingDevelopmentPage() {
    const [programs] = useState([
        { id: 1, name: 'Leadership Training', duration: '5 days', description: 'Developing leadership skills', trainer: 'Niranjan Navale', startDate: '2024-10-15', endDate: '2024-10-19' },
        { id: 2, name: 'Team Management', duration: '3 days', description: 'Effective team management strategies', trainer: 'Rohan Joshi', startDate: '2024-11-01', endDate: '2024-11-03' },
    ]);

    const [employees] = useState([
        { id: 1, name: 'Rohit Bhagat' },
        { id: 2, name: 'Vaibhav Gawali' },
        { id: 3, name: 'Kunal Shinde' },
        { id: 4, name: 'Abhi Phaphale' },
    ]);

    const [assignments, setAssignments] = useState([]);
    const [formData, setFormData] = useState({
        selectedEmployee: '',
        selectedProgram: '',
        selectedStartDate: '',
        selectedEndDate: '',
        description: '',
        status: 'Assigned', // Default status
        editingIndex: null,
    });
    const [dateError, setDateError] = useState('');

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
            const employee = employees.find(emp => emp.id === parseInt(selectedEmployee));
    
            const assignmentPayload = {
                name: program.name,
                employee: employee.name, // Store employee name directly
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
                    response = await axios.put(`http://127.0.0.1:8000/api/performance/training/2/`, assignmentPayload, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`,
                        }
                    });
                } else {
                    // Create new assignment with POST request
                    response = await axios.post('http://127.0.0.1:8000/api/performance/training/', assignmentPayload, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`,
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
                    const response = await axios.delete(`http://127.0.0.1:8000/api/performance/training/5/`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjUyNjI1LCJpYXQiOjE3Mjk2NjA2MjUsImp0aSI6IjVhODdhNGFmNmU4YjQ2ODJhNzI5NDc0YjliZTYwYmZiIiwidXNlcl9pZCI6M30.rzZp4IhtsJCLpKaUUSPuQtsITxCBmDuiPweBjgAfefk`,
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
            status: 'Assigned',
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
    return (
        <div>
            <div className="main-wrapper">
                <Sidebarr />
                <div className="main-wrapper_n">
                    <Nav_M/>
                    <div>
                        <section id="assign">
                            <h2>Training to Employees</h2>
                            <form className="goal-form-M" onSubmit={handleAssignProgram}>

                                <div className="form-group-M-inline">
                                    {/* Employee Name and Program Name */}
                                    <div className="form-group-M">
                                        <label>Employee Name:</label>
                                        <select name="selectedEmployee" value={formData.selectedEmployee} onChange={handleInputChange} required>
                                            <option value="">--Select Employee--</option>
                                            {employees.map(employee => (
                                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group-M">
                                        <label>Program Name:</label>
                                        <select name="selectedProgram" value={formData.selectedProgram} onChange={handleInputChange} required>
                                            <option value="">--Select Program--</option>
                                            {programs.map(program => (
                                                <option key={program.id} value={program.id}>{program.name}</option>
                                            ))}
                                        </select>
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
                                        <label>Description:</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group-M">
                                        <label>Status:</label>
                                        <select name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="Assigned">Assigned</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
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
                                            <th>Employee Name</th>
                                            <th>Program Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignments.map((assignment, index) => (
                                            <tr key={index}>
                                                <td>{employees.find(emp => emp.id === parseInt(assignment.selectedEmployee))?.name}</td>
                                                <td>{assignment.name}</td>
                                                <td>{assignment.start_date}</td>
                                                <td>{assignment.end_date}</td>
                                                <td>{assignment.description}</td>
                                                <td>{assignment.status}</td>
                                                <td className="action-buttons-M">
                                                    <button onClick={() => handleEditAssignment(index)} className="edit-button-M">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button onClick={() => handleDeleteAssignment(index)} className="delete-button-M">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No programs assigned yet.</p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingDevelopmentPage;
