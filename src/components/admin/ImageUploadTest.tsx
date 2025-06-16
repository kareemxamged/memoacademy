import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { storageService } from '../../lib/supabase';

/**
 * مكون اختبار رفع الصور
 * Image Upload Test Component
 */
const ImageUploadTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{
    connection: boolean | null;
    bucketExists: boolean | null;
    uploadTest: boolean | null;
    error: string | null;
  }>({
    connection: null,
    bucketExists: null,
    uploadTest: null,
    error: null
  });

  const [testing, setTesting] = useState(false);
  const [testFile, setTestFile] = useState<File | null>(null);

  // اختبار شامل لنظام رفع الصور
  const runFullTest = async () => {
    setTesting(true);
    setTestResults({
      connection: null,
      bucketExists: null,
      uploadTest: null,
      error: null
    });

    try {
      // 1. اختبار الاتصال
      console.log('🔍 اختبار الاتصال...');
      const connectionTest = await storageService.testConnection();
      setTestResults(prev => ({ ...prev, connection: connectionTest }));

      if (!connectionTest) {
        setTestResults(prev => ({ ...prev, error: 'فشل في الاتصال بـ Supabase Storage' }));
        return;
      }

      // 2. اختبار وجود bucket
      console.log('🔍 اختبار وجود bucket...');
      const bucketTest = await storageService.ensureBucketExists();
      setTestResults(prev => ({ ...prev, bucketExists: bucketTest }));

      if (!bucketTest) {
        setTestResults(prev => ({ ...prev, error: 'فشل في التحقق من bucket أو إنشاؤه' }));
        return;
      }

      // 3. اختبار رفع ملف تجريبي (إذا تم اختيار ملف)
      if (testFile) {
        console.log('🔍 اختبار رفع الملف...');
        const uploadResult = await storageService.uploadImage(testFile, 'logo');
        setTestResults(prev => ({ ...prev, uploadTest: !!uploadResult }));

        if (!uploadResult) {
          setTestResults(prev => ({ ...prev, error: 'فشل في رفع الملف التجريبي' }));
        }
      }

    } catch (error) {
      console.error('خطأ في الاختبار:', error);
      setTestResults(prev => ({ 
        ...prev, 
        error: `خطأ غير متوقع: ${error instanceof Error ? error.message : 'خطأ غير معروف'}` 
      }));
    } finally {
      setTesting(false);
    }
  };

  // معالج اختيار الملف
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTestFile(file);
    }
  };

  // رمز النتيجة
  const getResultIcon = (result: boolean | null) => {
    if (result === null) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    if (result === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  // نص النتيجة
  const getResultText = (result: boolean | null) => {
    if (result === null) return 'لم يتم الاختبار';
    if (result === true) return 'نجح';
    return 'فشل';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <TestTube className="w-6 h-6 text-blue-500 ml-3" />
        <h2 className="text-xl font-bold text-gray-800 font-arabic">اختبار نظام رفع الصور</h2>
      </div>

      {/* اختيار ملف للاختبار */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 font-arabic mb-2">
          اختر صورة للاختبار (اختياري)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {testFile && (
          <p className="text-sm text-gray-600 mt-1 font-arabic">
            تم اختيار: {testFile.name} ({(testFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      {/* زر بدء الاختبار */}
      <motion.button
        onClick={runFullTest}
        disabled={testing}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-arabic mb-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {testing ? 'جاري الاختبار...' : 'بدء الاختبار'}
      </motion.button>

      {/* نتائج الاختبار */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-arabic text-gray-700">اختبار الاتصال بـ Supabase</span>
          <div className="flex items-center">
            {getResultIcon(testResults.connection)}
            <span className="mr-2 text-sm font-arabic">{getResultText(testResults.connection)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-arabic text-gray-700">اختبار وجود Storage Bucket</span>
          <div className="flex items-center">
            {getResultIcon(testResults.bucketExists)}
            <span className="mr-2 text-sm font-arabic">{getResultText(testResults.bucketExists)}</span>
          </div>
        </div>

        {testFile && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-arabic text-gray-700">اختبار رفع الملف</span>
            <div className="flex items-center">
              {getResultIcon(testResults.uploadTest)}
              <span className="mr-2 text-sm font-arabic">{getResultText(testResults.uploadTest)}</span>
            </div>
          </div>
        )}
      </div>

      {/* رسالة الخطأ */}
      {testResults.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 ml-2" />
            <span className="text-red-700 font-arabic">{testResults.error}</span>
          </div>
        </div>
      )}

      {/* معلومات إضافية */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-800 font-arabic mb-2">معلومات مهمة:</h3>
        <ul className="text-sm text-blue-700 font-arabic space-y-1">
          <li>• الحد الأقصى لحجم الملف: 5MB</li>
          <li>• الصيغ المدعومة: JPG, PNG, GIF, WebP</li>
          <li>• يتم حفظ جميع الصور في bucket واحد: instructor-images</li>
          <li>• تحقق من وحدة التحكم في المتصفح للحصول على تفاصيل أكثر</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploadTest;
