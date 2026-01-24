#!/bin/bash
set -euo pipefail

cd /var/www

# --- ENV ---
if [ ! -f .env ]; then
  if [ -f .env.docker ]; then
    echo "Creating .env from .env.docker"
    cp .env.docker .env
  elif [ -f .env.example ]; then
    echo "Creating .env from .env.example"
    cp .env.example .env
  fi
fi

# --- Composer settings (important with volumes) ---
export COMPOSER_ALLOW_SUPERUSER=${COMPOSER_ALLOW_SUPERUSER:-1}
export COMPOSER_CACHE_DIR=${COMPOSER_CACHE_DIR:-/tmp/composer-cache}
mkdir -p "$COMPOSER_CACHE_DIR"

# --- Install vendor if missing (vendor is a volume) ---
if [ ! -f vendor/autoload.php ]; then
  echo "📦 Installing composer dependencies..."
  composer install --no-interaction --prefer-dist --no-progress
fi

# --- Clear caches BEFORE any artisan that boots the app ---
php artisan optimize:clear || true

exec "$@"
