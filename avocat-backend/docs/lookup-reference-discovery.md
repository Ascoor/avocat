# Lookup / Reference Discovery Report (Laravel + PostgreSQL)

## Scope executed
- `database/seeders`
- `database/migrations`
- `app/Models`
- `app/Http/Controllers`
- `app/Http/Requests`
- `app/Http/Resources`
- `routes/api.php`, `routes/web.php`

## Discovery notes
- لا توجد `Http/Resources` معرفة حالياً.
- يوجد Request واحد فقط (`ProfileUpdateRequest`) ولا يحتوي dropdown lookups.
- أغلب جداول الـ lookup الحالية System-wide (لا يوجد `office_id`).
- لا يوجد Soft Deletes في أي lookup table تم رصدها.

---

## 1) LookupEntityName: Case Types
- **TableName:** `case_types`
- **Current Columns:**
  - `id: bigserial` (PK, not null)
  - `name: varchar` (not null)
  - `created_at: timestamp` (nullable)
  - `updated_at: timestamp` (nullable)
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:**
    - `case_sub_types.case_type_id -> case_types.id`
    - `leg_cases.case_type_id -> case_types.id`
  - **Used by features:** `cases`
- **Unique constraints / indexes:** PK only (لا يوجد unique على الاسم)
- **Office ownership:** System-wide حالياً (لا يوجد `office_id`) → **System+Overrides** مقترحة
- **Seeders:** `CaseTypesTableSeeder` (samples: `إدارية`, `عمالية`, `جنح`)
- **Routes/Controllers/Requests/Resources usage references:**
  - Routes: `routes/api.php` (`apiResource('case_types')`, `case-types/{caseTypeId}/sub-types`, `legal-case/case-types-sub-types`)
  - Controllers: `app/Http/Controllers/Api/CaseTypeController.php`, `app/Http/Controllers/Api/LegCaseController.php`
  - Models: `app/Models/CaseType.php`, `app/Models/LegCase.php`, `app/Models/CaseSubType.php`

## 2) LookupEntityName: Case Sub Types
- **TableName:** `case_sub_types`
- **Current Columns:**
  - `id: bigserial` (PK)
  - `name: varchar` (not null)
  - `case_type_id: bigint` (not null, FK)
  - timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id` (optional if multi-level), `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** `case_type_id -> case_types.id`
  - **Incoming FKs:** `leg_cases.case_sub_type_id -> case_sub_types.id`
  - **Used by features:** `cases`
- **Unique constraints / indexes:** PK + FK index ضمنياً
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `CaseSubTypesTableSeeder` (samples: `محكمة الجنح`, `جنح مستأنف`, `مدني كلى`)
- **Routes/Controllers usage references:**
  - `routes/api.php` (`apiResource('case_sub_types')`)
  - `app/Http/Controllers/Api/CaseSubTypeController.php`
  - `app/Http/Controllers/Api/CaseTypeController.php`
  - `app/Models/CaseSubType.php`

## 3) LookupEntityName: Service Types
- **TableName:** `service_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `services.service_type_id -> service_types.id`
  - **Used by features:** `services`
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `ServiceTypesTableSeeder` (samples: `بنوك`, `مكالمة عميل`, `أجتماعات`)
- **Usage references:** `app/Http/Controllers/Api/ServiceController.php`, `app/Models/ServiceType.php`, `routes/api.php` (`service-types`)

## 4) LookupEntityName: Procedure Types
- **TableName:** `procedure_types`
- **Current Columns:** `id`, `name` (unique), timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `procedures.procedure_type_id -> procedure_types.id`
  - **Used by features:** `procedures`
- **Unique constraints / indexes:** `unique(name)` موجود
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `ProcedureTypesTableSeeder` (samples: `إجراء`, `إطلاع خارجي مراكز`, `إطلاع محاكم`)
- **Usage references:** `routes/api.php` (`apiResource('procedure_types')`), `app/Http/Controllers/Api/ProcedureTypeController.php`, `app/Http/Controllers/Api/ProcedureController.php`

## 5) LookupEntityName: Procedure Place Types
- **TableName:** `procedure_place_types`
- **Current Columns:** `id`, `name` (unique), timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `procedures.procedure_place_type_id -> procedure_place_types.id`
  - **Used by features:** `procedures`
- **Unique constraints / indexes:** `unique(name)` موجود
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `ProcedurePlaceTypesTableSeeder` (samples seeded)
- **Usage references:** `routes/api.php` (`apiResource('procedure_place_types')`), `app/Http/Controllers/Api/ProcedurePlaceTypeController.php`, `app/Models/ProcedurePlaceType.php`

## 6) LookupEntityName: Legal Session Types
- **TableName:** `legal_session_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `legal_sessions.legal_session_type_id -> legal_session_types.id`
  - **Used by features:** `sessions`
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `LegalSessionTypesTableSeeder` (values seeded)
- **Usage references:** `routes/api.php` (`legal_session_types`), `app/Http/Controllers/Api/LegalSessionTypeController.php`, `app/Models/LegalSessionType.php`

