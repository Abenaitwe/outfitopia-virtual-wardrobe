
import React from 'react';

interface OutfitOptionsProps {
  selectedOutfitImage: string;
  onSelectOutfit: (outfitImage: string) => void;
}

const OutfitOptions = ({ selectedOutfitImage, onSelectOutfit }: OutfitOptionsProps) => {
  const outfitOptions = [
    '/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png',
    '/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png',
    '/lovable-uploads/6f7bc91c-601b-4d1d-b752-b0d7eafca831.png',
    '/lovable-uploads/96150a95-f1b9-49dc-9619-b83f86d2dc62.png'
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {outfitOptions.map((outfitImage, index) => (
        <div 
          key={index}
          className={`bg-outfitopia-darkgray rounded-xl p-1 aspect-square cursor-pointer ${
            selectedOutfitImage === outfitImage ? 'border-2 border-outfitopia-purple' : ''
          }`}
          onClick={() => onSelectOutfit(outfitImage)}
        >
          <img 
            src={outfitImage} 
            alt={`Outfit option ${index + 1}`} 
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
};

export default OutfitOptions;
