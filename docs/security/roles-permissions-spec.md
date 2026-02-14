# Roles & Permissions Specification (RBAC + ABAC)

> **نطاق التحليل:** تم الاعتماد على كود الواجهة الحالي (`avocat-frontend`) + واجهات API المستنتجة من ملفات الخدمات + ملف API legacy الموجود في `docs/old-backend/routes/api.php` لغياب بنية Laravel 11 التنفيذية في `new-avocatapp` داخل هذا المستودع.

## 0) منهجية الاستخراج (What was inspected)

- Frontend routes:
  - `src/app/App.tsx`
  - `src/app/routes/AuthRoutes.jsx`
  - `src/config/sidebar.js`
- Frontend modules/features:
  - `src/features/**` (dashboard, legal-cases, clients, legal-services, reports, settings, admin, lawyers, courts, finance, archives ...)
- Frontend API integration:
  - `src/shared/services/api/*.js`
  - `src/shared/security/permission-map.ts`
- Backend routes (مرجع legacy فقط داخل repo):
  - `docs/old-backend/routes/api.php`

---

## 1) Modules Inventory (حصر الأقسام)

| Module (EN) | الاسم العربي | الوصف | الهدف التشغيلي | المستخدمون المستهدفون |
|---|---|---|---|---|
| Dashboard | لوحة التحكم | عرض مؤشرات الأداء والبحث السريع | متابعة الوضع العام للمكتب | Super Admin, Admin, Lawyer, Assistant, Viewer |
| Legal Cases | القضايا | إدارة دورة حياة القضية وربطها بجلسات/إجراءات/موكلين/محاكم | إدارة الملفات القانونية | Super Admin, Admin, Lawyer, Assistant |
| Sessions | الجلسات | إدارة جلسات القضايا وتتبع حالتها | متابعة التقاضي الزمني | Admin, Lawyer, Assistant |
| Procedures | الإجراءات | إدارة الإجراءات القانونية المرتبطة بالقضايا | متابعة الخطوات الإجرائية | Admin, Lawyer, Assistant |
| Services | الخدمات القانونية | إدارة خدمات المكتب وربط إجراءاتها | إدارة الخدمات غير القضائية/المساندة | Admin, Lawyer, Assistant |
| Clients | الموكلون (بوكالة/بدون وكالة) | إدارة بيانات العملاء وحالاتهم | قاعدة بيانات العملاء وإسنادهم للقضايا | Admin, Lawyer, Assistant |
| Reports Hub | التقارير | تقارير موحدة (Cases/Sessions/Procedures/Clients/Services) مع فلاتر | التحليل والتدقيق والتصدير المستقبلي | Super Admin, Admin, Lawyer, Accountant, Viewer |
| Courts & Taxonomies | إعدادات المحاكم والتصنيفات | إدارة المحاكم والأنواع (Case/Procedure/Service/Session types) | توحيد القيم المرجعية للنظام | Super Admin, Admin |
| Lawyers | المحامون | إدارة بيانات المحامين | الإسناد والموارد البشرية القانونية | Super Admin, Admin |
| Admin Users | إدارة المستخدمين | إنشاء/تعديل/حذف مستخدمي النظام وربط أدوارهم | التحكم بالوصول | Super Admin, Admin |
| Admin Roles | إدارة الأدوار | إنشاء الأدوار وربطها بالصلاحيات | تصميم RBAC | Super Admin |
| Admin Permissions | دليل الصلاحيات | استعراض الصلاحيات المتاحة | الحوكمة والامتثال | Super Admin, Admin |
| Profile & Settings | الملف الشخصي والإعدادات | إعدادات المستخدم/المكتب/التصنيفات المالية | ضبط النظام | Super Admin, Admin, Lawyer (profile فقط) |
| Finance (present but limited routes) | المالية | عرض/متابعة مالية (حسب الواجهة المتاحة) | المتابعة المالية | Super Admin, Admin, Accountant |
| Notifications & Events | الإشعارات والأحداث | تنبيه المستخدمين وتسجيل أحداث | تحسين المتابعة التشغيلية | جميع الأدوار التشغيلية |
| Archive / Legal Docs (legacy backend) | الأرشيف/المستندات | رفع/تصنيف المستندات القانونية | حفظ الأدلة والمرفقات | Admin, Lawyer, Assistant |

