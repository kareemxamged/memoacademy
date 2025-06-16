import { createClient } from '@supabase/supabase-js';
import type { GalleryItem, Course, Instructor, DrawingTechnique } from '../types/database';

// إعدادات Supabase - استخدام متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kzixgswpocyykczxwrli.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aXhnc3dwb2N5eWtjenh3cmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMjUwNTgsImV4cCI6MjA2NTYwMTA1OH0.3pmP_NEB0RRfYQti3rIg9JST4XWXpl9OOihhZqgOWlY';

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// إعادة تصدير الأنواع
export type { GalleryItem, Course, Instructor, DrawingTechnique };

// دوال المعرض
export const galleryService = {
  // جلب جميع الأعمال
  async getAll(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('خطأ في جلب أعمال المعرض:', error);
      return [];
    }
    
    return data || [];
  },

  // جلب الأعمال المرئية فقط
  async getVisible(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('completion_date', { ascending: false });

    if (error) {
      console.error('خطأ في جلب الأعمال المرئية:', error);
      return [];
    }

    return data || [];
  },

  // إضافة عمل جديد
  async create(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from('gallery')
      .insert([item])
      .select()
      .single();
    
    if (error) {
      console.error('خطأ في إضافة العمل:', error);
      return null;
    }
    
    return data;
  },

  // تحديث عمل
  async update(id: number, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from('gallery')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('خطأ في تحديث العمل:', error);
      return null;
    }
    
    return data;
  },

  // حذف عمل
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('خطأ في حذف العمل:', error);
      return false;
    }
    
    return true;
  }
};

// دوال الدورات
export const coursesService = {
  // جلب جميع الدورات
  async getAll(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('خطأ في جلب الدورات:', error);
      return [];
    }
    
    return data || [];
  },

  // جلب الدورات المرئية فقط
  async getVisible(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('خطأ في جلب الدورات المرئية:', error);
      return [];
    }
    
    return data || [];
  },

  // إضافة دورة جديدة
  async create(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select()
      .single();
    
    if (error) {
      console.error('خطأ في إضافة الدورة:', error);
      return null;
    }
    
    return data;
  },

  // تحديث دورة
  async update(id: number, updates: Partial<Course>): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('خطأ في تحديث الدورة:', error);
      return null;
    }
    
    return data;
  },

  // حذف دورة
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('خطأ في حذف الدورة:', error);
      return false;
    }
    
    return true;
  }
};

// دوال المدربين
export const instructorsService = {
  // جلب جميع المدربين
  async getAll(): Promise<Instructor[]> {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب المدربين:', error);
      return [];
    }

    return data || [];
  },

  // جلب المدربين المرئيين فقط
  async getVisible(): Promise<Instructor[]> {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب المدربين المرئيين:', error);
      return [];
    }

    return data || [];
  },

  // الاشتراك في التحديثات المباشرة للمدربين
  subscribeToChanges(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('instructors_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // جميع الأحداث (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'instructors'
        },
        (payload) => {
          console.log('تحديث في جدول المدربين:', payload);
          callback(payload);
        }
      )
      .subscribe();

    return subscription;
  },

  // إلغاء الاشتراك في التحديثات
  unsubscribeFromChanges(subscription: any) {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  },

  // إضافة مدرب جديد
  async create(instructor: Omit<Instructor, 'id' | 'created_at' | 'updated_at'>): Promise<Instructor | null> {
    const { data, error } = await supabase
      .from('instructors')
      .insert([instructor])
      .select()
      .single();

    if (error) {
      console.error('خطأ في إضافة المدرب:', error);
      return null;
    }

    return data;
  },

  // تحديث مدرب
  async update(id: number, updates: Partial<Instructor>): Promise<Instructor | null> {
    const { data, error } = await supabase
      .from('instructors')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('خطأ في تحديث المدرب:', error);
      return null;
    }

    return data;
  },

  // حذف مدرب
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('instructors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('خطأ في حذف المدرب:', error);
      return false;
    }

    return true;
  }
};

