# Admin Refactor Report

## ما الذي تم دمجه
- تم إنشاء صفحة موحّدة `UserManagementHub` في:
  - `src/features/admin/pages/UserManagementHub.jsx`
- الصفحة تحتوي tabs داخل المحتوى الرئيسي:
  - Users
  - Roles
  - Permissions
- تم نقل CRUD الخاص بالمستخدمين والأدوار + عرض الصلاحيات داخل نفس الصفحة.
- تم تفعيل split view على desktop (جدول + panel جانبي sticky) وmodal editor على mobile.

## Navigation/Sidebar
- تم تقليل عناصر الـ sidebar داخل إعدادات النظام إلى عنصر واحد فقط:
  - `navigation.adminUsers` -> `/dashboard/admin/users`
- تمت إزالة عناصر `adminRoles` و `adminPermissions` من القائمة الجانبية لتقليل الازدحام.

## ما الذي حُذف (مع proof)
- لم يتم حذف routes القديمة `admin/roles` و `admin/permissions` حفاظًا على التوافق الخلفي ومنع الروابط الميتة.
- بدلًا من ذلك، الصفحات القديمة أصبحت wrappers خفيفة تفتح نفس `UserManagementHub` مع `defaultTab` مناسب.

### Proof (grep)
```bash
rg -n "admin/roles|admin/permissions|AdminRolesPage|AdminPermissionsPage|UserManagementHub|navigation.adminRoles|navigation.adminPermissions" src/app/routes/AuthRoutes.jsx src/config/sidebar.js src/features/admin/pages
```

### نتائج مختصرة
- `AuthRoutes.jsx` ما زال يحتوي route قديمًا لكل من roles/permissions.
- `AdminRolesPage.jsx` و`AdminPermissionsPage.jsx` أصبحا wrappers لـ `UserManagementHub`.
- `sidebar.js` لم يعد يحتوي عناصر nav منفصلة لـ roles/permissions.

## ما الذي بقي ولماذا
- بقيت ملفات `AdminRolesPage` و`AdminPermissionsPage` بهدف الحفاظ على backward compatibility لأي bookmarks أو links قديمة.
- بقيت routes القديمة للسبب نفسه، مع توحيد واجهة الإدارة في Hub واحد.