---

## 2) Feature/Action Map per Module

> **Action verbs القياسية المعتمدة:** `view`, `list`, `search`, `filter`, `create`, `update`, `delete`, `export`, `print`, `assign`, `reassign`, `change_status`, `close`, `reopen`, `attachments.manage`, `notes.manage`, `approve`, `reject`, `audit.view`.

### 2.1 Dashboard
- Available now: `view`, `search`.
- Suggested: `filter` (period/team), `export` KPI snapshot.

### 2.2 Legal Cases
- Available now (UI/API):
  - `view`, `list`, `search`, `filter` (reports + search endpoints).
  - `create`, `update`, `delete`.
  - `assign` clients/courts, `reassign` lawyer (مطلوب في التنفيذ).
  - `change_status`, `close`, `reopen` (حاليًا status موجود كبيان؛ يلزم توحيد عملياته).
  - `attachments.manage`, `notes.manage` (مقترح رسمي لأن الكيان مركزي).
- Nested operations داخل تفاصيل القضية:
  - إدارة الجلسات/الإجراءات/الإعلانات/المحاكم/الموكلين المرتبطين بالقضية.

### 2.3 Sessions
- `view`, `list`, `search`, `filter`.
- `create`, `update`, `delete`.
- `change_status`.
- `assign` (إسناد لمحامٍ/جلسة).
- `print` (مقترح لمحاضر الجلسات).

### 2.4 Procedures
- `view`, `list`, `search`, `filter`.
- `create`, `update`, `delete`.
- `change_status`.
- `assign` (إسناد لمحامٍ أو جهة إجراء).

### 2.5 Services
- `view`, `list`, `search`, `filter`.
- `create`, `update`, `delete`.
- `change_status`, `close`, `reopen`.
- `attachments.manage` (مقترح).
- `service-procedures`: `create`, `update`, `delete`.

### 2.6 Clients
- `view`, `list`, `search`, `filter`.
- `create`, `update`, `delete`.
- `change_status`.
- `assign` للقضايا.
- `view_sensitive` (هاتف/هوية/عناوين).

### 2.7 Reports Hub
- `view`, `list`, `search`, `filter`, `drilldown.view`.
- `export` (CSV/Excel/PDF - مقترح إلزامي).
- `print` (مقترح).
- `audit.view` (تقارير الحساسية والتغييرات - مقترح).

### 2.8 Courts & Taxonomies
- Courts: `view`, `list`, `create`, `update`, `delete`.
- Case/Procedure/Service/Session types: `view`, `create`, `update`, `delete`.

### 2.9 Lawyers
- `view`, `list`, `search`, `create`, `update`, `delete`.
- `assign` to cases/sessions/procedures.

### 2.10 Admin Users
- `view`, `list`, `search`, `create`, `update`, `delete`.
- `assign_roles` / `sync_roles`.
- `change_status`.

### 2.11 Admin Roles
- `view`, `list`, `create`, `update`, `delete`.
- `assign_permissions` / `sync_permissions`.

### 2.12 Admin Permissions
- `view`, `list`, `search`.
- (عادة بدون create/update/delete مباشر في الإنتاج).

### 2.13 Settings/Profile
- Profile: `view_own`, `update_own`.
- Office settings: `view`, `update`.
- Expense categories: `view`, `create`, `update`, `delete`.

### 2.14 Finance (if enabled)
- Expenses: `view`, `list`, `search`, `create`, `update`, `delete`, `approve`, `reject`, `export`.
- Revenue/Invoices (legacy artifacts): `view`, `list`, `create`, `update`, `delete`, `export`, `print`.

### 2.15 Notifications/Events
- Notifications: `view_own`, `mark_read`, `send` (restricted).
- Events: `view`, `create`.
- Audit logs: `audit.view` (admin only).

---

## 3) Resources & Relations (الكيانات والعلاقات)

