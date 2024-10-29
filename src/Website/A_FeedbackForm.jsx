import React, { useState } from 'react';

const A_FeedbackForm = ({ addReview }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    const newReview = { name, comment };
    addReview(newReview);
    setName('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Your Feedback</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Your Feedback"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default A_FeedbackForm;