import React, { useState } from 'react';
import { features } from '../data';

const storeIcons = [
  'https://cdn-icons-png.flaticon.com/128/2969/2969306.png',
  'https://cdn-icons-png.flaticon.com/128/2385/2385899.png',
  'https://cdn-icons-png.flaticon.com/128/7560/7560804.png',
  'https://cdn-icons-png.flaticon.com/128/15838/15838556.png',
];

const Icon = ({ imgSrc, position, animationDelay }) => (
  <img
    src={imgSrc}
    alt="icon"
    className="absolute w-12 h-12 rounded-full bg-black/50 p-2 border border-white/10 shadow-lg"
    style={{ 
      top: position.top, 
      left: position.left,
      transform: 'translate(-50%, -50%)', 
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${animationDelay}s`,
    }}
  />
);

const FeatureCircle = ({ position, onMouseEnter, onMouseLeave }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="absolute w-6 h-6 rounded-full cursor-pointer bg-gradient-to-br from-black-500 to-indigo-600 border border-white/50 shadow-lg shadow-purple-500/30 hover:scale-125 transition-transform"
    style={{ 
        top: position.top, 
        left: position.left,
        transform: 'translate(-50%, -50%)',
    }}
  ></div>
);

const AnimatedSpiral = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const iconPositions = [
    { top: '31%', left: '59%' },
    { top: '75%', left: '75%' },
    { top: '50%', left: '20%' },
    { top: '3%', left: '25%' },
  ];

  const featurePositions = [
    { top: '85%', left: '25%' },
    { top: '65%', left: '74%' },
    { top: '0%', left: '50%' },
    { top: '65%', left: '37%' },
  ];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      <div className="absolute w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 500 500">
          <ellipse cx="250" cy="250" rx="250" ry="250" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          <ellipse cx="250" cy="250" rx="180" ry="180" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          <ellipse cx="250" cy="250" rx="120" ry="120" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-bold text-white">200+</h2>
        <p className="text-gray-400">Stores Registered</p>
      </div>

      {storeIcons.map((icon, index) => (
        <Icon key={`icon-${index}`} imgSrc={icon} position={iconPositions[index]} animationDelay={index * 0.5} />
      ))}
      
      {features.map((feature, index) => (
        <FeatureCircle
          key={`feature-${index}`}
          position={featurePositions[index]}
          onMouseEnter={() => setHoveredFeature({ ...feature, position: featurePositions[index] })}
          onMouseLeave={() => setHoveredFeature(null)}
        />
      ))}

      {hoveredFeature && (
        <div className="absolute w-60 p-4 bg-black-900/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-20 transition-all duration-300"
          style={{ 
            top: hoveredFeature.position.top, 
            left: hoveredFeature.position.left,
            transform: 'translateY(-120%) translateX(-50%)'
          }}
        >
          <h4 className="font-semibold text-white mb-1">{hoveredFeature.title}</h4>
          <p className="text-sm text-gray-400">{hoveredFeature.description}</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedSpiral;