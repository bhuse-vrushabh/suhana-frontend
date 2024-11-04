import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import './Registraion.css';
import Sidebar from "./Sidebar";

function Registraion() {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        department: "",
        position: "",
        dateOfJoining: ""
    });
    const [editIndex, setEditIndex] = useState(null);
    const roleOptions = ["Admin", "manager", "employee"];
    const departmentOptions = ["HR", "Sales", "Engineering", "Marketing"];

    // Set today's date as the minimum date for the Date of Joining field
    const today = new Date().toISOString().split("T")[0];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to create or update an employee profile
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedEmployees = [...employees];
            updatedEmployees[editIndex] = formData;
            setEmployees(updatedEmployees);
            setEditIndex(null); // Reset edit mode
        } else {
            setEmployees([...employees, formData]);
        }

        setFormData({
            username: "",
            email: "",
            password: "",
            role: "",
            gender: "",
            department: "",
            position: "",
            dateOfJoining: ""
        });

        // Reset the employees array to remove the table after submission
        setEmployees([]); 

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Admin profile created/updated successfully!',
            timer: 1500,
            showConfirmButton: false
        });
    };

    // Handle employee edit
    const handleEdit = (index) => {
        setFormData(employees[index]);
        setEditIndex(index);
    };

    // Handle employee delete with SweetAlert confirmation
    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this profile?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedEmployees = employees.filter((_, i) => i !== index);
                setEmployees(updatedEmployees);
                Swal.fire('Deleted!', 'Profile has been deleted.', 'success');
            }
        });
    };

    return (
        <>
            <div className="registration">
                <Sidebar />
                {/* <div className="registration_by">
                    <div className="main-wrapper">
                        <div className="main-wrapper_n">
                            <div className="adminprofil_card"> */}
                                <div className="employee-card">
                                    <h2>Create Admin Profile</h2>

                                    <form onSubmit={handleSubmit} className="employee-form">
                                        <div className="form-row">
                                            <label>
                                                Username:
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Email:
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </label>
                                        </div>

                                        <div className="form-row">
                                            <label>
                                                Password:
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Role:
                                                <select
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Role</option>
                                                    {roleOptions.map((role, index) => (
                                                        <option key={index} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>

                                        <div className="form-row">
                                            <label>
                                                Gender:
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </label>
                                            <label>
                                                Department:
                                                <select
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Department</option>
                                                    {departmentOptions.map((dept, index) => (
                                                        <option key={index} value={dept}>
                                                            {dept}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </div>

                                        <div className="form-row">
                                            <label>
                                                Position:
                                                <input
                                                    type="text"
                                                    name="position"
                                                    value={formData.position}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Date of Joining:
                                                <input
                                                    type="date"
                                                    name="dateOfJoining"
                                                    value={formData.dateOfJoining}
                                                    onChange={handleInputChange}
                                                    min={today} // Prevent selecting past dates
                                                    required
                                                />
                                            </label>
                                        </div>

                                        <button type="submit" className="create-btn">
                                            {editIndex !== null ? "Update" : "Create"}
                                        </button>
                                    </form>
                                </div>
                            {/* </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Registraion;
