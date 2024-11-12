import { useState ,useEffect} from "react";
import "../Manager/CreateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebarr from "./Sidebarr";
import Nav_M from "./Nav_M";
import axios from "axios";  // Import Axios

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    joiningDate: "",
    profile_Image: "",
    gender: "",
    emergencyContact: "",
    dob: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [employees, setEmployees] = useState([]);
  

  // Fetch existing employees (optional)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      joining_date: formData.joiningDate,
      profile_image: formData.profile_Image,
      gender: formData.gender,
      emergency_contact: formData.emergencyContact,
      dob: formData.dob
    };
  
    console.log("Payload being sent:", payload);  // Log the payload

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/manager_profile/",
        payload,
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzOTAxNjEyLCJpYXQiOjE3MzEzMDk2MTIsImp0aSI6ImQ1MWM1MDdlNjMxYjQ2ODlhMTE4YzBlYTQ0Y2VkMDhkIiwidXNlcl9pZCI6MjF9.sGObPamoqdPNR8E705n0c6RDuvZYHeKZCBEXG6nh3Oc` } }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee profile created successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset form data after submission
      setFormData({
        fullName: "",
        contactNumber: "",
        joiningDate: "",
        profileImage: "",
        gender: "",
        emergencyContact: "",
        dob: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue creating the profile.",
      });
    }
  };

  const handleEdit = async (employeeId) => {
    const payload = { ...formData };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/manager_profile/1/`,
        payload,
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzOTAxNjEyLCJpYXQiOjE3MzEzMDk2MTIsImp0aSI6ImQ1MWM1MDdlNjMxYjQ2ODlhMTE4YzBlYTQ0Y2VkMDhkIiwidXNlcl9pZCI6MjF9.sGObPamoqdPNR8E705n0c6RDuvZYHeKZCBEXG6nh3Oc` } }
      );
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Employee profile updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Optionally reset the form after updating or close the edit mode
      setFormData({
        fullName: "",
        contactNumber: "",
        joiningDate: "",
        profile_Image: "",
        gender: "",
        emergencyContact: "",
        dob: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue updating the profile.",
      });
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(
        ``,
        { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzOTAxNjEyLCJpYXQiOjE3MzEzMDk2MTIsImp0aSI6ImQ1MWM1MDdlNjMxYjQ2ODlhMTE4YzBlYTQ0Y2VkMDhkIiwidXNlcl9pZCI6MjF9.sGObPamoqdPNR8E705n0c6RDuvZYHeKZCBEXG6nh3Oc` } }
      );
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Employee profile deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Remove the deleted employee from the local state
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue deleting the profile.",
      });
    }
  };

  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M />
        <div className="employee-form-container">
          <h2>Manager Profile</h2>
          <form onSubmit={handleSubmit} className="employee-form-Manager">
            <div className="form-group-Manager">
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
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
              <label>
                Joining Date:
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="form-group-Manager">
            <label>
              Profile Image URL:
              <input
                type="url"
                name="profile_Image"
                value={formData.profile_Image}
                onChange={handleInputChange}
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
              <label>
                Emergency Contact:
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit" className="submit-btn-Manager">
              Submit
            </button>
          </form>
        </div>
        <div className="employee-list_Manager">
          <h3>Employee Profiles</h3>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div key={employee.id} className="employee-item-Manager">
                <p>{employee.full_name}</p>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No employees found.</p>
          )}
          </div>
      </div>
    </div>
  );
};

export default CreateProfile;
