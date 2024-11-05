import { useState } from "react";
import "../Manager/CreateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebarr from "./Sidebarr";
import Nav from "./Nav";

const CreateProfile = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    managerId: "",
    name: "",
    middleName: "",
    surname: "",
    email: "manager@tdtl.com", // Static email
    position: "",
    dateOfJoining: "",
    contactNumber: "",
    gender: "",
    department: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  const positionOptions = ["Manager", "Developer", "Designer", "Tester"];
  const departmentOptions = ["HR", "IT", "Marketing", "Finance"];

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
      managerId: "",
      name: "",
      middleName: "",
      surname: "",
      email: "manager@tdtl.com",
      position: "",
      dateOfJoining: "",
      contactNumber: "",
      gender: "",
      department: ""
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Employee profile created/updated successfully!',
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

        <div className="employee-form-container">
          <h2>Employee Profile</h2>
          <form onSubmit={handleSubmit} className="employee-form-Manager">
            <div className="form-group-Manager">
              <label>
                Manager ID:
                <input
                  type="text"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleInputChange}
                  required
                />
              </label>
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
                Middle Name:
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
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
            <div className="form-group-Manager">
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
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly // Making the email field static
                />
              </label>
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
            </div>
            <div className="form-group-Manager">
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
            </div>
            <button type="submit" className="submit-btn-Manager">
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* Conditionally render the employee table if there are employees */}
        {employees.length > 0 && (
          <div>
            <h2>Employee List</h2>
            <table className="employee-table-Manager">
              <thead>
                <tr>
                  <th>Manager ID</th>
                  <th>Name</th>
                  <th>Middle Name</th>
                  <th>Surname</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.managerId}</td>
                    <td>{employee.name}</td>
                    <td>{employee.middleName}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.contactNumber}</td>
                    <td>{employee.email}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                      <button onClick={() => handleEdit(index)} className="action-btn edit-btn-Manager">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => handleDelete(index)} className="action-btn delete-btn-Manager">
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
  );
};

export default CreateProfile;
