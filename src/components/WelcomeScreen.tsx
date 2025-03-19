
import React from 'react';
import Button from './Button';
import { Plus } from 'lucide-react';
import CursorSmoke from './CursorSmoke';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 -z-10"></div>
      
      {/* Cursor smoke effect */}
      <CursorSmoke />
      
      {/* Floating product images */}
      <div className="floating-products">
        {/* Top row */}
        <div className="absolute top-0 left-4 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Banana" className="w-16 h-16 object-cover rounded-2xl" />
        </div>
        <div className="absolute top-12 right-8 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Person" className="w-16 h-16 object-cover rounded-2xl" />
        </div>
        
        {/* Middle row left */}
        <div className="absolute top-1/4 left-12 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Shoes" className="w-20 h-20 object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-1/3 left-20 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Sunglasses" className="w-20 h-20 object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-1/4 left-8 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Earrings" className="w-16 h-16 object-cover rounded-2xl" />
        </div>
        
        {/* Middle row right */}
        <div className="absolute top-1/4 right-12 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Heart" className="w-16 h-16 object-cover rounded-2xl" />
        </div>
        <div className="absolute top-1/3 right-4 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Handbag" className="w-20 h-20 object-cover rounded-2xl" />
        </div>
        
        {/* Bottom row */}
        <div className="absolute bottom-20 left-12 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Box" className="w-20 h-20 object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-32 right-12 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Glasses" className="w-20 h-20 object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-16 right-20 bg-white rounded-3xl p-2 shadow-md">
          <img src="/lovable-uploads/9b4042db-ca6a-4d14-b328-44a56aa470ca.png" alt="Sweater" className="w-16 h-16 object-cover rounded-2xl" />
        </div>
      </div>
      
      {/* Center content */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-3xl p-12 w-[80%] max-w-sm mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 bg-white p-3 rounded-xl">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-16 bg-pink-500 rounded-full"></div>
            <div className="h-3 w-16 bg-purple-500 rounded-full"></div>
            <div className="h-3 w-16 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Text */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Discover Your</h1>
          <h1 className="text-4xl font-bold text-white mb-2">Perfect Fit,</h1>
          <h1 className="text-4xl font-bold text-white">No Cap</h1>
        </div>
        
        {/* Button */}
        <button 
          onClick={onStart}
          className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full w-full"
        >
          <Plus size={20} /> Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
