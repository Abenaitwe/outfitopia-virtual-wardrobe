
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b60fb" /> {/* Purple */}
          <stop offset="50%" stopColor="#F97316" /> {/* Orange */}
          <stop offset="100%" stopColor="#ea384c" /> {/* Pinkish-red */}
        </linearGradient>
        <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9b60fb" /> {/* Purple */}
          <stop offset="50%" stopColor="#F97316" /> {/* Orange */}
          <stop offset="100%" stopColor="#ea384c" /> {/* Pinkish-red */}
        </linearGradient>
      </defs>
      
      {/* First line - Purple */}
      <rect x="20" y="30" width="60" height="10" rx="5" fill="url(#logoGradient1)" />
      
      {/* Second line - Orange */}
      <rect x="20" y="45" width="60" height="10" rx="5" fill="url(#logoGradient2)" />
      
      {/* Third line - Pinkish-red */}
      <rect x="20" y="60" width="60" height="10" rx="5" fill="url(#logoGradient1)" />
    </svg>
  );
};

export default Logo;
