# RBAC Rebuild Plan (Laravel 11 - new-avocatapp)

## 1) Decision: Spatie vs Custom

**Recommendation: Spatie** (laravel-permission) في Laravel 11.
- السبب: النظام القديم لا يحتوي إلا على `users.role` بدون بنية صلاحيات، وبالتالي نحتاج نظام RBAC كامل. استخدام Spatie يقلل التكلفة ويعطي API جاهز للـ roles/permissions و pivot tables و caching.
- ملاحظة: لا يتم تثبيت الحزمة الآن، هذا مخطط فقط.

## 2) Naming Convention للصلاحيات

- نمط موحد: `module.action`.
- أمثلة:
  - `legal_cases.view`
  - `legal_cases.create`
  - `legal_cases.update`
  - `legal_cases.delete`
- امتدادات للعمليات الخاصة:
  - `legal_cases.manage_clients`
  - `legal_cases.manage_courts`
  - `legal_documents.upload`

## 3) DB Schema المقترح

### خيار Spatie (الموصى به)
- جداول قياسية للحزمة:
  - `roles`
  - `permissions`
  - `model_has_roles`
  - `model_has_permissions`
  - `role_has_permissions`
- لا يتم حذف عمود `users.role` مباشرة؛ يُستخدم لفترة انتقالية فقط.

### خيار Custom (بديل في حال عدم استخدام Spatie)
- جداول مقترحة:
  - `roles` (id, name, description)
  - `permissions` (id, name, module, action, description)
  - `role_user` (role_id, user_id)
  - `permission_role` (permission_id, role_id)
  - اختياري: `user_permissions` لاستثناءات المستخدم

## 4) Policy Strategy

- استخدام Laravel Policies لكل resource أساسي (clients, legal_cases, etc.).
- methods القياسية: `viewAny`, `view`, `create`, `update`, `delete`.
- ربط policy بـ permission name موحد (module.action).

## 5) Middleware Strategy

- Middleware واحد للتحقق من permission في routes:
  - `->middleware('permission:module.action')`
- الحفاظ على `auth:sanctum` كشرط أساسي قبل أي permission.

## 6) API Endpoints المطلوبة للواجهة

- **/api/me** (إلزامي):
  - يعيد user + roles + permissions (flattened array).
  - مثال response:
    ```json
    {
      "id": 1,
      "name": "User",
      "roles": ["admin"],
      "permissions": ["legal_cases.view", "legal_cases.create"]
    }
    ```

## 7) Migration steps من legacy إلى النظام الجديد

1. **Discovery تثبيت القائمة**: اعتماد ملف inventory الناتج من legacy (`PERMISSIONS_INVENTORY.md` + CSV) كقائمة أولية للصلاحيات.
2. **تعريف roles الجديدة**: لا توجد أسماء أدوار واضحة في legacy (roles = 1/2/3)، لذلك يلزم قرار أعمال لتسمية الأدوار وتحديد صلاحياتها.
3. **Seed أولي للصلاحيات**: إنشاء Seeder يقرأ قائمة permissions من CSV ويغذي جدول permissions.
4. **Mapping مؤقت لعمود users.role**:
   - تحويل القيم `1/2/3` إلى roles جديدة بعد اعتماد التسمية.
   - إنشاء mapping document مؤقت لتتبع التحويل.
5. **فرض الحماية تدريجيًا (Phases)**:
   - Phase 1: تطبيق schema + `/api/me` + حماية endpoints الإدارية الحساسة.
   - Phase 2: حماية CRUD للموديولات الأساسية (clients, legal_cases, courts...).
   - Phase 3: إضافة scoping (own/assigned) عند الحاجة عبر Policies.

## 8) Notes / Risks

- لا توجد أدلة في legacy على scoping (own/assigned)، لذلك يجب جمع متطلبات العمل قبل تنفيذها.
- يجب الإبقاء على التوافق مع `auth:sanctum` في Laravel 11.
