import React from 'react';
import ThemeToggle from '../ThemeToggle';
import logo from '../../assets/logo.png';

const Navbar = ({ user, logout, onLoginClick, onRegisterClick }) => {
  return (
    <div className="w-full max-w-350 mx-auto bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 dark:shadow-3xl rounded-2xl p-4">
      <nav className="flex justify-between items-center">
        <img 
          src={logo} 
          alt="RateStore Logo" 
          className="h-8 w-auto"
        />
        <div className="hidden md:flex gap-8 text-black dark:text-gray-300 absolute left-1/2 -translate-x-1/2">
          <a href="#" className="hover:text-white dark:text-gray-300 transition-colors">Stores</a>
          <a href="#" className="hover:text-white dark:text-gray-300 transition-colors">About</a>
          <a href="#" className="hover:text-white dark:text-gray-300 transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-10">
        <ThemeToggle />
        {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800 dark:text-gray-200">Welcome, {user.name.split(' ')[1]}</span>
              <button
                onClick={logout}
                className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:opacity-80 transition-opacity"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button onClick={onLoginClick} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mr-4">
                Login
              </button>
              <button onClick={onRegisterClick} className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:opacity-80 transition-opacity">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;