#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# تنظيف الكاش (هذا لا يحتاج لملف .env لأنه يقرأ من الذاكرة)
echo "🧹 Clearing Cache..."
php artisan config:clear
php artisan cache:clear

# انتظر قاعدة البيانات
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# المهاجرة
echo "📂 Running Migrations..."
php artisan migrate --force

# تشغيل السيرفر
echo "🌐 Starting Server..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public