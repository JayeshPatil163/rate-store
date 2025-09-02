import React, { useState, useEffect } from 'react';
import { getStoreOwnerDashboard } from '../services/apiService';
import StarRating from '../components/StarRating';

const StoreOwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getStoreOwnerDashboard();
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-12">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-500">{error}</div>;
  }
  
  if (!dashboardData) {
    return <div className="text-center p-12">No store information found.</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-black">{dashboardData.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome to your store dashboard.</p>

      <div className="bg-white border border-gray-100 shadow-lg rounded-lg p-6 mb-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Average Rating</p>
        <div className="flex items-center justify-center gap-4">
          <p className="text-4xl font-bold text-black">
            {(dashboardData.averageRating ?? 0).toFixed(1)}
          </p>
          <StarRating rating={dashboardData.averageRating} isEditable={false} />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-6 text-black">User Reviews ({dashboardData.ratings.length})</h2>
      <div className="bg-white border border-white/10 rounded-lg">
        <table className="w-full text-left text-black">
          <thead className="border-b border-gray-300">
            <tr className='bg-white border-b border-gray-200'>
              <th className="p-4">User Name</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.ratings.map(rating => (
              <tr key={rating.id} className="border-b border-gray-200 dark:border-white/5 last:border-b-0">
                <td className="p-4">
                  <p>{rating.user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{rating.user.email}</p>
                </td>
                <td className="p-4">
                  <StarRating rating={rating.rating} isEditable={false} />
                </td>
                <td className="p-4">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;