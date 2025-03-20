
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WelcomeScreen from '@/components/WelcomeScreen';
import UploadSelfie from '@/components/UploadSelfie';
import OutfitSelection from '@/components/OutfitSelection';
import OutfitPreview from '@/components/OutfitPreview';
import Navigation from '@/components/Navigation';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type AppScreen = 
  | 'welcome'
  | 'upload-front'
  | 'select-outfit'
  | 'preview-outfit';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [frontImage, setFrontImage] = useState<string>('');
  const [sideImage, setSideImage] = useState<string>(''); // Keep for compatibility with OutfitPreview
  const [currentTab, setCurrentTab] = useState('scan');
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>('outfit1');
  const { user } = useAuth();

  // Map outfitId to outfit image URL
  const getOutfitImageById = (outfitId: string) => {
    const outfitMap: Record<string, string> = {
      'outfit1': '/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png',
      'outfit2': '/lovable-uploads/8922a0f5-2f69-4e95-a32f-f478a25ba9fb.png',
      'outfit3': '/lovable-uploads/6f7bc91c-601b-4d1d-b752-b0d7eafca831.png',
      'outfit4': '/lovable-uploads/96150a95-f1b9-49dc-9619-b83f86d2dc62.png',
    };
    
    return outfitMap[outfitId] || (outfitId === 'custom' ? 'custom' : '/lovable-uploads/23e66cbc-598c-4cd3-b892-1e8262da9286.png');
  };

  const handleStart = () => {
    setCurrentScreen('upload-front');
    toast({
      title: "Let's create your wishlist",
      description: "Upload photos to visualize your wishlist items"
    });
  };

  const handleFrontSelfieUpload = (image: string) => {
    setFrontImage(image);
    // Skip side selfie and go straight to closet
    setCurrentTab('closet'); // Automatically switch to closet tab
    setCurrentScreen('select-outfit');
    toast({
      title: "Selfie uploaded",
      description: "Great! Now drop your desired outfit"
    });
  };

  const handleOutfitSelection = (outfitId: string) => {
    setSelectedOutfitId(outfitId);
    setCurrentScreen('preview-outfit');
    toast({
      title: "Outfit selected",
      description: "Generating your virtual try-on..."
    });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab !== 'scan' && currentScreen === 'welcome') {
      toast({
        title: "Complete the scan first",
        description: "Please upload your selfies before proceeding",
        variant: "destructive"
      });
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'upload-front':
        return (
          <UploadSelfie 
            type="front" 
            onBack={() => setCurrentScreen('welcome')}
            onContinue={handleFrontSelfieUpload}
            onTabChange={handleTabChange}
          />
        );
      case 'select-outfit':
        return (
          <OutfitSelection 
            onBack={() => setCurrentScreen('upload-front')}
            onSelectOutfit={handleOutfitSelection}
          />
        );
      case 'preview-outfit':
        return (
          <OutfitPreview 
            frontImage={frontImage}
            sideImage={frontImage} // Use frontImage for both to ensure preview works
            onBack={() => setCurrentScreen('select-outfit')}
            onSelectOutfit={() => setCurrentScreen('select-outfit')}
          />
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <>
      {currentScreen === 'welcome' ? (
        renderScreen()
      ) : (
        <Layout className="pb-20">
          {renderScreen()}
        </Layout>
      )}
      {currentScreen !== 'welcome' && (
        <Navigation 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
        />
      )}
    </>
  );
};

export default Index;
