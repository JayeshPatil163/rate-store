import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, getUserDetails } from '../../services/apiService';
import AddUserModal from './AddUserModal';
import UserDetailsPanel from './UserDetailsPanel';
import { useSorting } from '../../hooks/useSorting.js';
import useDebounce from '../../hooks/useDebounce.js';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const SortableHeader = ({ children, name, sortConfig, requestSort }) => {
  const isSorted = sortConfig.key === name;
  const directionIcon = isSorted ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort />;
  return (
    <th className="p-3">
      <button onClick={() => requestSort(name)} className="flex items-center gap-2 font-semibold">
        {children} {directionIcon}
      </button>
    </th>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const { sortConfig, requestSort } = useSorting({ key: 'name', direction: 'asc' });


  useEffect(() => {
    getUsers(filters).then(response => setUsers(response.data));
  }, []);

  // // const fetchSortedUsers = useCallback(() => {
  // //   const params = {
  // //     sort: sortConfig.key,
  // //     order: sortConfig.direction
  // //   };
  // //   getUsers(filters, params).then(response => setUsers(response.data));
  // // }, [sortConfig, filters]);

  // // useEffect(() => {
  // //   const timer = setTimeout(() => {
  // //     fetchSortedUsers();
  // //   }, 300);

  // //   return () => clearTimeout(timer);
  // // }, [sortConfig]);

  // const fetchUsers = useCallback(() => {
  //   getUsers(filters).then(response => setUsers(response.data));
  // }, [filters]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetchUsers();
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, [filters]);

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters(prev => ({ ...prev, [name]: value }));
  // };

  const handleViewDetails = async (userId) => {
    setIsDetailsLoading(true);
    setSelectedUser(true);
    try {
      const response = await getUserDetails(userId);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      setSelectedUser(null);
    } finally {
      setIsDetailsLoading(false);
    }
  };


  const debouncedFilters = useDebounce(filters, 500);

  // This single useEffect handles all data fetching
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // It combines the latest debounced filters and the latest sort config
        const params = {
          ...debouncedFilters,
          sort: sortConfig.key,
          order: sortConfig.direction,
        };
        const response = await getUsers(params);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedFilters, sortConfig]); // It runs if EITHER the filters OR the sort config changes

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // A function to pass to the modal so it can trigger a refresh
  const refreshUsers = () => {
     // Re-fetch with current filters and sorting
    const fetch = async () => {
      const params = { ...debouncedFilters, sort: sortConfig.key, order: sortConfig.direction };
      const response = await adminGetUsers(params);
      setUsers(response.data);
    };
    fetch();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black">User List</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white font-semibold py-2 px-5 rounded-full hover:opacity-80">
          Add New User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input type="text" name="name" placeholder="Filter by Name..." value={filters.name} onChange={handleFilterChange} className="text-black p-2 rounded-lg border" />
        <input type="text" name="email" placeholder="Filter by Email..." value={filters.email} onChange={handleFilterChange} className="text-black p-2 rounded-lg border " />
        <input type="text" name="address" placeholder="Filter by Address..." value={filters.address} onChange={handleFilterChange} className="text-black p-2 rounded-lg border" />
        <select name="role" value={filters.role} onChange={handleFilterChange} className="bg-black p-2 rounded-lg border">
          <option value="">All Roles</option>
          <option value="Normal_User">Normal User</option>
          <option value="Store_Owner">Store Owner</option>
          <option value="System_Administrator">System Administrator</option>
        </select>
      </div>
      <div className="bg-white rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-black border-gray-100">
              <SortableHeader name="name" sortConfig={sortConfig} requestSort={requestSort}>Name</SortableHeader>
              <SortableHeader name="email" sortConfig={sortConfig} requestSort={requestSort}>Email</SortableHeader>
              <SortableHeader name="address" sortConfig={sortConfig} requestSort={requestSort}>Address</SortableHeader>
              <SortableHeader name="role" sortConfig={sortConfig} requestSort={requestSort}>Role</SortableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-black text-black hover:text-white" onClick={() => handleViewDetails(user.id)}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address}</td>
                <td className='p-3'>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserDetailsPanel
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        isLoading={isDetailsLoading}
      />

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => getUsers().then(response => setUsers(response.data))}
      />
    </div>
  );
};

export default UserManagement;