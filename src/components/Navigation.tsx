
import React from 'react';
import { Home, Camera, Shirt, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/UserMenu';

type NavigationProps = {
  currentTab: string;
  onTabChange: (tab: string) => void;
};

const Navigation = ({ currentTab, onTabChange }: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLoginPage = location.pathname === '/auth';

  // Don't show navigation on login page
  if (isLoginPage) return null;

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    if (tab === 'profile' && !user) {
      navigate('/auth');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-purple-500/20 backdrop-blur-md p-4 z-10">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <button 
          onClick={() => handleTabClick('scan')} 
          className={`flex flex-col items-center ${currentTab === 'scan' ? 'text-purple-500' : 'text-foreground/60'}`}
        >
          <Camera size={24} />
          <span className="text-xs mt-1">Scan</span>
        </button>
        
        <button 
          onClick={() => handleTabClick('closet')} 
          className={`flex flex-col items-center ${currentTab === 'closet' ? 'text-purple-500' : 'text-foreground/60'}`}
        >
          <Shirt size={24} />
          <span className="text-xs mt-1">Closet</span>
        </button>
        
        <button 
          onClick={() => handleTabClick('home')} 
          className={`flex flex-col items-center ${currentTab === 'home' ? 'text-purple-500' : 'text-foreground/60'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <div className="flex flex-col items-center">
          {user ? (
            <UserMenu />
          ) : (
            <button 
              onClick={() => handleTabClick('profile')} 
              className={`flex flex-col items-center ${currentTab === 'profile' ? 'text-purple-500' : 'text-foreground/60'}`}
            >
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
