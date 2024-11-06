
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Swal from 'sweetalert2'; // Make sure this is correct
import './EmployeeSelfEvaluation.css';
 
const EmployeeSelfEvaluation = () => {
  const [goals, setGoals] = useState([
    { objective: 'Task 1 ', selfRating: '' },
    { objective: 'Task 2', selfRating: '' },
    { objective: 'Task 3', selfRating: '' }
  ]);
  const accessToken = localStorage.getItem("accessToken");
   // Fetch the goals from the API on component mount
   useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/performance/goals/1/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
 
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched goals:", data); // Log the fetched data
          setGoals(data.map(goal => ({ ...goal, selfRating: '' }))); // Add selfRating field for each goal
        } else {
          const errorMessage = await response.text(); // Get error response body
          console.error('Failed to fetch goals:', errorMessage);
          alert('Error fetching goals: ' + errorMessage); // Display alert
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
       
      }
    };
 
    fetchGoals();
  }, []); // Run the fetch only once on component mount
 
  const [comments, setComments] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for success message
 
  useEffect(() => {
    // Simulated API call to fetch goals
    const fetchedGoals = [
      { objective: 'create login page' },
      { objective: 'Login Page UI Development' },
      { objective: 'Login Button Animation' }
    ];
    setGoals(fetchedGoals.map(goal => ({ ...goal, selfRating: '' })));
  }, []);
 
  const handleRatingChange = (index, value) => {
    const newGoals = [...goals];
    newGoals[index].selfRating = value;
    setGoals(newGoals);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Submitted Successfully!',
      text: 'Your self-evaluation has been submitted.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  };
  // Styles for container, sidebar, and main content
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FEFAEE',
  };
 
  const catalogContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };
 
  const catalogItemStyle = {
    flex: '1 1 300px', // Flex grow/shrink basis with a minimum width of 300px
    background: '#F7EDCF',
    padding: '15px',
    borderRadius: '8px',
    margin: '10px', // Uniform margin for spacing
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
     marginLeft:'100px'
  };
 
  const mainContentStyle = {
    flex: '1',
    padding: '20px',
    backgroundColor: '#FEFAEE',
    borderRadius: '8px',
  };
 
  const titleStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#d90606',
    marginBottom: '20px',
    marginTop: '90px',
  };
 
  const sectionTitleStylee = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#d90606',
    marginBottom: '10px',
   
  };
 
  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };
 
  const ratingInputStyle = {
    width: '80px',
    padding: '10px',
    marginLeft: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    display: 'inline-block',
  };
 
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '40px',
  };
 
  const buttonStyle = {
    width: '200px',
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',
    backgroundColor: ' #A30A36',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
 
  const completedTaskContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };
 
  const commentsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };
 
  const taskBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: 'none',
  };
  // // construct the list of task
  // try {
  //     const response = await fetch("http://127.0.0.1:8000/api/performance/goals/3/"{
  //     method: "GET",
  //     headers: {
  //     "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify()
     
     
  // };
 
  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <Sidebar />
 
        <div style={mainContentStyle}>
          <h1 style={titleStyle}></h1>
 
          {/* Catalog Layout */}
          <form onSubmit={handleSubmit}>
            <div style={catalogContainerStyle}>
 
              {/* Card 1: List of Goals */}
              <div style={catalogItemStyle}>
                <h2 style={sectionTitleStylee}>List of Tasks</h2>
                <div style={completedTaskContainerStyle}>
                  {goals.map((goal, index) => (
                    <div key={index} style={taskBoxStyle}>
                      {goal.objective}
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Card 2: Completed Tasks and Self Rating */}
              <div style={catalogItemStyle}>
                <h2 style={sectionTitleStylee}>Completed Tasks</h2>
                <div style={completedTaskContainerStyle}>
                  {goals.map((goal, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                      <div style={{ fontWeight: 'bold' }}>{goal.objective}</div>
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        Self-Rating out of 5:
                        <input
                          type="number"
                          value={goal.selfRating}
                          onChange={(e) => handleRatingChange(index, e.target.value)}
                          min="0"
                          max="5"
                          placeholder="Rate 0 to 5"
                          style={ratingInputStyle}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
             
              {/* Card 3: Add Your Comments */}
              <div style={catalogItemStyle}>
                <h2 style={sectionTitleStylee}>Add Your Comments</h2>
                <div style={commentsContainerStyle}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <textarea
                      name="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows="4"
                      style={inputStyle}
                      placeholder="Add your comments here in 200 words..."
                      required
                    />
                  </label>
                </div>
              </div>
 
            </div>
 
            {/* Submit Button */}
            <div style={buttonContainerStyle}>
              <button type="submit" style={buttonStyle}>
                Submit
              </button>
            </div>
          </form>
 
          {/* Success Message */}
          {submissionSuccess && (
            <div style={{ textAlign: 'center', color: 'green', marginTop: '20px', fontWeight: 'bold' }}>
              Submit Successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default EmployeeSelfEvaluation;
 