FROM php:8.2-cli

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git unzip curl ca-certificates \
    libpq-dev libzip-dev libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
    libonig-dev libxml2-dev netcat-openbsd libsqlite3-dev \
    $PHPIZE_DEPS \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install \
    pdo_pgsql pdo_mysql pdo_sqlite zip gd bcmath pcntl \
  && pecl install redis \
  && docker-php-ext-enable redis \
  && rm -rf /var/lib/apt/lists/*

# Install Composer (no docker hub dependency)
RUN curl -fsSL https://getcomposer.org/installer -o /tmp/composer-setup.php \
  && php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer \
  && composer --version \
  && rm -f /tmp/composer-setup.php

WORKDIR /var/www/html

# Copy only composer files first (cache layer)
COPY composer.json composer.lock ./

# IMPORTANT: no scripts here because artisan isn't copied yet
RUN composer install --no-interaction --no-progress --prefer-dist --no-scripts

# Copy application code
COPY . .

# Now artisan exists; run scripts safely
RUN composer dump-autoload --optimize \
  && php artisan package:discover --ansi || true

RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod +x docker-entrypoint.sh
  
ENV APP_PORT=8000
EXPOSE 8000
CMD ["bash", "docker-entrypoint.sh"]
