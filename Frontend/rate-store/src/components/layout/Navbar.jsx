import React from 'react';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    // This wrapper makes the Navbar a separate floating glass element
    <div className="w-full max-w-7xl mx-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">RateStore</div>
        <div className="hidden md:flex gap-8 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Stores</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div>
          <button onClick={onLoginClick} className="text-gray-300 hover:text-white transition-colors mr-6">
            Login
          </button>
          <button onClick={onRegisterClick} className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:opacity-80 transition-opacity">
            Register
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;