
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Camera, Upload } from 'lucide-react';

interface UploadSelfieProps {
  type: 'front' | 'side';
  onBack: () => void;
  onContinue: (image: string) => void;
}

const UploadSelfie = ({ type, onBack, onContinue }: UploadSelfieProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Using the provided image as a fallback if the model image fails to load
  const modelImage = '/lovable-uploads/05bc2b0c-08ad-44e1-b2b3-758667e111c5.png';
  // Use the newly uploaded image as fallback if the original fails
  const fallbackImage = '/lovable-uploads/c6c08626-ce57-4157-8f9d-df9c6175a4f8.png';
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-semibold text-white ml-2">
          {type === 'front' ? 'Facial Analysis' : 'Profile Analysis'}
        </h2>
      </div>
      
      <div className="selfie-container aspect-[3/4] mb-4 flex-shrink-0 max-h-[60vh] overflow-hidden">
        <div className="w-full h-full rounded-3xl overflow-hidden relative">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt={`${type} selfie`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full relative bg-gray-900">
              {/* Use the fallback image if the primary one fails */}
              <img 
                src={imageError ? fallbackImage : modelImage} 
                alt={`${type} selfie example`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Image failed to load, using fallback");
                  setImageError(true);
                }}
              />
              {/* Sci-fi overlay elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Facial mesh grid */}
                <div className="absolute inset-0 bg-[url('/lovable-uploads/499c6fd7-ae34-4d2b-aa9b-0a938e5eff40.png')] bg-cover opacity-30"></div>
                
                {/* Scan lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-outfitopia-purple/20 to-transparent animate-pulse-light"></div>
                
                {/* Facial tracking points */}
                <div className="absolute inset-0">
                  <div className="absolute left-1/2 top-[30%] w-2 h-2 rounded-full bg-outfitopia-purple opacity-80" style={{ transform: 'translate(-50%, -50%)' }}></div>
                  <div className="absolute left-[45%] top-[30%] w-1 h-1 rounded-full bg-outfitopia-purple opacity-70" style={{ transform: 'translate(-50%, -50%)' }}></div>
                  <div className="absolute left-[55%] top-[30%] w-1 h-1 rounded-full bg-outfitopia-purple opacity-70" style={{ transform: 'translate(-50%, -50%)' }}></div>
                  <div className="absolute left-1/2 top-[38%] w-1 h-1 rounded-full bg-outfitopia-purple opacity-70" style={{ transform: 'translate(-50%, -50%)' }}></div>
                  <div className="absolute left-1/2 top-[45%] w-1.5 h-1.5 rounded-full bg-outfitopia-purple opacity-80" style={{ transform: 'translate(-50%, -50%)' }}></div>
                </div>
                
                {/* Text overlay */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-xl">
                  <div className="text-shadow">Get your perfect fit recommendations</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto space-y-4 pb-4">
        {selectedImage && (
          <Button 
            variant="secondary" 
            onClick={() => setSelectedImage(null)}
          >
            Use Another
          </Button>
        )}
        
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="w-full">
            <Button className="w-full">
              <Upload className="w-5 h-5 mr-2" />
              {selectedImage ? 'Continue' : 'Upload or take a selfie'}
            </Button>
          </div>
        </label>
        
        {selectedImage && (
          <Button 
            onClick={() => onContinue(selectedImage)}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadSelfie;
