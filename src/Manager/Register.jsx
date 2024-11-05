import { useState } from "react";
import "../components/CreateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebarr from "./Sidebarr";
import Nav from "./Nav";

const Register = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    username: "",  // Username added
    email: "",
    password: "",  // Password added
    role: "",  // Role added
   
  });

  const [editIndex, setEditIndex] = useState(null);

  const positionOptions = ["Manager", "Developer", "Designer", "Tester"];
  const departmentOptions = ["HR", "IT", "Marketing", "Finance"];
  const roleOptions = ["Admin", "Employee", "Manager"];  // Added role options

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
     
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Manager profile created/updated successfully!',
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

        Swal.fire('Deleted!', 'Manager profile has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="main-wrapper">
   
      <div className="main-wrapper_n">
        <Nav />
        <div>
          <div className="employee-card">
            <h2>Create Manager Profile</h2>

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
             
              
              <button type="submit" className="create-btn">
                {editIndex !== null ? "Update" : "Register"}
              </button>
            </form>
          </div>

          {employees.length > 0 && (
            <div>
              <h2>Employee List</h2>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                  <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.username}</td>
                      <td>{employee.email}</td>
                      <td>{employee.password}</td>
                      <td>{employee.role}</td>
                   
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
  );
};

export default Register;
