import React, { useState } from 'react';
import Modal from '../Modal';
import { addStore } from '../../services/apiService';

const AddStoreModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    storeOwnerEmail: '',
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
      await addStore(formData);
      alert('Store created successfully!');
      onSuccess();
      onClose();
    } catch (err) {
        console.error("API Error Response:", err.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-black">Add New Store</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Store Name" onChange={handleChange} required className="bg-black/20 text-black dark:bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="email" type="email" placeholder="Store Email" onChange={handleChange} required className="bg-black/20 text-black dark:bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="storeOwnerEmail" type="email" placeholder="Owner's Email Address" onChange={handleChange} required className="bg-black/20 text-black dark:bg-black/20 p-3 rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black" />
        <textarea name="address" placeholder="Store Address" onChange={handleChange} required className="bg-black/20 dark:bg-black/20 p-3 text-black rounded-lg border dark:border-black/20 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none"></textarea>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={isLoading} className="bg-black text-white font-bold py-3 rounded-lg hover:opacity-80 transition mt-2 disabled:opacity-50">
          {isLoading ? 'Creating...' : 'Create Store'}
        </button>
      </form>
    </Modal>
  );
};

export default AddStoreModal;