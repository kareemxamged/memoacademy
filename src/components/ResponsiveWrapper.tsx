import React from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * مكون مساعد لضمان التجاوب على جميع الشاشات
 * Helper component to ensure responsiveness across all screen sizes
 */
const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      w-full 
      min-h-0 
      overflow-hidden 
      touch-manipulation 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
