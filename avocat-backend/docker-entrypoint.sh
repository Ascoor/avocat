#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. تنظيف الكاش
echo "🧹 Clearing Cache..."
php artisan config:clear
php artisan cache:clear

# 2. انتظر قاعدة البيانات
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# 3. المهاجرة والترحيل (Migrations & Seeding) بدون أسئلة
echo "📂 Running Migrations & Seeding..."
php artisan migrate:fresh --seed --force

# 4. تشغيل السيرفر
echo "🌐 Starting Server on port $PORT..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public