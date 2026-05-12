# =========================
# 1) Vendor stage
# =========================
FROM php:8.2-cli AS vendor

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git unzip curl ca-certificates \
    libpq-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    libonig-dev libxml2-dev netcat-openbsd libsqlite3-dev \
    $PHPIZE_DEPS \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo_pgsql pdo_mysql pdo_sqlite zip gd bcmath pcntl \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && rm -rf /var/lib/apt/lists/*

# Composer
RUN curl -fsSL https://getcomposer.org/installer -o /tmp/composer-setup.php \
  && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
  && rm -f /tmp/composer-setup.php

WORKDIR /var/www/html

COPY composer.json composer.lock ./ 

RUN composer install \
  --no-interaction --no-progress --prefer-dist \
  --no-dev \
  --no-scripts \
  --optimize-autoloader

# =========================
# 2) App stage
# =========================
FROM php:8.2-cli AS app

# تثبيت الأدوات اللازمة للتشغيل (بما في ذلك netcat للتحقق من قاعدة البيانات)
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl ca-certificates \
    libpq-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    libonig-dev libxml2-dev netcat-openbsd libsqlite3-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo_pgsql pdo_mysql pdo_sqlite zip gd bcmath pcntl \
  # ملحوظة: لم نعد بحاجة لـ $PHPIZE_DEPS هنا لأننا لا نستخدم pecl في المرحلة النهائية لتقليل الحجم
  && pecl install redis && docker-php-ext-enable redis \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# نسخ المجلدات الجاهزة
COPY --from=vendor /var/www/html/vendor ./vendor
COPY --from=vendor /var/www/html/composer.* ./ 

# نسخ كود المشروع
COPY . .

# إعطاء صلاحيات التنفيذ لسكربت الدخول (خطوة حاسمة)
RUN chmod +x docker-entrypoint.sh

# إعداد الصلاحيات للمجلدات التي يكتب فيها لارافل
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

# تأكد من عدم وجود ملف .env قديم يتداخل مع متغيرات Railway
RUN rm -f .env

ENV APP_PORT=8000
EXPOSE 8000

# استخدام المستخدم الافتراضي لزيادة الأمان (اختياري، يفضل بقاءه root في Railway لبعض الإعدادات)
# USER www-data

ENTRYPOINT ["/bin/bash", "docker-entrypoint.sh"]