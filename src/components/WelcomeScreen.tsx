import React from 'react';
import { LockKeyhole } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
interface WelcomeScreenProps {
  onStart: () => void;
}
const WelcomeScreen = ({
  onStart
}: WelcomeScreenProps) => {
  const isMobile = useIsMobile();
  return <div className="relative flex flex-col items-center justify-center h-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 -z-10"></div>
      
      {/* Floating product images with different layout for mobile */}
      <div className="floating-products absolute inset-0 pointer-events-none">
        {isMobile ?
      // Mobile layout - focus on corners and top/bottom to avoid center content
      <>
            {/* Top left - men's outfit */}
            <div className="absolute top-[2%] left-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/fa3bc1ae-171c-4ece-afd7-1c37c903f081.png" alt="Blue cardigan outfit" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Top right - men's outfit */}
            <div className="absolute top-[2%] right-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/3bf66d06-9092-454c-8037-263c1b16957e.png" alt="Knitwear outfit" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Bottom left - women's outfit - positioned even lower */}
            <div className="absolute bottom-[1%] left-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/c87c850b-e173-4851-bc0b-b5594c389b56.png" alt="Black top white pants" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
            
            {/* Bottom right - women's outfit - positioned even lower */}
            <div className="absolute bottom-[1%] right-[2%] bg-white rounded-3xl p-3 shadow-md">
              <img src="/lovable-uploads/ddb9e997-839c-4b0c-9180-e9c9c26c0964.png" alt="Pink top white pants" className="w-20 h-20 object-cover rounded-2xl" />
            </div>
          </> :
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
          </>}
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
        
        {/* Button - Updated to exactly match the image */}
        <button onClick={onStart} className={`flex items-center justify-center gap-3 bg-gradient-to-r from-[#f0f1f6] to-[#e6e7ec] text-black font-medium ${isMobile ? 'py-3.5 px-6' : 'py-4 px-8'} 
          rounded-full w-full border border-white/60 shadow-[0_8px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all 
          active:scale-[0.98]`}>
          <div className="bg-white p-2 rounded-full flex items-center justify-center border border-[#e0e1e6]">
            <LockKeyhole size={isMobile ? 16 : 18} className="text-black" />
          </div>
          <span className="text-[#1a1a1a] font-normal text-lg">Get Dripping</span>
        </button>
      </div>
    </div>;
};
export default WelcomeScreen;