import React from 'react';
import { motion } from 'framer-motion';

interface ResponsiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  mobileText?: string;
  desktopText?: string;
}

/**
 * مكون زر متجاوب مع تحسينات للأجهزة اللمسية
 * Responsive button component with touch optimizations
 */
const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ariaLabel,
  icon,
  fullWidth = false,
  mobileText,
  desktopText,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs md:px-3 md:py-2 md:text-sm';
      case 'medium':
        return 'px-3 py-2 text-sm md:px-4 md:py-2 md:text-base';
      case 'large':
        return 'px-4 py-3 text-base md:px-6 md:py-3 md:text-lg';
      default:
        return 'px-3 py-2 text-sm md:px-4 md:py-2 md:text-base';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium font-arabic
    transition-all duration-200
    touch-manipulation
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${className}
  `;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
    >
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      
      {/* النص المتجاوب */}
      {mobileText && desktopText ? (
        <>
          <span className="md:hidden">{mobileText}</span>
          <span className="hidden md:inline">{desktopText}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default ResponsiveButton;
