#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# تنظيف الكاش
php artisan optimize:clear

# انتظار قاعدة البيانات
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# تشغيل التهجير (Migration)
echo "📂 Running Migrations..."
php artisan migrate --force

# تشغيل السيرفر
echo "🌐 Starting Server..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public