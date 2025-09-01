// src/components/StoreCard.jsx
import React from 'react';
import StarRating from './StarRating'; // We will create this next
import { submitRating, updateRating } from '../services/apiService';

const StoreCard = ({ store }) => {
  
  // This state will be used to instantly update the UI after a user rates
  const [userRating, setUserRating] = React.useState(store.userSubmittedRating);

  const handleRatingSubmit = async (rating) => {
    try {
      // Logic to decide whether to create a new rating or update an existing one
      if (userRating) {
        // Find the rating ID to update (this needs a small backend adjustment or frontend logic)
        // For now, we assume we can update. A more robust solution might be needed.
        // await updateRating(store.userRatingId, { rating });
        alert(`You updated your rating for ${store.name} to ${rating} stars! (Update API call placeholder)`);
      } else {
        await submitRating({ storeId: store.id, rating: rating });
        alert(`You rated ${store.name} ${rating} stars!`);
      }
      setUserRating(rating);
    } catch (error) {
      console.error("Failed to submit rating", error);
      alert(error.response?.data?.message || 'Could not submit rating.');
    }
  };


  return (
    <div className="bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white dark:text-white">{store.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{store.address}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/10">
        <div className="mb-3">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall Rating</p>
          <StarRating rating={store.averageRating} isEditable={false} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Rating</p>
          <StarRating rating={userRating} isEditable={true} onRate={handleRatingSubmit} />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;