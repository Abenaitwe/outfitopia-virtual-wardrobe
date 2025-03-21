
import React from 'react';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 -z-10"></div>
      
      {/* Floating product images with different layout for mobile */}
      <div className="floating-products absolute inset-0 pointer-events-none">
        {isMobile ? (
          // Mobile layout - focus on corners and top/bottom to avoid center content
          <>
            {/* Top left */}
            <div className="absolute top-[2%] left-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/b80ac5fb-dbdc-41ec-b41a-364d1f7c7f1c.png" alt="Knitted cardigan" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Top right */}
            <div className="absolute top-[2%] right-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/15e13488-84f0-493f-8bcf-37912404bfb1.png" alt="Blue cardigan" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Bottom left - moved lower */}
            <div className="absolute bottom-[10%] left-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/d6caae61-8897-4469-9d50-0fdb7542b866.png" alt="Beige outfit" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Bottom right - moved lower */}
            <div className="absolute bottom-[10%] right-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/1b0f0397-b4e9-4dc4-93ce-7eecab2247aa.png" alt="Elegant dress" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
          </>
        ) : (
          // Desktop layout - spread images around the screen
          <>
            {/* Left column */}
            <div className="absolute top-[15%] left-[10%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/b80ac5fb-dbdc-41ec-b41a-364d1f7c7f1c.png" alt="Knitted cardigan" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[40%] left-[5%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/1104a7a7-4a98-423e-b569-c4447b4aee3c.png" alt="Crop top outfit" className="w-36 h-36 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[70%] left-[12%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/d6caae61-8897-4469-9d50-0fdb7542b866.png" alt="Beige outfit" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
            
            {/* Right column */}
            <div className="absolute top-[12%] right-[8%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/15e13488-84f0-493f-8bcf-37912404bfb1.png" alt="Blue cardigan" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[42%] right-[5%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/f3d3c3d7-8481-4178-b51c-d80c35cff16f.png" alt="Pink outfit" className="w-36 h-36 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[72%] right-[10%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/1b0f0397-b4e9-4dc4-93ce-7eecab2247aa.png" alt="Elegant dress" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
            
            {/* Additional images for balance */}
            <div className="absolute top-[25%] left-[26%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/22d4f7ce-42fd-40f7-ac39-6f8c5ae5dc04.png" alt="Olive outfit" className="w-36 h-36 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[30%] right-[25%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/14518733-64cc-4f99-be2c-7ad571a43368.png" alt="Green polo" className="w-36 h-36 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[60%] left-[28%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/fb921fc3-d545-454c-a0cf-157b3b12c71a.png" alt="Zipper polo" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
            <div className="absolute top-[55%] right-[30%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/6e9a743c-d190-447c-96f7-2d6c39e7272a.png" alt="Wide jeans" className="w-32 h-32 object-cover rounded-2xl" />
            </div>
          </>
        )}
      </div>
      
      {/* Center content */}
      <div className={`relative z-10 bg-white/20 backdrop-blur-md rounded-3xl p-8 ${isMobile ? 'w-[90%]' : 'w-[80%] max-w-sm'} mx-auto flex flex-col items-center`}>
        {/* Logo */}
        <div className="mb-6 bg-white p-3 rounded-xl">
          <div className="flex flex-col gap-1">
            <div className="h-3 w-16 bg-pink-500 rounded-full"></div>
            <div className="h-3 w-16 bg-purple-500 rounded-full"></div>
            <div className="h-3 w-16 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Text */}
        <div className="text-center mb-8">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-white mb-2`}>Discover Your</h1>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-white mb-2`}>Perfect Fit,</h1>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-white`}>No Cap</h1>
        </div>
        
        {/* Button */}
        <button 
          onClick={onStart}
          className={`flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm text-white font-semibold ${isMobile ? 'py-2.5 px-5' : 'py-3 px-6'} rounded-full w-full`}
        >
          <Plus size={isMobile ? 18 : 20} /> Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
