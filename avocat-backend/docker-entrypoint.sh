#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. تنظيف الكاش لضمان قراءة المتغيرات الجديدة من Railway
echo "🧹 Clearing Cache..."
php artisan config:clear
php artisan cache:clear

# 2. التأكد من وجود مفتاح التطبيق (اختياري لو أضفته يدويًا في Railway)
if [ -z "$APP_KEY" ]; then
    echo "🔑 APP_KEY is missing, generating one..."
    php artisan key:generate --force
fi

# 3. انتظر قاعدة البيانات
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# 4. المهاجرة (Migrations)
echo "📂 Running Migrations..."
php artisan migrate --force
# تنظيف المنفذ من أي رموز مخفية
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')

echo "🌐 Starting Production Server on Port: $CLEAN_PORT"

# تشغيل السيرفر باستخدام PHP مباشرة بدلاً من artisan serve
exec php -S 0.0.0.0:$CLEAN_PORT -t public