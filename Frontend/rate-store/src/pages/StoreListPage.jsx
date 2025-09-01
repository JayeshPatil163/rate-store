// src/pages/StoreListPage.jsx
import React, { useState, useEffect } from 'react';
import { getStores } from '../services/apiService';
import StoreCard from '../components/StoreCard';

const StoreListPage = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        const response = await getStores();
        setStores(response.data);
      } catch (err) {
        setError('Failed to fetch stores. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (isLoading) {
    return <div className="text-center p-12">Loading stores...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-white dark:text-white">All Stores</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Browse and rate stores on the platform.</p>

      {/* TODO: Add Search and Filter inputs here */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreListPage;