
import React, { useState, useEffect } from 'react';
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
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Using a local image path that's guaranteed to work
  const modelImage = '/lovable-uploads/c5937002-a589-4845-be5f-4eb9cd4fc60c.png';
  
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
            <div className="w-full h-full relative bg-gray-900 flex items-center justify-center">
              {/* Simplified approach without complex sci-fi elements */}
              <img 
                src={modelImage} 
                alt={`${type} selfie example`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", e.currentTarget.src);
                  setImageError(true);
                }}
              />
              
              {/* Simple text overlay */}
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
