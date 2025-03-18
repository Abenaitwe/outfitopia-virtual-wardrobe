
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { User, LogOut } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  // Get first letter of email for avatar
  const userInitial = user.email ? user.email[0].toUpperCase() : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 border border-purple-500/50">
          <AvatarFallback className="bg-purple-800 text-white">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 text-red-500 focus:text-red-500" 
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
