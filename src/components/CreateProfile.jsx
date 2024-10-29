import { useState } from "react";
import "../components/CreateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebarr from "./Sidebarr";
import Nav from "./Nav";
const CreateProfile = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    position: "",
    dateOfJoining: "",
    contactNumber: "",
    gender: "",
    department: "",
    dateOfJoining: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dropdown options for Position and Department
  const positionOptions = ["Manager", "Developer", "Designer", "Tester"];
  const departmentOptions = ["HR", "IT", "Marketing", "Finance"];

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

    // Reset the form fields and show success message
    setFormData({
      name: "",
      surname: "",
      email: "",
      position: "",
      dateOfJoining: "",
      contactNumber: "",
      gender: "",
      department: "",
      dateOfJoining: ""
    });

    // Show SweetAlert success message
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Employee profile created/updated successfully!',
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
      text: 'Do you want to delete this employee profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);

        Swal.fire('Deleted!', 'Employee profile has been deleted.', 'success');
      }
    });
  };
  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav />


        <div>
          {/* Form inside a card */}
          <div className="employee-card">
            <h2>Create Employee Profile</h2>

            {/* Employee Profile Form */}
            <form onSubmit={handleSubmit} className="employee-form">
              <div className="form-row">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Surname:
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
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
                  Contact Number:
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
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
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Position</option>
                    {positionOptions.map((pos, index) => (
                      <option key={index} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Date of Joining:
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <button type="submit" className="create-btn">
                {editIndex !== null ? "Update" : "Create"}
              </button>
            </form>
          </div>

          {/* Conditionally render the employee table if there are employees */}
          {employees.length > 0 && (
            <div>
              <h2>Employee List</h2>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Date of Joining</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.name}</td>
                      <td>{employee.surname}</td>
                      <td>{employee.email}</td>
                      <td>{employee.contactNumber}</td>
                      <td>{employee.gender}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>{employee.dateOfJoining}</td>
                      <td>
                        <button onClick={() => handleEdit(index)} className="action-btn edit-btn">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDelete(index)} className="action-btn delete-btn">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>


  )
}

export default CreateProfile