## 3.1 Core resources
- `LegalCase`
- `Session`
- `Procedure`
- `Service`
- `Client`
- `Unclient`
- `Lawyer`
- `User`
- `Role`
- `Permission`
- `Court`
- `CaseType`, `CaseSubType`
- `ProcedureType`, `ProcedurePlaceType`
- `ServiceType`
- `LegalAd`, `LegalAdType`
- `Attachment` (مقترح توحيد)
- `Notification`
- `Event`
- `Expense`, `ExpenseCategory`
- `Invoice` (legacy controller reference)

## 3.2 Suggested relation model
- `LegalCase hasMany Sessions`
- `LegalCase hasMany Procedures`
- `LegalCase hasMany Services`
- `LegalCase belongsToMany Clients`
- `LegalCase belongsToMany Courts`
- `LegalCase belongsTo Lawyer (assignee)` (أو many عبر pivot)
- `Service hasMany ServiceProcedures`
- `User belongsToMany Roles`
- `Role belongsToMany Permissions`
- `User belongsTo Office/Branch` (scope مقترح ABAC)
- `Attachment morphTo attachable` (case/session/procedure/service/client)

## 3.3 Ownership/Scope anchors
- `owner_user_id` أو `assigned_lawyer_id` على الكيانات التشغيلية.
- `office_id` / `branch_id` لعزل البيانات متعدد الفروع.
- `is_sensitive` للحقول الحساسة.

---

## 4) Entry Points Mapping (Routes / Pages / API)

## 4.1 Frontend route map (React Router)

| Frontend Route | Page/Component | Module | Primary Actions |
|---|---|---|---|
| `/dashboard` | Dashboard | Dashboard | view, search |
| `/dashboard/legcases` | LegalCaseList | Legal Cases | list, create, update, delete, view |
| `/dashboard/legcases/show/:id` | LegalCaseDetails | Legal Cases | view, update, attach/manage nested entities |
| `/dashboard/clients` | ClientUnClientList | Clients | list, create, update, delete, search |
| `/dashboard/legcase-services` | LegalServiceList | Services | list, create, update, delete, view |
| `/dashboard/reports/*` | ReportsIndex + tabs | Reports Hub | view, filter, search, drilldown |
| `/dashboard/reports/sessions` | SessionsReport | Reports/Sessions | view, filter |
| `/dashboard/reports/procedures` | ProceduresReport | Reports/Procedures | view, filter |
| `/dashboard/reports/clients` | ClientsReport | Reports/Clients | view, filter |
| `/dashboard/reports/cases` | CasesReport | Reports/Cases | view, filter |
| `/dashboard/reports/services` | ServicesReport | Reports/Services | view, filter |
| `/dashboard/cases_setting` | CaseTypeSet | Courts & Taxonomies | list, create, update, delete |
| `/dashboard/lawyers` | LawyerList | Lawyers | list, create, update, delete |
| `/dashboard/court-search` | SearchCourt | Courts | search |
| `/dashboard/profile/:userId` | ProfileUser | Settings/Profile | view_own, update_own |
| `/dashboard/admin/users` | AdminUsersPage | Admin Users | list, create, update, delete, assign_roles |
| `/dashboard/admin/roles` | AdminRolesPage | Admin Roles | list, create, update, delete, assign_permissions |
| `/dashboard/admin/permissions` | AdminPermissionsPage | Admin Permissions | list, search |
| `/dashboard/financial-dashboard` | FinancialDashboard | Finance | view |

## 4.2 Backend API entry points (from frontend service usage)

| API Pattern | Module | Actions inferred |
|---|---|---|
| `/legal-cases` (+ `/{id}`) | Legal Cases | list, view, create, update, delete |
| `/cases/search`, `/cases/{id}` | Cases reporting | search, view details |
| `/legal-cases/{id}/add_clients`, `/legal-cases/{id}/clients/{clientId}` | Case-Client assignment | assign, unassign |
| `/legal-cases/add_courts`, `/leg-case/remove-court` | Case-Court assignment | assign, unassign |
| `/legal_sessions*` | Sessions | list, view, create, update, delete |
| `/procedures*` | Procedures | list, view, create, update, delete |
| `/services*` | Services | list, view, create, update, delete |
| `/service-procedures*` | Service Procedures | list, create, update, delete |
| `/clients*`, `/unclients*` | Clients | list, view, create, update, delete |
| `/courts*` | Courts | list, view, create, update, delete |
| `/lawyers*` | Lawyers | list, view, create, update, delete |
| `/case_types*`, `/case_sub_types*` | Taxonomies | list, view, create, update, delete |
| `/procedure_types*`, `/procedure_place_types*` | Taxonomies | list, view, create, update, delete |
| `/reports` عبر data endpoints الحالية | Reports | list/filter across modules |

