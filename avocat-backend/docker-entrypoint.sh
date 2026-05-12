#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. انتظر قاعدة البيانات
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# 2. المهاجرة (Migrations)
echo "📂 Running Migrations..."
php artisan migrate --force

# 3. تنظيف الكاش (اختياري)
echo "🧹 Clearing Cache..."
php artisan config:clear
php artisan cache:clear

# 4. تشغيل السيرفر
echo "🌐 Starting Server on port $PORT..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public