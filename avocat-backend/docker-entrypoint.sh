#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. التحقق من وجود ملف .env
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
fi

# 2. توليد APP_KEY إذا كان مفقوداً
if ! grep -q "APP_KEY=base64" .env; then
    echo "🔑 Generating Application Key..."
    php artisan key:generate --force
fi

# 3. انتظر قاعدة البيانات حتى تعمل
echo "⏳ Waiting for MySQL to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT; do
  echo "Waiting for database connection ($DB_HOST:$DB_PORT)..."
  sleep 5
done
echo "✅ Database is up!"

# 4. تنظيف الكاش القديم (حل مشكلة Closure)
# نستخدم clear بدلاً من cache لتجنب خطأ Serialization
echo "🧹 Clearing old cache..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 5. تنفيذ المهاجرة (Migrations)
echo "📂 Running Database Migrations..."
php artisan migrate --force

# 6. تشغيل السيرفر
echo "🌐 Starting Laravel Server on port $PORT..."
# ملاحظة: في بيئة الإنتاج يفضل عدم عمل config:cache إذا كانت ملفاتك تحتوي على Closures
# لذا سنكتفي بالتشغيل المباشر
php artisan serve --host=0.0.0.0 --port=$PORT
