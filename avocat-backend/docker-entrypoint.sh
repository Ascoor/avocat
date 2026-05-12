#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. تنظيف الكاش القديم لضمان قراءة المتغيرات من Railway
echo "🧹 Clearing Cache..."
php artisan optimize:clear

# 2. انتظر قاعدة البيانات حتى تصبح جاهزة
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection ($CLEAN_DB_HOST:$DB_PORT)..."
  sleep 5
done
echo "✅ Database is up!"

# 3. مسح الجداول، المهاجرة، والترحيل (Migrations & Seeding)
# --force لإلغاء أي سؤال تأكيدي (Yes/No)
echo "📂 Running Fresh Migrations & Seeding..."
php artisan migrate:fresh --seed --force

# 4. تشغيل السيرفر
echo "🌐 Starting Server on port $PORT..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public