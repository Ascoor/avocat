#!/bin/bash
set -e

echo "🚀 Starting Production Boot Sequence..."

# 1. تنظيف الكاش لضمان قراءة المتغيرات من Railway وليس من ملفات قديمة
php artisan config:clear
php artisan view:clear
php artisan route:clear

# 2. تنفيذ المهاجرة بدون مسح البيانات (Migrate وليس Migrate:fresh)
# ملاحظة: السجلات أظهرت أن الجداول موجودة بالفعل، لذا سنقوم بالميجريشن العادي فقط
echo "📂 Checking Database Migrations..."
php artisan migrate --force

# 3. التأكد من أن المجلدات قابلة للكتابة (هام جداً للـ Session و الـ Logs)
chmod -R 775 storage bootstrap/cache

# 4. تشغيل السيرفر باستخدام PHP مدمج (أكثر استقراراً في Railway)
echo "🌐 App is live on port $PORT"
exec php -S 0.0.0.0:$PORT -t public