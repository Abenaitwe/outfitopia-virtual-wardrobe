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
  | 'upload-side'
  | 'select-outfit'
  | 'preview-outfit';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [frontImage, setFrontImage] = useState<string>('');
  const [sideImage, setSideImage] = useState<string>('');
  const [currentTab, setCurrentTab] = useState('scan');
  const { user } = useAuth();

  const handleStart = () => {
    setCurrentScreen('upload-front');
    toast({
      title: "Let's create your wishlist",
      description: "Upload photos to visualize your wishlist items"
    });
  };

  const handleFrontSelfieUpload = (image: string) => {
    setFrontImage(image);
    setCurrentScreen('upload-side');
    toast({
      title: "Front selfie uploaded",
      description: "Now let's get a side view for better results"
    });
  };

  const handleSideSelfieUpload = (image: string) => {
    setSideImage(image);
    setCurrentScreen('select-outfit');
    toast({
      title: "Side selfie uploaded",
      description: "Great! Now select an outfit to try on"
    });
  };

  const handleOutfitSelection = (outfitId: string) => {
    setCurrentScreen('preview-outfit');
    toast({
      title: "Outfit applied",
      description: "See how this outfit looks on you!"
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
          />
        );
      case 'upload-side':
        return (
          <UploadSelfie 
            type="side" 
            onBack={() => setCurrentScreen('upload-front')}
            onContinue={handleSideSelfieUpload}
          />
        );
      case 'select-outfit':
        return (
          <OutfitSelection 
            onBack={() => setCurrentScreen('upload-side')}
            onSelectOutfit={handleOutfitSelection}
          />
        );
      case 'preview-outfit':
        return (
          <OutfitPreview 
            frontImage={frontImage}
            sideImage={sideImage}
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
