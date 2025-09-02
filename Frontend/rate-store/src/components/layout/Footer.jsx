import React from 'react';
import logo from '../../assets/logo.png';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="w-full max-w-350 mx-auto bg-white backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20 mt-6 rounded-2xl">
  <footer className="border-white/10 mt-6 pb-6 text-center text-gray-400">
    <img src={logo} alt="RateStore Logo" className="h-8 w-auto mx-auto mb-4" />
    <p>Roxiler Systems FullStack Intern Coding Challenge - Jayesh Patil</p>
    <div className="flex justify-center gap-6 my-6">
      <a href="https://github.com/JayeshPatil163" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaGithub /></a>
      <a href="https://www.linkedin.com/in/jayesh-patil-1901b1297" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaLinkedin /></a>
      <a href="https://leetcode.com/u/Jayesh_Patil_27/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white"><FaCode /></a>
    </div>
    <p>Contact: <a href="mailto:jayeshjpatil163@gmail.com" className="hover:text-white">jayeshjpatil163@gmail.com</a></p>
    <p className="text-xs mt-6">&copy; 2025 RateStore. All Rights Reserved.</p>
  </footer>
  </div>
    );
};

export default Footer;