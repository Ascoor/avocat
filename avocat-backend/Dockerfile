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

  # Copy only composer manifests first for cache
  COPY composer.json composer.lock ./ 

  # Install deps (NO update, and keep it deterministic)
  RUN composer install \
    --no-interaction --no-progress --prefer-dist \
    --no-dev \
    --no-scripts \
    --optimize-autoloader

  # =========================
  # 2) App stage
  # =========================
  FROM php:8.2-cli AS app

  RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      curl ca-certificates \
      libpq-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
      libonig-dev libxml2-dev netcat-openbsd libsqlite3-dev \
      $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_pgsql pdo_mysql pdo_sqlite zip gd bcmath pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

  WORKDIR /var/www/html

  # Copy vendor from vendor stage (fast)
  COPY --from=vendor /var/www/html/vendor ./vendor
  COPY --from=vendor /var/www/html/composer.* ./ 

  # Copy app code
  COPY . .

  # Now we can run artisan safely (scripts are optional)
  RUN php artisan package:discover --ansi || true

  # Permissions
  RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

  ENV APP_PORT=8000
  EXPOSE 8000

  CMD ["bash", "docker-entrypoint.sh"]