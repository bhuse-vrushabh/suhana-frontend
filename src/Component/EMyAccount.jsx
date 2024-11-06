import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import "../Component/EMyAccount.css";

const InputField = ({ label, name, value, onChange, disabled = false }) => {
  return (
    <div className="input-field">
      <label>
        <strong>{label}:</strong>
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
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

  const [isEditing, setIsEditing] = useState(false); // Track editing state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing); // Toggle editing state
  };

  const handleSaveChanges = () => {
    // Logic to save changes goes here, for now we just toggle off the editing mode
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
    <div>
      <Navbar />
      <h2>Personal Details</h2>
      <form>
        <div>
          <Sidebar />
        <InputField label="First Name" name="name" value={employeeData.name} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Middle Name" name="middlename" value={employeeData.middlename} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Last Name" name="surname" value={employeeData.surname} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div>
        <InputField label="Contact Number" name="contact" value={employeeData.contact} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Email" name="email" value={employeeData.email}  />
        <InputField label="Gender" name="gender" value={employeeData.gender} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div>
        <InputField label="Department" name="department" value={employeeData.department} onChange={handleChange} disabled={!isEditing} />
        <InputField label="Position" name="position" value={employeeData.position} onChange={handleChange} disabled={!isEditing} />
        </div>
      </form>
      <button
        type="button"
        className="save-button"
        onClick={isEditing ? handleSaveChanges : handleToggleEdit}
      >
        {isEditing ? 'Save Changes' : 'Edit Personal Details'}
      </button>
    </div>
  );
};

export default PersonalDetailsForm;
