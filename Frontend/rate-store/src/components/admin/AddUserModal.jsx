import React, { useState } from 'react';
import Modal from '../Modal';
import { addUserByAdmin } from '../../services/apiService';

const AddUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'Normal_User',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await addUserByAdmin(formData);
      alert('User created successfully!');
      onSuccess();
      onClose();
    } catch (err) {
        alert(err.response?.data?.message || 'Failed to create user. Check passowrd length must be 8-16 characters and name must be 20-60 characters long');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-black">Add New User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Full Name (min 20 chars)" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 ffocus:ring-black" />
        <textarea name="address" placeholder="Address" onChange={handleChange} className="bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none"></textarea>
        
        <div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-black">User Role</label>
          <select name="role" id="role" onChange={handleChange} value={formData.role} className="w-full bg-black p-3 rounded-lg border dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-black">
            <option value="Normal_User">Normal User</option>
            <option value="Store_Owner">Store Owner</option>
            <option value="System_Administrator">System Administrator</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={isLoading} className="bg-black text-white font-bold py-3 rounded-lg hover:opacity-80 transition mt-2 disabled:opacity-50">
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;