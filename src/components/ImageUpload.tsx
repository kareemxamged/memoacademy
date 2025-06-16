import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Loader, Image as ImageIcon } from 'lucide-react';
import { storageService } from '../lib/supabase';

/**
 * خصائص مكون رفع الصور
 * Image Upload Component Props
 */
interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  type: 'instructor' | 'gallery' | 'course' | 'technique' | 'logo';
  itemId?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'circle' | 'rectangle';
  label?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * مكون رفع الصور
 * Image Upload Component
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  type,
  itemId,
  className = '',
  size = 'md',
  shape = 'square',
  label = 'الصورة',
  placeholder = 'انقر لرفع صورة',
  required = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // تحديد أحجام المكون
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-20 h-20';
      case 'md':
        return 'w-32 h-32';
      case 'lg':
        return 'w-48 h-48';
      case 'xl':
        return 'w-64 h-64';
      default:
        return 'w-32 h-32';
    }
  };

  // تحديد شكل المكون
  const getShapeClasses = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'rectangle':
        return 'rounded-lg aspect-video';
      case 'square':
      default:
        return 'rounded-lg aspect-square';
    }
  };

  // معالج رفع الصورة
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    console.log('📤 بدء رفع الصورة:', file.name, 'حجم:', (file.size / 1024 / 1024).toFixed(2) + 'MB');

    setUploading(true);
    setImageError(false); // إعادة تعيين حالة الخطأ
    try {
      const imageUrl = await storageService.uploadImage(file, type, itemId);
      if (imageUrl) {
        console.log('✅ تم رفع الصورة بنجاح:', imageUrl);
        onImageChange(imageUrl);
        setImageError(false); // التأكد من إزالة حالة الخطأ
      } else {
        console.error('❌ فشل في رفع الصورة - لم يتم إرجاع URL');
        setImageError(true);
      }
    } catch (error) {
      console.error('❌ خطأ في رفع الصورة:', error);
      setImageError(true);
    } finally {
      setUploading(false);
    }
  };

  // معالج تغيير الملف
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // معالج السحب والإفلات
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    } else {
      alert('يرجى رفع ملف صورة صالح');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  // فتح نافذة اختيار الملف
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // حذف الصورة الحالية
  const removeImage = () => {
    setImageError(false); // إعادة تعيين حالة الخطأ
    setImageLoading(false); // إعادة تعيين حالة التحميل
    onImageChange('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* تسمية المكون */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-arabic">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      {/* منطقة رفع الصورة */}
      <div className="relative">
        <motion.div
          className={`
            ${getSizeClasses()} ${getShapeClasses()}
            border-2 border-dashed border-gray-300 
            hover:border-blue-400 transition-colors duration-300
            flex items-center justify-center cursor-pointer
            bg-gray-50 hover:bg-gray-100 relative overflow-hidden
            ${dragOver ? 'border-blue-500 bg-blue-50' : ''}
            ${uploading ? 'pointer-events-none' : ''}
          `}
          onClick={openFileDialog}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* الصورة الحالية */}
          {currentImage && !uploading && !imageError ? (
            <>
              <img
                src={currentImage}
                alt="الصورة المرفوعة"
                className="w-full h-full object-cover"
                onLoad={() => {
                  console.log('✅ تم تحميل الصورة بنجاح:', currentImage);
                  setImageLoading(false);
                  setImageError(false);
                }}
                onLoadStart={() => {
                  console.log('🔄 بدء تحميل الصورة:', currentImage);
                  setImageLoading(true);
                  setImageError(false);
                }}
                onError={(e) => {
                  console.error('❌ فشل في تحميل الصورة:', currentImage);
                  console.error('تفاصيل الخطأ:', e);
                  setImageLoading(false);
                  setImageError(true);
                }}
                crossOrigin="anonymous"
              />

              {/* مؤشر تحميل الصورة */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Loader className="w-6 h-6 text-blue-500 animate-spin mb-2" />
                    <span className="text-xs text-gray-600 font-arabic">جاري تحميل الصورة...</span>
                  </div>
                </div>
              )}

              {/* زر حذف الصورة */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>

              {/* طبقة التمرير */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </>
          ) : currentImage && imageError ? (
            /* رسالة خطأ تحميل الصورة */
            <div className="w-full h-full bg-red-50 border-2 border-red-200 flex flex-col items-center justify-center text-center p-4">
              <div className="text-red-500 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <span className="text-red-600 font-arabic text-sm mb-1">فشل في تحميل الصورة</span>
              <span className="text-red-500 font-arabic text-xs">انقر لرفع صورة جديدة</span>

              {/* زر حذف الصورة المعطلة */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageError(false);
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            /* منطقة الرفع */
            <div className="text-center p-4">
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                  <span className="text-sm text-gray-600 font-arabic">جاري الرفع...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {dragOver ? (
                    <Upload className="w-8 h-8 text-blue-500 mb-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  )}
                  <span className="text-sm text-gray-600 font-arabic text-center">
                    {dragOver ? 'اتركها هنا' : placeholder}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 font-arabic">
                    أو اسحب الصورة هنا
                  </span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* حقل رفع الملف المخفي */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {/* معلومات إضافية */}
      <div className="text-xs text-gray-500 font-arabic">
        <p>الصيغ المدعومة: JPG, PNG, GIF, WebP</p>
        <p>الحد الأقصى للحجم: 5MB</p>
      </div>
    </div>
  );
};

/**
 * مكون رفع الشعار
 * Logo Upload Component
 */
export const LogoUpload: React.FC<{
  currentLogo?: string;
  onLogoChange: (logoUrl: string) => void;
  className?: string;
}> = ({ currentLogo, onLogoChange, className }) => {
  return (
    <ImageUpload
      currentImage={currentLogo}
      onImageChange={onLogoChange}
      type="logo"
      size="lg"
      shape="square"
      label="شعار الموقع"
      placeholder="انقر لرفع الشعار"
      className={className}
    />
  );
};

/**
 * مكون رفع صورة المدرب
 * Instructor Image Upload Component
 */
export const InstructorImageUpload: React.FC<{
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  instructorId?: number;
  className?: string;
}> = ({ currentImage, onImageChange, instructorId, className }) => {
  return (
    <ImageUpload
      currentImage={currentImage}
      onImageChange={onImageChange}
      type="instructor"
      itemId={instructorId}
      size="lg"
      shape="circle"
      label="صورة المدرب"
      placeholder="انقر لرفع صورة المدرب"
      className={className}
    />
  );
};

/**
 * مكون رفع صورة العمل الفني
 * Gallery Image Upload Component
 */
export const GalleryImageUpload: React.FC<{
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  itemId?: number;
  className?: string;
}> = ({ currentImage, onImageChange, itemId, className }) => {
  return (
    <ImageUpload
      currentImage={currentImage}
      onImageChange={onImageChange}
      type="gallery"
      itemId={itemId}
      size="xl"
      shape="square"
      label="صورة العمل الفني"
      placeholder="انقر لرفع صورة العمل"
      required
      className={className}
    />
  );
};

export default ImageUpload;
