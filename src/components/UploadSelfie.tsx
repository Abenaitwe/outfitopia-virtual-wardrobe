
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Camera, Upload } from 'lucide-react';

interface UploadSelfieProps {
  type: 'front' | 'side';
  onBack: () => void;
  onContinue: (image: string) => void;
  onTabChange?: (tab: string) => void; // New prop to allow changing tabs
}

const UploadSelfie = ({ type, onBack, onContinue, onTabChange }: UploadSelfieProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  // Reset error state when component mounts
  useEffect(() => {
    setImageError(false);
  }, []);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setImageError(false); // Reset error state when new image is selected
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (selectedImage) {
      onContinue(selectedImage);
      // Navigate to closet tab if onTabChange is provided
      if (onTabChange) {
        onTabChange('closet');
      }
    }
  };
  
  // Instead of using an external image that might not load, let's create a UI placeholder
  // This doesn't rely on external images that could fail to load
  
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
            <div className="w-full h-full relative bg-gray-800 flex items-center justify-center">
              {/* Placeholder design that doesn't rely on external images */}
              <div className="text-center p-6">
                <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-white text-lg font-medium mb-2">
                  Upload your {type === 'front' ? 'front facing' : 'profile'} photo
                </p>
                <p className="text-gray-400 text-sm">
                  This helps us provide accurate recommendations for your body type
                </p>
              </div>
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-xl">
                <div className="text-shadow">Get your perfect fit recommendations</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto space-y-4 pb-4">
        {selectedImage && (
          <Button 
            onClick={handleContinue}
            className="w-full"
          >
            Continue
          </Button>
        )}
        
        {selectedImage && (
          <Button 
            variant="secondary" 
            onClick={() => setSelectedImage(null)}
            className="w-full"
          >
            Use Another Photo
          </Button>
        )}
        
        {!selectedImage && (
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="upload-selfie"
            />
            <Button 
              className="w-full"
              onClick={() => document.getElementById('upload-selfie')?.click()}
            >
              <Upload className="w-5 h-5 mr-2" />
              Drop your Pic
            </Button>
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadSelfie;
