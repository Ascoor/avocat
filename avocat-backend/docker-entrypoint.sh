#!/bin/bash
# تم إضافة -e للتوقف عند الخطأ و -u للتوقف عند وجود متغير غير معرف
set -euo pipefail

cd /var/www/html

# --- 1. إعداد ملف الـ ENV ---
# في Railway لا نفضل استخدام ملف .env، لكن السكربت سيقوم بإنشائه إذا لم يوجد لتجنب أخطاء Laravel
if [ ! -f .env ]; then
    if [ -f .env.docker ]; then
        echo "Creating .env from .env.docker"
        cp .env.docker .env
    elif [ -f .env.example ]; then
        echo "Creating .env from .env.example"
        cp .env.example .env
    else
        echo "Warning: No .env template found, creating empty .env"
        touch .env
    fi
fi

# --- 2. إعدادات Composer ---
export COMPOSER_ALLOW_SUPERUSER=1
if [ ! -f vendor/autoload.php ]; then
    echo "📦 Installing composer dependencies..."
    # --no-interaction تمنع أي أسئلة أثناء التثبيت
    composer install --no-interaction --prefer-dist --no-progress --optimize-autoloader
fi

# --- 3. انتظار قاعدة البيانات ---
if [ -n "${DB_HOST:-}" ] && [ -n "${DB_PORT:-}" ]; then
    echo "⏳ Waiting for database ${DB_HOST}:${DB_PORT}..."
    until nc -z "$DB_HOST" "$DB_PORT"; do sleep 1; done
    echo "✅ Database is up!"
fi

# --- 4. توليد المفتاح (فقط إذا لم يكن موجوداً في البيئة) ---
if [ -z "${APP_KEY:-}" ]; then
    echo "🔑 Generating APP_KEY..."
    php artisan key:generate --force --ansi
fi

# --- 5. تنظيف الكاش ---
echo "🧹 Clearing Cache..."
php artisan optimize:clear --no-interaction

# --- 6. المهاجرة والترحيل (Migrations & Seeding) ---
# --force هنا هي الأهم لإلغاء رسالة التحذير في وضع الإنتاج (Production)
echo "📂 Wiping DB, Migrating and Seeding..."
php artisan migrate:fresh --seed --force

# --- 7. إعداد المنفذ وتشغيل السيرفر ---
# تنظيف متغير PORT من أي رموز غير رقمية
CLEAN_PORT=$(echo "${PORT:-8000}" | tr -dc '0-9')

echo "🌐 Starting Laravel Server on Port: $CLEAN_PORT"

# تنفيذ السيرفر (exec تجعل السيرفر هو العملية الأساسية للحاوية)
exec php artisan serve --host=0.0.0.0 --port="$CLEAN_PORT"