## 7) LookupEntityName: Legal Ad Types
- **TableName:** `legal_ad_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `legal_ads.legal_ad_type_id -> legal_ad_types.id`
  - **Used by features:** `announcements`
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `LegalAdTypeSeeder` (samples seeded via model factory-style create)
- **Usage references:** `routes/api.php` (`legal_ad_types`), `app/Http/Controllers/Api/LegalAdTypeController.php`, `app/Models/LegalAdType.php`

## 8) LookupEntityName: Revenue Categories (Revenue Types)
- **TableName:** `revenue_categories`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `revenues.revenue_category_id -> revenue_categories.id`
  - **Used by features:** `revenues`
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `RevenueCategories` (samples seeded)
- **Usage references:** `app/Models/RevenueCategory.php`, `database/migrations/2023_09_18_204200_create_revenues_table.php`

## 9) LookupEntityName: Expense Categories (Expense Types)
- **TableName:** `expense_categories`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `expenses.expense_category_id -> expense_categories.id`
  - **Used by features:** `expenses`
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `ExpenseCategories` (samples seeded)
- **Usage references:** `routes/api.php` (`apiResource('expense_categories')` + `expense_categories`), `app/Http/Controllers/Api/ExpenseCategoryController.php`, `app/Models/ExpenseCategory.php`

## 10) LookupEntityName: Attorney Types (Lawyer Grade proxy)
- **TableName:** `attorney_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `power_of_attorneys.attorney_type_id -> attorney_types.id`
  - **Used by features:** `lawyers` (عبر power_of_attorneys)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `AttorneyTypesTableSeeder` (samples seeded)
- **Usage references:** `app/Models/AttorneyType.php`, `database/migrations/2023_04_12_050522_create_power_of_attorneys_table.php`

## 11) LookupEntityName: Court Levels (Litigation Degrees)
- **TableName:** `court_levels`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `courts.court_level_id -> court_levels.id`
  - **Used by features:** `courts`, `sessions`, `announcements`, `cases` (indirect)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `CourtLevelsTableSeeder` (samples seeded)
- **Usage references:** `routes/api.php` (`apiResource('court_levels')`), `app/Http/Controllers/Api/CourtLevelController.php`, `app/Models/CourtLevel.php`

