#!/bin/bash
set -euo pipefail

echo "🚀 Starting Deployment Script..."

PORT_VALUE="${PORT:-${APP_PORT:-8000}}"
CLEAN_PORT="$(echo "$PORT_VALUE" | tr -dc '0-9')"
if [ -z "$CLEAN_PORT" ]; then
  CLEAN_PORT="8000"
fi

# 1) Clear only config cache first (safe without DB)
echo "🧹 Clearing config cache..."
php artisan config:clear || true

# 2) Ensure APP_KEY exists
if [ -z "${APP_KEY:-}" ]; then
  echo "🔑 APP_KEY is missing, generating one..."
  php artisan key:generate --force || true
fi

# 3) Wait for DB only when host/port are provided
if [ -n "${DB_HOST:-}" ] && [ -n "${DB_PORT:-}" ]; then
  echo "⏳ Waiting for Database at ${DB_HOST}:${DB_PORT}..."
  CLEAN_DB_HOST="$(echo "$DB_HOST" | tr -d '\r')"
  until nc -z -w 5 "$CLEAN_DB_HOST" "$DB_PORT"; do
    echo "Waiting for database connection..."
    sleep 3
  done

  echo "🧹 Clearing application cache..."
  php artisan cache:clear || true

  echo "📂 Running Migrations..."
  php artisan migrate --force
else
  echo "⚠️ DB_HOST/DB_PORT not set; skipping DB wait, cache:clear, and migrations."
fi

# 4) Start server
echo "🌐 Starting Server on port ${CLEAN_PORT}..."
php artisan config:cache
php artisan route:cache || true
php artisan view:cache || true
exec php -S "0.0.0.0:${CLEAN_PORT}" -t public
