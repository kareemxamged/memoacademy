# 🚀 إعداد GitHub - GitHub Setup

## خطوات رفع المشروع على GitHub

### 1️⃣ إنشاء Repository جديد
1. **اذهب إلى**: [github.com/new](https://github.com/new)
2. **Repository name**: `art-academy-website`
3. **Description**: 
   ```
   🎨 موقع أكاديمية ميمو للرسم - Art Academy Website with React, TypeScript, and Tailwind CSS
   ```
4. **اختر Public**
5. **لا تختر** "Add a README file" 
6. **لا تختر** "Add .gitignore"
7. **اختر License**: MIT
8. **اضغط "Create repository"**

### 2️⃣ رفع الكود (الأوامر جاهزة)
```bash
# الكود جاهز محلياً، فقط نفذ:
git push -u origin main
```

### 3️⃣ إذا واجهت مشاكل في الرفع
```bash
# تحقق من الـ remote
git remote -v

# إذا لم يكن موجود، أضفه:
git remote add origin https://github.com/rahorop820/art-academy-website.git

# ثم ارفع:
git push -u origin main
```

### 4️⃣ إعداد GitHub Pages (اختياري)
1. **اذهب إلى Repository Settings**
2. **اضغط على "Pages"** في القائمة الجانبية
3. **Source**: اختر "GitHub Actions"
4. **سيتم نشر الموقع تلقائياً على**:
   ```
   https://rahorop820.github.io/art-academy-website/
   ```

### 5️⃣ إعداد Vercel للنشر السريع
1. **اذهب إلى**: [vercel.com](https://vercel.com)
2. **سجل دخول بحساب GitHub**
3. **اضغط "New Project"**
4. **اختر repository**: `art-academy-website`
5. **اضغط "Deploy"**
6. **سيتم النشر تلقائياً!**

## 📁 ملفات المشروع الجاهزة

### ✅ ملفات التوثيق
- [x] `README.md` - دليل شامل للمشروع
- [x] `CHANGELOG.md` - سجل التحديثات
- [x] `DEPLOYMENT.md` - دليل النشر
- [x] `LICENSE` - رخصة MIT

### ✅ ملفات الإعداد
- [x] `.gitignore` - ملفات مستبعدة من Git
- [x] `.env.example` - مثال على متغيرات البيئة
- [x] `package.json` - معلومات المشروع والتبعيات

### ✅ ملفات التطوير
- [x] جميع مكونات React
- [x] ملفات TypeScript
- [x] إعدادات Tailwind CSS
- [x] تكوين Vite

## 🎯 الميزات الجاهزة للعرض

### 🎨 واجهة المستخدم
- ✅ تصميم متجاوب كامل
- ✅ تأثيرات سلسة وسريعة
- ✅ دعم العربية والإنجليزية
- ✅ ألوان متناسقة ومحسنة

### 📚 إدارة الدورات
- ✅ صفحة دورات تفاعلية
- ✅ إخفاء/إظهار الأسعار
- ✅ تصنيف الدورات (مميزة/عادية)
- ✅ لوحة تحكم شاملة

### 📱 التسجيل الذكي
- ✅ تسجيل عبر الواتساب
- ✅ رسائل مخصصة لكل دورة
- ✅ رقم واتساب قابل للتخصيص

### ⚡ الأداء
- ✅ تحميل سريع
- ✅ تأثيرات محسنة (150-200ms)
- ✅ استخدام GPU للحركات
- ✅ حفظ محلي للبيانات

## 🔗 روابط مفيدة بعد الرفع

### Repository
```
https://github.com/rahorop820/art-academy-website
```

### GitHub Pages (بعد التفعيل)
```
https://rahorop820.github.io/art-academy-website/
```

### Vercel (بعد النشر)
```
https://art-academy-website.vercel.app/
```

## 📞 الدعم

إذا واجهت أي مشاكل:
1. **تحقق من الأوامر** في Terminal
2. **راجع ملف DEPLOYMENT.md** للتفاصيل
3. **تأكد من صلاحيات GitHub**

---

**المشروع جاهز 100% للرفع والنشر! 🚀**