## 12) LookupEntityName: Court Types
- **TableName:** `court_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:** `courts.court_type_id -> court_types.id`
  - **Used by features:** `courts`, `sessions`, `announcements`, `cases` (indirect)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `CourtTypesTableSeeder` (samples seeded)
- **Usage references:** `routes/api.php` (`apiResource('court_types')`), `app/Http/Controllers/Api/CourtTypeController.php`, `app/Models/CourtType.php`

## 13) LookupEntityName: Courts
- **TableName:** `courts`
- **Current Columns:**
  - `id`
  - `name`
  - `court_type_id` (FK)
  - `court_level_id` (FK)
  - timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id` (for hierarchy if needed), `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:**
    - `court_type_id -> court_types.id`
    - `court_level_id -> court_levels.id`
  - **Incoming FKs:**
    - `divisions.court_id -> courts.id`
    - `legal_sessions.court_id -> courts.id`
    - `legal_ads.court_id -> courts.id`
    - `leg_case_court.court_id -> courts.id`
  - **Used by features:** `courts`, `sessions`, `announcements`, `cases`
- **Unique constraints / indexes:** PK + FK indexes
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** `CourtsTableSeeder` (court rows seeded)
- **Usage references:** `routes/api.php` (`apiResource('courts')`, court search routes), `app/Http/Controllers/Api/CourtController.php`, `app/Http/Controllers/Api/CourtSearchController.php`, `app/Models/Court.php`

## 14) LookupEntityName: Divisions (Court sub-classification)
- **TableName:** `divisions`
- **Current Columns:** `id`, `name`, `court_id` (FK), timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id` (يمكن الاستغناء لوجود `court_id`), `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** `court_id -> courts.id`
  - **Incoming FKs:** not detected
  - **Used by features:** `courts` (هيكل محاكم)
- **Unique constraints / indexes:** PK + FK index
- **Office ownership:** System-wide حالياً → **System+Overrides**
- **Seeders:** لا يوجد Seeder واضح لهذا الجدول
- **Usage references:** `app/Models/Division.php`, `app/Models/Court.php`

## 15) LookupEntityName: Search Degrees
- **TableName:** `search_degrees`
- **Current Columns:** `id`, `degree_name`, `degree_value`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:** لا توجد FKs
- **Used by features:** `courts`/`cases` (External court search mapping)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System reference data → **System default**
- **Seeders:** `SearchDegreesTableSeeder` (samples: `نقض`, `استئناف`, `ابتدائى`, `جزئى`)
- **Usage references:** `app/Http/Controllers/Api/CourtSearchController.php`, `app/Http/Controllers/Api/CaseStatusController.php`, `routes/api.php` (`court-search/degrees`)

## 16) LookupEntityName: Search Courts
- **TableName:** `search_courts`
- **Current Columns:** `id`, `degree_value`, `court_name`, `court_value`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:** لا توجد FKs (string-based mapping)
- **Used by features:** `courts`/`cases` (external lookup)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System reference data → **System default**
- **Seeders:** `SearchCourtsTableSeeder` (samples: `محكمة استئناف القاهرة`, `محكمة إستئناف الاسكندرية`)
- **Usage references:** `app/Models/SearchCourt.php`, `app/Http/Controllers/Api/CourtSearchController.php`, `routes/api.php` (`search-court`, `court-search/courts`)

## 17) LookupEntityName: Search Case Types
- **TableName:** `search_case_types`
- **Current Columns:** `id`, `degree_value`, `court_value`, `case_type_name`, `case_type_value`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:** لا توجد FKs
- **Used by features:** `cases` (external lookup)
- **Unique constraints / indexes:** PK only
- **Office ownership:** System reference data → **System default**
- **Seeders:** `SearchCaseTypesTableSeeder` (samples: `تحكيم`, `جمعيات اهلية`, `رد ومخاصمة استئنافية`)
- **Usage references:** `app/Models/SearchCaseType.php`, `app/Http/Controllers/Api/CourtSearchController.php`, `routes/api.php` (`court-search/case-types`)

## 18) LookupEntityName: Appeal Types (similar lookup)
- **TableName:** `appeal_types`
- **Current Columns:** `id`, `appeal_type`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:**
    - `appeal_sub_types.appeal_type_id -> appeal_types.id`
    - `cassation_rules.appeal_type_id -> appeal_types.id`
  - **Used by features:** legal docs/cassation module
- **Unique constraints / indexes:** PK only
- **Office ownership:** System default (مرجعية قانونية عامة)
- **Seeders:**
  - `AppealTypesSeeder` (valid schema: column `appeal_type`)
  - `AppealTypeAndSubTypeSeeder` **غير متوافق مع schema الحالي** (uses `type_name`)
- **Usage references:** `app/Models/AppealType.php`, `database/migrations/2023_12_27_151729_create_document_management_tables.php`, seeders المذكورة

## 19) LookupEntityName: Appeal Sub Types (similar lookup)
- **TableName:** `appeal_sub_types`
- **Current Columns:** `id`, `appeal_type_id` (FK), `appeal_sub_type`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id` (optional), `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** `appeal_type_id -> appeal_types.id`
  - **Incoming FKs:** `cassation_rules.appeal_sub_type_id -> appeal_sub_types.id`
  - **Used by features:** legal docs/cassation module
- **Unique constraints / indexes:** PK + FK index
- **Office ownership:** System default
- **Seeders:**
  - `AppealSubTypesSeeder` (valid schema)
  - `AppealTypeAndSubTypeSeeder` **غير متوافق** (uses `sub_type_name`)
- **Usage references:** `app/Models/AppealSubType.php`, migration الملف أعلاه

## 20) LookupEntityName: Doc Types (similar lookup)
- **TableName:** `doc_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** none
  - **Incoming FKs:**
    - `doc_sub_types.doc_type_id -> doc_types.id`
    - `legal_docs.doc_type_id -> doc_types.id`
  - **Used by features:** legal docs
- **Unique constraints / indexes:** PK only
- **Office ownership:** **Office-specific** غالباً (قوالب عمل داخل المكتب)
- **Seeders:** لا يوجد seeder ثابت مرصود
- **Usage references:** `routes/api.php` (`doc-types` endpoints), `app/Http/Controllers/Api/LegalDocToolsController.php`, `app/Http/Controllers/Api/LegalDocArchiveController.php`, `app/Models/DocType.php`

