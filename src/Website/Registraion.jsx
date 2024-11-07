import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import './Registraion.css';
import Sidebar from "./Sidebar_A";
import axios from 'axios';
import { AuthContext } from "../Component/AuthContext";

function Registraion() {
    const { authData } = useContext(AuthContext);
    console.log("this is the data passed through context",authData)
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
    const roleOptions = ["manager", "employee"];
    const departmentOptions = ["HR", "Sales", "Engineering", "Marketing"];
    const today = new Date().toISOString().split("T")[0];

    const token = localStorage.getItem('') // Use your token

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedEmployees = [...employees];
            updatedEmployees[editIndex] = formData;
            setEmployees(updatedEmployees);
            setEditIndex(null);
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

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Admin profile created/updated successfully!',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleEdit = (index) => {
        setFormData(employees[index]);
        setEditIndex(index);
    };

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

    const registerUser = async () => {
        const { email, username, role } = formData;  // Destructure formData
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_user/', {
                email: formData.email,
                username: formData.username,
                role: formData.role
            }, {
                headers: {
                    'Authorization': `Bearer ${authData.accessToken}`, // Include the token in the request headers
                    'Content-Type': 'application/json',
                  },
            });

                    // Show success message if the user is created successfully
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Admin profile created/updated successfully!',
            timer: 1500,
            showConfirmButton: false
        });

            console.log(response.data); // handle successful response
        } catch (error) {
            if (error.response && error.response.status === 400) { // Check for 'user already exists' status
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User already exists!'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error registering the user.'
                });
            }
            console.error("There was an error registering the user:", error); // handle error
        }
    };
    

    return (
        <>
            <div className="registration">
                <Sidebar />
                <div className="registration_by">
                    <div className="employee-card">
                        <h2>Create Admin Profile</h2>
                        <form onSubmit={handleSubmit} className="employee-form">
                            <div className="form-row">
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
                            </div>
                            <div className="parent_form-row-roll">
                                <div className="form-row-roll">
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
                            </div>
                            <button onClick={registerUser} type="submit" className="create-btn">
                                {editIndex !== null ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registraion;
