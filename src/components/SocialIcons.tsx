import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook, Instagram, Twitter, Youtube, MessageCircle,
  Linkedin, Phone, Mail, Globe, Camera, Music,
  Send, Video, MapPin, Clock, MessageSquare, Image, AtSign
} from 'lucide-react';
import { getCustomIcon } from './icons/SocialIcons';
import { hoverAnimations, tapAnimations, cssTransitions } from '../lib/animations';

// إضافة الأنماط المخصصة
const customStyles = `
  .instagram-gradient-bg {
    background: linear-gradient(135deg, #833ab4 10%, #fd1d1d 50%, #fcb045 90%);
  }
  .facebook-gradient-bg {
    background: linear-gradient(135deg, #1877f2 0%, #42a5f5 100%);
  }
  .youtube-gradient-bg {
    background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  }
  .whatsapp-gradient-bg {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  }
  .snapchat-gradient-bg {
    background: linear-gradient(135deg, #fffc00 0%, #fffc00 100%);
    box-shadow: 0 4px 15px rgba(255, 252, 0, 0.3);
  }
`;

// إضافة الأنماط إلى الصفحة
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  if (!document.head.querySelector('style[data-social-gradients]')) {
    styleElement.setAttribute('data-social-gradients', 'true');
    document.head.appendChild(styleElement);
  }
}

/**
 * دالة لتحويل اسم الأيقونة إلى مكون
 * Function to convert icon name to component
 */
const getIconComponent = (iconName: string, className?: string) => {
  // أولاً نتحقق من الأيقونات المخصصة
  const customIcon = getCustomIcon(iconName, { className, size: 20 });
  if (customIcon) return customIcon;

  // ثم نتحقق من أيقونات lucide-react
  const icons: { [key: string]: any } = {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    MessageCircle, // واتساب (احتياطي) وريديت
    Linkedin,
    Phone, // للمكالمات
    Mail, // للإيميل
    Globe, // للمواقع الإلكترونية
    Camera, // لسناب شات (احتياطي)
    Music, // لتيك توك (احتياطي)
    Send, // لتيليجرام (احتياطي)
    Video, // لفايبر أو سكايب
    MapPin, // للمواقع
    Clock, // للمواعيد
    MessageSquare, // لديسكورد
    Image, // لبينتريست
    AtSign // لثريدز
  };

  const IconComponent = icons[iconName] || MessageCircle;
  return <IconComponent className={className} size={20} />;
};

/**
 * خصائص مكون أيقونات وسائل التواصل
 * Social Icons Component Props
 */
interface SocialIconsProps {
  socialMedia: {
    id: string;
    name: string;
    nameEn: string;
    icon: string;
    url: string;
    iconColor: string;
    iconBg: string;
    visible: boolean;
  }[];
}

/**
 * مكون أيقونات وسائل التواصل الاجتماعي البسيط
 * Simple Social Media Icons Component
 */
const SocialIcons: React.FC<SocialIconsProps> = ({ socialMedia }) => {
  if (!socialMedia || socialMedia.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex justify-center items-center gap-4 mb-8 md:mb-10 lg:mb-12"
    >
      {socialMedia.map((social, index) => {
        return (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.7 + index * 0.1,
              duration: 0.4,
              type: "spring",
              stiffness: 300
            }}
            whileHover={hoverAnimations.socialIconHover}
            whileTap={tapAnimations.buttonTap}
            className={`
              relative group
              w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
              ${social.iconBg.startsWith('bg-') ? social.iconBg : social.iconBg}
              rounded-full
              flex items-center justify-center
              shadow-lg hover:shadow-xl
              border-2 border-white/50 hover:border-white/80
              ${cssTransitions.smooth}
              backdrop-blur-sm
              overflow-hidden
            `}
            title={social.name}
          >
            {/* تأثير الخلفية المتحركة */}
            <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 ${cssTransitions.fast}`}></div>

            {/* تأثير الإضاءة */}
            <div className={`absolute inset-0 ${social.iconBg.startsWith('bg-') ? social.iconBg : social.iconBg} opacity-0 group-hover:opacity-30 blur-sm ${cssTransitions.fast}`}></div>

            {/* الأيقونة */}
            {getIconComponent(social.icon, `
              relative z-10
              w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8
              ${social.iconColor}
              group-hover:scale-105
              ${cssTransitions.transform}
            `)}

            {/* تأثير النبضة */}
            <div className={`
              absolute inset-0
              ${social.iconBg.startsWith('bg-') ? social.iconBg : social.iconBg}
              rounded-full
              opacity-0 group-hover:opacity-20
              animate-ping
              group-hover:animate-pulse
            `}></div>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialIcons;
