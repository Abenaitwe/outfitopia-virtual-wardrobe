
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { ArrowLeft } from 'lucide-react';
import TryOnImage from './outfit-preview/TryOnImage';
import OutfitOptions from './outfit-preview/OutfitOptions';
import StyleAnalysis from './outfit-preview/StyleAnalysis';
import { generateTryOnImage } from '@/services/tryOnService';

interface OutfitPreviewProps {
  frontImage: string;
  sideImage: string;
  onBack: () => void;
  onSelectOutfit: () => void;
}

const OutfitPreview = ({ frontImage, sideImage, onBack, onSelectOutfit }: OutfitPreviewProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOutfitImage, setSelectedOutfitImage] = useState<string>('/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png');

  // Generate the try-on image when component mounts
  useEffect(() => {
    handleGenerateTryOn();
  }, []);

  const handleSelectOutfit = (outfitImage: string) => {
    setSelectedOutfitImage(outfitImage);
    setGeneratedImage(null); // Clear previous image
    // Add a small delay to allow state to update
    setTimeout(() => {
      handleGenerateTryOn(); // Generate new image with selected outfit
    }, 100);
  };

  const handleGenerateTryOn = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    const result = await generateTryOnImage(frontImage, selectedOutfitImage);
    if (result) {
      setGeneratedImage(result);
    } else {
      // Fall back to showing the original selfie
      setGeneratedImage(frontImage);
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-semibold text-white">
          Outfit Preview
        </h2>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>
      
      <div className="space-y-4 mb-6">
        <TryOnImage 
          isGenerating={isGenerating}
          generatedImage={generatedImage}
          fallbackImage={frontImage}
        />
        
        <OutfitOptions 
          selectedOutfitImage={selectedOutfitImage}
          onSelectOutfit={handleSelectOutfit}
        />
      </div>
      
      <StyleAnalysis />
      
      <div className="mt-auto space-y-3">
        <Button onClick={onSelectOutfit}>
          Try Another Outfit
        </Button>
        <Button 
          variant="secondary"
          onClick={handleGenerateTryOn}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Regenerate Image'}
        </Button>
      </div>
    </div>
  );
};

export default OutfitPreview;
