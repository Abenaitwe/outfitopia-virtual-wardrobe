
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { ArrowLeft, Share, Heart, RefreshCw } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';

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
    generateTryOnImage();
  }, []);

  const generateTryOnImage = async () => {
    if (!frontImage || !selectedOutfitImage) {
      toast({
        title: "Missing images",
        description: "Both a selfie and outfit are required for virtual try-on",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Generating your look",
      description: "Please wait while we fit your outfit..."
    });

    try {
      const { data, error } = await supabase.functions.invoke('virtual-tryon', {
        body: {
          selfieImage: frontImage,
          outfitImage: selectedOutfitImage
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.generatedImage) {
        setGeneratedImage(data.generatedImage);
        toast({
          title: "Try-on complete",
          description: "Here's how you look in this outfit!"
        });
      } else {
        throw new Error("No image was generated");
      }
    } catch (error) {
      console.error("Error generating try-on image:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate try-on image",
        variant: "destructive"
      });
      // Fall back to showing the original selfie
      setGeneratedImage(frontImage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOutfit = (outfitImage: string) => {
    setSelectedOutfitImage(outfitImage);
    setGeneratedImage(null); // Clear previous image
    generateTryOnImage(); // Generate new image with selected outfit
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
        <div className="selfie-container aspect-[3/4] mb-4 animated-gradient-border">
          <div className="w-full h-full rounded-3xl overflow-hidden relative">
            {isGenerating ? (
              <div className="w-full h-full flex items-center justify-center bg-outfitopia-darkgray">
                <RefreshCw className="w-10 h-10 text-outfitopia-purple animate-spin" />
                <p className="text-white ml-3">Generating your look...</p>
              </div>
            ) : (
              <img 
                src={generatedImage || frontImage} 
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
        
        <div className="grid grid-cols-3 gap-3">
          <div 
            className="bg-outfitopia-darkgray rounded-xl p-1 aspect-square cursor-pointer border-2 border-outfitopia-purple"
            onClick={() => handleSelectOutfit('/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png')}
          >
            <img 
              src="/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png" 
              alt="Outfit option 1" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div 
            className="bg-outfitopia-darkgray rounded-xl p-1 aspect-square cursor-pointer"
            onClick={() => handleSelectOutfit('/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png')}
          >
            <img 
              src="/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png" 
              alt="Outfit option 2" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div 
            className="bg-outfitopia-darkgray rounded-xl p-1 aspect-square cursor-pointer"
            onClick={() => handleSelectOutfit('/lovable-uploads/6f7bc91c-601b-4d1d-b752-b0d7eafca831.png')}
          >
            <img 
              src="/lovable-uploads/6f7bc91c-601b-4d1d-b752-b0d7eafca831.png" 
              alt="Outfit option 3" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-outfitopia-darkgray rounded-xl p-4 mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Outfit Style Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-outfitopia-gray mb-1">Style Match</p>
            <div className="w-full bg-black/30 rounded-full h-2 mb-2">
              <div className="outfitopia-gradient h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm text-white">85% match</p>
          </div>
          <div>
            <p className="text-outfitopia-gray mb-1">Fit Rating</p>
            <div className="w-full bg-black/30 rounded-full h-2 mb-2">
              <div className="outfitopia-gradient h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-sm text-white">92% perfect</p>
          </div>
        </div>
      </div>
      
      <div className="mt-auto space-y-3">
        <Button onClick={onSelectOutfit}>
          Try Another Outfit
        </Button>
        <Button 
          variant="secondary"
          onClick={generateTryOnImage}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Regenerate Image'}
        </Button>
      </div>
    </div>
  );
};

export default OutfitPreview;
