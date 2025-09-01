// src/components/StarRating.jsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating = 0, onRate, isEditable = true }) => {
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => isEditable && onRate(currentRating)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer"
              size={24}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => isEditable && setHover(currentRating)}
              onMouseLeave={() => isEditable && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;