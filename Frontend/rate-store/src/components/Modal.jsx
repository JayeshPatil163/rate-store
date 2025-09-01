import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-8 bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-2xl text-brand-light"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-brand-gray transition"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;