// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// // Reusable Input Component
// const InputField = ({ label, name, value, onChange }) => {
//   const  inputStyle = {
//   //   width: '100%',
//   //   padding: '14px',
//   //   margin: '14px 0',
//   //   borderRadius: '4px',
//   //   border: '1px solid #ccc',
//   //   marginBottom: '30px',
//   width: '200px',  // Fixed width
//   height: '40px',  // Fixed height
//   padding: '8px',  // Padding inside the input
//   margin: '14px 0',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   marginBottom: '30px',

//   };

//   return (
//     <div>
//       <label>
//         <strong>{label}:</strong>
//         <input
//           type="text"
//           name={name}
//           value={value}
//           onChange={onChange}
//           style={inputStyle} // Applying styles
//         />
//       </label>
//     </div>
//   );
// };

// const EmployeeProfile = () => {
//   const [employeeData, setEmployeeData] = useState({
//     name: 'Pradip',
//     middlename: 'Vilas',
//     surname: 'Sawant',
//     contact: '7658359088',
//     email: 'pradipsawant123@gmail.com',
//     gender: 'Male',
//     department: 'Finance',
//     position: 'Accountant',
//   });

//   const [performanceHistory, setPerformanceHistory] = useState([
//     { year: 2023, EmployeeRating: '3', ManagerRating: '5' },
//     { year: 2022, EmployeeRating: '4', ManagerRating: '1' },
//     { year: 2021, EmployeeRating: '2', ManagerRating: '3' },
//   ]);

//   const [skillDevelopmentRecords, setSkillDevelopmentRecords] = useState([
//     { skill: '', level: '', progress: '' },
//   ]);

//   const handleEmployeeDataChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({
//       ...employeeData,
//       [name]: value,
//     });
//   };

//   const handlePerformanceChange = (index, e) => {
//     const updatedHistory = [...performanceHistory];
//     updatedHistory[index][e.target.name] = e.target.value;
//     setPerformanceHistory(updatedHistory);
//   };

//   const handleSkillChange = (index, e) => {
//     const updatedSkills = [...skillDevelopmentRecords];
//     updatedSkills[index][e.target.name] = e.target.value;
//     setSkillDevelopmentRecords(updatedSkills);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       ...employeeData,
//       performanceHistory,
//       skillDevelopmentRecords,
//     };
//     console.log('Form Submitted:', formData);

//     alert('Your response is submitted successfully!');
//   };

//   const containerStyle = {
//     display: 'flex',
//     minHeight: '50vh',
//     backgroundColor: '#FEFAEE',
//     color: '#000',
//     fontFamily: 'Arial, sans-serif',
//     // width:'100%',
//     // height:'50%'
    
  
//   };

//   const mainContentStyle = {
//     marginLeft: '200px',
//     marginRight: '200px',
//     flex: 1,
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     marginTop: '90px',
//   };

//   const titleStyle = {
//     textAlign: 'center',
//     fontSize: '28px',
//     fontWeight: 'bold',
//     color: '#ff0000',
//     marginBottom: '20px',
//     borderRadius:'8px'
    
//   };

//   const sectionStyle = {
    
//     marginBottom: '20px',
//     backgroundColor: '#fff',
//     padding: '15px',
//     gap: '30px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     borderRadius: '40px',
//     border: 'none',
//     color: '#fff',
//     backgroundColor: '#ff0000',
//     cursor: 'pointer',
//   };

//   const tableStyle = {
//     width: '50%',
//     borderCollapse: 'collapse',
//     marginBottom: '20px',
//   };

//   const thStyle = {
//     borderBottom: '2px solid #ddd',
//     padding: '10px',
//     textAlign: 'left',
//     backgroundColor: '#f4f4f4',
//   };

//   const tdStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '10px',
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={containerStyle}>
//         <Sidebar />
//         <div style={mainContentStyle}>
//           <h1 style={titleStyle}>Employee Profile</h1>
//           <form onSubmit={handleSubmit}>
//             {/* Personal Details Section */}
//             <h2>Personal Details</h2>

//             {/* Swap left and right fields */}
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <InputField 
//                 label="Name" // Swapped from right to left
//                 name="name"
//                 value={employeeData.name}
//                 onChange={handleEmployeeDataChange}
//               />
//                <InputField 
//                 label="Middle name" // Swapped from right to left
//                 name="middle name"
//                 value={employeeData.middlename}
//                 onChange={handleEmployeeDataChange}
//               />
//               <InputField 
//                 label="Surname" // Swapped from left to right
//                 name="surname"
//                 value={employeeData.surname}
//                 onChange={handleEmployeeDataChange}
//               />
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <InputField
//                 label="Email" // Swapped from right to left
//                 name="email"
//                 value={employeeData.email}
//                 onChange={handleEmployeeDataChange}
//               />
//               <InputField
//                 label="Contact" // Swapped from left to right
//                 name="contact"
//                 value={employeeData.contact}
//                 onChange={handleEmployeeDataChange}
//               />
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <InputField
//                 label="Position" // Swapped from right to left
//                 name="position"
//                 value={employeeData.position}
//                 onChange={handleEmployeeDataChange}
//               />
//               <InputField
//                 label="Department" // Swapped from left to right
//                 name="department"
//                 value={employeeData.department}
//                 onChange={handleEmployeeDataChange}
//               />
//             </div>

