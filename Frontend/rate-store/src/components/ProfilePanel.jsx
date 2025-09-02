import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { updatePassword } from '../services/apiService';

const ProfilePanel = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      return;
    }
    try {
      await updatePassword({ password: formData.newPassword });
      setMessage("Password updated successfully!");
      setIsSuccess(true);
      setFormData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password.");
      setIsSuccess(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? '' : 'pointer-events-none'}`}>
      <div onClick={onClose} className={`absolute inset-0 border-black bg-black/30 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-black shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-black pb-4 mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Your Profile</h2>
            <button onClick={onClose} className="text-2xl hover:opacity-70">&times;</button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Welcome, {user?.name}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Change Password</h3>
            <input name="newPassword" type="password" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required className="bg-white dark:bg-black/20 p-3 rounded-lg border dark:border-white/20"/>
            <input name="confirmPassword" type="password" placeholder="Confirm New Password" value={formData.confirmPassword} onChange={handleChange} required className="bg-white dark:bg-black/20 p-3 rounded-lg border dark:border-white/20"/>
            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black font-bold py-3 rounded-lg">Update Password</button>
            {message && <p className={isSuccess ? 'text-green-500' : 'text-red-500'}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;