
import React from 'react';
import { RefreshCw, Heart, Share } from 'lucide-react';

interface TryOnImageProps {
  isGenerating: boolean;
  generatedImage: string | null;
  fallbackImage: string;
}

const TryOnImage = ({ isGenerating, generatedImage, fallbackImage }: TryOnImageProps) => {
  return (
    <div className="selfie-container aspect-[3/4] mb-4 animated-gradient-border">
      <div className="w-full h-full rounded-3xl overflow-hidden relative">
        {isGenerating ? (
          <div className="w-full h-full flex items-center justify-center bg-outfitopia-darkgray">
            <RefreshCw className="w-10 h-10 text-outfitopia-purple animate-spin" />
            <p className="text-white ml-3">Generating your look...</p>
          </div>
        ) : (
          <img 
            src={generatedImage || fallbackImage} 
            alt="Virtual try-on" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="p-2 bg-outfitopia-darkgray rounded-full">
            <Heart className="w-5 h-5 text-outfitopia-purple" />
          </button>
          <button className="p-2 bg-outfitopia-darkgray rounded-full">
            <Share className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOnImage;
