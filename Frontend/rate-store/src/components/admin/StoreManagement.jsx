import React, { useState, useEffect, useCallback } from 'react';
import { getStores, addStore } from '../../services/apiService';
import AddStoreModal from './AddStoreModal';

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    getStores().then(response => setStores(response.data));
  }, []);

  const fetchUsers = useCallback(() => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">Store List</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white font-semibold py-2 px-5 rounded-full hover:opacity-80">
          Add New Store
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">
        <input type="text" name="name" placeholder="Filter by Name..." value={filters.name} onChange={handleFilterChange} className="text-black p-2 rounded-lg border" />
        <input type="text" name="email" placeholder="Filter by Email..." value={filters.email} onChange={handleFilterChange} className="text-black p-2 rounded-lg border " />
        <input type="text" name="address" placeholder="Filter by Address..." value={filters.address} onChange={handleFilterChange} className="text-black p-2 rounded-lg border" />
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-black border-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3">Avg. Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id} className="hover:bg-black text-black hover:text-white">
                <td className="p-3">{store.name}</td>
                <td className="p-3">{store.email}</td>
                <td className="p-3 truncate max-w-xs">{store.address}</td>
                <td className="p-3">{(store.averageRating ?? 0).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => getStores().then(response => setStores(response.data))}
      />
    </div>
  );
};

export default StoreManagement;