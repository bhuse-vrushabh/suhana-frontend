import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FaEdit } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

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
  
  const title = {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#d90606',
    marginBottom: '20px',
    marginTop: '40px',
    marginLeft: '20px',
  };
  const [performanceHistory, setPerformanceHistory] = useState([
    { year: 2023, EmployeeRating: '3', ManagerRating: '5' },
    { year: 2022, EmployeeRating: '4', ManagerRating: '1' },
    { year: 2021, EmployeeRating: '2', ManagerRating: '3' },
  ]);


   const handleStarClick = (ratingValue) => {
   
  };
  // Define handleStarClickForPerformance for both Employee and Manager Ratings
const handleStarClickForPerformance = (type, ratingValue, index) => {
  // Make a copy of the performanceHistory state to avoid direct mutation
  const updatedPerformanceHistory = [...performanceHistory];
  if (type === 'Employee') {
    updatedPerformanceHistory[index].EmployeeRating = ratingValue;
  } else if (type === 'Manager') {
    updatedPerformanceHistory[index].ManagerRating = ratingValue;
  }
  setPerformanceHistory(updatedPerformanceHistory); // Set the updated performance history
};
 
  
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FEFAEE', padding: '20px' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', backgroundColor: 'rgb(247, 237, 207);', borderRadius: '8px', marginLeft: '80px' }}>

          {/* Performance History */}
          <h1 style={title}>Performance History</h1>
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
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                    {record.year}
                  </td>


                  {/* Employee Rating (Non-editable) */}
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                color={star <= record.EmployeeRating ? '#ffc107' : '#e4e5e9'}
                style={{ cursor: 'pointer', marginRight: '5px' }}
              />
            ))}
          </div>
        </td>


          {/* Manager Rating (Non-editable) */}
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                color={star <= record.ManagerRating ? '#ffc107' : '#e4e5e9'}
                style={{ cursor: 'pointer', marginRight: '5px' }}
              />
            ))}
          </div>
        </td>
      </tr>     
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  );
};
export default EmployeeProfile;



