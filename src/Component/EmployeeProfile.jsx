import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import Swal from 'sweetalert2'; // Import SweetAlert2

const InputField = ({ label, name, value, onChange, type = 'text', disabled = false }) => {
  return (
    <div className="input-field" style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
      <label style={{ marginBottom: '5px' }}>
        <strong>{label}:</strong>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          height: '40px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
        }}
      />
    </div>
  );
};

const EmployeeProfile = () => {
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

  const [performanceHistory, setPerformanceHistory] = useState([
    { year: 2023, EmployeeRating: '3', ManagerRating: '5' },
    { year: 2022, EmployeeRating: '4', ManagerRating: '1' },
    { year: 2021, EmployeeRating: '2', ManagerRating: '3' },
  ]);

  const [feedbackData, setFeedbackData] = useState({
    feedback_text: '',
    title: '',
    department: '',
    anonymous: false,
    rating: 0,
    response: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handlePerformanceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHistory = [...performanceHistory];
    updatedHistory[index] = { ...updatedHistory[index], [name]: value };
    setPerformanceHistory(updatedHistory);
  };

  const handleFeedbackChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackData({ ...feedbackData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmitPersonalDetails = (e) => {
    e.preventDefault();
    setPopupMessage('Personal details submitted successfully!');
    setIsPopupVisible(true);
    setIsEditing(false); // Disable editing after submission
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    // Check if all required fields are filled in
    if (
      !feedbackData.feedback_text ||
      !feedbackData.title ||
      !feedbackData.department ||
      feedbackData.rating === 0
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Simulate successful feedback submission (You can make an API call here)
    Swal.fire({
      title: 'Success!',
      text: 'Feedback submitted successfully!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });

    // Reset feedback form (optional)
    setFeedbackData({
      feedback_text: '',
      title: '',
      department: '',
      anonymous: false,
      rating: 0,
      response: '',
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FEFAEE', padding: '20px' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', backgroundColor: 'rgb(247, 237, 207);', borderRadius: '8px', marginLeft: '80px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', color: '#ff0000', marginTop: '50px' }}>
            Employee Profile
          </h1>

          {/* Edit Button Icon */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button onClick={handleToggleEdit} style={{ padding: '10px 20px', borderRadius: '50%', border: 'none', backgroundColor: '', cursor: 'pointer' }}>
              <FaEdit style={{ color: 'black', fontSize: '20px' }} />
            </button>
          </div>

          {/* Personal Details Form */}
          <h2>Personal Details</h2>
          <form onSubmit={handleSubmitPersonalDetails}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
              <InputField label="Name" name="name" value={employeeData.name} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Middle name" name="middlename" value={employeeData.middlename} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Surname" name="surname" value={employeeData.surname} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Email" name="email" value={employeeData.email} onChange={handleChange} disabled={true} />
              <InputField label="Contact" name="contact" value={employeeData.contact} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Gender" name="gender" value={employeeData.gender} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Department" name="department" value={employeeData.department} onChange={handleChange} disabled={!isEditing} />
              <InputField label="Position" name="position" value={employeeData.position} onChange={handleChange} disabled={!isEditing} />
            </div>
            <button type="submit" style={{ padding: '10px 20px', borderRadius: '40px', border: 'none', color: '#fff', backgroundColor: '#D5661A', cursor: 'pointer', display: 'block', margin: '0 auto' }}>
              Submit Personal Details
            </button>
          </form>

          {/* Performance History */}
          <h2>Performance History</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>Year</th>
                <th style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>Employee Rating</th>
                <th style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>Manager Rating</th>
              </tr>
            </thead>
            <tbody>
              {performanceHistory.map((record, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>{record.year}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <input type="text" name="EmployeeRating" value={record.EmployeeRating} disabled={true} style={{ width: '100%', padding: '5px' }} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <input type="text" name="ManagerRating" value={record.ManagerRating} disabled={true} style={{ width: '100%', padding: '5px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Feedback Form */}
          <h2>Feedback</h2>
          <form onSubmit={handleSubmitFeedback}>
            <InputField label="Feedback Text" name="feedback_text" value={feedbackData.feedback_text} onChange={handleFeedbackChange} />
            <InputField label="Title" name="title" value={feedbackData.title} onChange={handleFeedbackChange} />
            <InputField label="Department" name="department" value={feedbackData.department} onChange={handleFeedbackChange} />
            <div style={{ marginBottom: '10px' }}>
              <label>
                <strong>Anonymous:</strong>
                <input type="checkbox" name="anonymous" checked={feedbackData.anonymous} onChange={handleFeedbackChange} style={{ marginLeft: '10px' }} />
              </label>
            </div>
            <InputField label="Rating" name="rating" type="number" value={feedbackData.rating} onChange={handleFeedbackChange} />
            <InputField label="Response" name="response" value={feedbackData.response} onChange={handleFeedbackChange} />
            <button type="submit" style={{ padding: '10px 20px', borderRadius: '40px', border: 'none', color: '#fff', backgroundColor: '#D5661A', cursor: 'pointer', display: 'block', margin: '20px auto 0' }}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Popup Message */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            zIndex: 9999,
          }}
        >
          <h3>{popupMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;


