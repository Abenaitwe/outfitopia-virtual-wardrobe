
import React from 'react';
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const Layout = ({ children, className, fullHeight = true }: LayoutProps) => {
  return (
    <div className={cn(
      'app-container p-6',
      fullHeight && 'min-h-[100dvh]',
      className
    )}>
      {children}
    </div>
  );
};

export default Layout;
