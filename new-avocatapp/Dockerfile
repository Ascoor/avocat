FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    netcat-openbsd \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    bcmath \
    zip \
    intl \
    gd \
    exif \
    pcntl \
  && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set workdir
WORKDIR /var/www

# Copy application code
COPY . .

RUN mkdir -p \
    storage/framework/{cache,sessions,views} \
    storage/logs \
    bootstrap/cache \
  && chown -R www-data:www-data /var/www \
  && chmod +x docker-entrypoint.sh

USER www-data

EXPOSE 9000

ENTRYPOINT ["bash", "/var/www/docker-entrypoint.sh"]
CMD ["php-fpm"]
