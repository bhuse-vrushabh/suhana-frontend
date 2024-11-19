import React, { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../Component/EMyAccount.css";
import { AuthContext } from '../Component/AuthContext';
 
const InputField = ({ label, name, value, onChange, disabled = false, containerClass }) => {
  return (
    <div className={containerClass}>
      <label>
        <strong>{label}:</strong>
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="editable-input"
      />
    </div>
  );
};
 
const PersonalDetailsForm = () => {
  const [employeeData, setEmployeeData] = useState({
    full_name: '',
   // middlename: '',
   // surname: '',
    employee_id: '',
    contact: '',
    emergency_contact:'',
    gender: '',
    dob: '',
    joining_date: '',
  });
 
  const [isEditing, setIsEditing] = useState(true);
  const [error, setError] = useState('');
  const { authData } = useContext(AuthContext);
 
 
  useEffect(() => {
 
    // GET API
 
  const fetchEmployeeData = async () => {
  try {
      const response = await axios.get('http://127.0.0.1:8000/api/employees/', {
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
        },
      });
 
      const data = response.data;
      setEmployeeData({
        full_name:data.full_name || '',
       // middlename: data.middlename,
        //surname: data.surname,
        employee_id: data.employee_id || '',
        contact: data.contact_number || '',
        emergency_contact: data.emergency_contact || '',
        gender: data.gender || '',
        dob: data.dob || '',
        joining_date: data.joining_date || '',
      });
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('Failed to load Personal details.');
    }
  };
 
  fetchEmployeeData();
}, [authData.accessToken]);
 
 // POST API
 
  const createEmployeeData = async () => {
    try {
      const payload = {
       // full_name: `${employeeData.name} ${employeeData.middlename} ${employeeData.surname}`,
       full_name: employeeData.full_name,
       employee_id: employeeData.employee_id,
        contact_number: employeeData.contact,
        emergency_contact:employeeData.emergency_contact,
        gender: employeeData.gender,
        dob: employeeData.dob,
        joining_date: employeeData.joining_date,
      };
       console.log("Sending POST request with payload:", payload);
      const response = await axios.post( 'http://127.0.0.1:8000/api/employees/', payload,
        {
          headers: {
            'Authorization': `Bearer ${authData.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
        console.log('POST response:', response);

      Swal.fire({
        title: 'Success!',
        text: 'Personal details saved successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error){
      console.error('Error creating personal details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create personal details. Please try again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }    
    };
 
  // PATCH API
 
  const updateEmployeeData = async () => {
    try {
      const payload = {
       // full_name: `${employeeData.name} ${employeeData.middlename} ${employeeData.surname}`,
       full_name: employeeData.full_name,
       employee_id: employeeData.employee_id,
        contact_number: employeeData.contact,
        emergency_contact:employeeData.emergency_contact,
        gender: employeeData.gender,
        dob: employeeData.dob,
        joining_date: employeeData.joining_date,
      };
      await axios.patch('http://127.0.0.1:8000/api/employees/1/', payload, {
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
     
      Swal.fire({
        title: 'Success!',
        text: 'Personal details updated successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error updating personal details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to updaate personal details. Please try again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
   
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    setError('');
  };
 
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
 
  const handleSaveChanges = () => {
    if (isEditing) {
      updateEmployeeData();  // use PATCH to update existing data
    } else {
      createEmployeeData();  // use POST to create new data
    }
    setIsEditing(false);
  }
 
  return (
    <div className="personal-details-container">
      <Navbar />
      <div className="personal-details-main">
        <h2 className="personal-details-heading">Personal Details</h2>
        <Sidebar />
        <form className="personal-details-form">
          <div className="personal-details-row">
            <InputField
              label="Full Name"
              name="full_name"
              value={employeeData.full_name}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="full-name-container"
            />
             <InputField
              label="Employee ID"
              name="employee_id"
              value={employeeData.employee_id}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="employee-id-container"
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
              label="Joining Date"
              name="joining_date"
              value={employeeData.joining_date}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="joining-date-container"
            />
            <InputField
              label="DOB"
              name="dob"
              value={employeeData.dob}
              onChange={handleChange}
              disabled={!isEditing}
              containerClass="dob-container"
            />
          </div>
        </form>
        <button
          type="button"
          className="edit-save-button"
          onClick= {handleSaveChanges}
        >
          {isEditing ? 'Save Changes' : 'Edit Personal Details'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
  

};

export default PersonalDetailsForm;
 