// دوال تقنيات الرسم
export const techniquesService = {
  // جلب جميع التقنيات
  async getAll(): Promise<DrawingTechnique[]> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب تقنيات الرسم:', error);
      return [];
    }

    return data || [];
  },

  // جلب التقنيات المرئية فقط
  async getVisible(): Promise<DrawingTechnique[]> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب التقنيات المرئية:', error);
      return [];
    }

    return data || [];
  },

  // جلب التقنيات حسب الفئة
  async getByCategory(category: string): Promise<DrawingTechnique[]> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .eq('category', category)
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب التقنيات حسب الفئة:', error);
      return [];
    }

    return data || [];
  },

  // جلب التقنيات حسب مستوى الصعوبة
  async getByDifficulty(level: string): Promise<DrawingTechnique[]> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .eq('difficulty_level', level)
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب التقنيات حسب المستوى:', error);
      return [];
    }

    return data || [];
  },

  // جلب تقنية واحدة
  async getById(id: number): Promise<DrawingTechnique | null> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('خطأ في جلب التقنية:', error);
      return null;
    }

    // زيادة عدد المشاهدات
    await this.incrementViewCount(id);

    return data;
  },

  // زيادة عدد المشاهدات
  async incrementViewCount(id: number): Promise<void> {
    // أولاً نجلب العدد الحالي
    const { data: current, error: fetchError } = await supabase
      .from('drawing_techniques')
      .select('view_count')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('خطأ في جلب عدد المشاهدات:', fetchError);
      return;
    }

    // ثم نحدث العدد
    const { error } = await supabase
      .from('drawing_techniques')
      .update({
        view_count: (current?.view_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('خطأ في تحديث عدد المشاهدات:', error);
    }
  },

  // إضافة تقنية جديدة
  async create(technique: Omit<DrawingTechnique, 'id' | 'created_at' | 'updated_at' | 'view_count'>): Promise<DrawingTechnique | null> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .insert([{ ...technique, view_count: 0 }])
      .select()
      .single();

    if (error) {
      console.error('خطأ في إضافة التقنية:', error);
      return null;
    }

    return data;
  },

  // تحديث تقنية
  async update(id: number, updates: Partial<DrawingTechnique>): Promise<DrawingTechnique | null> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('خطأ في تحديث التقنية:', error);
      return null;
    }

    return data;
  },

  // حذف تقنية
  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('drawing_techniques')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('خطأ في حذف التقنية:', error);
      return false;
    }

    return true;
  },

  // البحث في التقنيات
  async search(query: string): Promise<DrawingTechnique[]> {
    const { data, error } = await supabase
      .from('drawing_techniques')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)
      .eq('visible', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في البحث:', error);
      return [];
    }

    return data || [];
  },

  // تحديث المشاهدات بقيم وهمية عالية لجميع التقنيات
  async updateViewCountsWithFakeData(): Promise<boolean> {
    try {
      // جلب جميع التقنيات
      const { data: techniques, error: fetchError } = await supabase
        .from('drawing_techniques')
        .select('id, title, view_count');

      if (fetchError) {
        console.error('خطأ في جلب التقنيات:', fetchError);
        return false;
      }

      if (!techniques || techniques.length === 0) {
        console.log('لا توجد تقنيات لتحديث المشاهدات');
        return true;
      }

      // تحديث كل تقنية بعدد مشاهدات وهمي عالي
      const updates = techniques.map(technique => {
        // توليد رقم عشوائي بين 100 و 500
        const fakeViewCount = Math.floor(Math.random() * 401) + 100;

        return supabase
          .from('drawing_techniques')
          .update({
            view_count: fakeViewCount,
            updated_at: new Date().toISOString()
          })
          .eq('id', technique.id);
      });

      // تنفيذ جميع التحديثات
      const results = await Promise.all(updates);

      // التحقق من نجاح جميع التحديثات
      const hasErrors = results.some(result => result.error);

      if (hasErrors) {
        console.error('حدثت أخطاء في تحديث بعض المشاهدات');
        return false;
      }

      console.log(`✅ تم تحديث المشاهدات لـ ${techniques.length} تقنية بنجاح`);
      return true;
    } catch (error) {
      console.error('خطأ في تحديث المشاهدات:', error);
      return false;
    }
  }
};

