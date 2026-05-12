#!/bin/bash
set -e

echo "🚀 Starting Production Boot Sequence..."

# 1. تنظيف أي كاش قديم قد يكون مدمجاً في الحاوية
php artisan config:clear
php artisan view:clear
php artisan route:clear

# 2. المهاجرة (تأكد أن DB_HOST و DB_PORT صحيحة في Railway)
echo "📂 Checking Database Migrations..."
php artisan migrate --force

# 3. إصلاح الأذونات لضمان عمل الجلسات (Sessions) والملفات
chmod -R 775 storage bootstrap/cache

# 4. تشغيل السيرفر
# ملاحظة: نستخدم $PORT (متغير Railway) لضمان الربط الصحيح
echo "🌐 App is live on port $PORT"
exec php -S 0.0.0.0:$PORT -t public