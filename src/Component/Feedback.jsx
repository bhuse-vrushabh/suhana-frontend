// import React, { useState } from 'react';
// import './Feedback.css';
// import Sidebar from "./Sidebar";
// import Nav from "./Navbar";

// const Feedback = () => {
//   const [feedbackType, setFeedbackType] = useState('employee');
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedManager, setSelectedManager] = useState('');
//   const [feedbackContent, setFeedbackContent] = useState('');
//   const [anonymous, setAnonymous] = useState(false);
//   const [overallRating, setOverallRating] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Ensure all required fields are filled
//     if (!feedbackContent || !overallRating) {
//       alert("Please fill out all fields before submitting.");
//       return;
//     }
  
//     console.log({
//       feedbackType,
//       selectedEmployee,
//       selectedManager,
//       feedbackContent,
//       overallRating,
//       anonymous,
//     });
  
//     setSubmitted(true);
  
//     // Show a popup message after submission
//     alert("Your feedback has been successfully submitted!");
  
//     // Reset the form fields after submission
//     setSelectedEmployee('');
//     setSelectedManager('');
//     setFeedbackContent('');
//     setOverallRating('');
//     setAnonymous(false);
//   };
  
//   const ratingDescriptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

//   return (
//     <div className='feedback-page'>
//       <Nav />
//       <div className="container">
//         <Sidebar />
//         <div className="review-feedback-page">
//           <h1 className="feedback-title"></h1>
//           <form onSubmit={handleSubmit} className="feedback-form">

//             {/* Feedback Type Selection */}
//             <div className="form-group">
//               <label htmlFor="feedbackTypeSelect">Select Feedback Type:</label>
//               <select
//                 id="feedbackTypeSelect"
//                 value={feedbackType}
//                 onChange={(e) => setFeedbackType(e.target.value)}
//                 required
//                 className="select"
//               >
//                 <option value="employee">Employee Feedback</option>
//                 <option value="manager">Manager Feedback</option>
//               </select>
//             </div>

//             {/* Employee Feedback Section */}
//             {feedbackType === 'employee' && (
//               <>
//                 <div className="form-group">
//                   <label htmlFor="employeeSelect">Select Employee:</label>
//                   <select
//                     id="employeeSelect"
//                     value={selectedEmployee}
//                     onChange={(e) => setSelectedEmployee(e.target.value)}
//                     required
//                     className="select"
//                   >
//                     <option value="" disabled>Select an employee</option>
//                     <option value="Vikas Patil">Vikas Patil</option>
//                     <option value="Adnan Hafir">Adnan Hafir</option>
//                     <option value="Ajay Bhishnoi">Ajay Bhishnoi</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="feedbackContent">Feedback:</label>
//                   <textarea
//                     id="feedbackContent"
//                     value={feedbackContent}
//                     onChange={(e) => setFeedbackContent(e.target.value)}
//                     placeholder="Provide your feedback..."
//                     required
//                     className="textarea"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Manager Feedback Section */}
//             {feedbackType === 'manager' && (
//               <>
//                 <div className="form-group">
//                   <label htmlFor="managerSelect">Select Manager:</label>
//                   <select
//                     id="managerSelect"
//                     value={selectedManager}
//                     onChange={(e) => setSelectedManager(e.target.value)}
//                     required
//                     className="select"
//                   >
//                     <option value="" disabled>Select a manager</option>
//                     <option value="Sanjay Patil">Sanjay Patil</option>
//                     <option value="Meera Sinha">Meera Sinha</option>
//                     <option value="Ishan Mahir">Ishan Mahir</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="feedbackContent">Feedback:</label>
//                   <textarea
//                     id="feedbackContent"
//                     value={feedbackContent}
//                     onChange={(e) => setFeedbackContent(e.target.value)}
//                     placeholder="Provide your feedback..."
//                     required
//                     className="textarea"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Overall Rating Section */}
//             <div className="form-group">
//               <label>Overall Rating:</label>
//               <div className="rating-options">
//                 {Array.from({ length: 5 }, (_, index) => (
//                   <label key={index} className="rating-label">
//                     <input
//                       type="radio"
//                       name="rating"
//                       value={index + 1}
//                       checked={overallRating === (index + 1).toString()}
//                       onChange={(e) => setOverallRating(e.target.value)}
//                     />
//                     <span className="rating-number" data-description={ratingDescriptions[index]}>
//                       {index + 1}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className='button-container'>
//               <button type="submit" className="submit-button">Submit</button>
//             </div>
//           </form>

