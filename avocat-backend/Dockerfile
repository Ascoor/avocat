# المرحلة 1: الملحقات والمكتبات
FROM php:8.2-cli AS vendor
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN apt-get update && apt-get install -y git unzip curl libzip-dev \
    && docker-php-ext-install zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --no-progress --prefer-dist --no-dev --optimize-autoloader

# المرحلة 2: التطبيق النهائي
FROM php:8.2-cli AS app
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates libpq-dev libzip-dev libpng-dev libjpeg62-turbo-dev \
    libfreetype6-dev libonig-dev libxml2-dev netcat-openbsd libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd bcmath pcntl \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html
COPY --from=vendor /var/www/html/vendor ./vendor
COPY . .

# الصلاحيات وحذف ملف .env المحلي لضمان استخدام متغيرات Railway
RUN chmod +x docker-entrypoint.sh \
    && mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && rm -f .env

EXPOSE 8000
ENTRYPOINT ["/bin/bash", "docker-entrypoint.sh"]