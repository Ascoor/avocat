#!/bin/bash
set -euo pipefail

cd /var/www/html

# Ensure runtime env file exists (always recreate from .env.docker inside container)
if [ -f .env ]; then
  echo "Removing existing .env..."
  rm .env
fi

if [ -f .env.docker ]; then
  echo "Creating fresh .env from .env.docker"
  cp .env.docker .env
elif [ -f .env.example ]; then
  echo "Creating .env from .env.example"
  cp .env.example .env
fi

# Install PHP dependencies on first run
if [ ! -f vendor/autoload.php ]; then
  composer update --no-interaction --prefer-dist --no-progress
  composer install --no-interaction --prefer-dist --no-progress
fi

# Wait for database to be reachable
if [ -n "${DB_HOST:-}" ] && [ -n "${DB_PORT:-}" ]; then
  echo "⏳ Waiting for database ${DB_HOST}:${DB_PORT}..."
  until nc -z "$DB_HOST" "$DB_PORT"; do
    sleep 1
  done
fi

# Ensure app key exists
if ! grep -q "^APP_KEY=" .env || [ -z "$(grep '^APP_KEY=' .env | cut -d'=' -f2)" ]; then
  php artisan key:generate --force --ansi
fi

# Install Passport (if not already installed)
if ! composer show laravel/passport > /dev/null 2>&1; then
  echo "Installing Laravel Passport..."
  composer require laravel/passport
  php artisan migrate
  php artisan passport:install
fi

# Run database migrations
php artisan migrate --force --seed || true

# Run Passport commands for setting up Personal Access Client
if ! php artisan passport:client --personal > /dev/null 2>&1; then
  echo "Creating Passport Personal Access Client..."
  php artisan passport:client --personal
fi

# Run Passport commands for setting up Password Grant Client
if ! php artisan passport:client --password > /dev/null 2>&1; then
  echo "Creating Passport Password Grant Client..."
  php artisan passport:client --password
fi

# Start queue worker in background if database/redis is ready
QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}
if [ "$QUEUE_CONNECTION" != "sync" ]; then
  php artisan queue:work --queue=default,notifications --sleep=1 --tries=3 --max-jobs=0 --backoff=3 &
fi

# Start the Laravel development server
php artisan serve --host=0.0.0.0 --port="${APP_PORT:-8000}"
