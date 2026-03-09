# برومبت تنفيذي شامل لاستكمال واجهة "مكتب أفوكات للمحاماة"

استخدم هذا النص كما هو مع أي Coding Agent (مثل Codex) لتنفيذ **جولة تدقيق + استكمال Frontend** احترافية، مع الالتزام بالسوق المصري ومتطلبات الثقة والامتثال، **دون إعادة بناء المشروع من الصفر**.

---

## البرومبت

أنت مهندس Frontend Senior ومصمم UX/UI لقطاع الخدمات القانونية. المطلوب تنفيذ جولة تدقيق واستكمال شاملة للواجهة العامة لموقع "مكتب أفوكات للمحاماة" في مصر، ثم تحويل النتائج إلى تنفيذ Frontend مكتمل واحترافي باستخدام:
- React
- Tailwind CSS
- Framer Motion

### 1) الهدف التنفيذي
أكمل الواجهة العامة الموجودة بالفعل (لا تبدأ مشروعًا جديدًا) بحيث تصبح:
- عربية أولًا (الافتراضية عربية)
- ثنائية اللغة (Arabic/English)
- عالية الثقة وملائمة لقطاع المحاماة في مصر
- قابلة للتوسع مستقبلًا للربط مع backend/CMS/Client Portal دون بناء هذه الأنظمة الآن

### 2) سياق مهني/قانوني يجب احترامه
- عكس الطابع المهني المنضبط لمهنة المحاماة في مصر (قانون المحاماة رقم 17 لسنة 1983 وفق أحدث تعديل منشور).
- تجنب الادعاءات المضللة أو غير المهنية مثل:
  - "أفضل مكتب في مصر"
  - "نضمن الفوز"
  - "نسبة نجاح 100%"
- دعم واجهة جمع البيانات (Contact/Consultation forms) بعناصر خصوصية واضحة متسقة مع إطار قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020، بما يشمل:
  - إشعار جمع البيانات
  - رابط سياسة الخصوصية
  - صياغة موافقة مناسبة على الإرسال
  - رسائل تحقق واضحة
- دعم الثقة المحلية وSEO وفق ممارسات Google:
  - معلومات نشاط دقيقة (هاتف/عنوان/ساعات/موقع)
  - عناوين وصفية + meta descriptions
  - Structured data scaffolding: LocalBusiness/LegalService + BreadcrumbList + Article

### 3) المدخلات التي يجب قراءتها قبل التنفيذ
افحص المشروع الحالي ثم اعمل فوقه:
- إعدادات React الحالية
- Tailwind config
- Framer Motion usage
- نظام الترجمة/ملفات locales
- Router الحالي
- المكونات الحالية:
  Header, Navigation, Footer, Hero, ServiceCard, SectorCard, TeamCard, ArticleCard, FAQ, CTA, Breadcrumbs, Form inputs, Theme toggle, Language switcher
- الصفحات الحالية أو المطلوبة:
  Home, About, Services, Service Details, Industries, Team, Insights, Article Details, Contact, Book Consultation
- ملفات الهوية البصرية والشعار والأصول (images/icons)
- أي hooks/stores للغة/الثيم/المستخدم
- أي demo data تحتاج إعادة تنظيم

### 4) القيود
- ممنوع إعادة التأسيس من الصفر: أكمل الموجود فقط.
- النطاق = الواجهة العامة فقط.
- لا تبنِ Admin Dashboard.
- لا تبنِ Client Portal كاملًا.
- أبقِ فقط نقطة دخول مستقبلية (CTA/Route placeholder) للبوابة.
- استخدم React + Tailwind + Framer Motion فقط.
- احترم الهوية البصرية المتاحة كمصدر أساسي.
- RTL كامل للعربية وLTR كامل للإنجليزية، مع ضبط:
  - القوائم
  - الأسهم والأيقونات الاتجاهية
  - breadcrumbs
  - alignments / spacing
  - slider direction
- ممنوع lorem ipsum.
- أي بيانات مكتب غير مؤكدة تبقى placeholders داخل أقواس مربعة فقط:
  - [رقم الهاتف] [البريد الإلكتروني] [عنوان المكتب]
  - [Phone Number] [Email Address] [Office Address]
- لا refactors بعيدة عن الهدف.

### 5) خطة العمل الإلزامية (نفّذ بالتسلسل)

#### المرحلة A — Audit سريع ومُنظّم
1. أنشئ تقرير Gap Analysis مختصر داخل `docs/frontend-audit-report.md` يتضمن:
   - الموجود vs المطلوب
   - المفقود في الصفحات والمكونات
   - مشاكل اللغة/الاتجاه RTL-LTR
   - مشاكل الثيم
   - مشاكل الـ accessibility
   - مشاكل SEO/metadata/schema
   - مشاكل forms/privacy
2. حدد قائمة تنفيذ واضحة بالأولوية (P1/P2/P3).

#### المرحلة B — Content Architecture (مركزي وقابل للترجمة)
1. انقل النصوص المبعثرة إلى مصدر مركزي content-driven structure (مثل `src/content/*` أو `src/i18n/*`).
2. عرّف مفاتيح ترجمة واضحة ومنظمة حسب الصفحة/المكون.
3. استخدم نصوص عربية وإنجليزية مهنية واقعية لقطاع المحاماة.
4. أضف نسخة/صياغة قانونية متحفظة (بدون مبالغة تسويقية).

