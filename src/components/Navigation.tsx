
import React from 'react';
import { Camera, Layout, User, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ currentTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'scan', icon: Camera, label: 'Scan' },
    { id: 'wardrobe', icon: Layout, label: 'Wardrobe' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-outfitopia-black border-t border-outfitopia-darkgray">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center py-3 px-5",
              currentTab === tab.id ? "text-outfitopia-purple" : "text-outfitopia-gray"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
