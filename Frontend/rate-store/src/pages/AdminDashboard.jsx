import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/apiService';
import UserManagement from '../components/admin/UserManagement';
import StoreManagement from '../components/admin/StoreManagement';

const StatCard = ({ title, value }) => (
  <div className="shadow-lg bg-white border border-gray/10 rounded-lg p-6">
    <p className="text-sm text-gray-800">{title}</p>
    <p className="text-3xl font-bold text-black">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    getDashboardStats().then(response => {
      setStats(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-black">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Stores" value={stats.totalStores} />
        <StatCard title="Total Ratings" value={stats.totalRatings} />
      </div>

      <div className="flex border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 text-lg ${activeTab === 'users' ? 'border-b-2 border-gray/10 text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`py-2 px-4 text-lg ${activeTab === 'stores' ? 'border-b-2 border-gray/10 text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Manage Stores
        </button>
      </div>

      <div>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'stores' && <StoreManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;