## 21) LookupEntityName: Doc Sub Types (similar lookup)
- **TableName:** `doc_sub_types`
- **Current Columns:** `id`, `name`, `doc_type_id` (FK), timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id` (عادة غير مطلوب), `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:**
  - **Outgoing FKs:** `doc_type_id -> doc_types.id`
  - **Incoming FKs:** `legal_docs.doc_sub_type_id -> doc_sub_types.id`
  - **Used by features:** legal docs
- **Unique constraints / indexes:** PK + FK index
- **Office ownership:** **Office-specific**
- **Seeders:** لا يوجد seeder ثابت مرصود
- **Usage references:** `routes/api.php` (`doc-sub-types` endpoints), `app/Http/Controllers/Api/LegalDocToolsController.php`, `app/Models/DocSubType.php`

## 22) LookupEntityName: Power Types (similar lookup)
- **TableName:** `power_types`
- **Current Columns:** `id`, `name`, timestamps
- **Suggested Standard Columns:** `office_id`, `is_system`, `parent_id`, `is_active`, `sort_order`, `is_locked`, `deleted_at`
- **Relations:** لم يتم رصد FKs مرتبطة حالياً
- **Unique constraints / indexes:** PK only
- **Office ownership:** System+Overrides (بحسب نموذج العمل)
- **Seeders:** لم يتم رصد seeder مباشر واضح
- **Usage references:** migration only (`database/migrations/2023_09_08_021431_create_power_types_table.php`)

---

## Extracted “Similar tables” list (rule-based)
### Name-based pattern match (`_types`, `_categories`, `_levels`, contains grade/rank)
- `case_types`, `case_sub_types`
- `service_types`
- `procedure_types`, `procedure_place_types`
- `legal_session_types`, `legal_ad_types`
- `court_types`, `court_levels`
- `revenue_categories`, `expense_categories`
- `appeal_types`, `appeal_sub_types`
- `doc_types`, `doc_sub_types`
- `search_case_types`
- `attorney_types`
- `power_types`

### Heuristic match (name-only / name+parent / seeded static data)
- `courts`, `divisions`
- `search_degrees`, `search_courts`

---

## Gap Analysis

### A) Missing management columns (global observation)
جميع lookup tables تقريباً تفتقد الأعمدة:
- `is_active` (toggle enable/disable)
- `sort_order` (stable ordering)
- `is_locked` (prevent deletion of system defaults)
- `deleted_at` (soft deletes)
- `office_id` + `is_system` (multi-tenant ownership)

### B) Unique strategy for PostgreSQL
- الجداول التي لديها `name` أو ما يعادلها تحتاج unique per scope باستخدام:
  - `unique (office_id, lower(name))` للجداول Office-specific
  - `unique (lower(name)) where is_system = true` لبيانات النظام
- بديل للأعمدة المسمّاة بشكل مختلف:
  - `appeal_types.appeal_type`
  - `appeal_sub_types.appeal_sub_type`
  - `search_*` tables (بحسب business key المركب)

### C) Parent-child normalization gaps
- موجود بالفعل parent linkage في:
  - `case_sub_types.case_type_id`
  - `doc_sub_types.doc_type_id`
  - `appeal_sub_types.appeal_type_id`
- قد يلزم `parent_id` ذاتي (self-reference) في حال الحاجة لتدرج متعدد المستويات داخل نفس الكيان (مثلاً court taxonomy مستقبلاً).

### D) Data quality / schema drift issues found
- Seeder inconsistency:
  - `AppealTypeAndSubTypeSeeder` يستخدم أعمدة `type_name`, `sub_type_name` غير الموجودة بالمخطط الحالي (`appeal_type`, `appeal_sub_type`).
- غياب قيود uniqueness عن أغلب lookup names يسبب duplicates عالية الاحتمال.

### E) Ordering recommendation (PostgreSQL-safe)
- اعتماد `ORDER BY sort_order NULLS LAST, name ASC` بدلاً من أي `FIELD()` logic.

---

## Ownership recommendation summary
- **System default only:** `search_degrees`, `search_courts`, `search_case_types`, `appeal_types`, `appeal_sub_types`.
- **Office specific:** `doc_types`, `doc_sub_types`.
- **System + Overrides (recommended):** باقي lookups التشغيلية (`case_types`, `case_sub_types`, `service_types`, `procedure_types`, `procedure_place_types`, `legal_session_types`, `legal_ad_types`, `revenue_categories`, `expense_categories`, `attorney_types`, `court_levels`, `court_types`, `courts`, `divisions`, `power_types`).
