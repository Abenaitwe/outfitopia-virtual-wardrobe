
import React, { useState } from 'react';
import Button from './Button';
import { ArrowLeft, Camera, Upload } from 'lucide-react';

interface UploadSelfieProps {
  type: 'front' | 'side';
  onBack: () => void;
  onContinue: (image: string) => void;
}

const UploadSelfie = ({ type, onBack, onContinue }: UploadSelfieProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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
  
  const placeholderImage = type === 'front' 
    ? '/lovable-uploads/454958ca-1d1d-4772-8e04-67ed3036bfe6.png'
    : '/lovable-uploads/90020579-9e5e-4a5b-8f3e-9aa3244b5e8a.png';
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-semibold text-white ml-2">
          Upload a {type} selfie
        </h2>
      </div>
      
      <div className="selfie-container aspect-[3/4] mb-6">
        <div className="w-full h-full rounded-3xl overflow-hidden">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt={`${type} selfie`}
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={placeholderImage} 
              alt={`${type} selfie example`}
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>
      </div>
      
      <div className="mt-auto space-y-4">
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
          <Button as="span">
            <Upload className="w-5 h-5 mr-2" />
            {selectedImage ? 'Continue' : 'Upload or take a selfie'}
          </Button>
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
