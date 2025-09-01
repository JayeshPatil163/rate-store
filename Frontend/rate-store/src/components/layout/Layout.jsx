import React, { useState, cloneElement } from 'react';
import Navbar from './Navbar';
import Modal from '../Modal';
import { loginUser, registerUser } from '../../services/apiService';
import {  useAuth } from '../../context/AuthContext';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onLogin(formData); };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
        <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg hover:opacity-80 transition mt-2">Login</button>
      </form>
    </Modal>
  );
};
const RegisterModal = ({ isOpen, onClose, onRegister }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); onRegister(formData); };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="name" type="text" placeholder="Full Name (min 20 chars)" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <input name="password" type="password" placeholder="Password (8-16 chars, 1 uppercase, 1 special)" onChange={handleChange} required className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <textarea name="address" placeholder="Address (max 400 chars)" onChange={handleChange} className="bg-black/20 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 h-24 resize-none"></textarea>
                <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg hover:opacity-80 transition mt-2">Sign Up</button>
            </form>
        </Modal>
    );
};


const Layout = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { user, login, logout } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      login(response.data);
      setIsLoginOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      login(response.data);
      setIsRegisterOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-1">
      <Navbar
        user={user}
        logout={logout}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <main className="w-full max-w-350 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 dark:shadow-3xl p-8 md:p-12 mt-4">
        {cloneElement(children, { onRegisterClick: () => setIsRegisterOpen(true) })}
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onRegister={handleRegister} />
    </div>
  );
};

export default Layout;