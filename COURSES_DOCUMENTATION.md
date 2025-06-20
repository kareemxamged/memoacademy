# صفحة الدورات التدريبية - Training Courses Page

## 🎨 نظرة عامة - Overview

تم إنشاء صفحة الدورات التدريبية بتصميم بسيط وجذاب يبرز أهمية الدورات ويشجع على التسجيل.

## ✨ المميزات الرئيسية - Key Features

### 1. تصميم بسيط وأنيق
- **بطاقات منظمة**: عرض الدورات في بطاقات واضحة ومنظمة
- **ألوان متناسقة**: استخدام ألوان تتماشى مع هوية الأكاديمية
- **تأثيرات سلسة**: تطبيق التأثيرات المحسنة للهوفر

### 2. تصنيف الدورات
- **دورات مميزة**: عرض الدورات المميزة في قسم منفصل مع شارة "مميز"
- **دورات عادية**: عرض باقي الدورات في تخطيط شبكي منظم
- **فلترة تلقائية**: إخفاء الدورات غير المرئية

### 3. معلومات شاملة لكل دورة
- **العنوان والوصف**: عرض واضح لاسم الدورة ووصفها
- **المستوى**: تصنيف المستوى (مبتدئ، متوسط، متقدم) بألوان مميزة
- **المدة**: عرض مدة الدورة بوضوح
- **الفئة**: تصنيف نوع الدورة (رسم تقليدي، رسم رقمي، بورتريه)
- **المميزات**: قائمة بما سيتعلمه الطالب
- **السعر**: عرض السعر بشكل واضح
- **المدرب**: اسم المدرب المسؤول

### 4. تفاعل محسن
- **أزرار التسجيل**: أزرار جذابة مع تأثيرات هوفر سلسة
- **تأثيرات الخلفية**: تأثيرات متحركة عند الهوفر
- **استجابة سريعة**: تأثيرات سريعة وطبيعية

## 🛠️ التقنيات المستخدمة - Technologies Used

### React + TypeScript
```typescript
interface CoursesProps {
  courses: {
    id: number;
    title: string;
    description: string;
    duration: string;
    level: string;
    price: number;
    features: string[];
    // ... المزيد من الخصائص
  }[];
}
```

### Framer Motion للتأثيرات
```typescript
// تأثيرات الظهور المتدرجة
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
>
```

### Tailwind CSS للتصميم
```css
/* ألوان المستويات */
.level-beginner { @apply bg-green-100 text-green-700; }
.level-intermediate { @apply bg-yellow-100 text-yellow-700; }
.level-advanced { @apply bg-red-100 text-red-700; }
```

## 📊 بنية البيانات - Data Structure

### إضافة بيانات الدورات في siteData.ts:
```typescript
courses: [
  {
    id: 1,
    title: 'أساسيات الرسم للمبتدئين',
    description: 'تعلم أساسيات الرسم من الصفر...',
    duration: '4 أسابيع',
    level: 'مبتدئ',
    price: 299,
    currency: 'ريال',
    features: [
      'تعلم أساسيات الخطوط والأشكال',
      'تقنيات التظليل والإضاءة',
      // ...
    ],
    instructor: 'أحمد صادق',
    category: 'رسم تقليدي',
    featured: true,
    visible: true
  }
]
```

## 🎯 الوظائف الرئيسية - Main Functions

### 1. تصنيف المستويات
```typescript
const getLevelColor = (level: string) => {
  switch (level) {
    case 'مبتدئ': return 'bg-green-100 text-green-700';
    case 'متوسط': return 'bg-yellow-100 text-yellow-700';
    case 'متقدم': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};
```

### 2. تصنيف الفئات
```typescript
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'رسم تقليدي': return 'bg-blue-100 text-blue-700';
    case 'رسم رقمي': return 'bg-purple-100 text-purple-700';
    case 'بورتريه': return 'bg-pink-100 text-pink-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};
```

### 3. معالجة التسجيل
```typescript
const handleEnrollment = (url: string, courseTitle: string) => {
  if (url.startsWith('#')) {
    // للروابط الداخلية - نموذج تسجيل
    alert(`سيتم إضافة نموذج التسجيل لدورة: ${courseTitle}`);
  } else {
    // للروابط الخارجية
    window.open(url, '_blank');
  }
};
```

## 🎨 التصميم والألوان - Design & Colors

### ألوان المستويات:
- **مبتدئ**: أخضر (Green) - يرمز للبداية والنمو
- **متوسط**: أصفر (Yellow) - يرمز للتقدم والحذر
- **متقدم**: أحمر (Red) - يرمز للتحدي والخبرة

### ألوان الفئات:
- **رسم تقليدي**: أزرق (Blue) - يرمز للكلاسيكية
- **رسم رقمي**: بنفسجي (Purple) - يرمز للتقنية
- **بورتريه**: وردي (Pink) - يرمز للجمال والفن

### تدرجات الأزرار:
- **دورات مميزة**: أزرق إلى بنفسجي
- **دورات عادية**: بنفسجي إلى وردي

## 📱 الاستجابة - Responsiveness

### تخطيط الشبكة:
- **الجوال**: عمود واحد
- **التابلت**: عمودين للدورات المميزة، عمودين للعادية
- **سطح المكتب**: عمودين للمميزة، ثلاثة أعمدة للعادية

### أحجام النصوص:
- **العناوين**: متدرجة حسب حجم الشاشة
- **الأوصاف**: قابلة للقراءة على جميع الأحجام
- **الأزرار**: أحجام مناسبة للمس

## 🚀 التحسينات المستقبلية - Future Enhancements

1. **نموذج التسجيل**: إضافة نموذج تسجيل تفاعلي
2. **فلترة الدورات**: إضافة فلاتر حسب المستوى والفئة
3. **البحث**: إضافة خاصية البحث في الدورات
4. **التقييمات**: عرض تقييمات الطلاب
5. **معاينة الدورة**: إضافة معاينة أو فيديو تعريفي
6. **المفضلة**: إضافة خاصية حفظ الدورات المفضلة
7. **المقارنة**: إمكانية مقارنة الدورات
8. **التقسيط**: خيارات دفع متعددة

## 📝 ملاحظات التطوير - Development Notes

- الكود منظم ومعلق باللغتين العربية والإنجليزية
- استخدام TypeScript لضمان أمان الأنواع
- تطبيق مبادئ التصميم المتجاوب
- تحسين الأداء باستخدام التأثيرات المحسنة
- سهولة الصيانة والتطوير المستقبلي
