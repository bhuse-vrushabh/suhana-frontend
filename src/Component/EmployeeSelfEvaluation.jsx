import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import './EmployeeSelfEvaluation.css';
import { AuthContext } from "../Component/AuthContext";
 
 
const EmployeeSelfEvaluation = () => {
  // Define tasks with IDs
  const taskOptions = [
    { id: 1, name: 'Create login page' },
    { id: 2, name: 'Login Page UI Development' },
    { id: 3, name: 'Login Button Animation' }
  ];
 
  const [selectedTask, setSelectedTask] = useState(''); // State for selected task
  const [taskId, setTaskId] = useState(null); // State for selected task ID
  const [taskRating, setTaskRating] = useState(0); // State for task rating
  const [selfRating, setSelfRating] = useState(0); // State for self-rating
  const [evaluationData, setEvaluationData] = useState([]);// State for storing get response
  const [comments, setComments] = useState(''); // State for comments
  const [fetchEvaluationData, setfetchEvaluationData] = useState(null);
  const { authData } = useContext(AuthContext)
  console.log("this is the data passed through context",authData)
  useEffect(() => {
    // GET request to fetch evaluation data
    console.log("this is the data passed through context",authData.data)
    
    const fetchEvaluationData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/evaluation/', {
          headers: {
            'Authorization': `Bearer ${authData.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setEvaluationData(response.data);
        console.log("Access token:", authData.accessToken);

      } catch (error) {
        console.error('Error fetching evaluation data:', error);
      }
    };

    fetchEvaluationData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check if a task has been selected
    if (!selectedTask) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a task before submitting.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return; // Prevent form submission
    }
 
   
    try {
      const response = await axios.post('http://localhost:8000/api/evaluation/', {
 
        goal: taskId.toString(),
      self_rating: selfRating.toString(),
       },
        {
        headers: {
            'Authorization': `Bearer ${authData.accessToken}`, // Include the token in the request headers
            'Content-Type': 'application/json',
          },
    });
 
      // If validation passes, show success message
      Swal.fire({
        title: 'Submitted Successfully!',
        text: 'Your self-evaluation has been submitted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
 
      // Reset the form fields
      setSelectedTask('');
      setTaskId(null);
      setTaskRating(0);
      setSelfRating(0);
      setComments('');
    } catch (error) {
      Swal.fire({
        title: 'Submission Failed',
        text: 'An error occurred while submitting your evaluation. Please try again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
 
  const handleTaskChange = (e) => {
    const selectedTask = JSON.parse(e.target.value);
    setSelectedTask(selectedTask);
    setTaskId(selectedTask.id);
    setTaskRating(0); // Reset rating when task changes
  };
 
  const handleSelfRatingChange = (value) => {
    setSelfRating(value);
  };
 
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FEFAEE' }}>
        <Sidebar />
 
        <div style={{ flex: '1', padding: '20px', backgroundColor: '#FEFAEE', borderRadius: '8px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#d90606', marginBottom: '20px', marginTop: '90px' }}>Employee Self Evaluation</h1>
 
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
 
              {/* Task Selection Dropdown */}
              <div style={{ flex: '1 1 300px', background: '#F7EDCF', padding: '15px', borderRadius: '8px', margin: '10px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginLeft: '100px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d90606', marginBottom: '10px' }}>Select a Task</h2>
                <select value={selectedTask ? JSON.stringify(selectedTask) : ''} onChange={handleTaskChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="" disabled>Select a task</option>
                  {taskOptions.map((task) => (
                   
                   <option key={task.id} value={JSON.stringify(task)}>{task.name}</option>
                  ))}
                </select>
              </div>
 
              {/* Self Rating Section */}
              <div style={{ flex: '1 1 300px', background: '#F7EDCF', padding: '15px', borderRadius: '8px', margin: '10px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d90606', marginBottom: '10px' }}>Self Rating</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleSelfRatingChange(star)}
                      style={{
                        fontSize: '45px',
                        marginRight: '20px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        color: star <= selfRating ? '#ffd700' : '#ccc'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
 
              {/* Comments Section */}
              <div style={{ flex: '1 1 300px', background: '#F7EDCF', padding: '15px', borderRadius: '8px', margin: '10px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d90606', marginBottom: '10px' }}>Add Your Comment</h2>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows="4"
                  style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="Add your comment here in 50 words..."
                />
              </div>
 
            </div>
 
            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
              <button type="submit" style={{ width: '200px', padding: '12px', borderRadius: '4px', border: 'none', color: '#fff', backgroundColor: '#A30A36', cursor: 'pointer', fontWeight: 'bold' }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default EmployeeSelfEvaluation;
 
 