// دوال رفع الصور
export const storageService = {
  // التحقق من وجود bucket وإنشاؤه إذا لم يكن موجوداً
  async ensureBucketExists(): Promise<boolean> {
    try {
      // التحقق من وجود bucket
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();

      if (listError) {
        console.error('خطأ في جلب قائمة buckets:', listError);
        return false;
      }

      const bucketExists = buckets?.some(bucket => bucket.name === 'instructor-images');

      if (!bucketExists) {
        console.log('🔧 إنشاء bucket جديد...');
        const { error: createError } = await supabase.storage.createBucket('instructor-images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        });

        if (createError) {
          console.error('خطأ في إنشاء bucket:', createError);
          return false;
        }

        console.log('✅ تم إنشاء bucket بنجاح');
      }

      return true;
    } catch (error) {
      console.error('خطأ في التحقق من bucket:', error);
      return false;
    }
  },
  // دالة عامة لرفع الصور
  async uploadImage(file: File, type: 'instructor' | 'gallery' | 'course' | 'technique' | 'logo', itemId?: number): Promise<string | null> {
    try {
      // التحقق من وجود bucket أولاً
      const bucketReady = await this.ensureBucketExists();
      if (!bucketReady) {
        alert('خطأ في إعداد التخزين. يرجى المحاولة مرة أخرى.');
        return null;
      }

      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        console.error('نوع الملف غير مدعوم - يجب أن يكون صورة');
        alert('نوع الملف غير مدعوم. يرجى اختيار صورة (JPG, PNG, GIF, WebP)');
        return null;
      }

      // التحقق من حجم الملف (أقل من 5MB لتتوافق مع إعدادات bucket)
      if (file.size > 5 * 1024 * 1024) {
        console.error('حجم الملف كبير جداً - يجب أن يكون أقل من 5MB');
        alert('حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5MB');
        return null;
      }

      // إنشاء اسم فريد للملف
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const fileName = `${type}-${itemId || timestamp}-${randomId}.${fileExt}`;

      console.log('🔄 بدء رفع الصورة:', fileName);

      // تحديد bucket بناءً على نوع الصورة
      const bucketName = 'instructor-images'; // نستخدم bucket واحد لجميع الصور

      // رفع الملف مباشرة
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true,
          cacheControl: '3600'
        });

      if (error) {
        console.error('خطأ في رفع الصورة:', error);
        alert(`فشل في رفع الصورة: ${error.message}`);
        return null;
      }

      console.log('✅ تم رفع الصورة بنجاح:', data.path);

      // الحصول على URL العام للصورة
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      console.log('🔗 URL الصورة:', urlData.publicUrl);

      return urlData.publicUrl;
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      alert('حدث خطأ غير متوقع في رفع الصورة');
      return null;
    }
  },

  // رفع صورة مدرب
  async uploadInstructorImage(file: File, instructorId?: number): Promise<string | null> {
    return this.uploadImage(file, 'instructor', instructorId);
  },

  // رفع صورة عمل فني
  async uploadGalleryImage(file: File, itemId?: number): Promise<string | null> {
    return this.uploadImage(file, 'gallery', itemId);
  },

  // رفع صورة دورة
  async uploadCourseImage(file: File, courseId?: number): Promise<string | null> {
    return this.uploadImage(file, 'course', courseId);
  },

  // رفع صورة تقنية رسم
  async uploadTechniqueImage(file: File, techniqueId?: number): Promise<string | null> {
    return this.uploadImage(file, 'technique', techniqueId);
  },

  // رفع شعار الموقع
  async uploadLogo(file: File): Promise<string | null> {
    return this.uploadImage(file, 'logo');
  },

  // حذف صورة
  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // استخراج اسم الملف من URL
      const fileName = imageUrl.split('/').pop();
      if (!fileName) return false;

      const { error } = await supabase.storage
        .from('instructor-images')
        .remove([fileName]);

      if (error) {
        console.error('خطأ في حذف الصورة:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('خطأ في حذف الصورة:', error);
      return false;
    }
  },

  // حذف صورة مدرب (للتوافق مع الكود القديم)
  async deleteInstructorImage(imageUrl: string): Promise<boolean> {
    return this.deleteImage(imageUrl);
  },

  // اختبار الاتصال بـ Supabase Storage
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 اختبار الاتصال بـ Supabase Storage...');
      const { data, error } = await supabase.storage.listBuckets();

      if (error) {
        console.error('❌ فشل في الاتصال بـ Supabase Storage:', error);
        return false;
      }

      console.log('✅ تم الاتصال بـ Supabase Storage بنجاح');
      console.log('📦 Buckets المتاحة:', data?.map(b => b.name));
      return true;
    } catch (error) {
      console.error('❌ خطأ في اختبار الاتصال:', error);
      return false;
    }
  }
};

// دوال الإعدادات
export const settingsService = {
  // جلب إعداد معين
  async get(key: string): Promise<any> {
    const { data, error } = await supabase
      .from('settings')
      .select('setting_value')
      .eq('setting_key', key)
      .single();
    
    if (error) {
      console.error(`خطأ في جلب الإعداد ${key}:`, error);
      return null;
    }
    
    return data?.setting_value;
  },

  // تحديث إعداد
  async update(key: string, value: any): Promise<boolean> {
    try {
      // أولاً، تحقق من وجود الإعداد
      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .eq('setting_key', key)
        .single();

      if (existing) {
        // إذا كان موجود، قم بالتحديث
        const { error } = await supabase
          .from('settings')
          .update({
            setting_value: value,
            updated_at: new Date().toISOString()
          })
          .eq('setting_key', key);

        if (error) {
          console.error(`خطأ في تحديث الإعداد ${key}:`, error);
          return false;
        }
      } else {
        // إذا لم يكن موجود، قم بالإدراج
        const { error } = await supabase
          .from('settings')
          .insert({
            setting_key: key,
            setting_value: value,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error(`خطأ في إدراج الإعداد ${key}:`, error);
          return false;
        }
      }

      console.log(`✅ تم تحديث الإعداد ${key} بنجاح`);
      return true;
    } catch (error) {
      console.error(`خطأ عام في تحديث الإعداد ${key}:`, error);
      return false;
    }
  }
};
