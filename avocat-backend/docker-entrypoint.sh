#!/bin/bash
set -e

echo "🚀 Starting Deployment Script..."

# 1. Ensure APP_KEY exists
if [ -z "$APP_KEY" ]; then
    echo "🔑 APP_KEY is missing, generating one..."
    php artisan key:generate --force
fi

# 2. Wait for Database
echo "⏳ Waiting for Database..."
CLEAN_DB_HOST=$(echo "$DB_HOST" | tr -d '\r')
until nc -z -v -w30 $CLEAN_DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

# 3. RUN MIGRATIONS FIRST 📂
# This creates the 'sessions' and 'cache' tables so the next commands don't crash.
echo "📂 Running Migrations..."
php artisan migrate --force

# 4. NOW Clear Cache 🧹
echo "🧹 Clearing Cache..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# 5. Starting Server
echo "🌐 Starting Server on port $PORT..."
CLEAN_PORT=$(echo "$PORT" | tr -dc '0-9')
exec php -S 0.0.0.0:$CLEAN_PORT -t public