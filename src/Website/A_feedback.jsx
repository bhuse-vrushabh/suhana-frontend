// import React, { useState } from 'react';
// import A_FeedbackForm from './A_FeedbackForm';
// import ReviewList from './ReviewList';
// import Sidebar from "./Sidebar";
//  import Nav from "./Nav";

// const A_feedback = () => {
//   const [reviews, setReviews] = useState([]);

//   const addReview = (review) => {
//     setReviews((prevReviews) => [...prevReviews, review]);
//   };
 
//   return (
//     <div>
      
//             <div className="container-fluid">
//               <div className="row Profile_info_row mb-1"></div> 
//               <Nav/>
//        </div>
//        <div className="wrapper">
//       <Sidebar />
//     <div className="feedback-page">
//       <h1>Feedback and Reviews</h1>
//       <A_FeedbackForm addReview={addReview} />
//       <ReviewList reviews={reviews} />
//     </div>
//     </div></div>
//   );
// };

// export default A_feedback;





import React, { useState } from 'react';
import './FeedbackPage.css';
import Sidebar from "./Sidebar_A";
import Nav from "./Nav";

const A_feedback = () => {
  const [colleagueFeedback, setColleagueFeedback] = useState('');
  const [managerFeedback, setManagerFeedback] = useState('');
  const [directReportsFeedback, setDirectReportsFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [overallReview, setOverallReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle form submission, e.g., sending data to a server
    setSubmitted(true);
  };

  return (
    <div className='feedback-page'>
      <div className="container-fluid">
        <div className="row Profile_info_row mb-1"></div>
        {/* <Nav /> */}
      </div>
      <div className="wrapper">
        <Sidebar />
        
        <div className="A-review-feedback-page" id="unique-review-feedback-page">
          <h1 id="unique-feedback-title">Employee Feedback</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group_A" id="unique-colleague-feedback">
              <label htmlFor="colleagueFeedback">Feedback for Colleagues:</label>
              <textarea
                id="colleagueFeedback"
                value={colleagueFeedback}
                onChange={(e) => setColleagueFeedback(e.target.value)}
                placeholder="Provide your feedback..."
                required
              />
            </div>

            <div className="form-group_A" id="unique-manager-feedback">
              <label htmlFor="managerFeedback">Feedback for Manager:</label>
              <textarea
                id="managerFeedback"
                value={managerFeedback}
                onChange={(e) => setManagerFeedback(e.target.value)}
                placeholder="Provide your feedback..."
                required
              />
            </div>

            <div className="form-group_A" id="unique-direct-reports-feedback">
              <label htmlFor="directReportsFeedback">Feedback for Direct Reports:</label>
              <textarea
                id="directReportsFeedback"
                value={directReportsFeedback}
                onChange={(e) => setDirectReportsFeedback(e.target.value)}
                placeholder="Provide your feedback..."
                required
              />
            </div>

            <div className="form-group_A" id="unique-anonymous-checkbox">
              <label>
                <input
                
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className='Acheckbox'
                />
                Submit anonymously
              </label>
            </div>

            <div className="form-group_A" id="unique-overall-review">
              <label htmlFor="overallReview">Overall Review:</label>
              <textarea
                id="overallReview"
                value={overallReview}
                onChange={(e) => setOverallReview(e.target.value)}
                placeholder="Provide your overall review..."
                required
              />
            </div>
               
            <div className='feedBackbutton'>
            <button type="submit" id="unique-submit-button">Submit Review</button>
            </div>
          </form>

          {submitted && <p className="success-message" id="unique-success-message">Thank you for your feedback!</p>}
        </div>
      </div>
    </div>
  );
};

export default A_feedback;

