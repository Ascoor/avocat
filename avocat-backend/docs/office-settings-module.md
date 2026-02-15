# Office Settings Module

## 1) Sections and entities
- **إعدادات القضايا:** `case_types`, `case_sub_types`
- **إعدادات الخدمات:** `service_types`
- **إعدادات الإجراءات:** `procedure_types`, `procedure_place_types`
- **إعدادات الجلسات:** `legal_session_types`
- **إعدادات الإعلانات:** `legal_ad_types`
- **إعدادات المالية:** `revenue_categories`, `expense_categories`
- **إعدادات المحامين:** `attorney_types`
- **إعدادات المحاكم:** `court_levels`, `court_types`, `courts`, `divisions`
- **إعدادات المستندات (office-specific):** `doc_types`, `doc_sub_types`
- **بيانات بحث خارجية (read-only):** `search_degrees`, `search_courts`, `search_case_types`
- **كيانات إضافية:** `power_types`, `appeal_types`, `appeal_sub_types`

> المصدر الديناميكي: `config/office_settings.php`.

## 2) Migration plan (implemented)
Migration: `2026_02_16_000100_add_office_settings_columns_to_lookup_tables.php`

### Added columns (for CRUD-enabled entities)
- `office_id` nullable indexed
- `is_system` boolean default false indexed
- `parent_id` nullable indexed
- `is_active` boolean default true indexed
- `sort_order` integer nullable
- `is_locked` boolean default false
- `deleted_at` nullable timestamp indexed

### Added indexes
- `(office_id, is_active)`
- `(office_id, sort_order)`
- partial unique on office scope:
  - `unique (office_id, lower(name)) where deleted_at is null`
- partial unique on system scope:
  - `unique (lower(name)) where office_id is null and deleted_at is null`

### Backfill strategy
- جداول `system_overrides`: يتم تحويل كل السجلات القديمة إلى `is_system=true` و`office_id=null`.
- جداول `office_specific` (`doc_types`, `doc_sub_types`): تبقى `is_system=false`.
- `sort_order` يتم backfill بالقيمة `id` للسجلات الحالية.
- إضافة `users.office_id` لدعم ABAC.

## 3) Routes + Generic controller/request/resource
### Routes
- `GET    /api/v1/offices/{officeId}/settings/{entity}`
- `POST   /api/v1/offices/{officeId}/settings/{entity}`
- `PUT    /api/v1/offices/{officeId}/settings/{entity}/{id}`
- `DELETE /api/v1/offices/{officeId}/settings/{entity}/{id}`

### Core files
- `config/office_settings.php`
- `app/Support/OfficeSettings/OfficeSettingsManager.php`
- `app/Http/Controllers/Api/OfficeSettingsController.php`
- `app/Http/Requests/OfficeSettingUpsertRequest.php`
- `app/Http/Resources/OfficeSettingResource.php`

## 4) In-use checks matrix
- `case_types` -> `leg_cases.case_type_id`, `case_sub_types.case_type_id`
- `case_sub_types` -> `leg_cases.case_sub_type_id`
- `service_types` -> `services.service_type_id`
- `procedure_types` -> `procedures.procedure_type_id`
- `procedure_place_types` -> `procedures.procedure_place_type_id`
- `legal_session_types` -> `legal_sessions.legal_session_type_id`
- `legal_ad_types` -> `legal_ads.legal_ad_type_id`
- `revenue_categories` -> `revenues.revenue_category_id`
- `expense_categories` -> `expenses.expense_category_id`
- `attorney_types` -> `power_of_attorneys.attorney_type_id`
- `court_levels` -> `courts.court_level_id`
- `court_types` -> `courts.court_type_id`
- `courts` -> `legal_sessions`, `legal_ads`, `leg_case_court`, `divisions`
- `doc_types` -> `doc_sub_types`, `legal_docs`
- `doc_sub_types` -> `legal_docs`

### Delete behavior
- إذا كانت القيمة مستخدمة: يتم التحويل إلى `is_active=false` بدل الحذف الفعلي.
- إذا كانت system row: DELETE ينشئ office override مع `is_active=false` لتعطيلها داخل المكتب.

## 5) Resolution rules (implemented)
في `index` للجداول بنمط `system_overrides`:
1. جلب system rows (`is_system=true`, `office_id is null`, `deleted_at is null`)
2. جلب office rows (`office_id = officeId`, `deleted_at is null`)
3. merge:
   - office override (`parent_id = system.id`) يحل محل النظام
   - override inactive يخفي system row
   - office-added (`parent_id null`) تتم إضافته
4. ترتيب: `sort_order` ثم name (nulls last)

## 6) Example JSON responses
### List
```json
{
  "data": [
    {
      "id": 15,
      "name": "قضايا أسرية",
      "office_id": 3,
      "is_system": false,
      "parent_id": 2,
      "is_active": true,
      "sort_order": 10,
      "is_locked": false,
      "resolved_source": "office_override",
      "resolved_from_system_id": 2,
      "meta": {"created_at": "...", "updated_at": "..."}
    }
  ],
  "meta": {"office_id": 3, "entity": "case_types"}
}
```

### Create
```json
{
  "message": "Setting created successfully.",
  "data": {
    "id": 99,
    "name": "نوع خدمة داخلي",
    "office_id": 3,
    "is_system": false,
    "parent_id": null,
    "is_active": true,
    "sort_order": 50,
    "is_locked": false
  }
}
```

### Update
```json
{
  "message": "Setting updated successfully.",
  "data": {
    "id": 101,
    "name": "الاسم بعد التعديل",
    "office_id": 3,
    "parent_id": 7
  }
}
```

### Delete (soft/deactivate)
```json
{
  "message": "Setting deactivated instead of deletion.",
  "deleted": false,
  "deactivated": true,
  "data": {
    "id": 101,
    "is_active": false
  }
}
```

## 7) Test plan
- **Feature:** list merge behavior (system + office override + office added)
- **Feature:** create office setting (201)
- **Feature:** update system row creates/updates office override
- **Feature:** delete used record -> deactivated
- **Feature:** delete unused office record -> soft delete
- **Authorization:**
  - user without `officeSettings.manage` -> 403
  - user with permission but different `office_id` -> 403
  - user with permission and matching office -> allowed
- **Validation:**
  - `name` required
  - duplicate by case-insensitive (`lower(name)`) داخل نفس office -> 422
  - `is_active` boolean, `sort_order` integer

## 8) Seeders migration note
بعد اعتماد Office Settings:
- يُفضّل إيقاف seeders القديمة التي تعمل `delete + insert` للجداول المرجعية runtime.
- تحويلها إلى one-time bootstrap/system defaults فقط.
- seeders المتعارضة مع schema (مثل `AppealTypeAndSubTypeSeeder`) يجب تعطيلها أو تعديل أعمدة الإدراج (`appeal_type`, `appeal_sub_type`).
