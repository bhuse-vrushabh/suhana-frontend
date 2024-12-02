import { useState, useEffect,useContext } from "react";
import "../Manager/CreateProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebarr from "./Sidebarr";
import Nav_M from "./Nav_M";
import axios from "axios";
import { AuthContext } from "../Component/AuthContext";

const CreateProfile = () => {
  const { authData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    joiningDate: "",
    profile_Image: "",
    gender: "",
    emergencyContact: "",
    dob: "",
  });
  const [profileExists, setProfileExists] = useState(false);
  const [profileId, setProfileId] = useState(null);

  // Fetch the manager's profile on component mount
  useEffect(() => {
    fetchManagerProfile();
  }, []);

  const fetchManagerProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/manager_profile/", {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`, // Use token from context
          "Content-Type": "application/json",
        },
      });
      if (response.data.length > 0) {
        const profile = response.data[0]; // Assuming only one profile per manager
        setFormData({
          fullName: profile.full_name,
          contactNumber: profile.contact_number,
          joiningDate: profile.joining_date,
          profile_Image: profile.profile_image,
          gender: profile.gender,
          emergencyContact: profile.emergency_contact,
          dob: profile.dob,
        });
        setProfileExists(true);
        setProfileId(profile.id);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to fetch manager profile.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profile_Image: reader.result });
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
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
      dob: formData.dob,
    };

    try {
      if (profileExists) {
        // PATCH request to update the profile
        await axios.patch(`http://127.0.0.1:8000/api/manager_profile/`, payload, {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
            "Content-Type": "application/json",
          },
        });
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Profile updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // POST request to create a new profile
        const response = await axios.post("http://127.0.0.1:8000/api/manager_profile/", payload, {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`, // Use token from context
            "Content-Type": "application/json",
          },
        });
        setProfileId(response.data.id);
        setProfileExists(true);
        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Profile created successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue submitting the profile.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/manager_profile/1/`, {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`, // Use token from context
          "Content-Type": "application/json",
        },
      });
      Swal.fire({ icon: "success", title: "Deleted", text: "Profile deleted successfully!", timer: 1500, showConfirmButton: false });
      setFormData({
        fullName: "",
        contactNumber: "",
        joiningDate: "",
        profile_Image: "",
        gender: "",
        emergencyContact: "",
        dob: "",
      });
      setProfileExists(false);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "There was an issue deleting the profile." });
    }
  }
  return (
    <div className="main-wrapper">
      <Sidebarr />
      <div className="main-wrapper_n">
        <Nav_M />
        <div className="employee-form-container">
          <h2>Manager Profile</h2>
          <form onSubmit={handleSubmit} className="employee-form-Manager">
            {/* Form fields */}
            <div className="form-group-Manager">
              
              
              
              
              <label>Full Name:
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </label>
              <label>Contact Number:
                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
              </label>
              <div className="form-group-Manager"></div>
              <label>Joining Date:
                <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} required />
              </label>
           
              {/* <label>Profile Image URL:
                <input type="url" name="profile_Image" value={formData.profile_Image} onChange={handleInputChange} />
              </label> */}
              <label>Gender:
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>Emergency Contact:
                <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required />
              </label>
              <label>Date of Birth:
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
              </label>
              <label>Profile Image:
                <input
                  type="file"
                  name="profile_Image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {formData.profile_Image && (
                <div className="image-preview">
                  <img
                    src={formData.profile_Image}
                    alt="Profile Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              )}
            </div>
            
            <button type="submit" className="submit-btn-Manager">
              {profileExists ? "Save " : "Create Profile"}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
