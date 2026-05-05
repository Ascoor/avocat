#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. التحقق من وجود ملف .env (ضروري لـ Laravel)
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
fi

# 2. توليد APP_KEY إذا كان مفقوداً
if ! grep -q "APP_KEY=base64" .env; then
    echo "🔑 Generating Application Key..."
    php artisan key:generate --force
fi

# 3. انتظر قاعدة البيانات حتى تعمل (MySQL)
# سنستخدم المتغيرات التي يوفرها Railway
echo "⏳ Waiting for MySQL to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT; do
  echo "Waiting for database connection ($DB_HOST:$DB_PORT)..."
  sleep 5
done
echo "✅ Database is up!"

# 4. تنفيذ المهاجرة (Migrations)
echo "📂 Running Database Migrations..."
php artisan migrate --force

# 5. تنظيف الكاش لتحسين الأداء
php artisan config:cache
php artisan route:cache

# 6. تشغيل السيرفر
echo "🌐 Starting Laravel Server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
