# =========================
# 1) Vendor stage (للتحميل وتثبيت الملحقات)
# =========================
FROM php:8.2-cli AS vendor

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip curl libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath \
    && pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-dev --no-scripts --optimize-autoloader

# =========================
# 2) App stage (الصورة النهائية للتشغيل)
# =========================
FROM php:8.2-cli AS app

# تثبيت الأدوات اللازمة للتشغيل فقط
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev netcat-openbsd \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath pcntl \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# نسخ الملحقات والكود
COPY --from=vendor /var/www/html/vendor ./vendor
COPY . .

# إعداد الصلاحيات
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# إعداد المنفذ
ENV PORT=8000
EXPOSE 8000

# التأكد من وجود ملف السكريبت وإعطاؤه صلاحية التنفيذ
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/bin/bash", "docker-entrypoint.sh"]
