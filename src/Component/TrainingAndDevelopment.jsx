import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
 
const TrainingAndDevelopment = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // JWT token for authorization
const token = localStorage.getItem('accessToken')
 
  // Fetch training programs from the API when the component is mounted
  useEffect(() => {
    const fetchPrograms = async () => {
      const token = localStorage.getItem('accessToken')
      try {
        const response = await fetch('http://127.0.0.1:8000/api/training/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
        });
 
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
 
        const data = await response.json();
 
        const formattedPrograms = data.map((program) => ({
          id: program.id,
          name: program.name,
          description: program.description,
          startDate: program.start_date,
          endDate: program.end_date,
          status: program.status,
        }));
 
        setPrograms(formattedPrograms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching training programs:', error);
        setError(error.message);
        setLoading(false);
      }
    };
 
    fetchPrograms(); // Fetch data on mount
  }, [token]); // Only need to rerun if token changes
 
  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted Successfully!');
    console.log('Form Submitted:', selectedProgram);
    // Submit data to backend API here if needed
  };
 
  // Styles (same as before)
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#FEFAEE',
    marginLeft: '30px',
  };
 
  const mainContentStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: '#FEFAEE',
    borderRadius: '8px',
    margin: '60px',
  };
 
  const titleStyle = {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#d90606',
    marginBottom: '20px',
    marginTop: '30px',
    marginLeft: '20px',
  };
 
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };
 
  const thStyle = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    backgroundColor: '#fff',
    textAlign: 'left',
  };
 
  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    cursor: 'pointer',
  };
 
  const formStyle = {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
 
  const labelStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
  };
 
  const inputStyle = {
    width: '97.9%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '18px',
  };
 
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  };
 
  const buttonStyle = {
    width: '199px',
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#D5661A',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
  };
 
  if (loading) {
    return <div>Loading programs...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <h1 style={titleStyle}>Training and Development</h1>
 
          {/* Training Program Table */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Program Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Start Date</th>
                <th style={thStyle}>End Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} onClick={() => handleProgramClick(program)}>
                  <td style={tdStyle}>{program.id}</td>
                  <td style={tdStyle}>{program.name}</td>
                  <td style={tdStyle}>{program.description}</td>
                  <td style={tdStyle}>{program.startDate}</td>
                  <td style={tdStyle}>{program.endDate}</td>
                  <td style={tdStyle}>{program.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
 
         
               
             
             
             
             
             
 
         
        </div>
      </div>
    </div>
  );
};
 
export default TrainingAndDevelopment;