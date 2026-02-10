# RBAC Legacy Schema Report (aocatapp/avocatapp)

## 1) Tables related to roles/permissions

> ملاحظة: لا توجد جداول roles/permissions/pivot واضحة في الـ migrations. الموجود فقط هو عمود `role` داخل جدول `users`.

| Table | Related Columns | Evidence |
| --- | --- | --- |
| `users` | `role` enum (`'1','2','3'`) | users migration defines `role` as enum with values 1/2/3.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】 |

## 2) User/Role/Permission Relationships (ER نصي مختصر)

- `users` يحتوي على عمود `role` (enum) بدون أي جداول علاقات أو pivots.
- لا توجد جداول `roles`, `permissions`, أو pivots مثل `role_user`, `permission_role`, `model_has_roles` في الـ migrations. (مستنتج من فحص migrations).【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】

## 3) Models

- `App\Models\User` لا يحتوي على علاقات roles/permissions ولا يستخدم Traits مثل Spatie HasRoles. يظهر فقط استخدام Passport API tokens و Notifications relation.【F:avocatapp/app/Models/User.php†L8-L52】

## 4) Seeders

- Seeder للمستخدمين يضع `role` بقيم `1` و `2`، ويُعرّف قائمة أدوار صالحة `['1','2','3']` بدون أي تعاريف أدوار إضافية أو صلاحيات منفصلة.【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】

## 5) هل النظام Spatie أم Custom؟

- النظام **Custom بسيط** يعتمد على عمود `users.role` فقط.
- لا توجد جداول أو Traits أو إعدادات تخص Spatie. (مستند إلى غياب جداول permissions/roles وغياب Trait في User).【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/app/Models/User.php†L8-L52】
