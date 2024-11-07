import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import "../Component/EMyAccount.css";

const InputField = ({ label, name, value, onChange, disabled = false, containerClass }) => {
  const handleContentChange = (e) => {
    onChange({ target: { name, value: e.currentTarget.textContent } });
  };

  return (
    <div className={containerClass}>
      <label>
        <strong>{label}:</strong>
      </label>
      <div
        contentEditable={!disabled}
        onInput={handleContentChange}
        suppressContentEditableWarning={true}
        className="editable-div"
      >
        {value}
      </div>
    </div>
  );
};

const PersonalDetailsForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: 'Pradip',
    middlename: 'Vilas',
    surname: 'Sawant',
    contact: '7658359088',
    email: 'pradipsawant123@gmail.com',
    gender: 'Male',
    department: 'Finance',
    position: 'Accountant',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Personal details saved successfully!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
    setIsEditing(false);
  };
  
  return (
    <div className="personal-details-container">
      <Navbar />
      <div className="personal-details-main">
        <h2 className="personal-details-heading">Personal Details</h2>
        <Sidebar />
        <form className="personal-details-form">
          <div className="personal-details-row">
            <InputField
              label="First Name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="first-name-container"
            />
            <InputField
              label="Middle Name"
              name="middlename"
              value={employeeData.middlename}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="middle-name-container"
            />
            <InputField
              label="Last Name"
              name="surname"
              value={employeeData.surname}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="last-name-container"
            />
          </div>
          <div className="personal-details-row">
            <InputField
              label="Contact Number"
              name="contact"
              value={employeeData.contact}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="contact-number-container"
            />
            <InputField
              label="Email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="email-container"
            />
            <InputField
              label="Gender"
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="gender-container"
            />
          </div>
          <div className="personal-details-row">
            <InputField
              label="Department"
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="department-container"
            />
            <InputField
              label="Position"
              name="position"
              value={employeeData.position}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="position-container"
            />
          </div>
        </form>
        <button
          type="button"
          className="edit-save-button"
          onClick={isEditing ? handleSaveChanges : handleToggleEdit}
        >
          {isEditing ? 'Save Changes' : 'Edit Personal Details'}
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
