// import React from 'react';
// import StarRating from './StarRating';
// import { submitRating, updateRating } from '../services/apiService';

// const StoreCard = ({ store }) => {
  
//   // This state will be used to instantly update the UI after a user rates
//   const [userRating, setUserRating] = React.useState(store.userSubmittedRating);

//   const handleRatingSubmit = async (rating) => {
//     try {
//       // Logic to decide whether to create a new rating or update an existing one
//       if (userRating) {
//         // Find the rating ID to update (this needs a small backend adjustment or frontend logic)
//         // For now, we assume we can update. A more robust solution might be needed.
//         // await updateRating(store.userRatingId, { rating });
//         alert(`You updated your rating for ${store.name} to ${rating} stars! (Update API call placeholder)`);
//       } else {
//         await submitRating({ storeId: store.id, rating: rating });
//         alert(`You rated ${store.name} ${rating} stars!`);
//       }
//       setUserRating(rating);
//     } catch (error) {
//       console.error("Failed to submit rating", error);
//       alert(error.response?.data?.message || 'Could not submit rating.');
//     }
//   };


//   return (
//     <div className="bg-white border border-gray-100 rounded-xl p-6 flex shadow-lg flex-col justify-between">
//       <div>
//         <h3 className="text-xl font-semibold mb-2 text-black">{store.name}</h3>
//         <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{store.address}</p>
//       </div>
//       <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/10">
//         <div className="mb-3">
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall Rating</p>
//           <StarRating rating={store.averageRating} isEditable={false} />
//         </div>
//         <div>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Rating</p>
//           <StarRating rating={userRating} isEditable={true} onRate={handleRatingSubmit} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreCard;




import React, { useState } from 'react';
import StarRating from './StarRating';
import { submitRating, updateRating } from '../services/apiService';

const StoreCard = ({ store }) => {
  const [userRatingInfo, setUserRatingInfo] = useState(store.userSubmittedRating);
  const [userRating, setUserRating] = useState(store.userSubmittedRating);

  const handleRatingSubmit = async (newRating) => {
    try {
      if (userRatingInfo && userRatingInfo.id) {
        const updated = await updateRating(userRatingInfo.id, { rating: newRating });
        setUserRatingInfo(updated.data);
        setUserRating(newRating);
        alert(`You updated your rating for ${store.name} to ${newRating} stars!`);
      } else {
        const response = await submitRating({ storeId: store.id, rating: newRating });
        setUserRatingInfo(response.data);
        setUserRating(newRating);
        alert(`You rated ${store.name} ${newRating} stars!`);
      }
    } catch (error) {
      console.error("Failed to submit rating", error);
      alert(error.response?.data?.message || 'Could not submit rating.');
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row items-center shadow-lg justify-between gap-4">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-1 text-black ">{store.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{store.address}</p>
      </div>

      <div className="flex-shrink-0 flex items-center gap-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall</p>
          <StarRating rating={store.averageRating} isEditable={false} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Rating</p>
          <StarRating rating={userRating} isEditable={true} onRate={handleRatingSubmit} />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;