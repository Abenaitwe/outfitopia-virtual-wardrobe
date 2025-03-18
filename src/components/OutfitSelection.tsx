
import React from 'react';
import Button from './Button';
import { ArrowLeft, Check } from 'lucide-react';

interface OutfitSelectionProps {
  onBack: () => void;
  onSelectOutfit: (outfitId: string) => void;
}

const OutfitSelection = ({ onBack, onSelectOutfit }: OutfitSelectionProps) => {
  const outfits = [
    { id: 'outfit1', name: 'Casual Streetwear', image: '/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png' },
    { id: 'outfit2', name: 'Business Casual', image: '/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png' },
    { id: 'outfit3', name: 'Formal Attire', image: '/lovable-uploads/6f7bc91c-601b-4d1d-b752-b0d7eafca831.png' },
    { id: 'outfit4', name: 'Athletic Wear', image: '/lovable-uploads/96150a95-f1b9-49dc-9619-b83f86d2dc62.png' },
  ];

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
          Select an Outfit
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {outfits.map((outfit) => (
          <div 
            key={outfit.id}
            className="bg-outfitopia-darkgray rounded-xl overflow-hidden"
            onClick={() => onSelectOutfit(outfit.id)}
          >
            <div className="aspect-[3/4] relative">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-medium">{outfit.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-outfitopia-darkgray rounded-xl p-4 mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Style Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-outfitopia-purple flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">Casual Wear</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-outfitopia-darkgray border border-outfitopia-gray-dark mr-3"></div>
            <span className="text-outfitopia-gray">Formal Attire</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-outfitopia-darkgray border border-outfitopia-gray-dark mr-3"></div>
            <span className="text-outfitopia-gray">Athletic Wear</span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Button onClick={() => onSelectOutfit('outfit1')}>
          Try on Selected Outfit
        </Button>
      </div>
    </div>
  );
};

export default OutfitSelection;
