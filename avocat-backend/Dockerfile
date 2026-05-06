# =========================
# 1) Vendor stage
# =========================
FROM php:8.2-cli AS vendor

# أضفنا مكتبات الصور الضرورية لـ GD لضمان عدم توقف الـ Compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip curl libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath \
    && pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY composer.json composer.lock ./

# حل مشكلة الفشل في تثبيت الملحقات: إضافة --ignore-platform-reqs
RUN composer install --no-interaction --no-dev --no-scripts --ignore-platform-reqs

# =========================
# 2) App stage
# =========================
FROM php:8.2-cli AS app

# أضفنا netcat-openbsd لانتظار قاعدة البيانات ومكتبات التشغيل
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev netcat-openbsd \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath pcntl \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# نسخ الملحقات من المرحلة السابقة (Vendor)
COPY --from=vendor /var/www/html/vendor ./vendor
COPY . .

# إعداد الصلاحيات بشكل سليم
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# إعداد المتغيرات والمنفذ
ENV PORT=8000
EXPOSE 8000

# التأكد من صلاحيات سكريبت التشغيل
RUN chmod +x docker-entrypoint.sh

# يفضل استخدام المسار الكامل لـ bash لتجنب مشاكل المسارات في Railway
ENTRYPOINT ["/bin/bash", "./docker-entrypoint.sh"]
