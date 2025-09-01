import React from 'react';
import AnimatedSpiral from '../components/AnimatedSpiral';

const LandingPage = ({ onRegisterClick }) => {
  return (
    <div className="grid md:grid-cols-2 items-center gap-12 py-12">
      {/* Left Column */}
      <div className="text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Honest Ratings,
          <br />
          Trusted Stores
        </h1>
        <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-300 mb-8">
          The ultimate platform for discovering, rating, and sharing your experiences with local stores.
        </p>
        <button
          onClick={onRegisterClick}
          className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:opacity-80 transition-transform hover:scale-105"
        >
          Start Rating Now
        </button>
      </div>
      {/* Right Column */}
      <div>
        <AnimatedSpiral />
      </div>
    </div>
  );
};

export default LandingPage;