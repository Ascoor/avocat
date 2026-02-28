# RBAC + ABAC Foundation Refactor

## 1) Naming normalization

- تم اعتماد نمط موحّد للصلاحيات: `resource.action`.
- جميع الأسماء أصبحت بصيغة snake_case في الـ action عندما تكون مركّبة:
  - `cases.change_status`
  - `users.assign_roles`
  - `clients.view_sensitive`
- تم إزالة البادئات غير القياسية مثل:
  - `legal-cases.*` → `cases.*`
  - `admin-users.*` → `users.*`

## 2) Entity normalization decision (Client vs Unclient)

- القرار البنيوي المقترح: دمج `Unclient` داخل `Client` بإضافة `client_type` (`with_agency` / `without_agency`) لتقليل التكرار في CRUD والبحث.
- لحين تنفيذ الدمج في قاعدة البيانات، تم توحيد الصلاحيات على مورد `clients` فقط لتسهيل الانتقال.

## 3) RBAC role model

تم تعريف مصفوفة أدوار قياسية:

- `super_admin`: جميع الصلاحيات.
- `admin`: كل الصلاحيات باستثناء عمليات الحذف الحرجة.
- `lawyer`: صلاحيات تشغيلية للقضايا/الموكلين/الجلسات/الإجراءات/الخدمات + تقارير.
- `assistant`: تشغيل يومي بدون حذف أو إغلاق السجلات الأساسية.
- `viewer`: عرض فقط + تقارير قراءة.

## 4) ABAC policy contracts

تم تثبيت قواعد ABAC أساسية في طبقة الواجهة لتطابق المطلوب:

- عزل المكاتب (office scoping): لا وصول عبر مكتب مختلف إلا لـ `super_admin`.
- وصول المحامي للقضايا المرتبطة به أو بفريقه.
- قيود المساعد على تغيير حالة القضايا المغلقة.
- حماية الحقول الحساسة (`clients.view_sensitive`) مع التحقق من `office_id`.

## 5) Frontend guard strategy

- إضافة `PermissionGuard` قابل لإعادة الاستخدام لتأمين أي جزء UI عبر:
  - شرط مفرد أو متعدد (`any` / `all`).
  - fallback مخصص أو شاشة منع قياسية.
- استخدام `guardPermissions` لدعم guards موحدة في الصفحات الجديدة.

## 6) E2E scope recommendation

حالات E2E المطلوبة بعد ربط الـ backend policies:

1. lawyer يرى case داخل نفس office/team ويُمنع خارج النطاق.
2. assistant لا يستطيع delete/close للقضايا.
3. viewer لا يرى أزرار التعديل والحذف.
4. بيانات عميل حساسة تُحجب بدون `clients.view_sensitive`.
