import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AuthContext } from "../Component/AuthContext";

const TrainingAndDevelopment = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const programsPerPage = 5;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/training/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authData.accessToken}`,
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
    fetchPrograms();
  }, [authData.accessToken]);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted Successfully!');
    console.log('Form Submitted:', selectedProgram);
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.startDate.includes(searchQuery)
  );

  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
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

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or date..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '30%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />

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
              {currentPrograms.map((program) => (
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

          {/* Pagination Controls */}
          <div style={paginationStyle}>
            <button
              onClick={handlePreviousPage}
              style={paginationButtonStyle}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ fontSize: '14px' }}>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              style={paginationButtonStyle}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
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
  fontSize: '2rem',
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

const paginationStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};

const paginationButtonStyle = {
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#D5661A',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
};

export default TrainingAndDevelopment;