## 4.3 Backend route map available in repository
- `new-avocatapp` لا يحتوي فعليًا ملفات `routes/api.php` أو Controllers ضمن المصدر الحالي.
- المرجع الوحيد الموجود داخل repo هو `docs/old-backend/routes/api.php` (legacy snapshot) ويؤكد غالبية الـ endpoints المذكورة أعلاه.

---

## 5) Permissions Catalog (Unified Naming)

> **صيغة قياسية:** `<module>.<action>`

## 5.1 Cases
- `cases.view`
- `cases.list`
- `cases.search`
- `cases.create`
- `cases.update`
- `cases.delete`
- `cases.assign`
- `cases.reassign`
- `cases.change_status`
- `cases.close`
- `cases.reopen`
- `cases.attachments.manage`
- `cases.notes.manage`
- `cases.audit.view`

## 5.2 Sessions
- `sessions.view`, `sessions.list`, `sessions.search`
- `sessions.create`, `sessions.update`, `sessions.delete`
- `sessions.assign`, `sessions.change_status`
- `sessions.print`, `sessions.audit.view`

## 5.3 Procedures
- `procedures.view`, `procedures.list`, `procedures.search`
- `procedures.create`, `procedures.update`, `procedures.delete`
- `procedures.assign`, `procedures.change_status`
- `procedures.print`, `procedures.audit.view`

## 5.4 Services
- `services.view`, `services.list`, `services.search`
- `services.create`, `services.update`, `services.delete`
- `services.change_status`, `services.close`, `services.reopen`
- `services.procedures.manage`
- `services.attachments.manage`

## 5.5 Clients
- `clients.view`, `clients.list`, `clients.search`
- `clients.create`, `clients.update`, `clients.delete`
- `clients.assign`
- `clients.change_status`
- `clients.view_sensitive`

## 5.6 Reports
- `reports.view`
- `reports.filter`
- `reports.export`
- `reports.print`
- `reports.audit.view`

## 5.7 Courts & Taxonomies
- `courts.view`, `courts.create`, `courts.update`, `courts.delete`
- `case-types.manage`
- `procedure-types.manage`
- `service-types.manage`
- `session-types.manage`

## 5.8 Users / Roles / Permissions
- `users.view`, `users.create`, `users.update`, `users.delete`
- `users.assign_roles`
- `roles.view`, `roles.create`, `roles.update`, `roles.delete`
- `roles.assign_permissions`
- `permissions.view`

## 5.9 Settings/Finance/Notifications
- `settings.view`, `settings.manage`
- `profile.view_own`, `profile.update_own`
- `expenses.view`, `expenses.create`, `expenses.update`, `expenses.delete`, `expenses.approve`, `expenses.reject`, `expenses.export`
- `invoices.view`, `invoices.create`, `invoices.update`, `invoices.delete`, `invoices.export`, `invoices.print`
- `notifications.view_own`, `notifications.send`, `notifications.mark_read`
- `events.view`, `events.create`

---

## 6) Proposed Roles + Permission Matrix

## 6.1 Roles
- **Super Admin**
- **Admin / Office Manager**
- **Lawyer**
- **Assistant / Secretary**
- **Accountant**
- **Viewer (Read-only)**

## 6.2 Matrix (high-level)

