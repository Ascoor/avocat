#!/bin/bash
set -euo pipefail

cd /var/www/html

# --- ENV ---
rm -f .env
if [ -f .env.docker ]; then
  echo "Creating fresh .env from .env.docker"
  cp .env.docker .env
elif [ -f .env.example ]; then
  echo "Creating .env from .env.example"
  cp .env.example .env
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

# --- Wait for DB ---
if [ -n "${DB_HOST:-}" ] && [ -n "${DB_PORT:-}" ]; then
  echo "⏳ Waiting for database ${DB_HOST}:${DB_PORT}..."
  until nc -z "$DB_HOST" "$DB_PORT"; do sleep 1; done
fi

# --- APP_KEY ---
if ! grep -q "^APP_KEY=" .env || [ -z "$(grep '^APP_KEY=' .env | cut -d'=' -f2)" ]; then
  php artisan key:generate --force --ansi
fi

# --- Migrate & Seed (seed only once using marker) ---
echo "⏳ Running migrations..."
php artisan db:wipe
php artisan migrate:fresh --seed 

# --- Queue (optional) ---
QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}
if [ "$QUEUE_CONNECTION" != "sync" ]; then
  php artisan queue:work --queue=default,notifications --sleep=1 --tries=3 --max-jobs=0 --backoff=3 &
fi

# --- Serve ---
php artisan serve --host=0.0.0.0 --port="${APP_PORT:-8000}"
