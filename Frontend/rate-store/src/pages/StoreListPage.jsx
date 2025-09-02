// src/pages/StoreListPage.jsx
import React, { useState, useEffect } from 'react';
import { getStores } from '../services/apiService';
import StoreCard from '../components/StoreCard';

const StoreListPage = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ name: '', address: '' });

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

  const fetchUsers = React.useCallback(() => {
      getStores(filters).then(response => setStores(response.data));
    }, [filters]);

  useEffect(() => {
      const timer = setTimeout(() => {
        fetchUsers();
      }, 300);
  
      return () => clearTimeout(timer);
    }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="text-center p-12">Loading stores...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-black">All Stores</h1>
      <p className="text-gray-800 mb-8">Browse and rate stores on the platform.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Search by store name..."
          value={filters.name}
          onChange={handleFilterChange}
          className="text-black p-2 rounded-lg border"
        />
        <input
          type="text"
          name="address"
          placeholder="Search by address keyword..."
          value={filters.address}
          onChange={handleFilterChange}
          className="text-black p-2 rounded-lg border"
        />
      </div>

      <div className="flex flex-col gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreListPage;