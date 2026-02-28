# مراجعة واجهة النظام (UI Audit) — Avocat Frontend

## 1) نطاق المراجعة
- مراجعة بنية الواجهة الحالية (Routing + Layout + UI Components).
- توثيق التداخلات/التكرارات المنطقية والمكونات المكررة.
- تحديد أولويات التحسين والتنظيف على مراحل.
- اقتراح تصور «الواجهة النهائية» بشكل عملي وقابل للتنفيذ.

---

## 2) خريطة الواجهة الحالية

### نقاط الدخول الرئيسية
- الصفحة العامة: `/` (HomePage).
- الدخول/التسجيل: `/login` و`/signup`.
- التطبيق الداخلي المحمي: `/dashboard/*` عبر `RequireAuth`.

### التوجيه الداخلي (Dashboard)
ملف `AuthRoutes.jsx` يضم عددًا كبيرًا من الصفحات مع صلاحيات مختلفة (عملاء، قضايا، خدمات، تقارير، إدارة صلاحيات، ماليات، وثائق...).

### الهيكل المرئي
- الشريط الجانبي: معرّف عبر `src/config/sidebar.js`.
- الهيدر: في `features/dashboard/components/dashboard/Header.jsx`.
- نظام السمات (Dark/Light): عبر `ThemeContext` ومكونَي Toggle مختلفين.

---

## 3) أهم التداخلات/التكرارات المكتشفة

### A) ازدواج مكون تبديل الثيم
يوجد نسختان من `ThemeToggle`:
1. `src/shared/components/common/ThemeToggle.jsx`
2. `src/shared/ui/theme-toggle.jsx`

**الأثر**
- سلوك وواجهة غير موحّدة بين أجزاء التطبيق.
- تكلفة صيانة أعلى واحتمال انحرافات سلوكية مع أي تعديل لاحق.

**الحل المقترح**
- اعتماد مكون واحد موحّد من طبقة `shared/ui`، وجعل النسخة القديمة Wrapper توافقي فقط (تم تطبيقه في هذا التحديث).

### B) ازدواج مسار استيراد SidebarContext
- يوجد `SidebarContext` في:
  - `src/shared/utils/SidebarContext.jsx`
  - وواجهة إعادة تصدير في `src/shared/contexts/SidebarContext.jsx`
- بعض الملفات تستورد من `utils` وأخرى من `contexts`.

**الأثر**
- إرباك في الاتفاقية المعمارية (Context ضمن `contexts` أم `utils`).

**الحل المقترح**
- توحيد الاستيراد على `@shared/contexts/SidebarContext` (بدأ التطبيق في `App.tsx`).

### C) مسار Sidebar بدون Route فعلي
- في `sidebar.js` يوجد مسار `/dashboard/archive`.
- لا يوجد Route مطابق له في `AuthRoutes.jsx` حاليًا.

**الأثر**
- رابط في الواجهة قد يقود إلى 404.

**الحل المقترح**
- إمّا إضافة Route فعلي للأرشيف أو إزالة/إخفاء العنصر حتى يكتمل.

### D) منطق Spinner في AuthRoutes
داخل `useEffect` يتم استدعاء `showSpinner()` ثم `hideSpinner()` مباشرة في نفس الدورة.

**الأثر**
- أثر بصري غير واضح/غير فعّال، ومنطق يوحي بتحميل وهمي.

**الحل المقترح**
- ربط الـ Spinner بتحميل حقيقي (lazy suspense أو طلبات بيانات) بدل toggling فوري.

---

## 4) ممارسات أفضل مقترحة (Best Practices)

1. **Single Source of Truth للمكونات المشتركة**
   - أي مكون UI أساسي (Button/Toggle/Modal...) يجب أن يعيش في `shared/ui`.
   - أي مكون قديم يكون Wrapper مؤقت مع خطة إزالة.

2. **اتفاقية استيراد صارمة**
   - contexts من `shared/contexts` فقط.
   - utils من `shared/lib` أو `shared/utils` حسب الدور، لكن بدون خلط للمفاهيم.

3. **تزامن Navigation مع Routing**
   - اختبار آلي بسيط يضمن أن أي `path` في sidebar له route فعلي أو redirect واضح.

4. **قياس جودة الواجهة دوريًا**
   - قائمة فحص شهرية: التباين اللوني، توحيد المسافات، حالات hover/focus، وRTL/LTR.

5. **تقليل التكرار في أسماء/هياكل الملفات**
   - تقليل تكرار `Header.jsx`, `Login.jsx`, `SectionHeader.jsx` ما أمكن، أو إضافة Prefix وظيفي واضح.

---

## 5) تصور الواجهة النهائية (Target UI)

### الهدف
واجهة موحدة بصريًا وسلوكيًا، سهلة الصيانة، واضحة الصلاحيات، وتقل فيها مفاجآت التنقل.

### ملامح النسخة المستهدفة
- مكتبة UI موحدة في `shared/ui` (بدون تكرار وظيفي).
- تصميم متسق للـ Header/Sidebar عبر جميع الشاشات.
- تجربة Theme Toggle واحدة في كل التطبيق بنفس الـ tone/variants.
- روابط Sidebar مضمونة الصحة.
- حالات تحميل/فراغ/أخطاء موحدة عبر صفحات dashboard.

---

## 6) أولويات التنظيف والترتيب (Roadmap)

### أولوية P0 (عاجلة — 1 إلى 3 أيام)
1. توحيد `ThemeToggle` بالكامل واعتماد نسخة واحدة نهائية.
2. توحيد استيرادات `SidebarContext`.
3. حل مسار `/dashboard/archive` (إزالة مؤقتة أو route فعلي).
4. تصحيح منطق Spinner الفوري في `AuthRoutes`.

### أولوية P1 (مهمة — 1 إلى 2 أسبوع)
1. جرد كل المكونات المشتركة المكررة ونقلها إلى `shared/ui`.
2. توحيد أسماء الملفات المكررة ذات الأدوار المتقاربة.
3. إنشاء وثيقة Design Tokens عملية (spacing/radius/typography/state colors).

### أولوية P2 (تحسين مستمر)
1. إضافة اختبارات مرئية (snapshot/Playwright) للصفحات الحرجة.
2. تدقيق وصولية A11y شامل (focus order, aria labels, contrast).
3. اعتماد checklist merge خاص بالواجهة قبل أي release.

---

## 7) ما تم تحسينه الآن ضمن هذا التحديث
- تحويل `src/shared/components/common/ThemeToggle.jsx` إلى Wrapper على المكون الموحد في `shared/ui` لتقليل ازدواج المنطق.
- توحيد استيراد `SidebarProvider` في `App.tsx` ليشير إلى مسار `contexts`.
- توثيق مراجعة شاملة باللغة العربية داخل هذا الملف لسهولة المتابعة وتنفيذ خطة التنظيف.