| Permission Group | Super Admin | Admin | Lawyer | Assistant | Accountant | Viewer |
|---|---:|---:|---:|---:|---:|---:|
| Cases view/list/search | ✅ | ✅ | ✅ (scoped) | ✅ (scoped) | 👁️ limited | ✅ |
| Cases create/update | ✅ | ✅ | ✅ (assigned) | ✅ (limited fields) | ❌ | ❌ |
| Cases delete | ✅ | ⚠️ (archive only preferred) | ❌ | ❌ | ❌ | ❌ |
| Cases assign/reassign | ✅ | ✅ | ⚠️ (only own team) | ❌ | ❌ | ❌ |
| Cases close/reopen/change_status | ✅ | ✅ | ⚠️ close يحتاج approval | ⚠️ update status only | ❌ | ❌ |
| Sessions full CRUD | ✅ | ✅ | ✅ (assigned cases) | ✅ (create/update no delete) | ❌ | view only |
| Procedures full CRUD | ✅ | ✅ | ✅ (assigned cases) | ✅ (create/update no delete) | ❌ | view only |
| Services full CRUD | ✅ | ✅ | ✅ | ✅ (limited) | ❌ | view only |
| Clients full CRUD | ✅ | ✅ | ✅ (assigned) | ✅ (except delete) | ❌ | view only |
| Sensitive data view | ✅ | ✅ | ✅ (assigned only) | ⚠️ masked default | ❌ | ❌ |
| Reports view/filter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Reports export/print | ✅ | ✅ | ✅ (scoped) | ⚠️ print only | ✅ | ❌ |
| Courts & taxonomy manage | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Users/Roles/Permissions manage | ✅ | ⚠️ users only | ❌ | ❌ | ❌ | ❌ |
| Finance (expenses/invoices) | ✅ | ✅ | view limited | ❌ | ✅ full finance | view only |
| Settings manage | ✅ | ✅ | profile own | profile own | profile own | profile own |
| Audit logs view | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 7) ABAC Scopes & Constraints (قيود النطاق/الملكية)

## 7.1 Scope dimensions
- `office_id` / `branch_id`
- `assigned_lawyer_id`
- `owner_user_id`
- `created_by`
- `is_sensitive`
- `status`

## 7.2 Mandatory ABAC rules
1. **Lawyer scope**: المحامي يرى/يعدل فقط القضايا المسندة له أو لفريقه.
2. **Assistant scope**: السكرتير يمكنه العرض والإنشاء والتعديل التشغيلي، لكن لا يملك `cases.close` ولا `cases.delete`.
3. **Soft delete policy**: منع الحذف النهائي للكيانات الأساسية (Case/Session/Procedure/Service/Client) واعتماد `archive`.
4. **Branch isolation**: كل مستخدم محصور في `office_id/branch_id` الخاصة به إلا Super Admin.
5. **Sensitive fields**: أرقام الهواتف/الهويات لا تُعرض إلا مع `clients.view_sensitive` + scope يطابق المكتب.
6. **Approval workflow**: إغلاق القضية أو اعتماد مصروف/فاتورة يتطلب صلاحية + حالة workflow (`pending_approval -> approved/rejected`).
7. **Conflict of interest**: منع إعادة إسناد قضية لمحامٍ خارج نفس المكتب دون صلاحية `cases.reassign.cross_branch`.