#### المرحلة C — Core UX/UI Completion
1. استكمال Header/Nav:
   - sticky header
   - solid on scroll
   - mobile menu محسّنة
   - language switcher + theme toggle واضحان
2. استكمال Footer غني:
   - روابط سريعة
   - خدمات
   - بيانات التواصل (placeholder عند عدم التأكيد)
   - روابط Legal: Privacy / Terms / Disclaimer
3. استكمال/تحسين المكونات المشتركة:
   - Hero, CTA, Cards, Breadcrumbs, FAQ, Forms, empty states
4. إضافة hover/focus/active/disabled states consistent.
5. استخدام Framer Motion بحركات هادئة واحترافية، تراعي `prefers-reduced-motion`.

#### المرحلة D — Pages Completion (كاملة بصريًا ووظيفيًا)
نفّذ/أكمل الصفحات التالية:
1. Home
   - رسالة قيمة واضحة
   - الخدمات
   - القطاعات
   - نبذة فريق
   - مقالات مميزة
   - CTA للتواصل/الحجز
2. About
   - القصة، الرسالة، الرؤية، القيم، المنهجية
3. Services
   - بنية خدمات منظمة وقابلة للتوسع
4. Service Details (Reusable template)
   - وصف الخدمة
   - نطاق العمل
   - خطوات التعاون
   - FAQ خاص بالخدمة
   - CTA
5. Industries
   - قطاعات + احتياجات قانونية عملية
6. Team
   - بطاقات أعضاء احترافية
7. Insights
   - Listing منظم للمقالات
8. Article Details
   - author/date/category/related/breadcrumbs
9. Contact
   - blocks تواصل واضحة + نموذج
10. Book Consultation
   - نموذج محترف + validation + success/error states

#### المرحلة E — Privacy/Compliance/Legal UX
1. أنشئ صفحات (على الأقل scaffolding جاهز):
   - Privacy Policy
   - Terms & Conditions
   - Legal Disclaimer
2. اربط الصفحات من Footer + Forms.
3. داخل النماذج أضف:
   - إشعار خصوصية مختصر
   - checkbox موافقة مناسبة (عند الحاجة)
   - رابط سياسة الخصوصية
   - نص يوضح أن الإرسال لا ينشئ علاقة محامٍ-موكل تلقائيًا (صياغة مهنية مختصرة)

#### المرحلة F — SEO + Structured Data Scaffolding
1. لكل صفحة:
   - عنوان وصفي
   - meta description
   - canonical placeholder إن لزم
2. جهّز helpers/components لحقن schema لاحقًا:
   - LocalBusiness/LegalService
   - BreadcrumbList
   - Article
3. اجعل التنفيذ قابلًا للتوسعة لاحقًا وربطه ببيانات حقيقية.

#### المرحلة G — Accessibility & Quality
1. semantic HTML مضبوط (header/nav/main/section/article/footer).
2. keyboard navigation كاملة.
3. focus-visible states واضحة.
4. contrast مناسب (WCAG 2.2 مبادئ عامة).
5. labels/aria attributes للنماذج والعناصر التفاعلية.

#### المرحلة H — Future-ready integration points
أضف طبقة تنظيم تسهّل الربط لاحقًا مع:
- CMS
- backend APIs
- booking pipeline
- client portal entry point

بدون تنفيذ الباكند الآن.

### 6) معايير القبول (لا تُنهِ العمل قبل تحقيقها)
- جميع صفحات الموقع العام مكتملة.
- RTL/LTR يعملان بشكل صحيح في التخطيط والتنقل والمكونات.
- الثيم الفاتح/الداكن intentional وليس مجرد عكس ألوان.
- لا توجد نصوص lorem ipsum.
- لا توجد claims تسويقية مضللة.
- النماذج تحتوي privacy notice + consent wording + validation + success/error.
- placeholders موجودة لأي بيانات غير مؤكدة.
- SEO scaffolding + breadcrumbs + schema stubs جاهزة.
- الكود منظم وقابل للتوسع.

### 7) مخرجات التسليم المطلوبة من الوكيل
1. قائمة الملفات المعدلة والمضافة.
2. ملخص واضح لما تم في كل مرحلة.
3. لقطات شاشة للصفحات الرئيسية (Desktop + Mobile) إن كان التطبيق قابلاً للتشغيل.
4. تقرير اختبارات يتضمن:
   - build
   - lint
   - أي tests متاحة
   - فحص RTL/LTR
   - فحص accessibility أساسي
5. قائمة Follow-ups مقترحة للمرحلة التالية (Backend/CMS integration).

### 8) أسلوب التنفيذ
- نفّذ تعديلات صغيرة متتابعة وقابلة للمراجعة.
- لا تكسر المسارات الحالية.
- حافظ على naming conventions الموجودة بالمشروع.
- اكتب كود نظيف وقابل للصيانة.
- عند الشك في أي بيانات تعريفية للمكتب، استخدم placeholders بين أقواس مربعة فقط.

ابدأ الآن بالتدقيق، ثم نفّذ جميع المراحل حتى الوصول لمعايير القبول كاملة.

---

## ملاحظات استخدام سريعة
- يمكنك استخدام هذا البرومبت كرسالة واحدة كبيرة إلى الوكيل.
- أو تقسيمه إلى دفعات (Audit → Core Components → Pages → Compliance/SEO → QA) مع نفس القيود.