//             {/* Performance History Section */}
//             <div style={sectionStyle}>
//               <h2>Performance History</h2>
//               <br/>
//               <table style={tableStyle}>
//                 <thead>
//                   <tr>
//                     <th style={thStyle}>Sr.No</th>
//                     <th style={thStyle}>Year</th>
//                     <th style={thStyle}>Employee Rating</th>
//                     <th style={thStyle}>Manager Rating</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {performanceHistory.map((record, index) => (
//                     <tr key={index}>
//                       <td style={tdStyle}>{index + 1}</td>
//                       <td style={tdStyle}>{record.year}</td>
//                       <td style={tdStyle}>
//                         <input
//                           type="text"
//                           name="EmployeeRating"
//                           value={record.EmployeeRating}
//                           onChange={(e) => handlePerformanceChange(index, e)}
//                           style={{ width: '100%', padding: '5px' }}
//                         />
//                       </td>
//                       <td style={tdStyle}>
//                         <input
//                           type="text"
//                           name="ManagerRating"
//                           value={record.ManagerRating}
//                           onChange={(e) => handlePerformanceChange(index, e)}
//                           style={{ width: '100%', padding: '5px' }}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Submit Button */}
//             <div className="button-container" style={{ marginBottom: '60px' }}>
//               <button type="submit" className="submit-button">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfile;



import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const InputField = ({ label, name, value, onChange }) => {
  const inputStyle = {
    width: '200px',
    height: '40px',
    padding: '8px',
    margin: '14px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '30px',
  };

  return (
    <div>
      <label>
        <strong>{label}:</strong>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          style={inputStyle}
        />
      </label>
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

  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [skillDevelopmentRecords, setSkillDevelopmentRecords] = useState([{ skill: '', level: '', progress: '' }]);
  
  // New state variables for feedback payload
  const [feedbackData, setFeedbackData] = useState({
    to_user: 0,
    feedback_text: '',
    feedback_type: 'Direct Report',
    anonymous: false,
    rating: 0,
    title: '',
    department: '',
    feedback_status: 'Acknowledged',
    response: '',
    created_at: '',
  });

  useEffect(() => {
    // Fetch performance history from the API
    const fetchPerformanceHistory = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/PerformanceReview/');
        const data = await response.json();
        if (Array.isArray(data)) {
          setPerformanceHistory(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching performance history:', error);
      }
    };
    fetchPerformanceHistory();
  }, []);

  const handleEmployeeDataChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handlePerformanceChange = (index, e) => {
    const updatedHistory = [...performanceHistory];
    updatedHistory[index][e.target.name] = e.target.value;
    setPerformanceHistory(updatedHistory);
  };

  const handleSkillChange = (index, e) => {
    const updatedSkills = [...skillDevelopmentRecords];
    updatedSkills[index][e.target.name] = e.target.value;
    setSkillDevelopmentRecords(updatedSkills);
  };

  const handleFeedbackChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackData({ ...feedbackData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...employeeData,
      performanceHistory,
      skillDevelopmentRecords,
      feedback: feedbackData, // Add feedback data to the payload
    };
    console.log('Form Submitted:', formData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/PerformanceReview/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Your response is submitted successfully!');
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error submitting performance review:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '50vh',
    backgroundColor: '#FEFAEE',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
  };

  const mainContentStyle = {
    marginLeft: '200px',
    marginRight: '200px',
    flex: 1,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginTop: '90px',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: '20px',
    borderRadius: '8px',
  };

  const sectionStyle = {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    gap: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '40px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#ff0000',
    cursor: 'pointer',
  };

  const tableStyle = {
    width: '50%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <h1 style={titleStyle}>Employee Profile</h1>
          <form onSubmit={handleSubmit}>
            <h2>Personal Details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <InputField label="Name" name="name" value={employeeData.name} onChange={handleEmployeeDataChange} />
              <InputField label="Middle name" name="middlename" value={employeeData.middlename} onChange={handleEmployeeDataChange} />
              <InputField label="Surname" name="surname" value={employeeData.surname} onChange={handleEmployeeDataChange} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <InputField label="Email" name="email" value={employeeData.email} onChange={handleEmployeeDataChange} />
              <InputField label="Contact" name="contact" value={employeeData.contact} onChange={handleEmployeeDataChange} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <InputField label="Position" name="position" value={employeeData.position} onChange={handleEmployeeDataChange} />
              <InputField label="Department" name="department" value={employeeData.department} onChange={handleEmployeeDataChange} />
            </div>
            <div style={sectionStyle}>
              <h2>Performance History</h2>
              <br />
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Sr.No</th>
                    <th style={thStyle}>Year</th>
                    <th style={thStyle}>Employee Rating</th>
                    <th style={thStyle}>Manager Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(performanceHistory) && performanceHistory.map((record, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={tdStyle}>{record.year}</td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          name="EmployeeRating"
                          value={record.EmployeeRating}
                          onChange={(e) => handlePerformanceChange(index, e)}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          name="ManagerRating"
                          value={record.ManagerRating}
                          onChange={(e) => handlePerformanceChange(index, e)}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={sectionStyle}>
              <h2>Feedback</h2>
              <InputField label="Feedback Text" name="feedback_text" value={feedbackData.feedback_text} onChange={handleFeedbackChange} />
              <InputField label="Title" name="title" value={feedbackData.title} onChange={handleFeedbackChange} />
              <InputField label="Department" name="department" value={feedbackData.department} onChange={handleFeedbackChange} />
              <div>
                <label>
                  <strong>Anonymous:</strong>
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={feedbackData.anonymous}
                    onChange={handleFeedbackChange}
                  />
                </label>
              </div>
              <InputField label="Rating" name="rating" type="number" value={feedbackData.rating} onChange={handleFeedbackChange} />
              <InputField label="Response" name="response" value={feedbackData.response} onChange={handleFeedbackChange} />
            </div>
            <div className="button-container" style={{ marginBottom: '60px' }}>
              <button type="submit" className="submit-button" style={buttonStyle}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

