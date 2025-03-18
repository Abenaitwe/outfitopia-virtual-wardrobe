
import React from 'react';
import Button from './Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-8 animate-fade-in pt-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Outfitopia</h1>
        <p className="text-xl text-outfitopia-purple-light">Virtual Wardrobe</p>
      </div>
      
      <div className="py-8">
        <div className="w-60 h-60 rounded-full overflow-hidden mx-auto border-4 border-outfitopia-purple mb-6">
          <img 
            src="/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png" 
            alt="Virtual Outfit Example" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-outfitopia-gray mt-4 max-w-xs mx-auto">
          Try on outfits virtually before you buy them.
          Get personalized style recommendations.
        </p>
      </div>
      
      <div className="w-full max-w-xs">
        <Button onClick={onStart}>
          Begin Scan
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
