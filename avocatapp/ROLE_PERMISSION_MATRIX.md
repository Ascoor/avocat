# Role ↔ Permission Matrix (Legacy)

> لا يوجد تعريف صريح لربط الأدوار بالصلاحيات في الكود أو قاعدة البيانات.
> الموجود فقط قيم roles كـ enum داخل جدول users بدون mapping للصلاحيات.

| Role Value | Known Permissions | Evidence |
| --- | --- | --- |
| `1` | غير معرّفة في الكود (لا توجد جداول/سياسات/بوابات) | users.role enum + seeder values only.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |
| `2` | غير معرّفة في الكود (لا توجد جداول/سياسات/بوابات) | users.role enum + seeder values only.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |
| `3` | غير معرّفة في الكود (لا توجد جداول/سياسات/بوابات) | users.role enum + seeder values only.【F:avocatapp/database/migrations/2014_10_12_000000_create_users_table.php†L14-L30】【F:avocatapp/database/seeders/UsersTableSeeder.php†L12-L56】 |
