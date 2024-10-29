import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.length === 0 ? (
          <li>No reviews yet.</li>
        ) : (
          reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.name}</strong>: {review.comment}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
