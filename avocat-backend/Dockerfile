# =========================
# 1) Vendor stage
# =========================
FROM php:8.2-cli AS vendor

# تحسين سرعة التثبيت ومنع مشاكل الصلاحيات
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_MEMORY_LIMIT=-1

RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip curl libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath \
    && pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# نسخ ملفات الكومبوزر أولاً للاستفادة من الكاش
COPY composer.json composer.lock ./

# تم إزالة --optimize-autoloader من هنا لتقليل استهلاك الذاكرة (Exit Code 4)
RUN composer install \
    --no-interaction \
    --no-dev \
    --no-scripts \
    --ignore-platform-reqs \
    --no-autoloader

# =========================
# 2) App stage
# =========================
FROM php:8.2-cli AS app

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_MEMORY_LIMIT=-1

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev libzip-dev libpng-dev libonig-dev libxml2-dev netcat-openbsd \
    libfreetype6-dev libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath pcntl \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# نسخ الملحقات والكود
COPY --from=vendor /var/www/html/vendor ./vendor
COPY . .

# تنفيذ توليد الـ Autoloader في المرحلة النهائية (أخف على الذاكرة)
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

ENV PORT=8000
EXPOSE 8000

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/bin/bash", "./docker-entrypoint.sh"]
