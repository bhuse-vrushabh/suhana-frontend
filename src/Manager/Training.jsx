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





    const [dropdownValue, setDropdownValue] = useState(""); // State for dropdown value
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
    const [employeeError, setEmployeeError] = useState('');

    // Fetch employee data and training assignments from the API
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
                    headers: {
                        Authorization: `Bearer ${authData.accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    setEmployees(response.data);
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
                    // Enrich assignments with employee details using their IDs
                    const enrichedAssignments = response.data.map((assignment) => {
                        const employee = employees.find(emp => emp.id === assignment.employee_id);
                        console.log('Mapping Assignment:', assignment, 'Employee:', employee);
                        return {
                            ...assignment,
                            employee_name: employee ? employee.full_name : 'Unknown',
                            employee_id: employee ? employee.id : 'N/A',
                        };
                    });
                    
                    
                    setAssignments(enrichedAssignments);
                }
            } catch (error) {
                console.error('Error fetching training assignments:', error);
            }
        };

        fetchEmployees();
        fetchAssignments();
    }, [authData]);

    const handleDropdownChange = (e) => {
        const selectedId = e.target.value;
        setDropdownValue(selectedId); // Update the dropdown value
        setFormData((prevData) => ({
            ...prevData,
            selectedEmployee: selectedId, // Update the selected employee ID in form data
        }));
        console.log("Selected Employee ID:", selectedId);
        console.log("Form Data:", formData);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Reset any date errors when dates are changed
        if (name === 'selectedStartDate' || name === 'selectedEndDate') {
            setDateError('');
        }
    };

    const createAssignment = async (payload) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/training/', payload, {
                headers: {
                    Authorization: `Bearer ${authData.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Program assigned successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                });

                // Update the assignments list
                setAssignments((prevAssignments) => [...prevAssignments, response.data]);
            }
        } catch (error) {
            console.error("POST API Error:", error);
            Swal.fire("Error", "Failed to assign the program. Please try again.", "error");
        }
    };

    const updateAssignment = async (id, payload) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/training/${id}/`, payload, {
                headers: {
                    Authorization: `Bearer ${authData.accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Program updated successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                });

                // Update the assignments list
                setAssignments((prevAssignments) =>
                    prevAssignments.map((assignment) =>
                        assignment.id === id ? response.data : assignment
                    )
                );
            }
        } catch (error) {
            console.error("PATCH API Error:", error);
            Swal.fire("Error", "Failed to update the program. Please try again.", "error");
        }
    };

    const handleAssignProgram = async (e) => {
        e.preventDefault();

        const { selectedEmployee, selectedProgram, selectedStartDate, selectedEndDate, description, status, editingIndex } = formData;

        const numericEmployeeId = parseInt(selectedEmployee.match(/\d+/)[0], 10);

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



        // Prepare the payload
        const assignmentPayload = {
            name: selectedProgram,
            description: description,
            start_date: selectedStartDate,
            end_date: selectedEndDate,
            status: status,
            employee_id: numericEmployeeId,
        };

        console.log("Assignment Payload:", assignmentPayload);

        // Call the appropriate function based on editingIndex
        if (editingIndex !== null) {
            const assignmentId = assignments[editingIndex].id; // Retrieve the assignment ID
            await updateAssignment(assignmentId, assignmentPayload);
        } else {
            await createAssignment(assignmentPayload);
        }

        // Reset the form and clear errors
        resetForm();
    };

    const handleEditAssignment = (index) => {
        const assignmentToEdit = assignments[index];
        setFormData({
            selectedEmployee: employees.find(emp => emp.name === assignmentToEdit.employee)?.id,
            selectedProgram: assignmentToEdit.program,
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
                    const response = await axios.delete(`http://127.0.0.1:8000/api/training/${assignmentToDelete.id}/`, {
                        headers: {
                            Authorization: `Bearer ${authData.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 204) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Program deleted successfully!',
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        setAssignments((prevAssignments) =>
                            prevAssignments.filter((_, i) => i !== index)
                        );
                    }
                } catch (error) {
                    console.error("DELETE API Error:", error);
                    Swal.fire("Error", "Failed to delete the program. Please try again.", "error");
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
                                   
                                    <div className="form-group-M">
                                        <label>Employee Name:</label>
                                        <select
                                            name="selectedEmployee"
                                            value={dropdownValue} // Using dropdown value
                                            onChange={handleDropdownChange}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="selectedProgram"
                                            value={formData.selectedProgram}
                                            onChange={handleInputChange}
                                            placeholder="Enter Program Name"
                                            required
                                        />
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
                                            <option value="In Progress">In Progress</option>

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
                                            
                                          

                                            return (
                                                <tr key={index}>
                                                    <td>{assignment.id}</td> 
                                                    <td>{assignment.name}</td> 
                                                    <td>{assignment.description}</td> 
                                                    <td>{assignment.start_date}</td> 
                                                    <td>{assignment.end_date}</td> 
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
