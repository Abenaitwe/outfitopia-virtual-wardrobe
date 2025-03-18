
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  fullWidth = true,
  className, 
  children,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        variant === 'primary' ? 'outfitopia-button' : 'outfitopia-button-secondary',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
