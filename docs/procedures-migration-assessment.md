# تقييم أولي لهيكل بيانات `data/procedures` مقابل نماذج التطبيق

هذا المستند يقدم **نظرة سريعة عملية** على بنية ملفات الإجراءات القديمة داخل `data/procedures`، ومقارنتها بشكل تخطيطي مع جداول/موديلات التطبيق الحالية؛ تمهيدًا لتنسيق خطة ترحيل البيانات.

## 1) ملاحظات على المعمارية الحالية لملفات المصدر

- المجلد يحتوي على تقسيمات رئيسية:
  - `data/procedures/{year}/{month}.json` (مجمّع/مختلط).
  - `data/procedures/others/{year}/{month}.json` (إجراءات عامة).
  - `data/procedures/sessions/{year}/{month}.json` (جلسات).
  - `data/procedures/announcements/{year}/{month}.json` (إعلانات).
- أغلب الملفات عبارة عن **Arrays من كائنات JSON**، لكن الحقول ليست موحدة 100% بين كل ملف/سنة.
- توجد بيانات متداخلة بين نمطين:
  - نمط **وصفي نصي**: `procedure_type`, `procedure_place_type`, `lawyer_name`, `case_slug`.
  - نمط **مرجعي رقمي**: `procedure_type_id`, `procedure_place_type_id`, `lawyer_id`.

## 2) ملخص إحصائي سريع (من فحص فعلي)

- `data/procedures`: 104 ملف، 29,947 سجل، السنوات 2017→2025.
- `data/procedures/others`: 103 ملف، 27,794 سجل.
- `data/procedures/sessions`: 41 ملف، 1,508 سجل.
- `data/procedures/announcements`: 76 ملف، 634 سجل.
- توجد شهور ناقصة في بعض المسارات (خصوصًا 2025 في عدة مسارات، ويناير 2024 غير موجود في `sessions` و `announcements`).

## 3) مقارنة الحقول مع جداول التطبيق الحالية

> المقارنة هنا مع النماذج الرسمية: `Procedure`, `LegalSession`, `LegalAd`.

### A) بيانات `others` / الإجراءات العامة  → جدول `procedures`

**الحقول المتوافقة جزئيًا:**
- `date_start`, `date_end`, `status`, `cost1`, `cost2`, `cost3`.
- `procedure_place` ⟶ تحتاج تحويل إلى `procedure_place_name`.
- `order_details` ⟶ تقابل غالبًا `job`.
- `decision_or_result` أو `resultes` ⟶ تقابل `result`.
- `notes` ⟶ تقابل `note`.

**فجوات/اختلافات مهمة:**
- حقل الحالة في التطبيق محصور في: `تمت`, `لم ينفذ`, `جاري التنفيذ`.
- بعض المصادر تستخدم الكتابة: `جارى التنفيذ` (ألف مقصورة) ويلزم توحيد قبل الإدخال.
- وجود `cost4`, `cost5`, `cost6` في المصدر، بينما جدول `procedures` يدعم فقط `cost1..cost3`.
- الربط بالقضية في المصدر عبر `case_slug`، بينما التطبيق يتطلب `leg_case_id`.
- في التطبيق `job` و`created_by` **إلزاميان** عند الإنشاء، وهما غير مضمونين دائمًا بصيغة جاهزة في المصدر.

### B) بيانات `sessions`  → جدول `legal_sessions`

**الحقول الأقرب:**
- `session_date` ⟶ `session_date`.
- `roll_number` ⟶ `session_roll`.
- `session_status` ⟶ `status` (مع توحيد القيم).
- `requests_and_pleas` ⟶ `orders`.
- `decision_or_result` / `resultes` / `results` ⟶ `result`.
- `judgement_statement` ⟶ `Judgment_operative`.
- `notes`, `cost1..cost3`, `case_slug`.

**فجوات/اختلافات مهمة:**
- المصدر فيه `court_or_prosecution` نصي؛ التطبيق يتطلب `court_id` مرجعي.
- المصدر فيه `session_type` نصي؛ التطبيق يتطلب `legal_session_type_id`.
- المصدر فيه `lawyer_name` غالبًا نص؛ التطبيق يتطلب `lawyer_id`.
- حالات الجلسات في مخطط الجدول تستخدم `جارى التنفيذ` بينما إجراءات التطبيق/المصادر قد تستخدم صياغات أخرى؛ يلزم قاموس تطبيع للحالات.

### C) بيانات `announcements`  → جدول `legal_ads` (أو جزئيًا `procedures` حسب سياسة الترحيل)

**مؤشرات تطابق وظيفي مع `legal_ads`:**
- وجود `procedure_type='اعلان'` في كثير من السجلات.
- `order_details` مناسب لـ `description`.
- `decision_or_result`/`results` مناسب لـ `results`.
- `date_start` (إرسال) يمكن ربطه بـ `send_date`، و`date_end` (استلام) بـ `receive_date`.

**فجوات:**
- `legal_ads` يحتاج `legal_ad_type_id`, `court_id`, `lawyer_send_id`, `created_by` بشكل واضح.
- المصدر يحتوي غالبًا نصوص (`procedure_place`, `lawyer_name`) بدل معرفات مرجعية.
- وجود `cost4..cost6` غير مدعوم مباشرة.

## 4) الوضع داخل التطبيق (ملخص تنفيذي)

- `procedures` تعتمد على علاقات مرجعية واضحة (`procedure_type_id`, `leg_case_id`, `lawyer_id`, ...)، مع حقول إلزامية في API عند الإنشاء/التحديث.
- `legal_sessions` كذلك تعتمد على `legal_session_type_id`, `leg_case_id`, `court_id`, `lawyer_id` مع قيود تحقق.
- `legal_ads` تتطلب مفاتيح مرجعية وتواريخ محددة (`send_date` إلزامي، وغيرها حسب مرحلة السجل).

## 5) الاستنتاج العملي قبل البدء في الترحيل

البيانات في `data/procedures` **صالحة للترحيل**، لكن تحتاج طبقة **Normalization + Mapping** قبل الإدخال المباشر:

1. توحيد أسماء الحقول (`resultes`/`decision_or_result`/`results` → `result`).
2. تحويل القيم النصية إلى معرفات (`case_slug` → `leg_case_id`, `lawyer_name` → `lawyer_id`, `procedure_type` → `procedure_type_id`, `session_type` → `legal_session_type_id`, `court_or_prosecution` → `court_id`).
3. توحيد حالات التنفيذ/الجلسات (`جاري` vs `جارى`).
4. اعتماد سياسة للتكاليف الإضافية `cost4..cost6` (دمج/إهمال/أرشفة في `metadata`).
5. تحديد قاعدة تصنيف واضحة: ما الذي يذهب `procedures` مقابل `legal_sessions` مقابل `legal_ads`.

## 6) مقترح خطوة تالية (جاهزة للتنفيذ)

- إعداد **Mapping Dictionary** واحد (JSON/YAML) يشمل:
  - قاموس أنواع الإجراءات.
  - قاموس أنواع الجلسات.
  - قاموس الأماكن/المحاكم.
  - قاموس المحامين.
  - قاموس الحالات.
- ثم تشغيل Dry-run ترحيل على سنة واحدة (مثلاً 2024) وإخراج:
  - نسبة السجلات القابلة للترحيل مباشرة.
  - نسبة السجلات المتعثرة بسبب مراجع غير موجودة.
  - تقرير الفروقات قبل الترحيل الكامل.