//           {submitted && <p className="success-message"></p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;



 import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Feedback.css';
import swal from 'sweetalert2';
import Sidebar from "./Sidebar";
import Nav from "./Navbar";

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('employee');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [overallRating, setOverallRating] = useState('0');
  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState(''); // New state for response message

  const accessToken = localStorage.getItem('accessToken');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all required fields are filled
    if (!feedbackContent  || !overallRating) {
      swal.fire({
        icon:'error',
        title:'Incomplete Submission',
        text:' ',
      });
      return;
    }

    // Prepare payload
    const payload = {
      to_user: feedbackType === 'employee' ? selectedEmployee : selectedManager,
      feedback_text: feedbackContent,
      feedback_type: feedbackType === 'employee' ? 'Direct Report' : 'Manager Feedback',
      anonymous: anonymous,
      rating: parseInt(overallRating), // Convert rating to an integer
      title: "Feedback Submission", // Add a suitable title
      department: "Your Department", // Replace with the actual department
      feedback_status: "Acknowledged",
      response: "", // This can be set to an appropriate value or left blank
    };

    try {
//const response = await axios.post('http://127.0.0.1:8000/api/feedback/', payload);
      //Authorization: `Bearer ${accessToken}`, // Include access token in headers
  
      //setResponseMessage(response.data);
      setSubmitted(true);
  
      // Show success SweetAlert message
      swal.fire({
        icon: 'success',
        title: 'Feedback Submitted',
        text: 'Your feedback has been successfully submitted!',
        timer: 1500,
      });
      
      // Reset the form fields after submission
      setSelectedEmployee('');
      setSelectedManager('');
      setFeedbackContent('');
      setOverallRating('');
    } catch (error) {
      console.error("There was an error submitting your feedback:", error);
      swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your feedback. Please try again later.',
      });
    }
  };
  const handleStarClick = (rating) => {
    setOverallRating(rating);
    const ratingDescriptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  };

  
  return (
    <div className='feedback-page'>
      <Nav />
      <div className="container">
        <Sidebar />
        <div className="review-feedback-page">
          <h1 className="feedback-title">Feedback Form</h1>
          <form onSubmit={handleSubmit} className="feedback-form">

            {/* Feedback Type Selection */}
            <div className="form-group">
              <label htmlFor="feedbackTypeSelect">Select Feedback Type:</label>
              <select
                id="feedbackTypeSelect"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                required
                className="select"
              >
           
                <option value="employee">Employee Feedback</option>
                <option value="manager">Manager Feedback</option>
              </select>
            </div>

            {/* Employee Feedback Section */}
            {feedbackType === 'employee' && (
              <>
                <div className="form-group">
                  <label htmlFor="employeeSelect">Select Employee:</label>
                  <select
                    id="employeeSelect"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    required
                    className="select"
                  >
                    <option value="" disabled>Select an employee</option>
                    <option value="Vikas Patil">Vikas Patil</option>
                    <option value="Adnan Hafir">Adnan Hafir</option>
                    <option value="Ajay Bhishnoi">Ajay Bhishnoi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackContent">Feedback:</label>
                  <textarea
                    id="feedbackContent"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                    className="textarea"
                  />
                </div>
              </>
            )}

            {/* Manager Feedback Section */}
            {feedbackType === 'manager' && (
              <>
                <div className="form-group">
                  <label htmlFor="managerSelect">Select Manager:</label>
                  <select
                    id="managerSelect"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    required
                    className="select"
                  >
                    <option value="" disabled>Select a manager</option>
                    <option value="Sanjay Patil">Sanjay Patil</option>
                    <option value="Meera Sinha">Meera Sinha</option>
                    <option value="Ishan Mahir">Ishan Mahir</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackContent">Feedback:</label>
                  <textarea
                    id="feedbackContent"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Provide your feedback..."
                    required
                    className="textarea"
                  />
                </div>
              </>
            )}

            {/* overall Rating Section */}
            <div className="form-group">
              <label>Overall Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={star <= overallRating ? 'star filled' : 'star'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className='button-container'>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>

          {submitted && responseMessage && (
            <div className="response-message">
              <h2>Response:</h2>
              <pre>{JSON.stringify(responseMessage, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