## 7.3 Policy pseudo-rules (Laravel)
- `CasePolicy@view(User $u, Case $c)`:
  - allow if `hasPermission('cases.view')` AND (`u.isSuperAdmin || c.office_id == u.office_id`) AND (`u.role != lawyer || c.assigned_lawyer_id == u.id || u.hasPermission('cases.view.team'))`.
- `CasePolicy@close(...)`:
  - allow if `hasPermission('cases.close')` AND `case.status in ['active','in_progress']`.
- `ClientPolicy@viewSensitive(...)`:
  - allow if `hasPermission('clients.view_sensitive')` AND same office.

---

## 8) Implementation Notes (Laravel + Frontend)

## 8.1 Laravel authorization architecture
- يوصى باستخدام:
  - **Spatie Laravel Permission** (للـ RBAC)
  - + **Policies/Gates** لقيود ABAC
- Pattern:
  1. Middleware permission check (`permission:cases.view`)
  2. Policy check على مستوى record (`$this->authorize('view', $case)`).

## 8.2 Database model options

### Option A (Spatie default)
- `roles`
- `permissions`
- `model_has_roles`
- `model_has_permissions`
- `role_has_permissions`

### Option B (custom pivot)
- `roles`
- `permissions`
- `role_user`
- `permission_role`
- `permission_user` (optional)

### ABAC supporting fields
- Add to core tables: `office_id`, `branch_id`, `assigned_lawyer_id`, `created_by`, `updated_by`, `archived_at`, `is_sensitive`.

## 8.3 Frontend enforcement
- Keep server as source of truth.
- Implement:
  - `PermissionGuard` للصفحات.
  - `RouteGuard` على مستوى route.
  - `ComponentGuard` للأزرار (`create/edit/delete/export/approve...`).
- Hide + disable strategy:
  - إخفاء العناصر غير المصرح بها.
  - منع التنفيذ أيضًا عبر API (403).

## 8.4 Auditing
- سجل أحداث حرجة:
  - create/update/delete/archive
  - assign/reassign
  - close/reopen
  - approve/reject
  - role/permission changes
- يفضل جدول `audit_logs` مع:
  - `actor_id`, `action`, `resource_type`, `resource_id`, `old_values`, `new_values`, `ip`, `user_agent`, `created_at`.

## 8.5 Migration strategy
1. Build permission catalog seed.
2. Seed baseline roles.
3. Attach current users to nearest role.
4. Enable middleware تدريجيًا module-by-module.
5. تفعيل ABAC policies للكيانات الحساسة أولًا (cases/clients).

---

## 9) Mapping current frontend permission keys vs proposed standard

> الواجهة الحالية تستخدم مفاتيح مثل `legal-cases.view` و `admin-users.view` في `permission-map.ts`. يوصى بتوحيد التسميات إلى صيغة snake/kebab ثابتة واحدة على مستوى النظام.

| Current key (frontend) | Proposed canonical key |
|---|---|
| `legal-cases.view` | `cases.view` |
| `legal-cases.create` | `cases.create` |
| `legal-cases.update` | `cases.update` |
| `legal-cases.delete` | `cases.delete` |
| `admin-users.*` | `users.*` |
| `admin-roles.*` | `roles.*` |
| `admin-permissions.*` | `permissions.view` (+ optional manage) |

---

## 10) Outstanding Questions (مطلوب حسمها قبل التنفيذ)

1. أين كود Laravel 11 التشغيلي (`routes/api.php` + Controllers) داخل `new-avocatapp`؟ الموجود حاليًا لا يحتوي ملفات التطبيق الأساسية.
2. هل المطلوب الرسمي هو **Soft Delete/Archive فقط** أم السماح بـ hard delete لبعض الكيانات؟
3. ما تعريف "الملكية" رسميًا: حسب `assigned_lawyer_id` فقط، أم فريق/قسم/فرع؟
4. هل يوجد مفهوم Multi-office/Multi-branch فعليًا في قاعدة البيانات الحالية؟
5. هل التقارير تحتاج `export` و`print` فورًا ضمن MVP أم مرحلة لاحقة؟
6. هل إدارة المستخدمين/الأدوار متاحة لـ Admin أم حصريًا لـ Super Admin؟
7. ما حدود دور Accountant بالضبط (عرض قضايا مالية فقط أم الوصول للقضايا المرتبطة بالفواتير)؟
8. هل الحقول الحساسة (هوية/هاتف/عنوان) تحتاج Masking dynamic في الواجهة حسب الصلاحية؟
9. هل مطلوب Workflow موافقات رسمي (Approve/Reject) للقضايا/المصروفات/الفواتير؟
10. هل تعتمدون Spatie Permission أم تفضلون تنفيذًا داخليًا لأسباب تنظيمية/أمنية؟

---

## 11) Ready-to-implement checklist

- [ ] اعتماد قائمة الصلاحيات النهائية (catalog).
- [ ] اعتماد قاموس موحد للأدوار ومسؤولياتها.
- [ ] حسم قواعد ABAC (office/owner/assignee/sensitive).
- [ ] بناء migrations + seeders للأدوار والصلاحيات.
- [ ] تطبيق middleware + policies في backend.
- [ ] ربط guards في frontend.
- [ ] تشغيل audit logs للأحداث الحرجة.
- [ ] اختبار end-to-end لحالات السماح/المنع لكل دور.

